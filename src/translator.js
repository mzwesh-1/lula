'use strict';
// Lula translator: turns C++ written with South African language keywords
// into standard C++. Only whole tokens are replaced; strings, comments, numbers
// and header names are left untouched, and line structure is preserved so
// compiler errors point at the original line.

const fs = require('fs');
const path = require('path');

const LANG_DIRS = [path.join(__dirname, 'languages'), path.join(__dirname, '..', 'languages')];
const cache = new Map();

function languagesDir() {
  for (const d of LANG_DIRS) if (fs.existsSync(d)) return d;
  throw new Error('Lula: languages folder not found');
}

function listLanguages() {
  const dir = languagesDir();
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      return { code: data.code, name: data.name, status: data.status || '' };
    });
}

function loadLanguage(code) {
  if (cache.has(code)) return cache.get(code);
  const file = path.join(languagesDir(), `${code}.json`);
  if (!fs.existsSync(file)) {
    const known = listLanguages().map(l => l.code).join(', ');
    throw new Error(`Lula: unknown language '${code}'. Available: ${known}`);
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const keywords = new Map();   // local -> C++
  const categoryOf = new Map(); // local -> category
  for (const [category, table] of Object.entries(data.keywords || {})) {
    for (const [local, cpp] of Object.entries(table)) {
      if (keywords.has(local)) throw new Error(`Lula[${code}]: keyword '${local}' defined twice`);
      keywords.set(local, cpp);
      categoryOf.set(local, category);
    }
  }
  const library = new Map();
  for (const [category, table] of Object.entries(data.library || {})) {
    for (const [local, cpp] of Object.entries(table)) {
      if (keywords.has(local)) throw new Error(`Lula[${code}]: '${local}' is both a keyword and a library name`);
      if (library.has(local)) throw new Error(`Lula[${code}]: library name '${local}' defined twice`);
      library.set(local, cpp);
      categoryOf.set(local, 'library.' + category);
    }
  }
  const directives = new Map(Object.entries(data.directives || {}));
  const headers = new Map(Object.entries(data.headers || {}));
  const lang = { ...data, keywordMap: keywords, libraryMap: library, directiveMap: directives, headerMap: headers, categoryOf };
  cache.set(code, lang);
  return lang;
}

/** `robot.zu.lula` -> 'zu' */
function detectLanguage(fileName) {
  const m = /\.([a-z]{2,3})\.lula$/i.exec(path.basename(fileName || ''));
  return m ? m[1].toLowerCase() : null;
}

const IDENT = /[\p{L}\p{M}_][\p{L}\p{M}\p{N}_]*/uy;
const NUMBER = /\.?\d(?:[eEpP][+-]|[\p{L}\p{N}_.']|)*/uy;
const RAW_STRING = /(?:u8|u|U|L)?R"([^()\\\s"]{0,16})\(/y;
const QUOTED = /(?:u8|u|U|L)?(["'])/y;
const PUNCT3 = new Set(['<=>', '->*', '<<=', '>>=', '...']);
const PUNCT2 = new Set(['::', '->', '++', '--', '<<', '>>', '<=', '>=', '==', '!=', '&&', '||',
  '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '.*', '##']);

function at(re, src, i) { re.lastIndex = i; return re.exec(src); }

/**
 * Split source into tokens without losing a single character:
 * joining every token's text gives back the original source exactly.
 * Token types: space, newline, comment, hash, directive, header, literal, number, ident, punct.
 */
function tokenize(source) {
  const toks = [];
  const n = source.length;
  let i = 0;
  let lineStart = true;   // only whitespace since the last newline
  let wantDirective = false, wantHeader = false;
  const push = (type, text) => { toks.push({ type, text }); i += text.length; };

  while (i < n) {
    const c = source[i];
    if (c === '\n') { push('newline', c); lineStart = true; wantHeader = false; continue; }
    if (c === ' ' || c === '\t' || c === '\r' || c === '\f' || c === '\v') { push('space', c); continue; }
    if (c === '\\' && (source[i + 1] === '\n' || (source[i + 1] === '\r' && source[i + 2] === '\n'))) {
      push('space', source[i + 1] === '\n' ? '\\\n' : '\\\r\n'); continue; // line continuation
    }
    if (c === '/' && source[i + 1] === '/') {
      let j = i; while (j < n && source[j] !== '\n') j++;
      push('comment', source.slice(i, j)); continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      push('comment', source.slice(i, end < 0 ? n : end + 2)); continue;
    }
    if (c === '#' && lineStart) { lineStart = false; wantDirective = true; push('hash', '#'); continue; }
    lineStart = false;

    if (wantHeader && c === '<') {
      const end = source.indexOf('>', i);
      wantHeader = false;
      if (end >= 0 && !source.slice(i, end).includes('\n')) { push('header', source.slice(i, end + 1)); continue; }
    }
    wantHeader = false;

    let m = at(RAW_STRING, source, i);
    if (m) {
      const close = `)${m[1]}"`;
      const end = source.indexOf(close, i + m[0].length);
      push('literal', source.slice(i, end < 0 ? n : end + close.length)); continue;
    }
    m = at(QUOTED, source, i);
    if (m) {
      const quote = m[1];
      let j = i + m[0].length;
      while (j < n && source[j] !== quote && source[j] !== '\n') j += source[j] === '\\' ? 2 : 1;
      if (source[j] === quote) j++;
      push('literal', source.slice(i, j)); continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(source[i + 1] || ''))) { push('number', at(NUMBER, source, i)[0]); continue; }
    m = at(IDENT, source, i);
    if (m) {
      if (wantDirective) {
        wantDirective = false;
        push('directive', m[0]);
        wantHeader = true; // `<...>` right after a directive word is a header name (#include <x>)
        continue;
      }
      push('ident', m[0]); continue;
    }
    wantDirective = false;
    const p3 = source.slice(i, i + 3), p2 = source.slice(i, i + 2);
    push('punct', PUNCT3.has(p3) ? p3 : PUNCT2.has(p2) ? p2 : c);
  }
  return toks;
}

const SKIP = new Set(['space', 'newline', 'comment']);
const INCLUDE_LIKE = new Set(['include', 'include_next', 'import']);

// ---------------------------------------------------------------------------
// Library packs (ROS 2, OpenCV, Eigen, CUDA, PyTorch, more Arduino): packs/<id>.json
// A pack's words switch on when the file includes one of its headers (in any language),
// when it is marked `always`, or when asked for with opts.packs.
// ---------------------------------------------------------------------------
const PACK_DIRS = [path.join(__dirname, 'packs'), path.join(__dirname, '..', 'packs')];
let packCache = null;
function loadPacks() {
  if (packCache) return packCache;
  const dir = PACK_DIRS.find(d => fs.existsSync(d));
  packCache = dir ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))) : [];
  return packCache;
}
const packLangCache = new Map();
/** Pack tables for one language: [{id, name, always, names: Map local->cpp, headers: Map local->cpp, cppHeaders: Set}] */
function packsFor(langCode) {
  if (packLangCache.has(langCode)) return packLangCache.get(langCode);
  const list = loadPacks().map(p => {
    const names = new Map(), headers = new Map();
    for (const [cpp, words] of Object.entries(p.names)) if (words[langCode]) names.set(words[langCode], cpp);
    for (const [cpp, words] of Object.entries(p.headers || {})) if (words[langCode]) headers.set(words[langCode], cpp);
    return { id: p.id, name: p.name, always: !!p.always, names, headers, cppHeaders: new Set(Object.keys(p.headers || {})) };
  });
  packLangCache.set(langCode, list);
  return list;
}

/** Arduino boards have no C++ standard library: in Arduino mode these become Arduino's own globals. */
const ARDUINO_BARE = new Set(['abs', 'min', 'max', 'sqrt', 'pow', 'sin', 'cos', 'tan', 'log', 'log10', 'exp', 'floor', 'ceil',
  'round', 'fmod', 'hypot', 'rand', 'srand', 'toupper', 'tolower', 'isdigit', 'isalpha', 'isspace', 'isupper', 'islower',
  'int8_t', 'int16_t', 'int32_t', 'int64_t', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t', 'size_t']);
const ARDUINO_REPLACE = { 'std::string': 'String', 'std::to_string': 'String' };

/** Bare name after `x.`, `p->` or `ns::`: cv::Mat -> Mat, std::vector -> vector. */
function bareName(cpp) { const i = cpp.lastIndexOf('::'); return i < 0 ? cpp : cpp.slice(i + 2); }

/**
 * Everything a file in this language can use, given its tokens: core tables + active packs.
 * @returns {{keywordMap, libraryMap, directiveMap, headerMap, active: string[], arduino: boolean}}
 */
function contextFor(langCode, toks, opts = {}) {
  const lang = loadLanguage(langCode);
  const packs = packsFor(langCode);
  const headerMap = new Map(lang.headerMap);
  for (const p of packs) for (const [local, cpp] of p.headers) if (!headerMap.has(local)) headerMap.set(local, cpp);
  const included = new Set(toks.filter(t => t.type === 'header').map(t => t.text.slice(1, -1).trim()));
  const wanted = new Set(opts.packs || []);
  const active = packs.filter(p => p.always || wanted.has(p.id) ||
    [...p.headers.keys()].some(h => included.has(h)) || [...p.cppHeaders].some(h => included.has(h)));
  const libraryMap = new Map(lang.libraryMap);
  for (const p of active) for (const [local, cpp] of p.names) if (!lang.keywordMap.has(local) && !libraryMap.has(local)) libraryMap.set(local, cpp);
  // Arduino mode: setup() + loop() and no main(), or asked for explicitly.
  const idents = new Set(toks.filter(t => t.type === 'ident').map(t => libraryMap.get(t.text) || t.text));
  const arduino = opts.target === 'arduino' || (opts.target !== 'host' && idents.has('setup') && idents.has('loop') && !idents.has('main'));
  if (arduino) {
    for (const [local, cpp] of libraryMap) {
      if (ARDUINO_REPLACE[cpp]) libraryMap.set(local, ARDUINO_REPLACE[cpp]);
      else if (cpp.startsWith('std::') && ARDUINO_BARE.has(cpp.slice(5))) libraryMap.set(local, cpp.slice(5));
    }
  }
  return { keywordMap: lang.keywordMap, libraryMap, directiveMap: lang.directiveMap, headerMap, active: active.map(p => p.id), arduino };
}

/**
 * Translate Lula source to C++.
 * @param {string} source
 * @param {string} langCode e.g. 'zu'
 * @param {{fileName?: string, lineDirective?: boolean, packs?: string[], target?: 'arduino'|'host'}} opts
 * @returns {{cpp: string, used: Map<string,string>, packs: string[], arduino: boolean}}
 */
function translate(source, langCode, opts = {}) {
  const toks = tokenize(source);
  const ctx = contextFor(langCode, toks, opts);
  const out = [];
  const used = new Map();
  let prev = '';
  let afterInclude = false;
  if (opts.lineDirective !== false && opts.fileName) {
    out.push(`#line 1 ${JSON.stringify(opts.fileName.replace(/\\/g, '/'))}\n`);
  }
  for (const t of toks) {
    let text = t.text;
    if (t.type === 'directive') {
      text = ctx.directiveMap.get(t.text) || t.text;
      afterInclude = INCLUDE_LIKE.has(text);
    } else if (t.type === 'header' && afterInclude) {
      const cpp = ctx.headerMap.get(t.text.slice(1, -1).trim());
      if (cpp) text = `<${cpp}>`;
    } else if (t.type === 'ident') {
      if (ctx.keywordMap.has(t.text)) {
        text = ctx.keywordMap.get(t.text);
      } else if (ctx.libraryMap.has(t.text)) {
        text = ctx.libraryMap.get(t.text);
        // After `x.`, `p->` or `ns::` use the bare name: v.ubukhulu() -> v.size(), isisekelo::iqoqo -> std::vector
        if (prev === '::' || prev === '.' || prev === '->') text = bareName(text);
      }
    }
    if (text !== t.text) used.set(t.text, text);
    if (t.type === 'newline') afterInclude = false;
    if (!SKIP.has(t.type)) prev = t.text;
    out.push(text);
  }
  return { cpp: out.join(''), used, packs: ctx.active, arduino: ctx.arduino };
}

function reverseMaps(ctx) {
  const first = (entries) => { const m = new Map(); for (const [k, v] of entries) if (!m.has(v)) m.set(v, k); return m; };
  const qualified = new Map(), plain = new Map();
  for (const [local, cpp] of ctx.libraryMap) {
    const target = cpp.includes('::') ? qualified : plain;
    if (!target.has(cpp)) target.set(cpp, local);
  }
  const reserved = new Set([...ctx.keywordMap.keys(), ...ctx.libraryMap.keys()]);
  return { keywords: first(ctx.keywordMap), directives: first(ctx.directiveMap), headers: first(ctx.headerMap), qualified, plain, reserved };
}

/**
 * Convert standard C++ into Lula in the given language.
 * Strings, comments and your own names are kept; anything that would clash
 * with a reserved word in the target language gets a trailing underscore.
 */
function fromCpp(cpp, langCode, opts = {}) {
  const toks = tokenize(cpp);
  const ctx = contextFor(langCode, toks, { ...opts, target: 'host' });
  const R = reverseMaps(ctx);
  const out = [];
  const nextSig = (k) => { while (k < toks.length && SKIP.has(toks[k].type)) k++; return k; };
  const sig = toks.filter(t => !SKIP.has(t.type));
  // `using namespace std;` (or cv, Eigen, ...): bare names in those namespaces are library names -
  // unless the program declares its own variable or function with that name (e.g. `int count = 0;`).
  const usedNamespaces = new Set();
  for (let k = 0; k + 2 < sig.length; k++) {
    if (sig[k].text === 'using' && sig[k + 1].text === 'namespace') {
      let ns = sig[k + 2].text, j = k + 3;
      while (sig[j] && sig[j].text === '::' && sig[j + 1]) { ns += '::' + sig[j + 1].text; j += 2; }
      usedNamespaces.add(ns);
    }
  }
  const declared = new Set();
  for (let k = 1; k + 1 < sig.length; k++) {
    const before = sig[k - 1], after = sig[k + 1];
    if (sig[k].type === 'ident' && (before.type === 'ident' || ['*', '&', '&&', '>'].includes(before.text))
        && ['=', ';', '(', ',', '[', '{', ')', ':'].includes(after.text)
        && !['return', 'case', 'goto', 'throw', 'delete', 'new', 'co_return', 'co_yield', 'co_await'].includes(before.text)) declared.add(sig[k].text);
  }
  const viaUsing = (word) => { for (const ns of usedNamespaces) if (R.qualified.has(`${ns}::${word}`)) return R.qualified.get(`${ns}::${word}`); return null; };
  const memberWord = (word) => {
    if (R.plain.has(word)) return R.plain.get(word);
    for (const [cppName, local] of R.qualified) if (bareName(cppName) === word) return local;
    return null;
  };
  let prev = '';
  let afterInclude = false;
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    let text = t.text;
    if (t.type === 'directive') {
      afterInclude = INCLUDE_LIKE.has(t.text);
      text = R.directives.get(t.text) || t.text;
    } else if (t.type === 'header' && afterInclude) {
      const local = R.headers.get(t.text.slice(1, -1).trim());
      if (local) text = `<${local}>`;
    } else if (t.type === 'ident') {
      const word = t.text;
      // Longest qualified name first: std_msgs::msg::String, cv::Mat, std::vector
      let chainEnd = k, chain = word, best = null;
      if (prev !== '::' && prev !== '.' && prev !== '->') {
        let j = k;
        for (let depth = 0; depth < 4; depth++) {
          const c = nextSig(j + 1), n = nextSig(c + 1);
          if (!toks[c] || toks[c].text !== '::' || !toks[n] || toks[n].type !== 'ident') break;
          chain += '::' + toks[n].text; j = n;
          if (R.qualified.has(chain)) { best = R.qualified.get(chain); chainEnd = n; }
        }
      }
      if (R.keywords.has(word)) {
        text = R.keywords.get(word);
      } else if (best) {
        text = best; k = chainEnd;
      } else if ((prev === '.' || prev === '->' || prev === '::') && memberWord(word)) {
        text = memberWord(word); // v.size() -> v.ubukhulu(), Node::SharedPtr
      } else if (prev !== '::' && !declared.has(word) && viaUsing(word)) {
        text = viaUsing(word); // vector -> iqoqo (after using namespace std)
      } else if (R.plain.has(word)) {
        text = R.plain.get(word); // main, setup, size, ...
      } else if (R.reserved.has(word)) {
        text = word + '_'; // a C++ name that is a reserved word in the target language
      }
    }
    if (t.type === 'newline') afterInclude = false;
    if (!SKIP.has(t.type)) prev = toks[k].text;
    out.push(text);
  }
  return out.join('');
}

/** Convert between languages: from/to are language codes or 'cpp'. */
function convert(source, from, to, opts = {}) {
  const cpp = from === 'cpp' ? source : translate(source, from, { ...opts, target: 'host' }).cpp;
  return to === 'cpp' ? cpp : fromCpp(cpp, to, opts);
}

/** What does a word mean? Looks in the core tables and every pack. */
function describeWord(word, langCode) {
  const lang = loadLanguage(langCode);
  if (lang.keywordMap.has(word)) return { cpp: lang.keywordMap.get(word), source: 'keyword' };
  if (lang.libraryMap.has(word)) return { cpp: lang.libraryMap.get(word), source: 'library' };
  if (lang.directiveMap.has(word)) return { cpp: '#' + lang.directiveMap.get(word), source: 'directive' };
  if (lang.headerMap.has(word)) return { cpp: `<${lang.headerMap.get(word)}>`, source: 'header' };
  for (const p of packsFor(langCode)) {
    if (p.names.has(word)) return { cpp: p.names.get(word), source: p.name };
    if (p.headers.has(word)) return { cpp: `<${p.headers.get(word)}>`, source: p.name };
  }
  return null;
}

/** Make libstdc++'s long type names readable: std::__cxx11::basic_string<char> -> std::string */
function simplifyTypes(text) {
  return text
    .replace(/std::__cxx11::/g, 'std::')
    .replace(/std::basic_string<char(?:, std::char_traits<char>, std::allocator<char> ?)?>/g, 'std::string')
    .replace(/, std::allocator<([^<>]*(?:<[^<>]*>)?)> ?>/g, '>');
}

const reverseCache = new Map();
/** Rewrite C++ names inside compiler messages back into the user's language. */
function localizeMessage(text, langCode) {
  if (!reverseCache.has(langCode)) {
    const lang = loadLanguage(langCode);
    const reverse = new Map();
    const add = (cpp, local) => { if (!reverse.has(cpp)) reverse.set(cpp, local); };
    for (const [local, cpp] of lang.keywordMap) add(cpp, local);
    for (const [local, cpp] of lang.libraryMap) add(cpp, local);
    for (const p of packsFor(langCode)) for (const [local, cpp] of p.names) add(cpp, local);
    for (const [local, cpp] of [...lang.libraryMap, ...packsFor(langCode).flatMap(p => [...p.names])]) add(bareName(cpp), local);
    for (const [local, cpp] of lang.headerMap) add(`<${cpp}>`, `<${local}>`);
    for (const p of packsFor(langCode)) for (const [local, cpp] of p.headers) add(`<${cpp}>`, `<${local}>`);
    const names = [...reverse.keys()].sort((a, b) => b.length - a.length).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = names.length ? new RegExp(`(?<![\\p{L}\\p{N}_:])(${names.join('|')})(?![\\p{L}\\p{N}_])`, 'gu') : null;
    reverseCache.set(langCode, { reverse, re });
  }
  const { reverse, re } = reverseCache.get(langCode);
  if (!re) return text;
  // Only touch code shown inside quotes, never the file path or the message prose.
  return simplifyTypes(text).replace(/([‘'`])([^’'\n]*)([’'])/g, (_, a, body, b) => a + body.replace(re, w => reverse.get(w)) + b);
}

module.exports = {
  tokenize, translate, fromCpp, convert, loadLanguage, listLanguages, detectLanguage, localizeMessage,
  loadPacks, packsFor, describeWord, bareName, contextFor,
};
