'use strict';
// Full-sentence messages in every language: compiler errors/warnings (GCC), runtime crashes,
// and Soga's own messages. The catalog is messages/catalog.txt (see the header of that file).
const fs = require('fs');
const path = require('path');
const { loadLanguage, localizeMessage } = require('./translator');

const CATALOG_PATHS = [path.join(__dirname, 'messages', 'catalog.txt'), path.join(__dirname, '..', 'messages', 'catalog.txt')];
let catalog = null;

function loadCatalog() {
  if (catalog) return catalog;
  const file = CATALOG_PATHS.find(f => fs.existsSync(f));
  const entries = [];
  let cur = null;
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (line.startsWith('@')) { cur = { id: line.slice(1).trim(), patterns: [], text: {} }; entries.push(cur); continue; }
    const i = line.indexOf(': ');
    if (!cur || i < 0) continue;
    const key = line.slice(0, i).trim(), value = line.slice(i + 2);
    if (key === 're') cur.patterns.push(new RegExp(value));
    else cur.text[key] = value;
  }
  catalog = { entries, byId: new Map(entries.map(e => [e.id, e])) };
  return catalog;
}

/** Local word for a C++ keyword or directive ('#include'), for {kw:...} in templates. */
function keywordWord(cpp, langCode) {
  if (!langCode || langCode === 'en') return cpp.replace(/^#/, '');
  const lang = loadLanguage(langCode);
  const table = cpp.startsWith('#') ? lang.directiveMap : lang.keywordMap;
  const target = cpp.replace(/^#/, '');
  for (const [local, c] of table) if (c === target) return local;
  return target;
}

/** A message in the user's language. `t('cli.built', 'zu', 'robot')` */
function t(id, langCode, ...args) {
  const e = loadCatalog().byId.get(id);
  if (!e) return id;
  const tmpl = e.text[langCode] || e.text.en;
  return tmpl
    .replace(/\{kw:([#\w]+)\}/g, (_, kw) => keywordWord(kw, langCode))
    .replace(/\{(\d)\}/g, (_, n) => args[Number(n) - 1] ?? '')
    .replace(/\s+$/, '');
}

/** Translate one compiler message text (the part after "error: "). Returns null if unknown. */
function translateMessageText(msg, langCode) {
  let flag = '';
  const f = / (\[-W[^\]]+\]|\[-fpermissive\]|\[-Werror[^\]]*\])$/.exec(msg);
  if (f) { flag = ' ' + f[1]; msg = msg.slice(0, f.index); }
  msg = msg.replace(/('[^']*') token\b/g, '$1').replace(/\b(numeric|string|character) constant\b/g, (_, k) => ({ numeric: '0', string: '""', character: "''" })[k]);
  let suffix = '';
  const dym = /; did you mean (.+)\?$/.exec(msg);
  if (dym) { suffix = '; ' + t('suffix.did_you_mean', langCode, localizeMessage(dym[1], langCode)); msg = msg.slice(0, dym.index); }
  for (const e of loadCatalog().entries) {
    if (!e.id.startsWith('e.') && !e.id.startsWith('ctx.') && !e.id.startsWith('r.')) continue;
    for (const re of e.patterns) {
      const m = re.exec(msg);
      if (m) {
        const or = keywordWord('or', langCode);
        const args = m.slice(1).map(c => (c === undefined ? '' : localizeTerms(localizeMessage(c, langCode).replace(/' or '/g, `' ${or} '`), langCode)));
        return t(e.id, langCode, ...args) + suffix + flag;
      }
    }
  }
  return null;
}

/** GCC grammar words outside quotes ("identifier", "declaration", ...) -> the user's language. */
function localizeTerms(text, langCode) {
  const terms = loadCatalog().entries.filter(e => e.id.startsWith('term.'));
  return text.split(/('[^']*')/).map((part, i) => (i % 2 ? part : terms.reduce((acc, e) => {
    const word = e.id.slice(5).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return acc.replace(new RegExp(`\\b${word}\\b`, 'g'), t(e.id, langCode));
  }, part))).join('');
}

const SEVERITIES = { error: 'sev.error', warning: 'sev.warning', note: 'sev.note', 'fatal error': 'sev.fatal' };

/**
 * Rewrite GCC/ld output into the user's language. Source-code echo lines (`  12 | code`) and
 * caret lines are kept: thanks to #line they already show the user's own Soga code.
 */
function localizeDiagnostics(text, langCode) {
  if (!text) return text;
  return text.split('\n').map(line => {
    // file:line:col: error: message
    let m = /^(.*?:\d+(?::\d+)?): (error|warning|note|fatal error): (.*)$/.exec(line);
    if (m) {
      const msg = translateMessageText(m[3], langCode) ?? localizeMessage(m[3], langCode);
      return `${m[1]}: ${t(SEVERITIES[m[2]], langCode)}: ${msg}`;
    }
    // linker: file.o:(.text+0x1): undefined reference to `x'   /   collect2: error: ld returned 1 exit status
    m = /^(.*?): (?:(error|warning): )?(undefined reference to .*|ld returned \d+ exit status)$/.exec(line);
    if (m) {
      const msg = translateMessageText(m[3], langCode) ?? m[3];
      return `${m[1]}: ${m[2] ? t(SEVERITIES[m[2]], langCode) + ': ' : ''}${msg}`;
    }
    // file: In function 'x':   /   file:12:3:   required from here   /   In file included from x:1:
    m = /^(.*?): (In (?:member )?function .+:|In constructor .+:|At global scope:|In instantiation of .+:)$/.exec(line);
    if (m) return `${m[1]}: ${translateMessageText(m[2], langCode) ?? m[2]}`;
    m = /^(.*?:\d+(?::\d+)?):\s+(required from here)$/.exec(line);
    if (m) return `${m[1]}:   ${t('ctx.required', langCode)}`;
    m = /^(In file included from|\s+from) (.+)$/.exec(line);
    if (m && m[1].startsWith('In')) return t('ctx.included', langCode, m[2]);
    return line;
  }).join('\n');
}

/** arduino-cli output: compiler messages plus the program-size lines, in the user's language. */
function localizeArduinoOutput(text, langCode) {
  const sized = ['cli.sketch_size', 'cli.globals'].map(id => loadCatalog().byId.get(id));
  return localizeDiagnostics(text, langCode).split('\n').map(line => {
    for (const e of sized) for (const re of e.patterns) { const m = re.exec(line); if (m) return t(e.id, langCode, ...m.slice(1)); }
    return line;
  }).join('\n');
}

/** Runtime output from the C++ library (uncaught exceptions). Other lines are the program's own and are kept. */
function localizeRuntime(text, langCode) {
  return text.split('\n').map(line => {
    for (const id of ['r.terminate', 'r.what']) {
      for (const re of loadCatalog().byId.get(id).patterns) {
        const m = re.exec(line);
        if (m) return t(id, langCode, localizeMessage(m[1], langCode));
      }
    }
    return line;
  }).join('\n');
}

/** Message for a program killed by a signal. */
function signalMessage(signal, langCode) {
  const id = { SIGSEGV: 'r.segv', SIGBUS: 'r.segv', SIGFPE: 'r.fpe', SIGABRT: 'r.abort' }[signal];
  return id ? t(id, langCode) : null;
}

module.exports = { loadCatalog, t, translateMessageText, localizeDiagnostics, localizeArduinoOutput, localizeRuntime, signalMessage, keywordWord };
