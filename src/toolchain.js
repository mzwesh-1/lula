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
    if (p === 'ros2') notes.push(['ROS 2', 'Build ROS 2 nodes inside a ROS workspace: soga translate the file to src/<name>.cpp and run colcon build.']);
    if (p === 'cuda') notes.push(['CUDA', 'Build with NVIDIA nvcc: soga build file --cxx nvcc -- -x cu']);
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

// ---- arduino-cli: every board the Arduino IDE supports ------------------------------------------
/** Friendly board names -> fully qualified board names (FQBN). Any FQBN (vendor:arch:board) also works. */
const BOARD_ALIASES = {
  uno: { fqbn: 'arduino:avr:uno', name: 'Arduino Uno', core: 'arduino:avr' },
  nano: { fqbn: 'arduino:avr:nano', name: 'Arduino Nano', core: 'arduino:avr' },
  'nano-old': { fqbn: 'arduino:avr:nano:cpu=atmega328old', name: 'Arduino Nano (old bootloader)', core: 'arduino:avr' },
  mega: { fqbn: 'arduino:avr:mega', name: 'Arduino Mega 2560', core: 'arduino:avr' },
  leonardo: { fqbn: 'arduino:avr:leonardo', name: 'Arduino Leonardo', core: 'arduino:avr' },
  'uno-r4-minima': { fqbn: 'arduino:renesas_uno:minima', name: 'Arduino Uno R4 Minima', core: 'arduino:renesas_uno' },
  'uno-r4-wifi': { fqbn: 'arduino:renesas_uno:unor4wifi', name: 'Arduino Uno R4 WiFi', core: 'arduino:renesas_uno' },
  'nano-33-iot': { fqbn: 'arduino:samd:nano_33_iot', name: 'Arduino Nano 33 IoT', core: 'arduino:samd' },
  'nano-33-ble': { fqbn: 'arduino:mbed_nano:nano33ble', name: 'Arduino Nano 33 BLE / BLE Sense', core: 'arduino:mbed_nano' },
  pico: { fqbn: 'rp2040:rp2040:rpipico', name: 'Raspberry Pi Pico', core: 'rp2040:rp2040' },
  'pico-w': { fqbn: 'rp2040:rp2040:rpipicow', name: 'Raspberry Pi Pico W', core: 'rp2040:rp2040' },
  'pico-2': { fqbn: 'rp2040:rp2040:rpipico2', name: 'Raspberry Pi Pico 2', core: 'rp2040:rp2040' },
  esp32: { fqbn: 'esp32:esp32:esp32', name: 'ESP32 Dev Module', core: 'esp32:esp32' },
  'esp32-s3': { fqbn: 'esp32:esp32:esp32s3', name: 'ESP32-S3 Dev Module', core: 'esp32:esp32' },
  'esp32-c3': { fqbn: 'esp32:esp32:esp32c3', name: 'ESP32-C3 Dev Module', core: 'esp32:esp32' },
  esp8266: { fqbn: 'esp8266:esp8266:nodemcuv2', name: 'ESP8266 NodeMCU 1.0', core: 'esp8266:esp8266' },
  'stm32-bluepill': { fqbn: 'STMicroelectronics:stm32:GenF1:pnum=BLUEPILL_F103C8', name: 'STM32 Blue Pill (F103C8)', core: 'STMicroelectronics:stm32' },
  'stm32-blackpill': { fqbn: 'STMicroelectronics:stm32:GenF4:pnum=BLACKPILL_F411CE', name: 'STM32 Black Pill (F411CE)', core: 'STMicroelectronics:stm32' },
  'nucleo-f401re': { fqbn: 'STMicroelectronics:stm32:Nucleo_64:pnum=NUCLEO_F401RE', name: 'STM32 Nucleo-64 F401RE', core: 'STMicroelectronics:stm32' },
};
/** Board-manager URLs for the cores that are not built into arduino-cli. */
const CORE_URLS = {
  'esp32:esp32': 'https://espressif.github.io/arduino-esp32/package_esp32_index.json',
  'esp8266:esp8266': 'https://arduino.esp8266.com/stable/package_esp8266com_index.json',
  'rp2040:rp2040': 'https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json',
  'STMicroelectronics:stm32': 'https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json',
};

function boardInfo(board) {
  if (!board) return BOARD_ALIASES.uno;
  if (BOARD_ALIASES[board]) return BOARD_ALIASES[board];
  if (board.split(':').length >= 3) return { fqbn: board, name: board, core: board.split(':').slice(0, 2).join(':') };
  return null;
}

