#!/usr/bin/env node
'use strict';
// Builds the data for the Soga textbooks:
//   node scripts/build-textbook.js                 Arduino textbook   -> docs/textbook/data.json
//   node scripts/build-textbook.js --book cpp      C++ in VS Code     -> docs/cpp-textbook/data.json
//   --sketches DIR   also writes every example: Arduino DIR/<lang>/x_<id>/x_<id>.ino, C++ DIR/<lang>/<id>.<lang>.soga
// Every example is written once in C++ and translated into all ten languages with Soga itself.
// The build stops if a translation does not turn back into the same C++.
const fs = require('fs');
const path = require('path');
const T = require('../src/translator');

const ROOT = path.join(__dirname, '..');
const arg = name => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null);
const BOOK = arg('--book') || 'arduino';
const BOOKS = {
  arduino: { dir: 'textbook', opts: { target: 'arduino', packs: ['arduino-libs', 'arduino-kit'], lineDirective: false }, fold: true },
  cpp: { dir: 'cpp-textbook', opts: { target: 'host', lineDirective: false }, fold: false },
};
const CFG = BOOKS[BOOK];
if (!CFG) { console.error(`unknown book '${BOOK}' (arduino, cpp)`); process.exit(1); }
const DIR = path.join(ROOT, 'docs', CFG.dir);
const entries = require(path.join(DIR, 'entries.js'));
// What each example printed: Arduino in the simavr simulator, C++ when compiled and run (the prove scripts)
const OUTPUTS = fs.existsSync(path.join(DIR, 'outputs.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'outputs.json'), 'utf8')) : {};
const META = fs.existsSync(path.join(DIR, 'meta.js')) ? require(path.join(DIR, 'meta.js')) : null;
const LANGS = [
  ['zu', 'isiZulu', 'isiZulu'], ['xh', 'isiXhosa', 'isiXhosa'], ['ss', 'siSwati', 'siSwati'], ['nr', 'isiNdebele', 'isiNdebele'],
  ['st', 'Sesotho', 'Sesotho'], ['tn', 'Setswana', 'Setswana'], ['nso', 'Sepedi', 'Sepedi'], ['ts', 'Xitsonga', 'Xitsonga'],
  ['ve', 'Tshivenḓa', 'Tshivenda'], ['af', 'Afrikaans', 'Afrikaans'],
];
const OPTS = CFG.opts;
const ascii = CFG.fold ? (w => w.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) : (w => w);
const sameCpp = (a, b) => a.replace(/\bstd::/g, '') === b.replace(/\bstd::/g, '');   // using namespace std: std::x == x

// The local word for a C++ name, in the same way fromCpp chooses it
function wordTable(code) {
  const ctx = T.contextFor(code, [], OPTS);
  const m = new Map();
  for (const [local, cpp] of ctx.keywordMap) if (!m.has(cpp)) m.set(cpp, local);
  const std = [...ctx.libraryMap].filter(([, cpp]) => cpp.startsWith('std::'));
  const other = [...ctx.libraryMap].filter(([, cpp]) => !cpp.startsWith('std::'));
  const addStd = () => { for (const [local, cpp] of std) { if (!m.has(cpp)) m.set(cpp, local); if (!m.has(cpp.slice(5))) m.set(cpp.slice(5), local); } };
  const addOther = () => { for (const [local, cpp] of other) if (!m.has(cpp)) m.set(cpp, local); };
  // Arduino book: `map` is Arduino's map() (linganisa_kabusha); C++ book: `map` is std::map (imephu)
  if (BOOK === 'arduino') { addOther(); addStd(); } else { addStd(); addOther(); }
  return m;
}
const tables = Object.fromEntries(LANGS.map(([c]) => [c, wordTable(c)]));

const problems = [];
const sketches = arg('--sketches');
const out = { book: BOOK, meta: META, langs: LANGS.map(([code, name, header]) => ({ code, name, header: `${header}.h` })), entries: [] };

for (const e of entries) {
  const includes = (e.include || []).map(h => `#include <${h}>`);
  const item = { id: e.id, cat: e.cat, title: e.title || e.words.join(', '), desc: e.desc, params: e.params || [], returns: e.returns || '',
    include: e.include || [], stdin: e.stdin || '', output: OUTPUTS[e.id] || '', words: { cpp: e.words }, syntax: { cpp: e.syntax || '' }, code: {} };
  item.code.cpp = [...includes, ...(includes.length ? [''] : []), e.example.trimEnd()].join('\n') + '\n';
  for (const [code, , header] of LANGS) {
    const local = T.fromCpp(e.example, code, OPTS);
    const back = T.translate(local, code, OPTS).cpp;
    if (!sameCpp(back, e.example)) problems.push(`${e.id} (${code}): does not translate back to the same C++`);
    const body = ascii(local).trimEnd();
    item.code[code] = BOOK === 'arduino' ? [...includes, `#include <${header}.h>`, '', body].join('\n') + '\n' : body + '\n';
    // A short snippet has no `using namespace std;`, so add it for the C++ book (cin -> funda) and take it off again
    const USING = 'using namespace std;\n';
    item.syntax[code] = !e.syntax ? '' : BOOK === 'cpp'
      ? T.fromCpp(USING + e.syntax, code, OPTS).split('\n').slice(1).join('\n')
      : ascii(T.fromCpp(e.syntax, code, OPTS));
    item.words[code] = e.words.map(w => {
      const local = tables[code].get(w);
      return local ? ascii(local) : w;
    });
    // The table must show the very word the example uses
    const idents = src => new Set(T.tokenize(src).filter(t => t.type === 'ident').map(t => t.text));
    const inCpp = idents(e.example), inLocal = idents(body);
    e.words.forEach((w, k) => {
      if (inCpp.has(w) && !inLocal.has(item.words[code][k])) problems.push(`${e.id} (${code}): table says ${item.words[code][k]} for ${w}, the example does not use it`);
    });
    if (sketches && BOOK === 'arduino') {
      const d = path.join(sketches, code, `x_${e.id}`);
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, `x_${e.id}.ino`), item.code[code]);
    } else if (sketches) {
      fs.mkdirSync(path.join(sketches, code), { recursive: true });
      fs.writeFileSync(path.join(sketches, code, `${e.id}.${code}.soga`), item.code[code]);
    }
  }
  if (sketches && BOOK === 'arduino') {
    const d = path.join(sketches, 'cpp', `x_${e.id}`);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, `x_${e.id}.ino`), item.code.cpp);
  } else if (sketches) {
    fs.mkdirSync(path.join(sketches, 'cpp'), { recursive: true });
    fs.writeFileSync(path.join(sketches, 'cpp', `${e.id}.cpp`), item.code.cpp);
    if (e.stdin) fs.writeFileSync(path.join(sketches, 'cpp', `${e.id}.stdin`), e.stdin);
  }
  out.entries.push(item);
}

