'use strict';
// Lula source analysis for the language server: tokens with positions, the user's own
// declarations (with scopes), and name resolution. Works in every language because it
// reasons about the C++ meaning of each Lula word.

const { tokenize, contextFor } = require('../translator');

const TYPE_LIKE = new Set(['int', 'float', 'double', 'char', 'char8_t', 'char16_t', 'char32_t', 'wchar_t', 'bool', 'void',
  'short', 'long', 'signed', 'unsigned', 'auto', 'const', 'constexpr', 'static', 'extern', 'volatile', 'mutable', 'inline',
  'register', 'thread_local', 'constinit', 'consteval', 'explicit', 'virtual', 'typename']);
const NOT_BEFORE_DECL = new Set(['return', 'case', 'goto', 'throw', 'delete', 'new', 'else', 'do', 'sizeof', 'co_return',
  'co_yield', 'co_await', 'typeid', 'not', 'and', 'or', 'using', 'namespace', 'class', 'struct', 'union', 'enum', 'if',
  'while', 'for', 'switch', 'public', 'private', 'protected', 'operator', 'template', 'alignof', 'decltype', 'static_assert']);
const AFTER_DECL = new Set(['=', ';', ',', '[', '{', ')', ':', '(']);

/** Tokens with line/character positions (UTF-16, as LSP expects). */
function positioned(source) {
  const toks = tokenize(source);
  let offset = 0, line = 0, ch = 0;
  for (const t of toks) {
    t.offset = offset; t.line = line; t.char = ch;
    for (const c of t.text) {
      const units = c.length;
      if (c === '\n') { line++; ch = 0; } else ch += units;
      offset += units;
    }
    t.endLine = line; t.endChar = ch; t.end = offset;
  }
  return toks;
}

/**
 * Analyse one Lula document.
 * @returns {{ toks, sig, ctx, decls, includes, arduino, cppOf, lineText }}
 */
