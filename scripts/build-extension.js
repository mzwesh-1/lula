'use strict';
// Copies the translator + language files into the VS Code extension and
// generates the syntax-highlighting grammar from all language tables.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXT = path.join(ROOT, 'vscode-soga');
const LIB = path.join(EXT, 'lib');

fs.rmSync(LIB, { recursive: true, force: true });
fs.mkdirSync(path.join(LIB, 'languages'), { recursive: true });
for (const f of ['translator.js', 'cli.js', 'sasl.js', 'messages.js', 'toolchain.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(LIB, f));
fs.mkdirSync(path.join(LIB, 'lsp'), { recursive: true });
for (const f of ['server.js', 'analysis.js']) fs.copyFileSync(path.join(ROOT, 'src', 'lsp', f), path.join(LIB, 'lsp', f));
fs.mkdirSync(path.join(LIB, 'packs'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'packs')).filter(f => f.endsWith('.json'))) fs.copyFileSync(path.join(ROOT, 'packs', f), path.join(LIB, 'packs', f));
fs.mkdirSync(path.join(LIB, 'messages'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'messages', 'catalog.txt'), path.join(LIB, 'messages', 'catalog.txt'));
fs.cpSync(path.join(ROOT, 'sasl'), path.join(LIB, 'sasl'), { recursive: true, filter: src => !src.endsWith('.gitkeep') });
const langs = fs.readdirSync(path.join(ROOT, 'languages')).filter(f => f.endsWith('.json'));
for (const f of langs) fs.copyFileSync(path.join(ROOT, 'languages', f), path.join(LIB, 'languages', f));

const SCOPES = {
  control: 'keyword.control.soga',
  types: 'storage.type.soga',
  modifiers: 'storage.modifier.soga',
  oop: 'keyword.other.soga',
  casts: 'keyword.operator.cast.soga',
  constants: 'constant.language.soga',
  operators: 'keyword.operator.word.soga',
  library: 'support.function.soga',
  arduino: 'support.constant.arduino.soga',
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
for (const f of fs.readdirSync(path.join(ROOT, 'packs')).filter(f => f.endsWith('.json'))) {
  const pack = JSON.parse(fs.readFileSync(path.join(ROOT, 'packs', f), 'utf8'));
  for (const perLang of Object.values(pack.names)) for (const w of Object.values(perLang)) (/^[A-Z0-9_]+$/.test(w) ? words.arduino : words.library).add(w);
}
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alt = set => [...set].sort((a, b) => b.length - a.length).map(esc).join('|');
const B = '(?<![\\p{L}\\p{N}_])', E = '(?![\\p{L}\\p{N}_])';

const grammar = {
  $schema: 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
  name: 'Soga',
  scopeName: 'source.soga',
  patterns: [
    { include: '#comments' },
    { include: '#preprocessor' },
    { include: '#strings' },
    ...Object.keys(SCOPES).map(cat => ({ name: SCOPES[cat], match: `${B}(?:${alt(words[cat])})${E}` })),
    { name: 'constant.numeric.soga', match: "\\b(?:0[xX][0-9a-fA-F']+|0[bB][01']+|\\d[\\d']*\\.?[\\d']*(?:[eE][+-]?\\d+)?)[uUlLfF]*\\b" },
    { name: 'entity.name.function.soga', match: `[\\p{L}_][\\p{L}\\p{N}_]*(?=\\s*\\()` },
  ],
  repository: {
    comments: { patterns: [
      { name: 'comment.line.double-slash.soga', match: '//.*$' },
      { name: 'comment.block.soga', begin: '/\\*', end: '\\*/' },
    ] },
    preprocessor: { patterns: [
      { match: `^\\s*(#\\s*(?:${alt(includeWords)}))\\s*(<[^>]*>|"[^"]*")`,
        captures: { 1: { name: 'keyword.control.directive.soga' }, 2: { name: 'string.quoted.other.lt-gt.include.soga' } } },
      { name: 'keyword.control.directive.soga', match: `^\\s*#\\s*(?:${alt(directives)})${E}` },
    ] },
    strings: { patterns: [
      { name: 'string.quoted.raw.soga', begin: '(?:u8|u|U|L)?R"([^()\\\\\\s"]{0,16})\\(', end: '\\)\\1"' },
      { name: 'string.quoted.double.soga', begin: '(?:u8|u|U|L)?"', end: '"', patterns: [{ name: 'constant.character.escape.soga', match: '\\\\.' }] },
      { name: 'string.quoted.single.soga', begin: "(?:u8|u|U|L)?'", end: "'", patterns: [{ name: 'constant.character.escape.soga', match: '\\\\.' }] },
    ] },
  },
};
fs.writeFileSync(path.join(EXT, 'syntaxes', 'soga.tmLanguage.json'), JSON.stringify(grammar, null, 2));
console.log(`Built extension lib/ and grammar for: ${langs.map(f => f.replace('.json', '')).join(', ')}`);

// Bundle the extension and the language server into single files (faster start-up in VS Code).
const esbuild = require('esbuild');
esbuild.buildSync({ entryPoints: [path.join(EXT, 'extension.js')], bundle: true, platform: 'node', target: 'node18', format: 'cjs',
  external: ['vscode'], outfile: path.join(LIB, 'extension.js'), logLevel: 'warning' });
esbuild.buildSync({ entryPoints: [path.join(ROOT, 'src', 'lsp', 'server.js')], bundle: true, platform: 'node', target: 'node18', format: 'cjs',
  outfile: path.join(LIB, 'lsp', 'server.js'), logLevel: 'warning' });
fs.rmSync(path.join(LIB, 'lsp', 'analysis.js'), { force: true });
fs.copyFileSync(path.join(ROOT, 'LICENSE'), path.join(EXT, 'LICENSE'));
console.log('Bundled lib/extension.js and lib/lsp/server.js');
