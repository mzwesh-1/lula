#!/usr/bin/env node
'use strict';
// Checks the proof run: identical machine code in every language, and the expected Serial output.
const fs = require('fs'), path = require('path');
const R = process.argv[2];
const rows = fs.readFileSync(path.join(R, 'hashes.txt'), 'utf8').trim().split('\n').map(l => l.split(' '));
const by = {};
for (const [lang, id, h] of rows) (by[id] = by[id] || {})[lang] = h;
let same = 0, sameButTime = 0, diff = [];
const { execFileSync } = require('child_process');
const od = (() => { try { const base = path.join(require('os').homedir(), '.arduino15/packages/arduino/tools/avr-gcc');
  for (const v of fs.readdirSync(base)) { const f = path.join(base, v, 'bin', 'avr-objdump'); if (fs.existsSync(f)) return f; } } catch {} return 'avr-objdump'; })();
function onlyCompileTime(id, lang) {
  const dis = l => execFileSync(od, ['-d', path.join(R, 'out', l, id, `${id}.ino.elf`)], { encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n').slice(3);
  try {
    const a = dis('cpp'), b = dis(lang);
    if (a.length !== b.length) return false;
    const changed = a.map((x, i) => [x, b[i]]).filter(([x, y]) => x !== y);
    return changed.length > 0 && changed.every(([x, y]) => /\d\d:\d\d:\d\d\.\s*$/.test(x) && /\d\d:\d\d:\d\d\.\s*$/.test(y));
  } catch { return false; }
}
for (const [id, m] of Object.entries(by)) {
  const ref = m.cpp, langs = Object.keys(m).filter(l => l !== 'cpp');
  for (const l of langs) {
    if (m[l] === ref) { same++; continue; }
    // A sketch that uses __TIME__ (the RTC lesson) stores the moment it was compiled, so two builds
    // can only differ in that string. Check that the disassembly differs in nothing else.
    if (onlyCompileTime(id, l)) { sameButTime++; continue; }
    diff.push(`${id}:${l}`);
  }
}
console.log(`compiled: ${rows.length}   identical to C++: ${same}   identical except the compile time (__TIME__): ${sameButTime}   different: ${diff.length} ${diff.join(' ')}`);
const out = id => { try { return fs.readFileSync(path.join(R, 'sim', `x_${id}.txt`), 'utf8').replace(/\.\.\r?$/gm, '').replace(/\r/g, ''); } catch { return null; } };
// The exact lines each example must print (in order, from the start)
const expect = {
  setup: ['1'], functions: ['42'], int: ['5'], unsigned: ['40000'], short: ['1200'], fixedint: ['-1000', '4000000000'],
  size_t: ['5'], float: ['47.00', '23.5000'], double: ['3.141593'], char: ['A', '66'], String: ['Soga 2026'],
  constexpr: ['8'], HEX: ['255', 'FF', '11111111'], nullptr: ['ok'], break: ['0', '1', '2', '3', '4'], continue: ['1', '3', '5'],
  return: ['9'], goto: ['2', '0'], sizeof: ['8', '4'], minmax: ['3', '7', '12'], pow: ['256.00', '12.00'],
  round: ['2.00', '3.00', '3'], isnan: ['0'], bitRead: ['10001000', '1'], highByte: ['3', '232'], write: ['AB'],
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
  // Only examples whose output does not depend on sensors or wiring (in the simulator those read 0)
  if (lines.length && expect[id]) outputs[id] = lines.slice(0, 8).join('\n') + (lines.length > 8 ? '\n...' : '');
}
fs.writeFileSync(process.argv[3], JSON.stringify(outputs, null, 1));
console.log(`outputs shown in the textbook: ${Object.keys(outputs).length}`);