// The full word list: every Arduino word Soga knows, in every language
const seen = new Set();
out.wordlist = [];
const ctxZu = T.contextFor('zu', [], OPTS);
// Arduino book: keywords + every non-std library word. C++ book: keywords + the core library outside the
// Arduino section (std names and members such as size, push_back), without the Arduino packs.
const zuLib = T.loadLanguage('zu').library;
const coreCpp = new Set(Object.entries(zuLib).filter(([cat]) => cat !== 'arduino')
  .flatMap(([, words]) => Object.values(words)).map(v => v.replace(/^std::/, '')));
const libNames = BOOK === 'arduino'
  ? [...ctxZu.libraryMap.values()].filter(v => !v.startsWith('std::'))
  : [...coreCpp];
const arduinoWords = [...new Set([...ctxZu.keywordMap.values(), ...libNames])]
  .filter(w => !(BOOK === 'arduino' ? ['main', 'std', 'defined', 'printf', 'scanf', 'data'] : ['defined', 'data']).includes(w));
const taught = new Map();
for (const e of out.entries) for (const w of e.words.cpp) if (!taught.has(w)) taught.set(w, e.id);
for (const w of arduinoWords) {
  if (seen.has(w)) continue;
  seen.add(w);
  const row = { cpp: w, entry: taught.get(w) || null };
  for (const [code] of LANGS) row[code] = ascii(tables[code].get(w) || w);
  out.wordlist.push(row);
}
out.wordlist.sort((a, b) => (a.entry ? 0 : 1) - (b.entry ? 0 : 1) || a.cpp.localeCompare(b.cpp));

// Translated explanations (docs/textbook/i18n/<code>.js): every lesson must be covered
out.i18n = {};
const I18N = path.join(DIR, 'i18n');
if (fs.existsSync(I18N)) for (const f of fs.readdirSync(I18N).filter(f => f.endsWith('.js'))) {
  const code = f.replace(/\.js$/, '');
  const L = require(path.join(I18N, f));
  for (const e of entries) {
    const x = L.entries[e.id];
    if (!x || !x.desc) problems.push(`i18n/${f}: no explanation for '${e.id}'`);
    else if ((e.params || []).length && (x.params || []).length !== e.params.length) problems.push(`i18n/${f}: '${e.id}' needs ${e.params.length} inputs`);
    else if (e.returns && !x.returns) problems.push(`i18n/${f}: '${e.id}' needs 'returns'`);
    if (!e.words.length && !x.title) problems.push(`i18n/${f}: '${e.id}' needs a title`);
  }
  for (const c of new Set(entries.map(e => e.cat))) if (!L.cats[c]) problems.push(`i18n/${f}: no name for chapter '${c}'`);
  out.i18n[code] = { ui: L.ui, cats: L.cats, entries: L.entries };
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'data.json'), JSON.stringify(out));

// Other books use the Arduino textbook's page (docs/textbook/index.html) with their own title and text
if (BOOK !== 'arduino' && META) {
  let page = fs.readFileSync(path.join(ROOT, 'docs', 'textbook', 'index.html'), 'utf8');
  page = page.replace(/<title>[^<]*<\/title>/, `<title>${META.title}</title>`);
  page = page.replace(/(data-t="(\w+)"[^>]*>)([^<]*)(<)/g, (m, open, key, text, close) => (META.ui[key] ? open + META.ui[key] + close : m));
  page = page.replace("const CARD = '#include <{header}>';", `const CARD = ${JSON.stringify(META.card)};`);
  if (!page.includes(META.title) || !page.includes(JSON.stringify(META.card))) problems.push('page: could not set the title or the language cards');
  fs.writeFileSync(path.join(DIR, 'index.html'), page);
  fs.copyFileSync(path.join(ROOT, 'docs', 'textbook', 'soga-logo.png'), path.join(DIR, 'soga-logo.png'));
  if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
}
console.log(`${BOOK} textbook: ${out.entries.length} entries x ${LANGS.length + 1} languages, ${out.wordlist.length} words -> docs/${CFG.dir}/data.json (${Math.round(fs.statSync(path.join(DIR, 'data.json')).size / 1024)} KB)`);