function analyse(source, langCode, opts = {}) {
  const toks = positioned(source);
  const ctx = contextFor(langCode, toks, opts);
  const sig = toks.filter(t => t.type !== 'space' && t.type !== 'newline' && t.type !== 'comment');
  sig.forEach((t, i) => { t.i = i; });
  const cppOf = t => (t && t.type === 'ident' ? (ctx.keywordMap.get(t.text) || ctx.libraryMap.get(t.text) || null) : null);
  // A word the user may declare: not a keyword, and not a library name with a namespace (std::time, cv::Mat).
  // Plain names such as main, setup, loop or push are fine: Lula renames them consistently.
  const declarable = t => t && t.type === 'ident' && !ctx.keywordMap.has(t.text) && !(ctx.libraryMap.get(t.text) || '').includes('::');
  const kw = t => { const c = t && t.type === 'ident' ? ctx.keywordMap.get(t.text) : null; return c || null; };
  const lines = source.split('\n');
  const lineText = n => (lines[n] || '').trim();

  // Brace and paren matching.
  const match = new Map();
  const stack = [];
  for (const t of sig) {
    if (t.text === '{' || t.text === '(' || t.text === '[') stack.push(t);
    else if (t.text === '}' || t.text === ')' || t.text === ']') {
      const open = stack.pop();
      if (open) { match.set(open.i, t.i); match.set(t.i, open.i); }
    }
  }
  const endOf = i => (match.has(i) ? sig[match.get(i)].offset : source.length);
  const nextSig = i => sig[i + 1];

  const decls = [];
  const includes = [];
  // Block structure: what each '{' opens (class body, function body, namespace, enum, plain block).
  const blockKind = new Map(); // index of '{' -> { kind, name }
  const add = (t, kind, extra = {}) => {
    const d = { name: t.text, kind, line: t.line, char: t.char, endChar: t.endChar, offset: t.offset, detail: lineText(t.line), ...extra };
    decls.push(d);
    return d;
  };

  // Which block encloses a token: walk a stack while scanning.
  const encl = new Array(sig.length);
  const bstack = [{ start: 0, end: source.length, kind: 'file', name: null, open: -1 }];
  for (const t of sig) {
    encl[t.i] = bstack[bstack.length - 1];
    if (t.text === '{') bstack.push({ start: t.offset, end: endOf(t.i), kind: 'block', name: null, open: t.i });
    else if (t.text === '}' && bstack.length > 1) bstack.pop();
  }
  // Finding the block that a '{' opens (filled below once we know what it is).
  const blockAt = new Map();
  for (const t of sig) if (t.text === '{') blockAt.set(t.i, sig.slice(t.i + 1).length ? encl[t.i + 1] : null);

  const canPrecede = (p) => {
    if (!p) return false;
    if (p.type === 'ident') {
      const c = cppOf(p);
      if (c && ctx.keywordMap.has(p.text)) return TYPE_LIKE.has(c);
      return !NOT_BEFORE_DECL.has(c || '');
    }
    if (p.text === '>' || p.text === '>>') return true;
    if (['*', '&', '&&'].includes(p.text)) { // `Type* name` - but not `a * b`
      let q = sig[p.i - 1];
      while (q && ['*', '&', '&&'].includes(q.text)) q = sig[q.i - 1];
      if (!q) return false;
      if (q.text === '>' || q.text === '>>') return true;
      if (q.type !== 'ident') return false;
      const qc = cppOf(q);
      if (qc && ctx.keywordMap.has(q.text)) return TYPE_LIKE.has(qc);
      if (qc) return true; // library type such as umbhalo, Isithombe
      return isUserTypeName(q.text);
    }
    return false;
  };
  const markBlock = (braceIdx, kind, name) => { const b = blockAt.get(braceIdx); if (b) { b.kind = kind; b.name = name; } };
  const container = (i) => { for (let b = encl[i]; b; b = null) return (b.kind === 'class' || b.kind === 'namespace') ? b.name : null; return null; };
  const inFunction = (i) => { const b = encl[i]; return b && (b.kind === 'function' || b.kind === 'block'); };

  for (let i = 0; i < sig.length; i++) {
    const t = sig[i];
    // #define NAME / #include <...>
    if (t.type === 'directive') {
      const c = ctx.directiveMap.get(t.text) || t.text;
      const n = nextSig(i);
      if (c === 'define' && n && n.type === 'ident' && n.line === t.line) add(n, 'macro', { scopeStart: n.offset, scopeEnd: source.length, global: true });
      if ((c === 'include' || c === 'import') && n && n.type === 'header') includes.push({ word: n.text.slice(1, -1).trim(), line: n.line, char: n.char, endChar: n.endChar });
      continue;
    }
    if (t.type !== 'ident') continue;
    const c = cppOf(t);
    const prev = sig[i - 1], next = nextSig(i);

    // class / struct / union / enum / namespace NAME
    if (c === 'class' || c === 'struct' || c === 'union' || c === 'enum' || c === 'namespace') {
      let j = i + 1;
      if (c === 'enum' && sig[j] && ['class', 'struct'].includes(cppOf(sig[j]))) j++;
      const nameTok = sig[j];
      if (!declarable(nameTok)) continue;
      // find the body '{' (skip bases / final / enum base type) before any ';'
      let k = j + 1;
      while (sig[k] && sig[k].text !== '{' && sig[k].text !== ';' && sig[k].text !== '(' && sig[k].text !== '=') k++;
      if (!sig[k] || sig[k].text !== '{') continue; // forward declaration or variable of that type
      if (prev && cppOf(prev) === 'template') { /* template<...> class: handled by the '<' skip below */ }
      const kind = c === 'namespace' ? 'namespace' : (c === 'enum' ? 'enum' : (c === 'union' ? 'struct' : c));
      add(nameTok, kind, { scopeStart: 0, scopeEnd: source.length, global: !inFunction(i), container: container(i), bodyStart: sig[k].offset, bodyEnd: endOf(k) });
      markBlock(k, kind === 'enum' ? 'enum' : (kind === 'namespace' ? 'namespace' : 'class'), nameTok.text);
      if (kind === 'enum') {
        // enumerators: NAME at the enum's depth, followed by ',' '=' or '}'
        let depth = 0;
        for (let e = k + 1; e < match.get(k); e++) {
          const et = sig[e];
          if (et.text === '(' || et.text === '{') depth++;
          else if (et.text === ')' || et.text === '}') depth--;
          else if (depth === 0 && declarable(et) && [',', '=', '}'].includes(sig[e + 1].text) && [',', '{'].includes(sig[e - 1].text)) {
            add(et, 'enumMember', { scopeStart: 0, scopeEnd: source.length, global: !inFunction(i), container: nameTok.text });
          }
        }
      }
      i = j;
      continue;
    }
    // typedef ... NAME;   using NAME = ...;
    if (c === 'typedef') {
      let k = i + 1;
      while (sig[k] && sig[k].text !== ';') k++;
      const nameTok = sig[k - 1];
      if (declarable(nameTok)) add(nameTok, 'typedef', { scopeStart: 0, scopeEnd: source.length, global: !inFunction(i) });
      continue;
    }
    if (c === 'using' && declarable(next) && sig[i + 2] && sig[i + 2].text === '=') {
      add(next, 'typedef', { scopeStart: 0, scopeEnd: source.length, global: !inFunction(i) });
      continue;
    }
    if (!declarable(t)) continue; // a Lula keyword or library name, not a user name

    // Out-of-class definition: Type Class::name(...)
    if (prev && prev.text === '::' && next && next.text === '(' && sig[i - 2] && sig[i - 2].type === 'ident' && canPrecede(sig[i - 3])) {
      const close = match.get(next.i);
      const body = close !== undefined ? afterSignature(close) : null;
      if (body !== null) {
        add(t, 'method', { container: sig[i - 2].text, scopeStart: 0, scopeEnd: source.length, global: true, isDefinition: true, params: params(next.i) });
        markBlock(body, 'function', t.text);
        bindParams(next.i, body);
      }
      continue;
    }
    if (!canPrecede(prev) || !next || !AFTER_DECL.has(next.text)) continue;
    if ((prev.text === '>' || prev.text === '>>') && !isTemplateClose(prev.i)) continue; // a > b, not vector<int> b
    if (prev.type === 'ident' && !cppOf(prev) && !isUserTypeName(prev.text) && !sig[prev.i - 1]?.text?.match(/^(::|<|,|\()$/) && encl[i].kind !== 'class' && !looksLikeType(prev)) continue;

    const blk = encl[i];
    if (next.text === '(') {
      const close = match.get(next.i);
      const body = close !== undefined ? afterSignature(close) : null;
      const atTop = blk.kind === 'file' || blk.kind === 'namespace' || blk.kind === 'class';
      if (atTop) {
        const kind = blk.kind === 'class' ? 'method' : 'function';
        add(t, kind, { container: blk.name, scopeStart: 0, scopeEnd: source.length, global: true, params: params(next.i), isDefinition: body !== null });
        if (body !== null) { markBlock(body, 'function', t.text); bindParams(next.i, body); }
        continue;
      }
      // inside a function: `Type name(args);` is a variable with constructor arguments
      add(t, 'variable', { scopeStart: t.offset, scopeEnd: blk.end, global: false });
      continue;
    }
    // parameter?
    const paren = enclosingParen(i);
    const stmtParen = paren !== null && ['for', 'catch', 'if', 'while', 'switch'].includes(cppOf(sig[paren - 1]) || '');
    if (paren !== null && !stmtParen && (next.text === ',' || next.text === ')' || next.text === '=' || next.text === '[')) {
      continue; // function/lambda parameters are bound to their body by bindParams
    }
    if (paren !== null && next.text === ':' && !stmtParen) { // range-for variable: jikeleza (auto& x : v)
      const forBody = afterParen(paren);
      add(t, 'variable', { scopeStart: t.offset, scopeEnd: forBody !== null ? endOf(forBody) : blk.end, global: false });
      continue;
    }
    // for (int i = 0; ...), catch (E& e), if (auto x = ...; ...): scoped to that statement
    if (paren !== null && ['for', 'catch', 'if', 'while', 'switch'].includes(cppOf(sig[paren - 1]) || '')) {
      const body = afterParen(paren);
      add(t, 'variable', { scopeStart: t.offset, scopeEnd: body !== null ? endOf(body) : blk.end, global: false });
      continue;
    }
    if (paren !== null && next.text === '=') continue;
    if (next.text === ':' && blk.kind !== 'class') continue; // labels / case
    const kind = blk.kind === 'class' ? 'field' : 'variable';
    const global = blk.kind === 'file' || blk.kind === 'namespace' || blk.kind === 'class';
    add(t, kind, { container: blk.kind === 'class' || blk.kind === 'namespace' ? blk.name : null, scopeStart: global ? 0 : t.offset, scopeEnd: global ? source.length : blk.end, global });
    // more declarators: int a = 1, b, c;
    if (blk.kind !== 'class' || true) {
      let k = next.i, depth = 0;
      while (sig[k] && !(depth === 0 && sig[k].text === ';')) {
        const s = sig[k].text;
        if (s === '(' || s === '{' || s === '[') depth++;
        else if (s === ')' || s === '}' || s === ']') { if (depth === 0) break; depth--; }
        else if (depth === 0 && s === ',' && declarable(sig[k + 1]) && sig[k + 2] && [',', ';', '=', '[', '{', '('].includes(sig[k + 2].text)) {
          const nt = sig[k + 1];
          add(nt, kind, { container: blk.kind === 'class' || blk.kind === 'namespace' ? blk.name : null, scopeStart: global ? 0 : nt.offset, scopeEnd: global ? source.length : blk.end, global });
        }
        k++;
      }
    }
  }

  function isTemplateClose(gtIdx) {
    let depth = 0;
    for (let k = gtIdx; k >= 0; k--) {
      const s = sig[k].text;
      if (s === '>') depth++;
      else if (s === '>>') depth += 2;
      else if (s === '<') { depth--; if (depth <= 0) return depth === 0 && sig[k - 1] && sig[k - 1].type === 'ident'; }
      else if (s === ';' || s === '{' || s === '}' || s === '(' || s === ')') return false;
    }
    return false;
  }
  function isUserTypeName(name) { return decls.some(d => d.name === name && ['class', 'struct', 'enum', 'typedef'].includes(d.kind)) || /^[A-Z]/.test(name); }
  function looksLikeType(p) { return false && p; }
  function afterSignature(closeIdx) {
    // ')' then optional const/override/final/noexcept/-> type, then '{' (body) or ':' (ctor init list) ... '{'
    let k = closeIdx + 1;
    while (sig[k] && sig[k].type === 'ident' && ['const', 'override', 'final', 'noexcept', 'mutable'].includes(cppOf(sig[k]) || sig[k].text)) k++;
    if (sig[k] && sig[k].text === '->') { while (sig[k] && sig[k].text !== '{' && sig[k].text !== ';') k++; }
    if (sig[k] && sig[k].text === ':') { // constructor initialiser list
      let depth = 0;
      for (k++; sig[k]; k++) {
        const s = sig[k].text;
        if (s === '(' ) depth++; else if (s === ')') depth--;
        else if (s === '{' && depth === 0 && sig[k - 1] && (sig[k - 1].text === ')' || sig[k - 1].text === '}' )) break;
        else if (s === '{' && depth === 0) { k = match.get(k) ?? k; }
        else if (s === ';') return null;
      }
    }
    return sig[k] && sig[k].text === '{' ? k : null;
  }
  function afterParen(openIdx) {
    const close = match.get(openIdx);
    if (close === undefined) return null;
    return sig[close + 1] && sig[close + 1].text === '{' ? close + 1 : null;
  }
  function enclosingParen(idx) {
    let depth = 0;
    for (let k = idx - 1; k >= 0; k--) {
      const s = sig[k].text;
      if (s === ')' || s === ']' || s === '}') depth++;
      else if (s === '(' || s === '[' || s === '{') { if (depth === 0) return s === '(' ? k : null; depth--; }
      else if (s === ';' && depth === 0) return null;
    }
    return null;
  }
  function params(openIdx) {
    const close = match.get(openIdx);
    if (close === undefined) return [];
    const out = [];
    let start = openIdx + 1, depth = 0;
    for (let k = openIdx + 1; k <= close; k++) {
      const s = sig[k].text;
      if (s === '(' || s === '<' || s === '[' || s === '{') depth++;
      else if ((s === ')' || s === '>' || s === ']' || s === '}') && k !== close) depth--;
      if ((s === ',' && depth === 0) || k === close) {
        if (k > start) out.push({ text: source.slice(sig[start].offset, sig[k - 1].end), start: sig[start].offset, end: sig[k - 1].end });
        start = k + 1;
      }
    }
    return out;
  }
  function bindParams(openIdx, bodyIdx) {
    const close = match.get(openIdx);
    const scopeEnd = endOf(bodyIdx);
    let depth = 0;
    for (let k = openIdx + 1; k < close; k++) {
      const s = sig[k].text;
      if (s === '(' || s === '<' || s === '[') depth++;
      else if (s === ')' || s === '>' || s === ']') depth--;
      const pt = sig[k];
      if (depth === 0 && declarable(pt) && canPrecede(sig[k - 1]) && sig[k - 1].text !== '(' &&
          [',', '=', '[', ')'].includes(sig[k + 1].text) && sig[k - 1].text !== ',') {
        add(pt, 'parameter', { scopeStart: pt.offset, scopeEnd, global: false });
      }
    }
  }
  // Lambdas: [captures](params) { body }
  for (let i = 0; i < sig.length; i++) {
    if (sig[i].text !== ']' || !sig[i + 1] || sig[i + 1].text !== '(') continue;
    const body = afterSignature(match.get(i + 1) ?? i + 1);
    if (body !== null) { bindParams(i + 1, body); markBlock(body, 'function', null); }
  }
  // Re-run block classification for blocks opened after markBlock (encl objects are shared, so kinds are live).
  decls.sort((a, b) => a.offset - b.offset);
  return { toks, sig, ctx, decls, includes, arduino: ctx.arduino, cppOf, declarable, lineText, source };
}

/** Index of the significant token at (line, character), or null. */
function tokenAt(a, line, character) {
  for (const t of a.sig) {
    if (t.line === line && t.char <= character && character <= t.endChar && t.endLine === line) {
      if (t.type === 'ident' || t.type === 'header' || t.type === 'directive') return t;
    }
  }
  return null;
}

/**
 * Which declaration does this identifier token refer to?
 * @param {object} a analysis  @param {object} t token  @param {object[]} externalDecls declarations from other files
 */
function resolve(a, t, externalDecls = []) {
  if (!t || !a.declarable(t)) return null;
  const prev = a.sig[t.i - 1];
  const named = a.decls.filter(d => d.name === t.text);
  if (a.cppOf(t) && !named.length && !externalDecls.some(d => d.name === t.text)) return null; // a library word nobody redefined
  const ownDecl = named.find(d => d.offset === t.offset);
  if (ownDecl) return ownDecl;
  if (prev && (prev.text === '.' || prev.text === '->')) {
    return named.find(d => d.kind === 'field' || d.kind === 'method') || externalDecls.find(d => d.name === t.text && (d.kind === 'field' || d.kind === 'method')) || null;
  }
  if (prev && prev.text === '::') {
    const q = a.sig[t.i - 2];
    const inContainer = d => q && d.container === q.text;
    return named.find(inContainer) || externalDecls.find(d => d.name === t.text && inContainer(d)) || named[0] || null;
  }
  // innermost local scope that contains the use and was declared before it
  const locals = named.filter(d => !d.global && d.scopeStart <= t.offset && t.offset <= d.scopeEnd);
  if (locals.length) return locals.sort((x, y) => (y.scopeStart - x.scopeStart))[0];
  // members visible inside their class or its out-of-class methods
  const memberHere = named.find(d => (d.kind === 'field' || d.kind === 'method') && insideClassOf(a, t.offset, d.container));
  if (memberHere) return memberHere;
  const globals = named.filter(d => d.global && d.kind !== 'field' && d.kind !== 'method');
  const isProto = d => d.kind === 'function' && d.isDefinition === false;
  if (globals.length && !globals.every(isProto)) return globals.find(d => !isProto(d));
  const extDef = externalDecls.find(d => d.name === t.text && d.global && d.kind === 'function' && d.isDefinition);
  if (globals.length) return extDef || globals[0];
  return named.find(d => d.kind === 'field' || d.kind === 'method') ||
    externalDecls.find(d => d.name === t.text && d.global && d.kind !== 'parameter') || null;
}

function insideClassOf(a, offset, className) {
  if (!className) return false;
  return a.decls.some(d => (d.kind === 'class' || d.kind === 'struct') && d.name === className && d.bodyStart <= offset && offset <= d.bodyEnd) ||
    a.decls.some(d => d.kind === 'method' && d.container === className && d.isDefinition && d.offset <= offset &&
      offset <= nextBodyEnd(a, d));
}
function nextBodyEnd(a, method) {
  // the method body is the first '{' after its name; its matching '}' ends it
  const startTok = a.sig.find(s => s.offset === method.offset);
  if (!startTok) return method.offset;
  let depth = 0, started = false;
  for (let k = startTok.i; k < a.sig.length; k++) {
    const s = a.sig[k].text;
    if (s === '{') { depth++; started = true; } else if (s === '}') { depth--; if (started && depth === 0) return a.sig[k].offset; }
    else if (s === ';' && !started && depth === 0) return method.offset;
  }
  return a.source.length;
}

/** All identifier tokens in this document that refer to `decl`. */
function references(a, decl, externalDecls = [], sameDecl = (x, y) => x === y) {
  const out = [];
  for (const t of a.sig) {
    if (t.type !== 'ident' || t.text !== decl.name) continue;
    const r = resolve(a, t, externalDecls);
    if (r && sameDecl(r, decl)) out.push(t);
  }
  return out;
}

module.exports = { analyse, positioned, tokenAt, resolve, references };
