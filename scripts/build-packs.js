'use strict';
// Builds packs/<id>.json from packs/src/<id>.txt.
//
// Source format (one concept per line, the word in all ten languages in this order):
//   id: opencv
//   name: OpenCV
//   always: false
//   [headers]
//   opencv2/opencv.hpp: umbono umbono kubona ukubona pono pono pono vonelo mbono rekenaarvisie
//   [names]
//   cv::Mat: Isithombe Umfanekiso Sitfombe Isithombe Setshwantsho Setshwantsho Seswantšho Xifaniso Tshifanyiso Beeld
//
// Checks: every language has a word; words are single identifiers; within a language no word is
// used for two different things across the core tables and all packs; no word equals an English name.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORDER = ['zu', 'xh', 'ss', 'nr', 'st', 'tn', 'nso', 'ts', 've', 'af'];
const SRC = path.join(ROOT, 'packs', 'src');
const OUT = path.join(ROOT, 'packs');
const IDENT = /^[\p{L}_][\p{L}\p{M}\p{N}_]*$/u;

function parse(file) {
  const pack = { id: '', name: '', always: false, headers: {}, names: {} };
  let section = null;
  const errors = [];
  fs.readFileSync(file, 'utf8').split('\n').forEach((raw, n) => {
    const line = raw.replace(/\s+#.*$/, '').trim();
    if (!line || line.startsWith('#')) return;
    const sec = /^\[(headers|names)\]$/.exec(line);
    if (sec) { section = sec[1]; return; }
    const i = line.indexOf(': ');
    if (i < 0) { errors.push(`${path.basename(file)}:${n + 1}: expected 'key: words'`); return; }
    const key = line.slice(0, i).trim(), rest = line.slice(i + 2).trim();
    if (!section) {
      if (key === 'always') pack.always = rest === 'true'; else pack[key] = rest;
      return;
    }
    const words = rest.split(/\s+/);
    if (words.length !== ORDER.length) { errors.push(`${path.basename(file)}:${n + 1}: '${key}' has ${words.length} words, needs ${ORDER.length} (${ORDER.join(' ')})`); return; }
    for (const w of words) if (!IDENT.test(w)) errors.push(`${path.basename(file)}:${n + 1}: '${w}' is not a single word (use _ instead of spaces)`);
    pack[section][key] = Object.fromEntries(ORDER.map((code, k) => [code, words[k]]));
  });
  return { pack, errors };
}

function build({ check = false } = {}) {
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.txt')).sort();
  const packs = [];
  const errors = [];
  for (const f of files) { const r = parse(path.join(SRC, f)); packs.push(r.pack); errors.push(...r.errors); }

  // Collisions within each language, across core tables and all packs.
  const english = new Set();
  for (const p of packs) for (const cpp of Object.keys(p.names)) { english.add(cpp); english.add(cpp.split('::').pop()); }
  for (const code of ORDER) {
    const lang = JSON.parse(fs.readFileSync(path.join(ROOT, 'languages', `${code}.json`), 'utf8'));
    const owner = new Map(); // local word -> cpp it means
    const claim = (word, cpp, where) => {
      const bare = c => c.split('::').pop();
      if (owner.has(word) && bare(owner.get(word)) !== bare(cpp)) errors.push(`${code}: '${word}' means both ${owner.get(word)} and ${cpp} (${where})`);
      owner.set(word, cpp);
    };
    for (const t of Object.values(lang.keywords)) for (const [w, cpp] of Object.entries(t)) claim(w, cpp, 'core keyword');
    for (const t of Object.values(lang.library)) for (const [w, cpp] of Object.entries(t)) claim(w, cpp, 'core library');
    const headerOwner = new Map(Object.entries(lang.headers));
    for (const p of packs) {
      for (const [cpp, words] of Object.entries(p.names)) {
        claim(words[code], cpp, `pack ${p.id}`);
        if (english.has(words[code]) && words[code] !== cpp.split('::').pop()) errors.push(`${code}: '${words[code]}' (${p.id}) is also an English name`);
      }
      for (const [cpp, words] of Object.entries(p.headers)) {
        const w = words[code];
        if (headerOwner.has(w) && headerOwner.get(w) !== cpp) errors.push(`${code}: header word '${w}' means both <${headerOwner.get(w)}> and <${cpp}>`);
        headerOwner.set(w, cpp);
      }
    }
  }
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; return false; }

  let stale = false;
  for (const p of packs) {
    const json = JSON.stringify(p, null, 2) + '\n';
    const out = path.join(OUT, `${p.id}.json`);
    if (check) { if (!fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== json) { console.error(`packs/${p.id}.json is out of date: run npm run packs`); stale = true; } }
    else fs.writeFileSync(out, json);
  }
  if (stale) { process.exitCode = 1; return false; }
  if (!check) console.log(packs.map(p => `${p.id}: ${Object.keys(p.names).length} names, ${Object.keys(p.headers).length} headers`).join('\n'));
  return true;
}

module.exports = { build, ORDER };
if (require.main === module) build({ check: process.argv.includes('--check') });
