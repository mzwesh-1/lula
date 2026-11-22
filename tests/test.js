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
test('library names not replaced after ::', () => assert.strictEqual(zu('robot::bhala(); r.bhala; bhala'), 'robot::bhala(); r.bhala; std::cout'));
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

console.log('language tables');
for (const { code } of listLanguages()) {
  test(`${code}: loads without duplicates`, () => loadLanguage(code));
  test(`${code}: keywords map to real C++ keywords`, () => {
    const cppKeywords = new Set(('if else switch case default while do for break continue return goto try catch throw ' +
      'int float double char bool void short long signed unsigned auto const constexpr static extern volatile mutable inline ' +
      'class struct union enum public private protected virtual override final friend this new delete operator template ' +
      'typename namespace using typedef true false nullptr and or not sizeof').split(' '));
    for (const cpp of loadLanguage(code).keywordMap.values()) assert.ok(cppKeywords.has(cpp), `${cpp} is not a C++ keyword`);
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
