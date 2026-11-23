'use strict';
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { translate, listLanguages, loadLanguage, detectLanguage, localizeMessage } = require('../src/translator');

const ROOT = path.join(__dirname, '..');
const CLI = path.join(ROOT, 'bin', 'khanya.js');
let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ok   ${name}`); }
  catch (e) { console.log(`  FAIL ${name}\n${e.stack}`); process.exitCode = 1; }
}
const zu = src => translate(src, 'zu').cpp;
const af = src => translate(src, 'af').cpp;

console.log('translator');
test('keywords translate', () => assert.strictEqual(zu('uma (x) buyisa iqiniso; kungenjalo buyisa amanga;'),
  'if (x) return true; else return false;'));
test('strings are untouched', () => assert.strictEqual(zu('bhala << "uma buyisa";'), 'std::cout << "uma buyisa";'));
test('escaped quotes in strings', () => assert.strictEqual(zu('"a \\" uma" uma'), '"a \\" uma" if'));
test('char literals untouched', () => assert.strictEqual(zu("uhlamvu c = 'u';"), "char c = 'u';"));
test('raw strings untouched', () => assert.strictEqual(zu('R"x(uma "buyisa")x" uma'), 'R"x(uma "buyisa")x" if'));
test('comments untouched', () => assert.strictEqual(zu('// uma buyisa\n/* uma */ uma'), '// uma buyisa\n/* uma */ if'));
test('numbers with separators', () => assert.strictEqual(zu("inombolo x = 1'000'000;"), "int x = 1'000'000;"));
test('directives translate', () => assert.strictEqual(zu('#faka <iostream>\n#chaza N 5'), '#include <iostream>\n#define N 5'));
test('header names untouched', () => assert.strictEqual(zu('#faka <uma>'), '#include <uma>'));
test('#uma directive', () => assert.strictEqual(zu('#uma 1\n#qeda_uma'), '#if 1\n#endif'));
test('members after . and ->', () => assert.strictEqual(zu('v.ubukhulu(); p->engeza_ekugcineni(1); v.thola(x); thola(a, b, c);'),
  'v.size(); p->push_back(1); v.find(x); std::find(a, b, c);'));
test('isisekelo:: is std::', () => assert.strictEqual(zu('isisekelo::iqoqo<inombolo> v; sebenzisa indawo_yamagama isisekelo;'),
  'std::vector<int> v; using namespace std;'));
test('header names translate', () => assert.strictEqual(zu('#faka <iqoqo>\n#faka <konke>\n#faka "iqoqo"\n#faka <vector>'),
  '#include <vector>\n#include <bits/stdc++.h>\n#include "iqoqo"\n#include <vector>'));
test('English C++ still works', () => assert.strictEqual(zu('if (true) return 0;'), 'if (true) return 0;'));
test('identifiers containing keywords untouched', () => assert.strictEqual(zu('umaX ize_y'), 'umaX ize_y'));
test('unicode identifiers', () => assert.strictEqual(af('heelgetal treë = 1; skryf << nuwereël;'), 'int treë = 1; std::cout << std::endl;'));
test('line numbers preserved', () => {
  const src = fs.readFileSync(path.join(ROOT, 'examples', 'sawubona.zu.kh'), 'utf8');
  assert.strictEqual(zu(src).split('\n').length, src.split('\n').length);
});
test('#line directive added', () => assert.ok(translate('uma', 'zu', { fileName: '/a/b.zu.kh' }).cpp.startsWith('#line 1 "/a/b.zu.kh"\n')));
test('language detection', () => {
  assert.strictEqual(detectLanguage('robot.zu.kh'), 'zu');
  assert.strictEqual(detectLanguage('C:\\x\\hallo.af.kh'), 'af');
  assert.strictEqual(detectLanguage('robot.kh'), null);
});
test('error messages localized', () => assert.strictEqual(
  localizeMessage("x.zu.kh:3:5: error: expected ';' before 'return'", 'zu'),
  "x.zu.kh:3:5: error: expected ';' before 'buyisa'"));

console.log('language tables (completeness)');
const ALL_CPP_KEYWORDS = ('alignas alignof and and_eq asm auto bitand bitor bool break case catch char char8_t char16_t ' +
  'char32_t class compl concept const consteval constexpr constinit const_cast continue co_await co_return co_yield ' +
  'decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if ' +
  'inline int long mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public ' +
  'register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch ' +
  'template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile ' +
  'wchar_t while xor xor_eq final override import module').split(' ');
const ALL_DIRECTIVES = 'include define undef if ifdef ifndef elif elifdef elifndef else endif line error warning pragma'.split(' ');
const languages = listLanguages().map(l => l.code);
const reference = loadLanguage('zu');
const sorted = it => [...new Set(it)].sort();
for (const code of languages) {
  const lang = loadLanguage(code);
  test(`${code}: loads without duplicates`, () => assert.ok(lang));
  test(`${code}: every C++ keyword (${ALL_CPP_KEYWORDS.length}) has a translation`, () => {
    const have = new Set(lang.keywordMap.values());
    const missing = ALL_CPP_KEYWORDS.filter(k => !have.has(k));
    assert.deepStrictEqual(missing, [], `missing: ${missing.join(', ')}`);
    const extra = [...have].filter(k => !ALL_CPP_KEYWORDS.includes(k));
    assert.deepStrictEqual(extra, [], `not C++ keywords: ${extra.join(', ')}`);
  });
  test(`${code}: every preprocessor directive has a translation`, () => {
    const have = new Set(lang.directiveMap.values());
    assert.deepStrictEqual(ALL_DIRECTIVES.filter(d => !have.has(d)), []);
  });
  if (code !== 'zu') {
    test(`${code}: covers the same library and headers as isiZulu`, () => {
      assert.deepStrictEqual(sorted(lang.libraryMap.values()), sorted(reference.libraryMap.values()));
      assert.deepStrictEqual(sorted(lang.headerMap.values()), sorted(reference.headerMap.values()));
    });
  }
  test(`${code}: words are single identifiers`, () => {
    for (const w of [...lang.keywordMap.keys(), ...lang.libraryMap.keys(), ...lang.directiveMap.keys()])
      assert.match(w, /^[\p{L}_][\p{L}\p{M}\p{N}_]*$/u, w);
  });
}

console.log('SASL sign-video dictionary');
{
  const S = require('../src/sasl');
  const tmpDict = () => { const d = fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-sasl-')); fs.writeFileSync(path.join(d, 'signs.json'), '{"version":1,"signs":{}}'); return d; };
  // A colour-bar test clip: clearly NOT a sign, only used to exercise the pipeline.
  const clip = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-clip-')), 'TEST-CLIP-not-a-sign.webm');
  const hasFfmpeg = !spawnSync('ffmpeg', ['-version']).error;
  if (hasFfmpeg) spawnSync('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'testsrc=duration=1:size=320x240:rate=10', '-c:v', 'libvpx', clip]);
  else fs.writeFileSync(clip, 'not a real video');

  test('shipped dictionary is valid and contains no unreviewed entries', () => {
    assert.deepStrictEqual(S.validate(), []);
    for (const [c, e] of Object.entries(S.loadDictionary().signs)) assert.ok(e.consent === true && e.signer && e.license, c);
  });
  test('one concept links the word in every language', () => {
    for (const [word, code] of [['uma', 'zu'], ['ukuba', 'xh'], ['haeba', 'st'], ['fa', 'tn'], ['loko', 'ts'], ['arali', 've'], ['as', 'af']])
      assert.strictEqual(S.conceptOf(word, code), 'if', `${word} (${code})`);
    assert.strictEqual(S.conceptOf('engeza_ekugcineni', 'zu'), 'push_back');
    assert.strictEqual(S.conceptOf('faka', 'zu'), '#include');
    assert.strictEqual(S.conceptOf('PHEZULU', 'zu'), 'HIGH');
    assert.strictEqual(S.conceptOf('amamaki', 'zu'), null);
    assert.strictEqual(S.wordsFor('while').nso, 'ge_fela');
  });
  test('priority concepts all exist', () => assert.deepStrictEqual(S.PRIORITY.filter(c => !S.allConcepts().includes(c)), []));
  test('adding a sign requires consent, a named signer and a licence', () => {
    const d = tmpDict();
    assert.throws(() => S.addSign('if', clip, { signer: 'Test', license: 'CC-BY-4.0' }, d), /consent/);
    assert.throws(() => S.addSign('if', clip, { license: 'CC-BY-4.0', consent: true }, d), /signer/);
    assert.throws(() => S.addSign('if', clip, { signer: 'Test', consent: true }, d), /licence/);
    assert.throws(() => S.addSign('not_a_concept', clip, { signer: 'T', license: 'L', consent: true }, d), /unknown concept/);
    assert.throws(() => S.addSign('if', clip.replace('.webm', '.avi'), { signer: 'T', license: 'L', consent: true }, d), /mp4 or .webm/);
    assert.deepStrictEqual(S.loadDictionary(d).signs, {});
  });
  test('add, look up from any language, validate, remove', () => {
    const d = tmpDict();
    S.addSign('#include', clip, { signer: 'Test Signer', license: 'CC-BY-4.0', consent: true, gloss: 'TEST' }, d);
    assert.ok(fs.existsSync(path.join(d, 'videos', 'directive-include.webm')));
    const r = S.lookup('faka', 'zu', d);
    assert.strictEqual(r.concept, '#include');
    assert.strictEqual(r.entry.signer, 'Test Signer');
    assert.strictEqual(S.lookup('kenyelletsa', 'st', d).video, r.video);
    assert.deepStrictEqual(S.validate(d), []);
    assert.strictEqual(S.status(d).recorded, 1);
    fs.rmSync(r.video);
    assert.match(S.validate(d).join(), /video file missing/);
    assert.ok(S.removeSign('#include', d));
    assert.deepStrictEqual(S.loadDictionary(d).signs, {});
  });
  test('hosted (https) videos are accepted', () => {
    const d = tmpDict();
    S.addSign('if', 'https://example.org/sasl/if.mp4', { signer: 'T', license: 'CC-BY-4.0', consent: true }, d);
    assert.strictEqual(S.lookup('uma', 'zu', d).video, 'https://example.org/sasl/if.mp4');
    assert.deepStrictEqual(S.validate(d), []);
  });
  test('player HTML escapes text and shows credit, or says no sign yet', () => {
    const html = S.playerHtml({ concept: 'if', word: 'uma', entry: { gloss: 'IF', signer: '<b>x</b>', license: 'CC-BY-4.0' }, videoSrc: 'a.webm', words: { zu: 'uma' } });
    assert.match(html, /<video id="sign" src="a.webm"/);
    assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
    assert.ok(!html.includes('<b>x</b>'));
    assert.match(S.playerHtml({ concept: 'if', entry: null }), /No SASL sign has been recorded/);
  });
  test('CLI: sasl add refuses without --consent, then works with it', () => {
    const d = tmpDict();
    let r = spawnSync(process.execPath, [CLI, 'sasl', 'add', 'if', clip, '--signer', 'T', '--license', 'CC-BY-4.0', '--dict', d], { encoding: 'utf8' });
    assert.notStrictEqual(r.status, 0); assert.match(r.stderr, /consent/);
    r = spawnSync(process.execPath, [CLI, 'sasl', 'add', 'if', clip, '--signer', 'T', '--license', 'CC-BY-4.0', '--consent', '--dict', d], { encoding: 'utf8' });
    assert.strictEqual(r.status, 0, r.stderr);
    r = spawnSync(process.execPath, [CLI, 'sasl', 'show', 'ukuba', '--lang', 'xh', '--dict', d], { encoding: 'utf8' });
    assert.match(r.stdout, /ukuba -> C\+\+ if/); assert.match(r.stdout, /Signed by T/);
  });
}

console.log('end-to-end (needs g++)');
const hasGpp = !spawnSync('g++', ['--version']).error;
function run(args) { return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' }); }
if (hasGpp) {
  test('sawubona.zu.kh runs', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'sawubona.zu.kh')]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /Sawubona, Mhlaba!/);
    assert.match(r.stdout, /Isilinganiso: 82\.6667/);
  });
  test('hallo.af.kh runs', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'hallo.af.kh')]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /Khanya-1 tree 3/);
  });
  test('robot program compiles against mock Arduino and reacts to sensor', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'irobhothi.zu.kh'), '--',
      '-include', path.join(__dirname, 'mock', 'Arduino.h')]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(r.stdout.trim().split('\n').join('|'),
      'pinMode(13,1)|pinMode(9,1)|analogWrite(9,200)|digitalWrite(13,1)|analogWrite(9,0)|digitalWrite(13,0)');
  });
  for (const ex of ['konke.zu.kh', 'alles.af.kh']) {
    test(`${ex}: full-language program runs (classes, templates, containers, algorithms, exceptions, files...)`, () => {
      const r = run(['run', path.join(ROOT, 'examples', ex)]);
      assert.strictEqual(r.status, 0, r.stderr);
      assert.strictEqual(r.stdout, fs.readFileSync(path.join(__dirname, 'expected', ex + '.out'), 'utf8'));
    });
  }
  test('C++ (GeeksforGeeks style) converted to every language gives the same output', () => {
    const { convert } = require('../src/translator');
    const cppFile = path.join(__dirname, 'fixtures', 'gfg_style.cpp');
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-conv-'));
    const exe = path.join(dir, 'orig');
    const c = spawnSync('g++', ['-std=c++20', cppFile, '-o', exe], { encoding: 'utf8' });
    assert.strictEqual(c.status, 0, c.stderr);
    const expected = spawnSync(exe, [], { encoding: 'utf8' }).stdout;
    for (const code of languages) {
      const f = path.join(dir, `gfg.${code}.kh`);
      fs.writeFileSync(f, convert(fs.readFileSync(cppFile, 'utf8'), 'cpp', code));
      const r = run(['run', f]);
      assert.strictEqual(r.status, 0, `${code}: ${r.stderr}`);
      assert.strictEqual(r.stdout, expected, code);
    }
  });
  test('full-language program converted into every SA language gives identical output', () => {
    const { convert } = require('../src/translator');
    const src = fs.readFileSync(path.join(ROOT, 'examples', 'konke.zu.kh'), 'utf8');
    const expected = fs.readFileSync(path.join(__dirname, 'expected', 'konke.zu.kh.out'), 'utf8');
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-all-'));
    for (const code of languages) {
      const f = path.join(dir, `konke.${code}.kh`);
      fs.writeFileSync(f, convert(src, 'zu', code));
      const r = run(['run', f]);
      assert.strictEqual(r.status, 0, `${code}: ${r.stderr}`);
      assert.strictEqual(r.stdout, expected, code);
    }
  });
  test('round trip zu -> af -> zu keeps the program working', () => {
    const { convert } = require('../src/translator');
    const src = fs.readFileSync(path.join(ROOT, 'examples', 'konke.zu.kh'), 'utf8');
    const back = convert(convert(src, 'zu', 'af'), 'af', 'zu');
    const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-rt-')), 'rt.zu.kh');
    fs.writeFileSync(f, back);
    const r = run(['run', f]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.strictEqual(r.stdout, fs.readFileSync(path.join(__dirname, 'expected', 'konke.zu.kh.out'), 'utf8'));
  });
  test('compile errors point at the Khanya file and line, in the user language', () => {
    const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'khanya-t-')), 'iphutha.zu.kh');
    fs.writeFileSync(f, 'inombolo okuyinhloko() {\n    inombolo x = 5\n    buyisa x;\n}\n');
    const r = run(['check', f]);
    assert.notStrictEqual(r.status, 0);
    assert.match(r.stderr, /iphutha\.zu\.kh:3:5: error/);
    assert.match(r.stderr, /inombolo okuyinhloko\(\)/);
    assert.match(r.stderr, /before .buyisa./);
  });
} else console.log('  skip (g++ not found)');

console.log(`\n${passed} passed${process.exitCode ? ', some FAILED' : ''}`);
