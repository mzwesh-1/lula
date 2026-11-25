#!/usr/bin/env node
'use strict';
// Checks the proof run: identical machine code in every language, and the expected Serial output.
const fs = require('fs'), path = require('path');
const R = process.argv[2];
const rows = fs.readFileSync(path.join(R, 'hashes.txt'), 'utf8').trim().split('\n').map(l => l.split(' '));
const by = {};
for (const [lang, id, h] of rows) (by[id] = by[id] || {})[lang] = h;
let same = 0, diff = [];
for (const [id, m] of Object.entries(by)) {
  const ref = m.cpp, langs = Object.keys(m).filter(l => l !== 'cpp');
  for (const l of langs) (m[l] === ref ? same++ : diff.push(`${id}:${l}`));
}
console.log(`compiled: ${rows.length}   identical to C++: ${same}   different: ${diff.length} ${diff.join(' ')}`);
const out = id => { try { return fs.readFileSync(path.join(R, 'sim', `x_${id}.txt`), 'utf8').replace(/\.\.\r?$/gm, '').replace(/\r/g, ''); } catch { return null; } };
// The exact lines each example must print (in order, from the start)
const expect = {
  setup: ['1'], functions: ['42'], int: ['5'], unsigned: ['40000'], short: ['1200'], fixedint: ['-1000', '4000000000'],
  size_t: ['5'], float: ['47.00', '23.5000'], double: ['3.141593'], char: ['A', '66'], String: ['Soga 2026'],
  constexpr: ['8'], HEX: ['255', 'FF', '11111111'], nullptr: ['ok'], break: ['0', '1', '2', '3', '4'], continue: ['1', '3', '5'],
  return: ['9'], goto: ['2', '0'], sizeof: ['8', '4'], minmax: ['3', '7', '12'], pow: ['256.00', '12.00'],
  round: ['2.00', '3.00', '3.00'], isnan: ['0'], bitRead: ['10001000', '1'], highByte: ['3', '232'], write: ['A'],
  length: ['7'], toInt: ['43', '5.00'], indexOf: ['120'], trim: ['2'], case: ['SOGA', 'soga'], startsWith: ['1', '0'],
  replace: ['1 2 3'], loop: ['1', '2', '3'], static: ['1', '2', '3'], enum: ['1', '2', '0'], Serial: ['2026'],
};
let pass = 0, fail = [];
for (const [id, lines] of Object.entries(expect)) {
  const o = out(id);
  const got = o === null ? [] : o.split('\n').map(s => s.trimEnd()).filter(s => s !== '');
  const ok = lines.every((l, i) => got[i] === l);
  ok ? pass++ : fail.push(`${id}: expected ${JSON.stringify(lines)} got ${JSON.stringify(got.slice(0, lines.length + 1))}`);
}
if (diff.length || fail.length) process.exitCode = 1;
console.log(`expected Serial output: ${pass}/${Object.keys(expect).length} correct`);
fail.forEach(f => console.log('  WRONG ' + f));
// outputs.json for the textbook: the first lines each example printed
const outputs = {};
for (const f of fs.readdirSync(path.join(R, 'sim'))) {
  const id = f.replace(/^x_/, '').replace(/\.txt$/, '');
  const lines = out(id).split('\n').map(s => s.trimEnd()).filter(s => s !== '');
  if (lines.length) outputs[id] = lines.slice(0, 12).join('\n') + (lines.length > 12 ? '\n...' : '');
}
fs.writeFileSync(process.argv[3], JSON.stringify(outputs, null, 1));
console.log(`examples that print on Serial: ${Object.keys(outputs).length}`);
