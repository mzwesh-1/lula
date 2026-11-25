#!/usr/bin/env node
'use strict';
// Builds the public website for GitHub Pages into ./site:
//   site/index.html            -> sends visitors to the textbook
//   site/textbook/             -> the Soga Arduino textbook (same page as the Claude artifact)
//   site/cpp/                  -> the Soga C++ textbook for VS Code
//   site/report/               -> the technical report (PDF and HTML)
//   node scripts/build-site.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const TB = path.join(ROOT, 'docs', 'textbook');
const REPORT = path.join(ROOT, 'docs', 'report');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'report'), { recursive: true });

// A textbook page is written as a page body (the artifact host adds the document skeleton);
// here we add the same skeleton so it is a complete web page.
const SKELETON = '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>';
function book(srcDir, outDir, description) {
  const page = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
  const cut = page.indexOf('<section class="cover"');
  if (cut < 0) throw new Error(`${srcDir}: cover section not found`);
  const title = (/<title>([^<]*)<\/title>/.exec(page) || [])[1] || 'Soga';
  const META = [
    `<meta name="description" content="${description}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    '<meta property="og:image" content="soga-logo.png">',
    '<link rel="icon" type="image/png" href="soga-logo.png">',
  ].join('\n');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), `<!doctype html>
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
`);
  for (const f of ['data.json', 'soga-logo.png']) fs.copyFileSync(path.join(srcDir, f), path.join(outDir, f));
}
const LANGS_TEXT = 'isiZulu, isiXhosa, siSwati, isiNdebele, Sesotho, Setswana, Sepedi, Xitsonga, Tshivenḓa and Afrikaans';
book(TB, path.join(OUT, 'textbook'), `Learn Arduino in ${LANGS_TEXT}: 103 lessons with working examples. By Mzwandile Zulu.`);
book(path.join(ROOT, 'docs', 'cpp-textbook'), path.join(OUT, 'cpp'), `Learn C++ in VS Code in ${LANGS_TEXT}: every lesson runs in all ten languages. By Mzwandile Zulu.`);

// Technical report
for (const f of ['soga-technical-report.pdf', 'soga-technical-report.html']) fs.copyFileSync(path.join(REPORT, f), path.join(OUT, 'report', f));
fs.writeFileSync(path.join(OUT, 'report', 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=soga-technical-report.html"><title>Soga technical report</title><a href="soga-technical-report.html">Soga technical report</a>\n');

// The site root goes straight to the textbook
fs.writeFileSync(path.join(OUT, 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=textbook/"><title>Soga</title><link rel="canonical" href="textbook/"><a href="textbook/">Soga Arduino Textbook</a>\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');   // serve files as they are
console.log('site/ built: textbook/, cpp/, report/');
