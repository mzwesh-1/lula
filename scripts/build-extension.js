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
for (const f of ['translator.js', 'cli.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(LIB, f));
const langs = fs.readdirSync(path.join(ROOT, 'languages')).filter(f => f.endsWith('.json'));
for (const f of langs) fs.copyFileSync(path.join(ROOT, 'languages', f), path.join(LIB, 'languages', f));

const CPP = {
  control: 'if else switch case default while do for break continue return goto try catch throw',
  types: 'int float double char bool void short long signed unsigned auto',
  modifiers: 'const constexpr static extern volatile mutable inline',
  oop: 'class struct union enum public private protected virtual override final friend this new delete operator template typename namespace using typedef',
  constants: 'true false nullptr',
  operators: 'and or not sizeof',
};
const SCOPES = {
  control: 'keyword.control.khanya',
  types: 'storage.type.khanya',
  modifiers: 'storage.modifier.khanya',
  oop: 'keyword.other.khanya',
  constants: 'constant.language.khanya',
  operators: 'keyword.operator.word.khanya',
  library: 'support.function.khanya',
};
const words = Object.fromEntries(Object.keys(SCOPES).map(k => [k, new Set((CPP[k] || '').split(' ').filter(Boolean))]));
const directives = new Set('include define undef ifdef ifndef if else elif endif error pragma line'.split(' '));
for (const f of langs) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'languages', f), 'utf8'));
  for (const [cat, table] of Object.entries(data.keywords)) for (const w of Object.keys(table)) words[cat].add(w);
  for (const w of Object.keys(data.library || {})) words.library.add(w);
  for (const w of Object.keys(data.directives || {})) directives.add(w);
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
      { match: `^\\s*(#\\s*(?:include|import|${alt(new Set([...directives].filter(d => /faka|sluitin/.test(d))))}))\\s*(<[^>]*>|"[^"]*")`,
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
