#!/usr/bin/env node
'use strict';
// Builds the Soga Arduino textbook data: docs/textbook/data.json
// Every example in docs/textbook/entries.js is written once in C++ and translated into all ten languages
// with Soga itself. The build stops if a translation does not turn back into exactly the same C++.
//   node scripts/build-textbook.js            -> docs/textbook/data.json
//   node scripts/build-textbook.js --sketches DIR   also writes every example as DIR/<lang>/<id>/<id>.ino
const fs = require('fs');
const path = require('path');
const T = require('../src/translator');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'docs', 'textbook');
const entries = require(path.join(DIR, 'entries.js'));
// What each example printed on Serial when it ran in the simulated Mega 2560 (scripts/prove-textbook.sh)
const OUTPUTS = fs.existsSync(path.join(DIR, 'outputs.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'outputs.json'), 'utf8')) : {};
const LANGS = [
  ['zu', 'isiZulu', 'isiZulu'], ['xh', 'isiXhosa', 'isiXhosa'], ['ss', 'siSwati', 'siSwati'], ['nr', 'isiNdebele', 'isiNdebele'],
  ['st', 'Sesotho', 'Sesotho'], ['tn', 'Setswana', 'Setswana'], ['nso', 'Sepedi', 'Sepedi'], ['ts', 'Xitsonga', 'Xitsonga'],
  ['ve', 'Tshivenḓa', 'Tshivenda'], ['af', 'Afrikaans', 'Afrikaans'],
];
const OPTS = { target: 'arduino', packs: ['arduino-libs', 'arduino-kit'], lineDirective: false };
const ascii = w => w.normalize('NFD').replace(/[̀-ͯ]/g, '');

// The local word for a C++ name, in the same way fromCpp chooses it
function wordTable(code) {
  const ctx = T.contextFor(code, [], OPTS);
  const m = new Map();
  for (const [local, cpp] of ctx.keywordMap) if (!m.has(cpp)) m.set(cpp, local);
  for (const [local, cpp] of ctx.libraryMap) {
    const bare = cpp.replace(/^std::/, '');
    if (!m.has(cpp)) m.set(cpp, local);
    if (!m.has(bare)) m.set(bare, local);
  }
  return m;
}
const tables = Object.fromEntries(LANGS.map(([c]) => [c, wordTable(c)]));

const problems = [];
const sketches = process.argv.includes('--sketches') ? process.argv[process.argv.indexOf('--sketches') + 1] : null;
const out = { langs: LANGS.map(([code, name, header]) => ({ code, name, header: `${header}.h` })), entries: [] };

for (const e of entries) {
  const includes = (e.include || []).map(h => `#include <${h}>`);
  const item = { id: e.id, cat: e.cat, title: e.title || e.words.join(', '), desc: e.desc, params: e.params || [], returns: e.returns || '',
    include: e.include || [], output: OUTPUTS[e.id] || '', words: { cpp: e.words }, syntax: { cpp: e.syntax || '' }, code: {} };
  item.code.cpp = [...includes, ...(includes.length ? [''] : []), e.example.trimEnd()].join('\n') + '\n';
  for (const [code, , header] of LANGS) {
    const local = T.fromCpp(e.example, code, OPTS);
    const back = T.translate(local, code, OPTS).cpp;
    if (back !== e.example) problems.push(`${e.id} (${code}): does not translate back to the same C++`);
    const body = ascii(local).trimEnd();
    item.code[code] = [...includes, `#include <${header}.h>`, '', body].join('\n') + '\n';
    item.syntax[code] = e.syntax ? ascii(T.fromCpp(e.syntax, code, OPTS)) : '';
    item.words[code] = e.words.map(w => {
      const local = tables[code].get(w);
      return local ? ascii(local) : w;
    });
    if (sketches) {
      const d = path.join(sketches, code, `x_${e.id}`);
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, `x_${e.id}.ino`), item.code[code]);
    }
  }
  if (sketches) {
    const d = path.join(sketches, 'cpp', `x_${e.id}`);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, `x_${e.id}.ino`), item.code.cpp);
  }
  out.entries.push(item);
}

// The full word list: every Arduino word Soga knows, in every language
const seen = new Set();
out.wordlist = [];
const ctxZu = T.contextFor('zu', [], OPTS);
const arduinoWords = [...new Set([...ctxZu.keywordMap.values(), ...[...ctxZu.libraryMap.values()].filter(v => !v.startsWith('std::'))])]
  .filter(w => !['main', 'std', 'defined', 'printf', 'scanf', 'data'].includes(w));
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

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'data.json'), JSON.stringify(out));
console.log(`textbook: ${out.entries.length} entries x ${LANGS.length + 1} languages, ${out.wordlist.length} words -> docs/textbook/data.json (${Math.round(fs.statSync(path.join(DIR, 'data.json')).size / 1024)} KB)`);
