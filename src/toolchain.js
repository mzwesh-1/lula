'use strict';
// Compilers, library flags and Arduino boards: shared by the CLI and the language server.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const EXE = process.platform === 'win32' ? '.exe' : '';
const C_ENV = { ...process.env, LC_ALL: 'C', LANG: 'C', LANGUAGE: '' };

/** Compiler and linker flags for the library packs a program uses: { flags, notes: [[name, how]] }. */
function packFlags(packs) {
  const flags = [], notes = [];
  const pkg = (name) => {
    const r = spawnSync('pkg-config', ['--cflags', '--libs', name], { encoding: 'utf8' });
    return r.status === 0 ? r.stdout.trim().split(/\s+/).filter(Boolean) : null;
  };
  for (const p of packs) {
    if (p === 'opencv') { const f = pkg('opencv4') || pkg('opencv'); if (f) flags.push(...f); else notes.push(['OpenCV', 'Install OpenCV (e.g. sudo apt install libopencv-dev).']); }
    if (p === 'eigen') { const f = pkg('eigen3'); if (f) flags.push(...f); else notes.push(['Eigen', 'Install Eigen (e.g. sudo apt install libeigen3-dev).']); }
    if (p === 'torch') {
      const lt = process.env.LIBTORCH;
      if (lt) {
        flags.push(`-I${lt}/include`, `-I${lt}/include/torch/csrc/api/include`, `-L${lt}/lib`, `-Wl,-rpath,${lt}/lib`, '-ltorch_cpu', '-lc10');
        // Some libtorch builds (e.g. the PyPI wheels) use the old std::string ABI: match it, or nothing links.
        const nm = spawnSync('nm', ['-DC', '--defined-only', path.join(lt, 'lib', 'libc10.so')], { encoding: 'utf8', maxBuffer: 64 << 20 });
        const sym = (nm.stdout || '').split('\n').find(l => l.includes('torchInternalAssertFail') && l.includes('string const&'));
        if (sym && !sym.includes('__cxx11')) flags.push('-D_GLIBCXX_USE_CXX11_ABI=0');
      } else notes.push(['PyTorch (libtorch)', 'Download libtorch from pytorch.org and set LIBTORCH=/path/to/libtorch.']);
    }
    if (p === 'ros2') notes.push(['ROS 2', 'Build ROS 2 nodes inside a ROS workspace: lula translate the file to src/<name>.cpp and run colcon build.']);
    if (p === 'cuda') notes.push(['CUDA', 'Build with NVIDIA nvcc: lula build file --cxx nvcc -- -x cu']);
  }
  return { flags, notes };
}

/** Split library flags: library headers become system headers (their warnings are not the learner's problem). */
function splitLibFlags(libFlags) {
  return {
    defines: libFlags.filter(f => f.startsWith('-D')),
    includes: libFlags.filter(f => f.startsWith('-I')).flatMap(f => ['-isystem', f.slice(2)]),
    links: libFlags.filter(f => !f.startsWith('-I') && !f.startsWith('-D')),
  };
}

// ---- Arduino ------------------------------------------------------------------------------
const BOARDS = {
  uno: { mcu: 'atmega328p', variant: 'standard', define: 'ARDUINO_AVR_UNO', f: '16000000L', programmer: 'arduino', baud: '115200' },
  nano: { mcu: 'atmega328p', variant: 'eightanaloginputs', define: 'ARDUINO_AVR_NANO', f: '16000000L', programmer: 'arduino', baud: '115200' },
  mega: { mcu: 'atmega2560', variant: 'mega', define: 'ARDUINO_AVR_MEGA2560', f: '16000000L', programmer: 'wiring', baud: '115200' },
};

/** Where the Arduino IDE keeps its packages on this computer. */
function arduino15() {
  if (process.env.ARDUINO15) return process.env.ARDUINO15;
  if (process.platform === 'win32') return path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'Arduino15');
  if (process.platform === 'darwin') return path.join(os.homedir(), 'Library', 'Arduino15');
  return path.join(os.homedir(), '.arduino15');
}