/** arduino-cli: on PATH, set by ARDUINO_CLI, or the copy inside Arduino IDE 2. */
function findArduinoCli() {
  const candidates = [process.env.ARDUINO_CLI, 'arduino-cli'];
  const res = path.join('resources', 'app', 'lib', 'backend', 'resources', 'arduino-cli' + EXE);
  if (process.platform === 'win32') {
    for (const base of [process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs'), process.env.ProgramFiles, process.env['ProgramFiles(x86)']].filter(Boolean)) {
      candidates.push(path.join(base, 'Arduino IDE', res), path.join(base, 'arduino-ide', res));
    }
  } else if (process.platform === 'darwin') {
    candidates.push('/Applications/Arduino IDE.app/Contents/Resources/app/lib/backend/resources/arduino-cli',
      path.join(os.homedir(), 'Applications/Arduino IDE.app/Contents/Resources/app/lib/backend/resources/arduino-cli'));
  } else {
    candidates.push('/opt/arduino-ide/' + res, path.join(os.homedir(), 'arduino-ide', res), '/usr/share/arduino-ide/' + res);
  }
  for (const c of candidates.filter(Boolean)) {
    if (c !== 'arduino-cli' && c !== process.env.ARDUINO_CLI && !fs.existsSync(c)) continue;
    const r = spawnSync(c, ['version'], { encoding: 'utf8' });
    if (!r.error && r.status === 0) return c;
  }
  return null;
}

function cliJson(cli, args) {
  const r = spawnSync(cli, [...args, '--json'], { encoding: 'utf8', env: C_ENV, maxBuffer: 64 << 20 });
  try { return JSON.parse(r.stdout); } catch { return null; }
}
/** Cores installed in arduino-cli (shared with the Arduino IDE). */
function installedCores(cli) {
  const j = cliJson(cli, ['core', 'list']);
  const list = (j && (j.platforms || j)) || [];
  return new Set((Array.isArray(list) ? list : []).map(p => p.id || (p.metadata && p.metadata.id)).filter(Boolean));
}
/** Boards plugged in right now: [{ port, protocol, boards: [{ name, fqbn }] }]. */
function connectedBoards(cli) {
  const j = cliJson(cli, ['board', 'list']);
  const list = (j && (j.detected_ports || j)) || [];
  return (Array.isArray(list) ? list : []).map(d => ({
    port: d.port && d.port.address, protocol: d.port && d.port.protocol, label: d.port && d.port.label,
    boards: (d.matching_boards || []).map(b => ({ name: b.name, fqbn: b.fqbn })),
  })).filter(d => d.port);
}

/** Make a sketch folder from translated code. Lines match the .soga file exactly. */
function writeSketch(dir, base, cppWithoutLineDirective) {
  const safe = base.replace(/[^A-Za-z0-9_]/g, '_').replace(/^[^A-Za-z]/, 's$&');
  const sketchDir = path.join(dir, safe);
  fs.mkdirSync(sketchDir, { recursive: true });
  const ino = path.join(sketchDir, `${safe}.ino`);
  fs.writeFileSync(ino, cppWithoutLineDirective);
  return { sketchDir, ino, name: safe };
}

/** Rewrite messages about the generated sketch so they point at the user's .soga file. */
function mapSketchPaths(text, ino, sogaFile) {
  if (!text) return text;
  const variants = new Set([ino, ino.replace(/\\/g, '/'), ino + '.cpp']);
  let out = text;
  for (const v of variants) out = out.split(v + '.cpp').join(sogaFile).split(v).join(sogaFile);
  return out;
}

/**
 * The exact compiler command arduino-cli would use for a sketch, turned into a syntax-only check.
 * Fast (no full build), and correct for every board. Returns { cmd, args, cwd } or { error }.
 */
function arduinoSyntaxCommand(cli, fqbn, sketchDir, buildPath) {
  const r = spawnSync(cli, ['compile', '--no-color', '--only-compilation-database', '--fqbn', fqbn, '--build-path', buildPath, sketchDir],
    { encoding: 'utf8', env: C_ENV, maxBuffer: 64 << 20 });
  const dbFile = path.join(buildPath, 'compile_commands.json');
  if (!fs.existsSync(dbFile)) return { error: (r.stderr || r.stdout || 'arduino-cli failed').trim() };
  let db;
  try { db = JSON.parse(fs.readFileSync(dbFile, 'utf8')); } catch (e) { return { error: String(e) }; }
  const entry = db.find(e => /\.ino\.cpp$/.test(e.file));
  if (!entry) return { error: 'no sketch entry in compile_commands.json' };
  let argv = entry.arguments || (entry.command.match(/"[^"]*"|\S+/g) || []).map(a => a.replace(/^"|"$/g, ''));
  const out = [];
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-o' || a === '-MF' || a === '-MT' || a === '-MQ') { i++; continue; }
    if (a === '-MMD' || a === '-MD' || a === '-c') continue;
    out.push(a);
  }
  out.push('-fsyntax-only', '-fdiagnostics-color=never');
  return { cmd: argv[0], args: out, cwd: entry.directory };
}

module.exports = { arduinoSyntaxCommand, C_ENV, EXE, packFlags, splitLibFlags, BOARDS, arduino15, findArduinoCore, findTool, arduinoSetup,
  BOARD_ALIASES, CORE_URLS, boardInfo, findArduinoCli, installedCores, connectedBoards, writeSketch, mapSketchPaths, cliJson };
