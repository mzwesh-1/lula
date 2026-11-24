'use strict';
// Tests for library packs (ROS 2, OpenCV, Eigen, CUDA, PyTorch, Arduino), Arduino mode,
// full-sentence error messages and runtime messages. Run by tests/test.js.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { translate, convert, listLanguages, loadPacks } = require('../src/translator');
const M = require('../src/messages');

module.exports = function ({ test, ROOT, CLI }) {
  const languages = listLanguages().map(l => l.code);
  const run = (args, opts = {}) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8', ...opts });
  const has = (cmd, args = ['--version']) => !spawnSync(cmd, args).error;
  const zu = (src, opts) => translate(src, 'zu', opts).cpp;

  console.log('library packs');
  test('packs/*.json are up to date with packs/src', () => {
    const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'build-packs.js'), '--check'], { encoding: 'utf8' });
    assert.strictEqual(r.status, 0, r.stderr);
  });
  test('every pack has a word in every language', () => {
    for (const p of loadPacks()) for (const [cpp, words] of Object.entries({ ...p.names, ...p.headers }))
      for (const code of languages) assert.ok(words[code], `${p.id} ${cpp}: no ${code} word`);
  });
  test('pack words are off until the header is included', () => {
    assert.strictEqual(zu('Isithombe x;'), 'Isithombe x;');
    assert.strictEqual(zu('#faka <umbono>\nIsithombe x;'), '#include <opencv2/opencv.hpp>\ncv::Mat x;');
    assert.strictEqual(zu('#include <opencv2/opencv.hpp>\nIsithombe x;'), '#include <opencv2/opencv.hpp>\ncv::Mat x;');
    assert.strictEqual(zu('Isithombe x;', { packs: ['opencv'] }), 'cv::Mat x;');
  });
  test('namespaced pack names: qualified, members and ns:: forms', () => {
    const src = '#faka <amamatriki>\nImatriki3 A; A.okuphambene(); Imatriki3::Ubunye(); amamatriki::Ivektha3 v;';
    assert.strictEqual(zu(src), '#include <Eigen/Dense>\nEigen::Matrix3d A; A.inverse(); Eigen::Matrix3d::Identity(); Eigen::Vector3d v;');
    assert.match(zu('#faka <ros2>\nros::Ifindo::Isikhombi n;'), /rclcpp::Node::SharedPtr n;/);
  });
  test('ROS 2, CUDA and PyTorch examples translate to the reviewed C++', () => {
    for (const f of ['irobhothi_ros', 'gpu', 'ukufunda']) {
      const out = translate(fs.readFileSync(path.join(ROOT, 'examples', `${f}.zu.lula`), 'utf8'), 'zu').cpp;
      assert.strictEqual(out, fs.readFileSync(path.join(__dirname, 'expected', `${f}.zu.cpp`), 'utf8'), f);
    }
  });
  test('C++ using OpenCV/Eigen/ROS converts to every language and back unchanged', () => {
    for (const f of ['irobhothi_ros', 'gpu', 'ukufunda']) {
      const cpp = fs.readFileSync(path.join(__dirname, 'expected', `${f}.zu.cpp`), 'utf8');
      for (const code of languages) {
        const back = convert(convert(cpp, 'cpp', code), code, 'cpp');
        assert.strictEqual(back, cpp, `${f} via ${code}`);
      }
    }
  });

  console.log('Arduino mode');
  test('setup+loop without main switches to Arduino mode', () => {
    const r = translate('ize qala() {} ize phindaphinda() { inombolo m = okukhulu(1, 2); umbhalo s; }', 'zu');
    assert.ok(r.arduino);
    assert.match(r.cpp, /int m = max\(1, 2\); String s;/);
    const host = translate('inombolo okuyinhloko() { buyisa okukhulu(1, 2); }', 'zu');
    assert.ok(!host.arduino);
    assert.match(host.cpp, /std::max/);
  });
  test('Arduino words in every language', () => {
    for (const code of languages) {
      const src = convert('void setup() { Serial.begin(9600); pinMode(13, OUTPUT); }\nvoid loop() { int v = map(analogRead(0), 0, 1023, 0, 255); analogWrite(9, v); delay(random(10, 50)); }\n', 'cpp', code);
      assert.doesNotMatch(src, /\b(setup|loop|Serial|pinMode|OUTPUT|map|analogRead|analogWrite|delay|random|void|int)\b/, `${code}: ${src}`);
      assert.match(translate(src, code).cpp, /void setup\(\) \{ Serial\.begin\(9600\); pinMode\(13, OUTPUT\); \}/);
    }
  });
  const core = ['/usr/share/arduino/hardware/arduino/avr', process.env.ARDUINO_AVR_CORE].find(d => d && fs.existsSync(path.join(d, 'cores/arduino/Arduino.h')));
  if (has('avr-g++') && core) {
    for (const [ex, board] of [['irobhothi.zu.lula', 'uno'], ['inzwa.zu.lula', 'uno'], ['inzwa.zu.lula', 'mega']]) {
      test(`real Arduino build: ${ex} for ${board} produces a .hex`, () => {
        const hex = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'lula-hex-')), 'out.hex');
        const r = run(['arduino', path.join(ROOT, 'examples', ex), '--board', board, '-o', hex]);
        assert.strictEqual(r.status, 0, r.stderr);
        assert.match(fs.readFileSync(hex, 'utf8'), /^:10000000/);
      });
    }
  } else console.log('  skip real Arduino builds (no avr-g++ / Arduino core)');

  const T = require('../src/toolchain');
  const acli = T.findArduinoCli();
  if (acli) {
    const cores = T.installedCores(acli);
    for (const [alias, ext] of [['uno', '.hex'], ['mega', '.hex'], ['uno-r4-minima', '.hex'], ['nano-33-iot', '.bin'], ['nano-33-ble', '.bin'],
      ['pico', '.uf2'], ['esp32', '.bin'], ['stm32-bluepill', '.bin']]) {
      if (!cores.has(T.BOARD_ALIASES[alias].core)) { console.log(`  skip ${alias} (board package not installed)`); continue; }
      test(`arduino-cli: isiZulu robot builds for ${T.BOARD_ALIASES[alias].name}`, () => {
        const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'lula-board-')), 'robot' + ext);
        const r = run(['arduino', path.join(ROOT, 'examples', 'irobhothi.zu.lula'), '--board', alias, '-o', out], { timeout: 600000 });
        assert.strictEqual(r.status, 0, r.stderr);
        assert.ok(fs.statSync(out).size > 500);
        assert.match(r.stderr, /Uhlelo lusebenzisa ama-byte angu-\d+/);
      });
    }
  } else console.log('  skip arduino-cli board builds (arduino-cli not installed)');

  console.log('real libraries');
  const pkg = name => spawnSync('pkg-config', ['--exists', name]).status === 0;
  if (pkg('opencv4')) test('OpenCV example runs against real OpenCV', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'umbono.zu.lula')]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /Izinto ezitholakele: 3\nIzinto ezibomvu: 2\n  ibhokisi: 81x81\n  ibhokisi: 41x41/);
    assert.strictEqual(r.stderr, '', 'no warnings from OpenCV headers');
  }); else console.log('  skip OpenCV (not installed)');
  if (pkg('eigen3')) test('Eigen example runs against real Eigen', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'amamatriki.zu.lula')]);
    assert.strictEqual(r.status, 0, r.stderr);
    assert.match(r.stdout, /x = 0\.333333  2\.33333  2\.66667\nisinqumo = 18\nA \* A\^-1 iyi-identity: yebo/);
    assert.match(r.stdout, /isandla = 0 1 0/);
  }); else console.log('  skip Eigen (not installed)');
  if (process.env.LIBTORCH) test('PyTorch example trains against real libtorch', () => {
    const r = run(['run', path.join(ROOT, 'examples', 'ukufunda.zu.lula')], { timeout: 300000 });
    assert.strictEqual(r.status, 0, r.stderr);
    const f = Number(/f\(0\.5\) = ([\d.]+)/.exec(r.stdout)[1]);
    assert.ok(Math.abs(f - 2) < 0.1, `f(0.5) = ${f}`);
  }); else console.log('  skip PyTorch (set LIBTORCH=/path/to/libtorch)');

  console.log('messages');
  const catalog = M.loadCatalog();
  test('every message exists in English and all ten languages, with the same placeholders', () => {
    for (const e of catalog.entries) {
      const ph = s => (s.match(/\{\d\}|\{kw:[#\w]+\}/g) || []).sort().join();
      for (const code of ['en', ...languages]) {
        assert.ok(e.text[code], `${e.id}: missing ${code}`);
        assert.strictEqual(ph(e.text[code]), ph(e.text.en), `${e.id} (${code}) placeholders`);
      }
    }
  });
  test('{kw:...} names real keywords', () => {
    for (const e of catalog.entries) for (const [, kw] of (e.text.en.matchAll(/\{kw:([#\w]+)\}/g)))
      for (const code of languages) assert.notStrictEqual(M.keywordWord(kw, code), kw.replace('#', ''), `${e.id}: ${kw} in ${code}`);
  });
  if (has('g++')) {
    const bad = 'int add(int a, int b) { return a + b; }\nvoid hello(int n) { return n; }\nint main() {\n    const int z = 1;\n    z = 2;\n    int w;\n    add(1);\n    else w = 1;\n    break;\n    undefined_thing = 3;\n    return 0\n}\n';
    test('real compiler errors become full sentences in every language', () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lula-err-'));
      for (const code of languages) {
        const f = path.join(dir, `bad.${code}.lula`);
        fs.writeFileSync(f, convert(bad, 'cpp', code));
        const r = run(['check', f]);
        assert.notStrictEqual(r.status, 0);
        const lines = r.stderr.split('\n').filter(l => /\.lula:\d+:\d+: /.test(l));
        assert.ok(lines.length >= 6, `${code}: ${r.stderr}`);
        for (const l of lines) {
          const msg = l.replace(/^.*?\.lula:\d+:\d+: /, '').replace(/'[^']*'/g, "''").replace(/\[-W[^\]]+\]|\[-fpermissive\]/g, '');
          assert.doesNotMatch(msg, /\b(error|warning|note|expected|before|declared|scope|function|argument|value|without|statement)\b/, `${code}: ${l}`);
        }
      }
    });
    test('crashes and uncaught exceptions are explained in the user language', () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lula-rt-'));
      const div = path.join(dir, 'div.zu.lula');
      fs.writeFileSync(div, 'okuguquguqukayo inombolo zero = 0;\ninombolo okuyinhloko() { buyisa 10 / zero; }\n');
      let r = run(['run', div]);
      assert.match(r.stderr, /uhlelo lwephukile: iphutha lezibalo/);
      const thr = path.join(dir, 'thr.xh.lula');
      fs.writeFileSync(thr, '#faka <iimpazamo>\ninani engundoqo() { phosa impazamo_yokusebenza("ingxaki"); }\n');
      r = run(['run', thr]);
      assert.match(r.stderr, /inkqubo imile: impazamo yohlobo 'impazamo_yokusebenza' iphoswe \(phosa\)/);
      assert.match(r.stderr, /isizathu: ingxaki/);
    });
  }
};
