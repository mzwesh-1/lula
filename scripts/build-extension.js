'use strict';
// Copies the translator + language files into the VS Code extension and
// generates the syntax-highlighting grammar from all language tables.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXT = path.join(ROOT, 'vscode-khanya');
const LIB = path.join(EXT, 'lib');

fs.rmSync(LIB, { recursive: true, force: true });
fs.mkdirSync(path.join(LIB, 'languages'), { recursive: true });
for (const f of ['translator.js', 'cli.js', 'sasl.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(LIB, f));
fs.cpSync(path.join(ROOT, 'sasl'), path.join(LIB, 'sasl'), { recursive: true, filter: src => !src.endsWith('.gitkeep') });
const langs = fs.readdirSync(path.join(ROOT, 'languages')).filter(f => f.endsWith('.json'));
for (const f of langs) fs.copyFileSync(path.join(ROOT, 'languages', f), path.join(LIB, 'languages', f));

const SCOPES = {
  control: 'keyword.control.khanya',
  types: 'storage.type.khanya',
  modifiers: 'storage.modifier.khanya',
  oop: 'keyword.other.khanya',
  casts: 'keyword.operator.cast.khanya',
  constants: 'constant.language.khanya',
  operators: 'keyword.operator.word.khanya',
  library: 'support.function.khanya',
  arduino: 'support.constant.arduino.khanya',
};
const words = Object.fromEntries(Object.keys(SCOPES).map(k => [k, new Set()]));
const directives = new Set('include define undef ifdef ifndef if else elif elifdef elifndef endif error warning pragma line'.split(' '));
const includeWords = new Set(['include', 'import']);
for (const f of langs) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'languages', f), 'utf8'));
  for (const [cat, table] of Object.entries(data.keywords)) {
    const bucket = words[cat] || words.oop;
    for (const [local, cpp] of Object.entries(table)) { bucket.add(local); bucket.add(cpp); }
  }
  for (const [cat, table] of Object.entries(data.library || {})) {
    for (const local of Object.keys(table)) (cat === 'arduino' && /^[A-Z_]+$/.test(local) ? words.arduino : words.library).add(local);
  }
  for (const [local, cpp] of Object.entries(data.directives || {})) {
    directives.add(local);
    if (cpp === 'include') includeWords.add(local);
  }
}
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alt = set => [...set].sort((a, b) => b.length - a.length).map(esc).join('|');
const B = '(?<![\\p{L}\\p{N}_])', E = '(?![\\p{L}\\p{N}_])';

const grammar = {
  $schema: 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
  name: 'Khanya',
  scopeName: 'source.khanya',
  patterns: [
    { include: '#comments' },
    { include: '#preprocessor' },
    { include: '#strings' },
    ...Object.keys(SCOPES).map(cat => ({ name: SCOPES[cat], match: `${B}(?:${alt(words[cat])})${E}` })),
    { name: 'constant.numeric.khanya', match: "\\b(?:0[xX][0-9a-fA-F']+|0[bB][01']+|\\d[\\d']*\\.?[\\d']*(?:[eE][+-]?\\d+)?)[uUlLfF]*\\b" },
    { name: 'entity.name.function.khanya', match: `[\\p{L}_][\\p{L}\\p{N}_]*(?=\\s*\\()` },
  ],
  repository: {
    comments: { patterns: [
      { name: 'comment.line.double-slash.khanya', match: '//.*$' },
      { name: 'comment.block.khanya', begin: '/\\*', end: '\\*/' },
    ] },
    preprocessor: { patterns: [
      { match: `^\\s*(#\\s*(?:${alt(includeWords)}))\\s*(<[^>]*>|"[^"]*")`,
        captures: { 1: { name: 'keyword.control.directive.khanya' }, 2: { name: 'string.quoted.other.lt-gt.include.khanya' } } },
      { name: 'keyword.control.directive.khanya', match: `^\\s*#\\s*(?:${alt(directives)})${E}` },
    ] },
    strings: { patterns: [
      { name: 'string.quoted.raw.khanya', begin: '(?:u8|u|U|L)?R"([^()\\\\\\s"]{0,16})\\(', end: '\\)\\1"' },
      { name: 'string.quoted.double.khanya', begin: '(?:u8|u|U|L)?"', end: '"', patterns: [{ name: 'constant.character.escape.khanya', match: '\\\\.' }] },
      { name: 'string.quoted.single.khanya', begin: "(?:u8|u|U|L)?'", end: "'", patterns: [{ name: 'constant.character.escape.khanya', match: '\\\\.' }] },
    ] },
  },
};
fs.writeFileSync(path.join(EXT, 'syntaxes', 'khanya.tmLanguage.json'), JSON.stringify(grammar, null, 2));
console.log(`Built extension lib/ and grammar for: ${langs.map(f => f.replace('.json', '')).join(', ')}`);
