#!/usr/bin/env node
'use strict';
// Builds the public website for GitHub Pages into ./site:
//   site/index.html            -> sends visitors to the textbook
//   site/textbook/             -> the Soga Arduino textbook (same page as the Claude artifact)
//   site/report/               -> the technical report (PDF and HTML)
//   node scripts/build-site.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const TB = path.join(ROOT, 'docs', 'textbook');
const REPORT = path.join(ROOT, 'docs', 'report');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'textbook'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'report'), { recursive: true });

// The textbook page is written as a page body (the artifact host adds the document skeleton);
// here we add the same skeleton so it is a complete web page.
const page = fs.readFileSync(path.join(TB, 'index.html'), 'utf8');
const cut = page.indexOf('<section class="cover"');
if (cut < 0) throw new Error('textbook page: cover section not found');
const SKELETON = '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>';
const META = [
  '<meta name="description" content="Learn Arduino in isiZulu, isiXhosa, siSwati, isiNdebele, Sesotho, Setswana, Sepedi, Xitsonga, Tshivenḓa and Afrikaans: 103 lessons with working examples. By Mzwandile Zulu.">',
  '<meta property="og:title" content="Soga Arduino Textbook">',
  '<meta property="og:description" content="Arduino in your home language: 103 lessons in all ten written South African languages.">',
  '<meta property="og:image" content="soga-logo.png">',
  '<link rel="icon" type="image/png" href="soga-logo.png">',
].join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${SKELETON}
${META}
${page.slice(0, cut).trim()}
</head>
<body>
${page.slice(cut).trim()}
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, 'textbook', 'index.html'), html);
for (const f of ['data.json', 'soga-logo.png']) fs.copyFileSync(path.join(TB, f), path.join(OUT, 'textbook', f));

// Technical report
for (const f of ['soga-technical-report.pdf', 'soga-technical-report.html']) fs.copyFileSync(path.join(REPORT, f), path.join(OUT, 'report', f));
fs.writeFileSync(path.join(OUT, 'report', 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=soga-technical-report.html"><title>Soga technical report</title><a href="soga-technical-report.html">Soga technical report</a>\n');

// The site root goes straight to the textbook
fs.writeFileSync(path.join(OUT, 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=textbook/"><title>Soga</title><link rel="canonical" href="textbook/"><a href="textbook/">Soga Arduino Textbook</a>\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');   // serve files as they are
console.log('site/ built: textbook/, report/');
