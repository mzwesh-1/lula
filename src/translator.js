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
  const library = new Map(Object.entries(data.library || {}));
  for (const local of library.keys()) {
    if (keywords.has(local)) throw new Error(`Khanya[${code}]: '${local}' is both a keyword and a library name`);
    categoryOf.set(local, 'library');
  }
  const directives = new Map(Object.entries(data.directives || {}));
  const lang = { ...data, keywordMap: keywords, libraryMap: library, directiveMap: directives, categoryOf };
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
  const n = source.length;
  let i = 0;
  let lineStart = true;   // only whitespace since the last newline
  let prev = '';          // previous significant token
  let wantHeader = false; // just saw #include, next <...> is a header name

  if (opts.lineDirective !== false && opts.fileName) {
    out.push(`#line 1 ${JSON.stringify(opts.fileName.replace(/\\/g, '/'))}\n`);
  }

  while (i < n) {
    const c = source[i];

    if (c === '\n') { out.push(c); i++; lineStart = true; wantHeader = false; continue; }
    if (c === ' ' || c === '\t' || c === '\r' || c === '\f' || c === '\v') { out.push(c); i++; continue; }
    if (c === '\\' && (source[i + 1] === '\n' || (source[i + 1] === '\r' && source[i + 2] === '\n'))) {
      const len = source[i + 1] === '\n' ? 2 : 3;
      out.push(source.slice(i, i + len)); i += len; continue; // line continuation keeps the directive going
    }
    if (c === '/' && source[i + 1] === '/') {
      let j = i;
      while (j < n && source[j] !== '\n') j++;
      out.push(source.slice(i, j)); i = j; continue;
    }
    if (c === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      const j = end < 0 ? n : end + 2;
      out.push(source.slice(i, j)); i = j; continue;
    }

    // Preprocessor directive: translate the directive word (#faka -> #include)
    if (c === '#' && lineStart) {
      lineStart = false; prev = '#';
      out.push('#'); i++;
      while (source[i] === ' ' || source[i] === '\t') out.push(source[i++]);
      const m = at(IDENT, source, i);
      if (m) {
        const word = m[0];
        const cpp = lang.directiveMap.get(word) || word;
        if (cpp !== word) used.set(word, cpp);
        out.push(cpp); i += word.length;
        if (cpp === 'include' || cpp === 'include_next' || cpp === 'import') wantHeader = true;
      }
      continue;
    }
    lineStart = false;

    if (wantHeader && c === '<') {
      const end = source.indexOf('>', i);
      const j = end < 0 || source.slice(i, end).includes('\n') ? i + 1 : end + 1;
      out.push(source.slice(i, j)); i = j; wantHeader = false; prev = '<header>'; continue;
    }
    wantHeader = false;

    // Raw string literal R"delim( ... )delim"
    let m = at(RAW_STRING, source, i);
    if (m) {
      const close = `)${m[1]}"`;
      const end = source.indexOf(close, i + m[0].length);
      const j = end < 0 ? n : end + close.length;
      out.push(source.slice(i, j)); i = j; prev = '<literal>'; continue;
    }
    // Normal string / char literal (with optional prefix)
    m = at(QUOTED, source, i);
    if (m) {
      const quote = m[1];
      let j = i + m[0].length;
      while (j < n && source[j] !== quote && source[j] !== '\n') j += source[j] === '\\' ? 2 : 1;
      if (source[j] === quote) j++;
      out.push(source.slice(i, j)); i = j; prev = '<literal>'; continue;
    }
    // Numbers (including 1'000'000, 0xFF, 1.5e-3f)
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(source[i + 1] || ''))) {
      m = at(NUMBER, source, i);
      out.push(m[0]); i += m[0].length; prev = '<number>'; continue;
    }
    // Identifiers and keywords
    m = at(IDENT, source, i);
    if (m) {
      const word = m[0];
      let replacement = word;
      if (lang.keywordMap.has(word)) {
        replacement = lang.keywordMap.get(word);
      } else if (lang.libraryMap.has(word) && prev !== '::' && prev !== '.' && prev !== '->') {
        replacement = lang.libraryMap.get(word);
      }
      if (replacement !== word) used.set(word, replacement);
      out.push(replacement); i += word.length; prev = word; continue;
    }
    // Punctuation
    const p3 = source.slice(i, i + 3), p2 = source.slice(i, i + 2);
    const tok = PUNCT3.has(p3) ? p3 : PUNCT2.has(p2) ? p2 : c;
    out.push(tok); i += tok.length; prev = tok;
  }
  return { cpp: out.join(''), used };
}

/** Rewrite C++ names inside compiler messages back into the user's language. */
function localizeMessage(text, langCode) {
  const lang = loadLanguage(langCode);
  const reverse = new Map();
  for (const [local, cpp] of lang.keywordMap) if (!reverse.has(cpp)) reverse.set(cpp, local);
  for (const [local, cpp] of lang.libraryMap) if (!reverse.has(cpp)) reverse.set(cpp, local);
  const names = [...reverse.keys()].sort((a, b) => b.length - a.length)
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!names.length) return text;
  const re = new RegExp(`(?<![\\p{L}\\p{N}_:])(${names.join('|')})(?![\\p{L}\\p{N}_])`, 'gu');
  // Only touch code shown inside quotes, never the file path or the message prose.
  return text.replace(/([‘'])([^’'\n]*)([’'])/g, (_, a, body, b) => a + body.replace(re, w => reverse.get(w)) + b);
}

module.exports = { translate, loadLanguage, listLanguages, detectLanguage, localizeMessage };
