'use strict';
// Khanya translator: turns C++ written with South African language keywords
// into standard C++. Only whole tokens are replaced; strings, comments, numbers
// and header names are left untouched, and line structure is preserved so
// compiler errors point at the original line.

const fs = require('fs');
const path = require('path');

const LANG_DIRS = [path.join(__dirname, 'languages'), path.join(__dirname, '..', 'languages')];
const cache = new Map();

function languagesDir() {
  for (const d of LANG_DIRS) if (fs.existsSync(d)) return d;
  throw new Error('Khanya: languages folder not found');
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
    throw new Error(`Khanya: unknown language '${code}'. Available: ${known}`);
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const keywords = new Map();   // local -> C++
  const categoryOf = new Map(); // local -> category
  for (const [category, table] of Object.entries(data.keywords || {})) {
    for (const [local, cpp] of Object.entries(table)) {
      if (keywords.has(local)) throw new Error(`Khanya[${code}]: keyword '${local}' defined twice`);
      keywords.set(local, cpp);
      categoryOf.set(local, category);
    }
  }
  const library = new Map();
  for (const [category, table] of Object.entries(data.library || {})) {
    for (const [local, cpp] of Object.entries(table)) {
      if (keywords.has(local)) throw new Error(`Khanya[${code}]: '${local}' is both a keyword and a library name`);
      if (library.has(local)) throw new Error(`Khanya[${code}]: library name '${local}' defined twice`);
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

/** `robot.zu.kh` -> 'zu' */
function detectLanguage(fileName) {
  const m = /\.([a-z]{2,3})\.kh$/i.exec(path.basename(fileName || ''));
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

/**
 * Translate Khanya source to C++.
 * @param {string} source
 * @param {string} langCode e.g. 'zu'
 * @param {{fileName?: string, lineDirective?: boolean}} opts
 * @returns {{cpp: string, used: Map<string,string>}}
 */
function translate(source, langCode, opts = {}) {
  const lang = loadLanguage(langCode);
  const out = [];
  const used = new Map();
  let prev = '';
  let afterInclude = false;
  if (opts.lineDirective !== false && opts.fileName) {
    out.push(`#line 1 ${JSON.stringify(opts.fileName.replace(/\\/g, '/'))}\n`);
  }
  for (const t of tokenize(source)) {
    let text = t.text;
    if (t.type === 'directive') {
      text = lang.directiveMap.get(t.text) || t.text;
      afterInclude = INCLUDE_LIKE.has(text);
    } else if (t.type === 'header' && afterInclude) {
      const cpp = lang.headerMap.get(t.text.slice(1, -1).trim());
      if (cpp) text = `<${cpp}>`;
    } else if (t.type === 'ident') {
      if (lang.keywordMap.has(t.text)) {
        text = lang.keywordMap.get(t.text);
      } else if (lang.libraryMap.has(t.text)) {
        text = lang.libraryMap.get(t.text);
        // After `x.`, `p->` or `std::` use the bare name: v.ubukhulu() -> v.size(), isisekelo::iqoqo -> std::vector
        if ((prev === '::' || prev === '.' || prev === '->') && text.startsWith('std::')) text = text.slice(5);
      }
    }
    if (text !== t.text) used.set(t.text, text);
    if (t.type === 'newline') afterInclude = false;
    if (!SKIP.has(t.type)) prev = t.text;
    out.push(text);
  }
  return { cpp: out.join(''), used };
}

function reverseMaps(lang) {
  const first = (entries) => { const m = new Map(); for (const [k, v] of entries) if (!m.has(v)) m.set(v, k); return m; };
  const qualified = new Map(), plain = new Map();
  for (const [local, cpp] of lang.libraryMap) {
    const target = cpp.startsWith('std::') ? qualified : plain;
    if (!target.has(cpp)) target.set(cpp, local);
  }
  const reserved = new Set([...lang.keywordMap.keys(), ...lang.libraryMap.keys()]);
  return { keywords: first(lang.keywordMap), directives: first(lang.directiveMap), headers: first(lang.headerMap), qualified, plain, reserved };
}

/**
 * Convert standard C++ into Khanya in the given language.
 * Strings, comments and your own names are kept; anything that would clash
 * with a reserved word in the target language gets a trailing underscore.
 */
function fromCpp(cpp, langCode) {
  const lang = loadLanguage(langCode);
  const R = reverseMaps(lang);
  const toks = tokenize(cpp);
  const out = [];
  const nextSig = (k) => { while (k < toks.length && SKIP.has(toks[k].type)) k++; return k; };
  const sig = toks.filter(t => !SKIP.has(t.type));
  // With `using namespace std`, bare names like vector/cout/sort are std names - unless the program
  // declares its own variable or function with that name (e.g. `int count = 0;`), which we keep.
  const usesStd = sig.some((t, k) => t.text === 'using' && sig[k + 1] && sig[k + 1].text === 'namespace' && sig[k + 2] && sig[k + 2].text === 'std');
  const declared = new Set();
  for (let k = 1; k + 1 < sig.length; k++) {
    const before = sig[k - 1], after = sig[k + 1];
    if (sig[k].type === 'ident' && (before.type === 'ident' || ['*', '&', '&&', '>'].includes(before.text))
        && ['=', ';', '(', ',', '[', '{', ')', ':'].includes(after.text)
        && !['return', 'case', 'goto', 'throw', 'delete', 'new', 'co_return', 'co_yield', 'co_await'].includes(before.text)) declared.add(sig[k].text);
  }
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
      const k1 = nextSig(k + 1), k2 = nextSig(k1 + 1);
      if (R.keywords.has(word)) {
        text = R.keywords.get(word);
      } else if (word === 'std' && prev !== '::' && toks[k1] && toks[k1].text === '::' && toks[k2] && toks[k2].type === 'ident'
                 && R.qualified.has('std::' + toks[k2].text)) {
        text = R.qualified.get('std::' + toks[k2].text); // std::vector -> iqoqo
        k = k2;
      } else if ((prev === '.' || prev === '->') && (R.plain.has(word) || R.qualified.has('std::' + word))) {
        text = R.plain.get(word) || R.qualified.get('std::' + word); // v.size() -> v.ubukhulu()
      } else if (usesStd && prev !== '::' && !declared.has(word) && R.qualified.has('std::' + word)) {
        text = R.qualified.get('std::' + word); // vector -> iqoqo (after using namespace std)
      } else if (R.plain.has(word)) {
        text = R.plain.get(word); // main, setup, size, ...
      } else if (R.reserved.has(word)) {
        text = word + '_'; // a C++ name that is a reserved word in the target language
      }
    }
    if (t.type === 'newline') afterInclude = false;
    if (!SKIP.has(t.type)) prev = t.text;
    out.push(text);
  }
  return out.join('');
}

/** Convert between languages: from/to are language codes or 'cpp'. */
function convert(source, from, to) {
  const cpp = from === 'cpp' ? source : translate(source, from).cpp;
  return to === 'cpp' ? cpp : fromCpp(cpp, to);
}

/** Rewrite C++ names inside compiler messages back into the user's language. */
function localizeMessage(text, langCode) {
  const lang = loadLanguage(langCode);
  const reverse = new Map();
  for (const [local, cpp] of lang.keywordMap) if (!reverse.has(cpp)) reverse.set(cpp, local);
  for (const [local, cpp] of lang.libraryMap) if (!reverse.has(cpp)) reverse.set(cpp, local);
  for (const [local, cpp] of lang.libraryMap) {
    const bare = cpp.replace(/^std::/, '');
    if (bare !== cpp && !reverse.has(bare)) reverse.set(bare, local);
  }
  const names = [...reverse.keys()].sort((a, b) => b.length - a.length)
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!names.length) return text;
  const re = new RegExp(`(?<![\\p{L}\\p{N}_:])(${names.join('|')})(?![\\p{L}\\p{N}_])`, 'gu');
  // Only touch code shown inside quotes, never the file path or the message prose.
  return text.replace(/([‘'])([^’'\n]*)([’'])/g, (_, a, body, b) => a + body.replace(re, w => reverse.get(w)) + b);
}

module.exports = { tokenize, translate, fromCpp, convert, loadLanguage, listLanguages, detectLanguage, localizeMessage };
