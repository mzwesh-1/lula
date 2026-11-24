'use strict';
// South African Sign Language (SASL) sign-video dictionary for Soga.
//
// One sign per C++ concept ("if", "while", "push_back", "#include", ...). Because every
// SA language maps its words to the same C++ concept, one recorded sign works for all
// ten languages: hovering `uma`, `ukuba`, `haeba` or `as` shows the same SASL sign for "if".
//
// Signs must come from Deaf SASL signers. This module never invents signs: it only stores,
// validates and plays videos that people record and consent to publish.

const fs = require('fs');
const path = require('path');
const { loadLanguage, listLanguages } = require('./translator');

const DIR_CANDIDATES = [path.join(__dirname, 'sasl'), path.join(__dirname, '..', 'sasl')];
const VIDEO_TYPES = { '.mp4': 'video/mp4', '.webm': 'video/webm' };
const MAX_VIDEO_BYTES = 20 * 1024 * 1024;

/** Concepts to record first: what a beginner meets in the first lessons and the first robot. */
const PRIORITY = [
  'if', 'else', 'while', 'for', 'do', 'break', 'continue', 'return', 'switch', 'case', 'default',
  'int', 'double', 'char', 'bool', 'void', 'const', 'auto', 'true', 'false',
  'class', 'struct', 'public', 'private', 'new', 'delete', 'try', 'catch', 'throw', '#include',
  'main', 'cout', 'cin', 'endl', 'string', 'vector', 'size', 'push_back', 'sort',
  'setup', 'loop', 'pinMode', 'digitalWrite', 'digitalRead', 'analogRead', 'delay', 'HIGH', 'LOW', 'Serial',
];

function defaultDir() {
  for (const d of DIR_CANDIDATES) if (fs.existsSync(path.join(d, 'signs.json'))) return d;
  return DIR_CANDIDATES[DIR_CANDIDATES.length - 1];
}

function bare(cpp) { return cpp.replace(/^std::/, ''); }

/** Every concept that can have a sign: all keywords, directives and library names. */
function allConcepts() {
  const zu = loadLanguage('zu');
  const set = new Set();
  for (const cpp of zu.keywordMap.values()) set.add(cpp);
  for (const cpp of zu.directiveMap.values()) set.add('#' + cpp);
  for (const cpp of zu.libraryMap.values()) set.add(bare(cpp));
  return [...set];
}

