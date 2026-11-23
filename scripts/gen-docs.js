'use strict';
// Generates docs/<code>.md: a complete reference of every Lula word for each language.
const fs = require('fs');
const path = require('path');
const { listLanguages, loadLanguage, loadPacks } = require('../src/translator');

const ROOT = path.join(__dirname, '..');
const TITLES = {
  control: 'Control flow', types: 'Data types', modifiers: 'Modifiers', oop: 'Classes, objects and structure',
  casts: 'Casts and compile-time', constants: 'Constants', operators: 'Word operators',
  core: 'Core', io: 'Input / output and files', containers: 'Containers (STL)', memory: 'Smart pointers',
  algorithms: 'Algorithms', math: 'Math', strings: 'Strings and characters', errors: 'Exceptions',
  threads: 'Threads', members: 'Member functions (use after `.` or `->`)', arduino: 'Arduino / robots',
};
fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
for (const { code } of listLanguages()) {
  const lang = loadLanguage(code);
  const md = [`# Lula: ${lang.name} reference`, '', `> ${lang.status}`, '',
    `Every word below can be used in \`.${code}.lula\` files. Plain English C++ keeps working too.`, ''];
  const table = (title, rows, fmt = s => `\`${s}\``) => {
    md.push(`## ${title}`, '', `| ${lang.name} | C++ |`, '|---|---|');
    for (const [local, cpp] of rows) md.push(`| ${fmt(local)} | ${fmt(cpp)} |`);
    md.push('');
  };
  for (const [cat, rows] of Object.entries(lang.keywords)) table(`Keywords: ${TITLES[cat] || cat}`, Object.entries(rows));
  table('Preprocessor', [...lang.directiveMap], s => `\`#${s}\``);
  table('Header files', [...lang.headerMap], s => `\`<${s}>\``);
  for (const [cat, rows] of Object.entries(lang.library)) table(`Library: ${TITLES[cat] || cat}`, Object.entries(rows));
  md.push('# Library packs', '', 'A pack switches on when you include one of its headers (in your language or in English).', '');
  for (const p of loadPacks()) {
    md.push(`## ${p.name}${p.always ? ' (always on)' : ''}`, '');
    const hs = Object.entries(p.headers || {});
    if (hs.length) md.push('Headers: ' + hs.map(([cpp, w]) => `\`#${[...lang.directiveMap].find(([, c]) => c === 'include')[0]} <${w[code]}>\` = \`<${cpp}>\``).join(', '), '');
    md.push(`| ${lang.name} | C++ |`, '|---|---|');
    for (const [cpp, w] of Object.entries(p.names)) md.push(`| \`${w[code]}\` | \`${cpp}\` |`);
    md.push('');
  }
  fs.writeFileSync(path.join(ROOT, 'docs', `${code}.md`), md.join('\n'));
  console.log(`docs/${code}.md: ${lang.keywordMap.size} keywords, ${lang.directiveMap.size} directives, ${lang.headerMap.size} headers, ${lang.libraryMap.size} library names`);
}