function newestVersionDir(dir, test) {
  if (!fs.existsSync(dir)) return null;
  for (const v of fs.readdirSync(dir).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
    if (test(path.join(dir, v))) return path.join(dir, v);
  }
  return null;
}

/** The Arduino AVR core (cores/arduino/Arduino.h): from the Arduino IDE, the system, or ARDUINO_AVR_CORE. */
function findArduinoCore() {
  const hasCore = d => fs.existsSync(path.join(d, 'cores', 'arduino', 'Arduino.h'));
  if (process.env.ARDUINO_AVR_CORE && hasCore(process.env.ARDUINO_AVR_CORE)) return process.env.ARDUINO_AVR_CORE;
  const ide = newestVersionDir(path.join(arduino15(), 'packages', 'arduino', 'hardware', 'avr'), hasCore);
  if (ide) return ide;
  for (const d of ['/usr/share/arduino/hardware/arduino/avr', '/usr/local/share/arduino/hardware/arduino/avr']) if (hasCore(d)) return d;
  return null;
}

/** Find an AVR tool (avr-g++, avr-gcc, avr-objcopy, avr-size, avrdude): on PATH, or inside the Arduino IDE. */
function findTool(name) {
  if (!spawnSync(name, ['--version']).error || (name === 'avrdude' && !spawnSync(name, ['-?']).error)) return { cmd: name, args: [] };
  const tools = path.join(arduino15(), 'packages', 'arduino', 'tools');
  if (name === 'avrdude') {
    const d = newestVersionDir(path.join(tools, 'avrdude'), v => fs.existsSync(path.join(v, 'bin', 'avrdude' + EXE)));
    if (d) return { cmd: path.join(d, 'bin', 'avrdude' + EXE), args: ['-C', path.join(d, 'etc', 'avrdude.conf')] };
  } else {
    const d = newestVersionDir(path.join(tools, 'avr-gcc'), v => fs.existsSync(path.join(v, 'bin', 'avr-gcc' + EXE)));
    if (d) return { cmd: path.join(d, 'bin', name + EXE), args: [] };
  }
  return null;
}

/** Compiler flags for an Arduino program, and the core library sources it needs. */
function arduinoSetup(core, boardName, cppText) {
  const board = BOARDS[boardName || 'uno'];
  if (!board) return null;
  const common = [`-mmcu=${board.mcu}`, `-DF_CPU=${board.f}`, '-DARDUINO=10806', `-D${board.define}`, '-DARDUINO_ARCH_AVR', '-Os',
    '-ffunction-sections', '-fdata-sections', '-fdiagnostics-color=never'];
  const inc = [`-I${path.join(core, 'cores', 'arduino')}`, `-I${path.join(core, 'variants', board.variant)}`];
  // Libraries shipped with the core (Wire, SPI, EEPROM, SoftwareSerial, ...): used when their header is included.
  const included = new Set((cppText.match(/#\s*include\s*<([^>]+)>/g) || []).map(h => h.replace(/.*<|>/g, '')));
  const libSources = [];
  const libRoot = path.join(core, 'libraries');
  if (fs.existsSync(libRoot)) {
    for (const lib of fs.readdirSync(libRoot)) {
      const src = path.join(libRoot, lib, 'src');
      if (!fs.existsSync(src) || !fs.readdirSync(src).some(h => included.has(h))) continue;
      inc.push(`-I${src}`);
      const walk = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { inc.push(`-I${p}`); walk(p); } else if (/\.(c|cpp)$/.test(f)) libSources.push(p); } };
      walk(src);
    }
  }
  return { board, common, inc, libSources, cppFlags: ['-std=gnu++11', '-fno-exceptions', '-fno-threadsafe-statics'] };
}

module.exports = { C_ENV, EXE, packFlags, splitLibFlags, BOARDS, arduino15, findArduinoCore, findTool, arduinoSetup };