/** Which concept does a word in a Soga file stand for? `uma` (zu) -> 'if', `#faka` -> '#include'. */
function conceptOf(word, langCode) {
  const w = word.replace(/^#\s*/, '');
  if (langCode && langCode !== 'cpp') {
    const lang = loadLanguage(langCode);
    if (word.startsWith('#') && lang.directiveMap.has(w)) return '#' + lang.directiveMap.get(w);
    if (lang.keywordMap.has(w)) return lang.keywordMap.get(w);
    if (lang.libraryMap.has(w)) return bare(lang.libraryMap.get(w));
    if (lang.directiveMap.has(w)) return '#' + lang.directiveMap.get(w);
  }
  const concepts = allConcepts();
  if (concepts.includes(word)) return word;
  if (concepts.includes('#' + w) && word.startsWith('#')) return '#' + w;
  return null;
}

/** The word for a concept in each language, e.g. 'if' -> { zu: 'uma', xh: 'ukuba', ... }. */
function wordsFor(concept) {
  const out = {};
  for (const { code } of listLanguages()) {
    const lang = loadLanguage(code);
    const isDir = concept.startsWith('#');
    const target = isDir ? concept.slice(1) : concept;
    const table = isDir ? lang.directiveMap : new Map([...lang.keywordMap, ...lang.libraryMap]);
    for (const [local, cpp] of table) if ((isDir ? cpp : bare(cpp)) === target) { out[code] = isDir ? '#' + local : local; break; }
  }
  return out;
}

function fileNameFor(concept, ext) {
  return concept.replace(/^#/, 'directive-').replace(/[^A-Za-z0-9_-]/g, '_') + ext;
}

function loadDictionary(dir = defaultDir()) {
  const file = path.join(dir, 'signs.json');
  if (!fs.existsSync(file)) return { version: 1, signs: {} };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveDictionary(dict, dir = defaultDir()) {
  const sorted = Object.fromEntries(Object.keys(dict.signs).sort().map(k => [k, dict.signs[k]]));
  fs.writeFileSync(path.join(dir, 'signs.json'), JSON.stringify({ ...dict, signs: sorted }, null, 2) + '\n');
}

function isUrl(s) { return /^https:\/\//i.test(s); }

/** Absolute path (local video) or https URL for an entry. */
function videoLocation(entry, dir = defaultDir()) {
  return isUrl(entry.video) ? entry.video : path.join(dir, 'videos', entry.video);
}

/** Look up the sign for a word as written in a Soga file. */
function lookup(word, langCode, dir = defaultDir()) {
  const concept = conceptOf(word, langCode);
  if (!concept) return null;
  const entry = loadDictionary(dir).signs[concept] || null;
  return { concept, entry, video: entry ? videoLocation(entry, dir) : null };
}

/**
 * Add a recorded sign. Refuses without the signer's consent to publish, a named signer and a licence.
 * @param {string} concept e.g. 'if', 'push_back', '#include'
 * @param {string} video path to .mp4/.webm, or an https URL where the video is hosted
 * @param {{signer: string, license: string, consent: boolean, gloss?: string, note?: string, region?: string, reviewedBy?: string}} meta
 */
function addSign(concept, video, meta, dir = defaultDir()) {
  if (!allConcepts().includes(concept)) throw new Error(`SASL: unknown concept '${concept}'. Use the C++ name, e.g. if, push_back, #include`);
  if (!meta || meta.consent !== true) throw new Error('SASL: the signer must consent to the video being published (pass --consent once they have agreed)');
  if (!meta.signer || !meta.signer.trim()) throw new Error('SASL: name the signer (--signer), so they are credited');
  if (!meta.license || !meta.license.trim()) throw new Error('SASL: give a licence for the video (--license, e.g. CC-BY-4.0)');
  let stored;
  if (isUrl(video)) {
    stored = video;
  } else {
    const ext = path.extname(video).toLowerCase();
    if (!VIDEO_TYPES[ext]) throw new Error('SASL: video must be .mp4 or .webm');
    if (!fs.existsSync(video)) throw new Error(`SASL: video not found: ${video}`);
    if (fs.statSync(video).size > MAX_VIDEO_BYTES) throw new Error('SASL: video is larger than 20 MB; trim or compress it');
    fs.mkdirSync(path.join(dir, 'videos'), { recursive: true });
    stored = fileNameFor(concept, ext);
    fs.copyFileSync(video, path.join(dir, 'videos', stored));
  }
  const dict = loadDictionary(dir);
  dict.signs[concept] = {
    video: stored,
    gloss: meta.gloss || concept.toUpperCase(),
    signer: meta.signer.trim(),
    license: meta.license.trim(),
    consent: true,
    ...(meta.region ? { region: meta.region } : {}),
    ...(meta.reviewedBy ? { reviewedBy: meta.reviewedBy } : {}),
    ...(meta.note ? { note: meta.note } : {}),
    added: new Date().toISOString().slice(0, 10),
  };
  saveDictionary(dict, dir);
  return dict.signs[concept];
}

function removeSign(concept, dir = defaultDir()) {
  const dict = loadDictionary(dir);
  const entry = dict.signs[concept];
  if (!entry) return false;
  if (!isUrl(entry.video)) fs.rmSync(path.join(dir, 'videos', entry.video), { force: true });
  delete dict.signs[concept];
  saveDictionary(dict, dir);
  return true;
}

/** Problems with the dictionary (empty list = valid). */
function validate(dir = defaultDir()) {
  const problems = [];
  const concepts = new Set(allConcepts());
  const dict = loadDictionary(dir);
  for (const [concept, e] of Object.entries(dict.signs)) {
    if (!concepts.has(concept)) problems.push(`${concept}: not a Soga concept`);
    if (e.consent !== true) problems.push(`${concept}: no recorded consent from the signer`);
    if (!e.signer) problems.push(`${concept}: signer not named`);
    if (!e.license) problems.push(`${concept}: no licence`);
    if (!e.video) { problems.push(`${concept}: no video`); continue; }
    if (!isUrl(e.video)) {
      if (!VIDEO_TYPES[path.extname(e.video).toLowerCase()]) problems.push(`${concept}: video must be .mp4 or .webm`);
      if (!fs.existsSync(path.join(dir, 'videos', e.video))) problems.push(`${concept}: video file missing (${e.video})`);
    }
  }
  return problems;
}

function status(dir = defaultDir()) {
  const dict = loadDictionary(dir);
  const recorded = new Set(Object.keys(dict.signs));
  const all = allConcepts();
  return {
    recorded: recorded.size,
    total: all.length,
    priorityRecorded: PRIORITY.filter(c => recorded.has(c)).length,
    priorityTotal: PRIORITY.length,
    neededPriority: PRIORITY.filter(c => !recorded.has(c)),
    needed: all.filter(c => !recorded.has(c)),
  };
}

/** Markdown recording list: what each concept means and its word in every language. */
function recordingList(dir = defaultDir()) {
  const st = status(dir);
  const langs = listLanguages();
  const lines = ['# SASL recording list', '',
    `Recorded: **${st.recorded} / ${st.total}** concepts (priority: ${st.priorityRecorded} / ${st.priorityTotal}).`, '',
    'Each row is one C++ concept. Record **one** sign per concept: it is shown for the word in every language.',
    'Generated by `soga sasl list`; do not edit by hand.', ''];
  const section = (title, list) => {
    lines.push(`## ${title}`, '', `| Concept | ${langs.map(l => l.code).join(' | ')} |`, `|---|${langs.map(() => '---').join('|')}|`);
    for (const c of list) { const w = wordsFor(c); lines.push(`| \`${c}\` | ${langs.map(l => w[l.code] || '').join(' | ')} |`); }
    lines.push('');
  };
  section('Priority: record these first', st.neededPriority);
  section('Everything else', st.needed.filter(c => !PRIORITY.includes(c)));
  return lines.join('\n');
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * HTML for the sign player (used by the VS Code webview, and testable in a browser).
 * @param {{concept: string, word?: string, langName?: string, entry: object|null, videoSrc?: string, cspSource?: string, nonce?: string, words?: object}} o
 */
function playerHtml(o) {
  const csp = o.cspSource
    ? `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; media-src ${o.cspSource} https:; style-src 'unsafe-inline'; script-src 'nonce-${o.nonce}';">`
    : '';
  const words = Object.entries(o.words || {}).map(([code, w]) => `<span class="chip"><b>${esc(code)}</b> ${esc(w)}</span>`).join(' ');
  const body = o.entry
    ? `<video id="sign" src="${esc(o.videoSrc)}" controls autoplay loop muted playsinline aria-label="SASL sign for ${esc(o.concept)}"></video>
       <div class="row">
         <button data-rate="1">Normal speed</button><button data-rate="0.75">Slower</button><button data-rate="0.5">Slowest</button>
       </div>
       <p class="gloss">Gloss: <b>${esc(o.entry.gloss)}</b></p>
       ${o.entry.note ? `<p>${esc(o.entry.note)}</p>` : ''}
       <p class="credit">Signed by ${esc(o.entry.signer)}${o.entry.region ? ` (${esc(o.entry.region)})` : ''} · ${esc(o.entry.license)}${o.entry.reviewedBy ? ` · reviewed by ${esc(o.entry.reviewedBy)}` : ''}</p>`
    : `<div class="missing"><p><b>No SASL sign has been recorded for this concept yet.</b></p>
       <p>Signs are recorded by Deaf SASL signers. See <code>sasl/README.md</code> in the Soga project to contribute one.</p></div>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">${csp}
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { font-family: var(--vscode-font-family, system-ui, sans-serif); color: var(--vscode-foreground, #1b1b1b); background: var(--vscode-editor-background, #fff); padding: 16px; max-width: 720px; }
  h1 { font-size: 1.4em; margin: 0 0 4px; } .sub { opacity: .8; margin: 0 0 12px; }
  video { width: 100%; max-height: 60vh; background: #000; border-radius: 8px; }
  .row { display: flex; gap: 8px; margin: 8px 0; flex-wrap: wrap; }
  button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
  .chip { display: inline-block; margin: 2px; padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(128,128,128,.5); }
  .credit { opacity: .8; font-size: .9em; } .missing { padding: 12px; border: 1px dashed rgba(128,128,128,.7); border-radius: 8px; }
</style></head><body>
<h1>🤟 SASL: ${esc(o.word || o.concept)}</h1>
<p class="sub">${o.langName ? `${esc(o.langName)} · ` : ''}C++ <code>${esc(o.concept)}</code></p>
${body}
${words ? `<p>Same concept in every language:</p><p>${words}</p>` : ''}
<script${o.nonce ? ` nonce="${esc(o.nonce)}"` : ''}>
  for (const b of document.querySelectorAll('button[data-rate]')) b.addEventListener('click', () => { const v = document.getElementById('sign'); if (v) v.playbackRate = Number(b.dataset.rate); });
</script>
</body></html>`;
}

module.exports = {
  PRIORITY, VIDEO_TYPES, defaultDir, allConcepts, conceptOf, wordsFor, loadDictionary, lookup, addSign, removeSign,
  validate, status, recordingList, playerHtml, videoLocation,
};
