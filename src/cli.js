'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { translate, convert, listLanguages, loadLanguage, detectLanguage } = require('./translator');
const M = require('./messages');
const T = require('./toolchain');

const HELP = `Soga - C++ in South African languages

Usage:
  soga translate <file.zu.soga> [-o out.cpp]       Write the C++ translation
  soga build <file.zu.soga> [-o program] [options] [-- compiler flags]
  soga run <file.zu.soga> [options] [-- compiler flags]
  soga check <file.zu.soga>                        Check for errors only
  soga arduino <file.zu.soga> [--board uno|esp32|pico|...] [--upload [PORT]]
                                                   Build for an Arduino-compatible board (and upload it)
  soga boards [--install esp32]                    Boards Soga knows; install a board package
  soga ports                                       Boards plugged in right now
  soga convert <file> --to <zu|af|cpp> [-o out]  Convert C++ -> Soga, or between languages
  soga sasl status | check | list [-o file]       SASL sign-video dictionary
  soga sasl show <word> [--lang zu]               Which sign a word uses
  soga sasl add <concept> <video.mp4|https-url> --signer "Name" --license CC-BY-4.0 --consent
                  [--gloss IF] [--region Gauteng] [--reviewed-by "Name"] [--note "..."]
  soga sasl remove <concept>
  soga keywords [zu|af|...]                      Show the keyword table
  soga languages                                  List languages

Options:
  --lang <code>     Language (default: from file name, e.g. robot.zu.soga)
  --cxx <compiler>  C++ compiler (default: g++). For robots/embedded use e.g.
                    avr-g++, arm-none-eabi-g++, xtensa-esp32-elf-g++
  --no-defaults     Do not add the default flags (-std=c++20 -O2)
  --pack <id>       Switch on a library pack without including its header
                    (ros2, opencv, eigen, cuda, torch, arduino-libs)
  --target arduino  Treat the file as an Arduino program
  --msg-lang <code> Language for messages (default: the file's language; 'en' for English)

Examples:
  soga run examples/sawubona.zu.soga
  soga build robot.zu.soga --cxx avr-g++ -- -mmcu=atmega328p -Os
  soga translate robot.zu.soga -o robot/robot.ino     (open in Arduino IDE)
`;

function parseArgs(argv) {
  const args = { _: [], extra: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { args.extra = argv.slice(i + 1); break; }
    if (a === '-o') args.out = argv[++i];
    else if (a === '--lang') args.lang = argv[++i];
    else if (a === '--cxx') args.cxx = argv[++i];
    else if (a === '--to') args.to = argv[++i];
    else if (a === '--pack') (args.packs = args.packs || []).push(argv[++i]);
    else if (a === '--target') args.target = argv[++i];
    else if (a === '--board') args.board = argv[++i];
    else if (a === '--upload') args.upload = (argv[i + 1] && !argv[i + 1].startsWith('-')) ? argv[++i] : 'auto';
    else if (a === '--install') args.install = argv[++i];
    else if (a === '--msg-lang') args.msgLang = argv[++i];
    else if (a === '--check') args.check = true;
    else if (a === '--no-defaults') args.noDefaults = true;
    else if (a === '--signer') args.signer = argv[++i];
    else if (a === '--license') args.license = argv[++i];
    else if (a === '--consent') args.consent = true;
    else if (a === '--gloss') args.gloss = argv[++i];
    else if (a === '--region') args.region = argv[++i];
    else if (a === '--reviewed-by') args.reviewedBy = argv[++i];
    else if (a === '--note') args.note = argv[++i];
    else if (a === '--dict') args.dict = argv[++i];
    else if (a === '-h' || a === '--help') args.help = true;
    else args._.push(a);
  }
  return args;
}

function fail(msg) { process.stderr.write(msg + '\n'); process.exit(1); }

let msgLang = 'en'; // language for Soga's own messages: the file's language once it is known

function translateFile(file, args, extra = {}) {
  if (!file) fail('Soga: no input file given. Try: soga --help');
  if (!fs.existsSync(file)) fail(`Soga: ${M.t('cli.not_found', msgLang, file)}`);
  const lang = args.lang || detectLanguage(file);
  if (!lang) fail(`Soga: cannot tell the language of '${file}'. Name it like program.zu.soga or pass --lang zu`);
  msgLang = args.msgLang || lang;
  const source = fs.readFileSync(file, 'utf8');
  const r = translate(source, lang, { fileName: path.resolve(file), packs: args.packs, target: args.target, ...extra });
  return { ...r, lang };
}

function tempCpp(file, cpp, ext = '.cpp') {
  const dir = path.join(os.tmpdir(), 'soga');
  fs.mkdirSync(dir, { recursive: true });
  const hash = crypto.createHash('sha1').update(path.resolve(file)).digest('hex').slice(0, 10);
  const base = path.basename(file).replace(/\.[a-z]{2,3}\.soga$/i, '').replace(/\.soga$/i, '');
  const cppPath = path.join(dir, `${base}-${hash}${ext}`);
  fs.writeFileSync(cppPath, cpp);
  return { dir, base, hash, cppPath };
}

function compile(args, { syntaxOnly = false, outPath } = {}) {
  const file = args._[1];
  const r = translateFile(file, args);
  const cxx = args.cxx || process.env.SOGA_CXX || 'g++';
  if (r.arduino && args.target !== 'host' && !/avr|arm-none|xtensa|riscv/.test(cxx)) {
    const lang = loadLanguage(r.lang);
    const local = (cpp) => [...lang.libraryMap].find(([, c]) => c === cpp)?.[0] || cpp;
    process.stderr.write(`Soga: ${M.t('cli.arduino_hint', msgLang, local('setup'), local('loop'), file)}\n`);
    process.exit(1);
  }
  const tmp = tempCpp(file, r.cpp);
  const { flags: libFlags, notes } = T.packFlags(r.packs);
  for (const [name, how] of notes) process.stderr.write(`Soga: ${M.t('cli.pack_hint', msgLang, name, how)}\n`);
  const flags = args.noDefaults ? [] : ['-std=c++20', '-O2'];
  // Windows (MinGW): build statically, so the program runs even when g++'s DLLs are not on PATH
  // (winget only adds a shortcut to g++.exe, not its runtime libraries).
  if (process.platform === 'win32' && !args.noDefaults && !syntaxOnly && /g\+\+|gcc/i.test(path.basename(cxx))) flags.push('-static');
  const exe = outPath || path.join(tmp.dir, tmp.base + '-' + tmp.hash + (process.platform === 'win32' ? '.exe' : ''));
  const lib = T.splitLibFlags(libFlags);
  const cmd = [...flags, '-fdiagnostics-color=never', ...lib.defines, ...lib.includes, ...args.extra, tmp.cppPath, ...(syntaxOnly ? ['-fsyntax-only'] : ['-o', exe, ...lib.links])];
  const out = spawnSync(cxx, cmd, { encoding: 'utf8', env: T.C_ENV });
  if (out.error) fail(`Soga: ${M.t('cli.compiler_missing', msgLang, cxx)}`);
  if (out.stderr) process.stderr.write(M.localizeDiagnostics(out.stderr, r.lang === msgLang ? r.lang : msgLang));
  if (out.status !== 0) process.exit(out.status || 1);
  return exe;
}

/** Run a built program; translate uncaught-exception and crash messages, keep the program's own output. */
function runProgram(exe, lang) {
  const child = require('child_process').spawn(exe, [], { stdio: ['inherit', 'inherit', 'pipe'] });
  let buf = '';
  child.stderr.on('data', d => {
    buf += d.toString();
    const lines = buf.split('\n'); buf = lines.pop();
    for (const l of lines) process.stderr.write(M.localizeRuntime(l, lang) + '\n');
  });
  child.on('close', (code, signal) => {
    if (buf) process.stderr.write(M.localizeRuntime(buf, lang));
    // Windows: 0xC0000135 = a DLL the program needs was not found; 0xC0000139 = wrong DLL version
    if (code === 3221225781 || code === 3221225785 || code === -1073741515 || code === -1073741511) {
      process.stderr.write('Soga: the program could not start: a library it needs (DLL) was not found. Rebuild it, or add the folder of g++ to PATH.\n');
    }
    if (signal) {
      const msg = M.signalMessage(signal, lang);
      process.stderr.write(`Soga: ${msg || signal}\n`);
      process.exit(128 + (os.constants.signals[signal] || 1));
    }
    process.exit(code ?? 1);
  });
}

// ---- Arduino ----------------------------------------------------------------------------------
/** Old direct AVR build (used only when arduino-cli is not available). */
function arduinoDirect(args) {
  const file = args._[1];
  const boardName = args.board || 'uno';
  if (!T.BOARDS[boardName]) fail(`Soga: unknown board '${boardName}'. Boards: ${Object.keys(T.BOARDS).join(', ')}`);
  const r = translateFile(file, { ...args, target: 'arduino' });
  const core = T.findArduinoCore();
  if (!core) fail('Soga: Arduino AVR core not found. Install the Arduino IDE (and the "Arduino AVR Boards" package), or sudo apt install arduino-core-avr gcc-avr avr-libc, or set ARDUINO_AVR_CORE.');
  const gpp = T.findTool('avr-g++'), gcc = T.findTool('avr-gcc');
  if (!gpp || !gcc) fail(`Soga: ${M.t('cli.compiler_missing', msgLang, 'avr-g++')} (Arduino IDE, or: sudo apt install gcc-avr avr-libc)`);
  const tmp = tempCpp(file, '#include <Arduino.h>\n' + r.cpp);
  const setup = T.arduinoSetup(core, boardName, r.cpp);
  const build = path.join(tmp.dir, `${tmp.base}-${tmp.hash}-${boardName}`);
  fs.rmSync(build, { recursive: true, force: true });
  fs.mkdirSync(build, { recursive: true });
  const cc = (src, obj) => {
    const isCpp = /\.cpp$/.test(src), isAsm = /\.S$/.test(src);
    const tool = isCpp ? gpp : gcc;
    const flags = isCpp ? setup.cppFlags : (isAsm ? ['-x', 'assembler-with-cpp'] : ['-std=gnu11']);
    return spawnSync(tool.cmd, ['-c', ...setup.common, ...flags, ...setup.inc, src, '-o', obj], { encoding: 'utf8', env: T.C_ENV });
  };
  // 1. The user's program: errors shown in their language.
  const mainObj = path.join(build, 'program.o');
  let res = cc(tmp.cppPath, mainObj);
  if (res.stderr) process.stderr.write(M.localizeDiagnostics(res.stderr, msgLang));
  if (res.status !== 0) process.exit(res.status || 1);
  if (args.check) { process.stderr.write(`Soga: ${M.t('cli.ok', msgLang)}\n`); return; }
  // 2. The Arduino core and libraries.
  const coreDir = path.join(core, 'cores', 'arduino');
  const objs = [mainObj];
  const sources = [...fs.readdirSync(coreDir).filter(f => /\.(c|cpp|S)$/.test(f)).map(f => path.join(coreDir, f)), ...setup.libSources];
  sources.forEach((src, k) => {
    const obj = path.join(build, `${k}-${path.basename(src)}.o`);
    const out = cc(src, obj);
    if (out.status !== 0) fail(`Soga: building the Arduino core failed:\n${out.stderr}`);
    objs.push(obj);
  });
  // 3. Link and make the .hex file.
  const elf = path.join(build, 'program.elf');
  res = spawnSync(gcc.cmd, [`-mmcu=${setup.board.mcu}`, '-Os', '-Wl,--gc-sections', ...objs, '-o', elf, '-lm'], { encoding: 'utf8', env: T.C_ENV });
  if (res.stderr) process.stderr.write(M.localizeDiagnostics(res.stderr, msgLang));
  if (res.status !== 0) process.exit(res.status || 1);
  const hex = path.resolve(args.out || file.replace(/(\.[a-z]{2,3})?\.soga$/i, '') + '.hex');
  const objcopy = T.findTool('avr-objcopy');
  res = spawnSync(objcopy ? objcopy.cmd : 'avr-objcopy', ['-O', 'ihex', '-R', '.eeprom', elf, hex], { encoding: 'utf8' });
  if (res.status !== 0) fail(`Soga: avr-objcopy failed: ${res.stderr || res.error}`);
  const size = T.findTool('avr-size');
  const sizeOut = size ? (spawnSync(size.cmd, [elf], { encoding: 'utf8' }).stdout || '') : '';
  process.stderr.write(`Soga: ${M.t('cli.built', msgLang, hex)}\n${sizeOut}`);
  if (args.upload) {
    const dude = T.findTool('avrdude');
    if (!dude) fail('Soga: avrdude not found (install the Arduino IDE, or: sudo apt install avrdude)');
    const up = spawnSync(dude.cmd, [...dude.args, '-p', setup.board.mcu, '-c', setup.board.programmer, '-P', args.upload,
      '-b', setup.board.baud, '-D', '-U', `flash:w:${hex}:i`], { stdio: 'inherit' });
    process.exit(up.status ?? 1);
  }
}


/** Build (and upload) for any board the Arduino IDE supports, through arduino-cli. */
function arduino(args) {
  const file = args._[1];
  const cli = T.findArduinoCli();
  const info = T.boardInfo(args.board || 'uno');
  if (!info) fail(`Soga: unknown board '${args.board}'. ${Object.keys(T.BOARD_ALIASES).join(', ')}, or a full board name such as arduino:avr:uno`);
  if (!cli) {
    if (['uno', 'nano', 'mega', undefined].includes(args.board)) return arduinoDirect(args);
    fail(`Soga: ${M.t('cli.no_arduino_cli', msgLang)}`);
  }
  const r = translateFile(file, { ...args, target: 'arduino' }, { lineDirective: false });
  if (!T.installedCores(cli).has(info.core)) fail(`Soga: ${M.t('cli.core_missing', msgLang, info.name, args.board || 'uno')}`);
  const sogaFile = path.resolve(file);
  const hash = crypto.createHash('sha1').update(sogaFile).digest('hex').slice(0, 10);
  const base = path.basename(file).replace(/(\.[a-z]{2,3})?\.soga$/i, '');
  const work = path.join(os.tmpdir(), 'soga', `sketch-${hash}`);
  const sk = T.writeSketch(work, base, r.cpp);
  const fqbnSafe = info.fqbn.replace(/[^A-Za-z0-9]/g, '_');
  const buildPath = path.join(os.tmpdir(), 'soga', `build-${hash}-${fqbnSafe}`);
  const outDir = path.join(os.tmpdir(), 'soga', `out-${hash}-${fqbnSafe}`);
  fs.rmSync(outDir, { recursive: true, force: true });
  const cmd = ['compile', '--no-color', '--fqbn', info.fqbn, '--build-path', buildPath, '--output-dir', outDir, '--warnings', 'default'];
  let port = args.upload;
  if (port && !args.check) {
    if (port === 'auto' || port === true) {
      const found = T.connectedBoards(cli);
      const match = found.find(d => d.boards.some(b => b.fqbn === info.fqbn)) || found.find(d => d.protocol === 'serial') || found[0];
      if (!match) fail(`Soga: ${M.t('cli.no_port', msgLang)}`);
      port = match.port;
    }
    cmd.push('--upload', '-p', port);
  }
  cmd.push(sk.sketchDir);
  const res = spawnSync(cli, cmd, { encoding: 'utf8', env: T.C_ENV, maxBuffer: 64 << 20 });
  if (res.error) fail(`Soga: ${M.t('cli.no_arduino_cli', msgLang)}`);
  // Keep what matters to the learner; drop arduino-cli's own bookkeeping (platform tables, "Error during build").
  const noise = l => /^(Used (library|platform)|Error during build|Compilation error|Error during Upload)\b/.test(l) || /^\S+ +\d[\w.-]* +\//.test(l);
  const show = text => (text ? M.localizeArduinoOutput(T.mapSketchPaths(text.replace(/\x1b\[[0-9;]*m/g, ''), sk.ino, sogaFile), msgLang)
    .split('\n').filter(l => !noise(l)).join('\n').replace(/\n{3,}/g, '\n\n') : '');
  const compilerOut = show(res.stderr), toolOut = show(res.stdout);
  // arduino-cli prints compiler errors on stderr and sizes / upload progress on stdout
  if (compilerOut.trim()) process.stderr.write(compilerOut.replace(/\n?Compilation error: exit status \d+\n?$/, '\n'));
  if (res.status !== 0) { if (toolOut.trim()) process.stderr.write(toolOut); process.exit(res.status || 1); }
  process.stderr.write(toolOut.split('\n').filter(l => !/^(Used (library|platform)|[A-Za-z0-9_.-]+ +[\d.]+ +\/)/.test(l)).join('\n').replace(/\n+$/, '\n'));
  if (args.check) { process.stderr.write(`Soga: ${M.t('cli.ok', msgLang)}\n`); return; }
  // The program file for the board: .hex (AVR, R4, ...), .bin (ESP32, STM32, ...), .uf2 (Pico)
  const files = fs.existsSync(outDir) ? fs.readdirSync(outDir) : [];
  const wantedExt = args.out ? path.extname(args.out).toLowerCase() : '';
  const pick = files.find(f => wantedExt && f.endsWith(wantedExt) && !/with_bootloader|\.bootloader|\.partitions|merged/.test(f)) ||
    ['.uf2', '.hex', '.bin'].map(e => files.find(f => f.endsWith(e) && !/with_bootloader|\.bootloader|\.partitions|merged/.test(f))).find(Boolean);
  if (pick) {
    const dest = args.out ? path.resolve(args.out) : path.resolve(path.dirname(file), `${base}${path.extname(pick)}`);
    fs.copyFileSync(path.join(outDir, pick), dest);
    process.stderr.write(`Soga: ${M.t('cli.built', msgLang, dest)}\n`);
  }
}

/** soga boards: the boards Soga knows, which packages are installed, what is plugged in. */
function boards(args) {
  const cli = T.findArduinoCli();
  if (!cli) fail(`Soga: ${M.t('cli.no_arduino_cli', msgLang)}`);
  if (args.install) {
    const info = T.boardInfo(args.install);
    if (!info) fail(`Soga: unknown board '${args.install}'`);
    const url = T.CORE_URLS[info.core];
    const env = { ...process.env };
    if (url) spawnSync(cli, ['config', 'add', 'board_manager.additional_urls', url], { stdio: 'inherit', env });
    spawnSync(cli, ['core', 'update-index'], { stdio: 'inherit', env });
    const r = spawnSync(cli, ['core', 'install', info.core], { stdio: 'inherit', env });
    process.exit(r.status ?? 1);
  }
  const cores = T.installedCores(cli);
  const plugged = T.connectedBoards(cli);
  const rows = Object.entries(T.BOARD_ALIASES).map(([alias, b]) => {
    const port = plugged.find(d => d.boards.some(x => x.fqbn === b.fqbn));
    return `${cores.has(b.core) ? '✓' : '·'} ${alias.padEnd(16)} ${b.name.padEnd(34)} ${b.fqbn}${port ? `   ← ${port.port}` : ''}`;
  });
  console.log(rows.join('\n'));
  console.log(`\n✓ = installed. Any other board: --board <fqbn> (see: ${cli} board listall)`);
}

function ports() {
  const cli = T.findArduinoCli();
  if (!cli) fail(`Soga: ${M.t('cli.no_arduino_cli', msgLang)}`);
  const plugged = T.connectedBoards(cli);
  if (!plugged.length) { console.log(M.t('cli.no_port', msgLang)); return; }
  for (const d of plugged) console.log(`${d.port.padEnd(16)} ${d.protocol || ''}  ${d.boards.map(b => `${b.name} (${b.fqbn})`).join(', ')}`);
}

function sasl(args) {
  const S = require('./sasl');
  const dir = args.dict ? path.resolve(args.dict) : S.defaultDir();
  const sub = args._[1];
  try {
    switch (sub) {
      case 'status': {
        const st = S.status(dir);
        console.log(`SASL signs recorded: ${st.recorded} / ${st.total} concepts`);
        console.log(`Priority signs:      ${st.priorityRecorded} / ${st.priorityTotal}`);
        if (st.neededPriority.length) console.log(`Next to record:      ${st.neededPriority.slice(0, 12).join(', ')}${st.neededPriority.length > 12 ? ', ...' : ''}`);
        break;
      }
      case 'check': {
        const problems = S.validate(dir);
        if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
        console.log('SASL dictionary OK');
        break;
      }
      case 'list': {
        const md = S.recordingList(dir);
        if (args.out) fs.writeFileSync(args.out, md); else process.stdout.write(md + '\n');
        break;
      }
      case 'show': {
        const word = args._[2];
        if (!word) fail('Soga: which word? e.g. soga sasl show uma --lang zu');
        const r = S.lookup(word, args.lang || null, dir);
        if (!r) fail(`Soga: '${word}' is not a Soga keyword or library name${args.lang ? '' : ' (add --lang zu?)'}`);
        console.log(`${word} -> C++ ${r.concept}`);
        console.log(r.entry ? `SASL sign: ${r.video}\nSigned by ${r.entry.signer} (${r.entry.license})` : 'No SASL sign recorded yet for this concept.');
        break;
      }
      case 'add': {
        const [concept, video] = [args._[2], args._[3]];
        if (!concept || !video) fail('Soga: usage: soga sasl add <concept> <video.mp4> --signer "Name" --license CC-BY-4.0 --consent');
        let source = video;
        if (/\.mp4$/i.test(video) && fs.existsSync(video) && args.consent) {
          // VS Code's built-in player may not play H.264 .mp4; .webm (VP9) always plays. Convert when ffmpeg exists.
          const webm = path.join(os.tmpdir(), `soga-sasl-${process.pid}.webm`);
          const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', video, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '33', webm]);
          if (!r.error && r.status === 0) { source = webm; console.log('Converted to .webm so it plays in VS Code.'); }
          else console.log('Warning: could not convert to .webm (is ffmpeg installed?). Some VS Code versions cannot play .mp4.');
        }
        S.addSign(concept, source, { signer: args.signer, license: args.license, consent: !!args.consent, gloss: args.gloss,
          region: args.region, reviewedBy: args.reviewedBy, note: args.note }, dir);
        if (source !== video) fs.rmSync(source, { force: true });
        console.log(`Added SASL sign for '${concept}'.`);
        break;
      }
      case 'remove':
        if (!S.removeSign(args._[2], dir)) fail(`Soga: no SASL sign recorded for '${args._[2]}'`);
        console.log(`Removed SASL sign for '${args._[2]}'.`);
        break;
      default: fail('Soga: sasl commands: status, check, list, show, add, remove');
    }
  } catch (e) { fail(e.message); }
}

function main(argv) {
  const args = parseArgs(argv);
  const cmd = args._[0];
  if (!cmd || args.help) { process.stdout.write(HELP); return; }

  switch (cmd) {
    case 'translate': {
      const { cpp } = translateFile(args._[1], args);
      if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(args.out, cpp); }
      else process.stdout.write(cpp);
      break;
    }
    case 'build': {
      const file = args._[1] || '';
      const def = file.replace(/\.[a-z]{2,3}\.soga$/i, '').replace(/\.soga$/i, '') + (process.platform === 'win32' ? '.exe' : '');
      const exe = compile(args, { outPath: path.resolve(args.out || def) });
      process.stderr.write(`Soga: ${M.t('cli.built', msgLang, exe)}\n`);
      break;
    }
    case 'convert': {
      const file = args._[1];
      if (!file || !fs.existsSync(file)) fail(`Soga: file not found: ${file || ''}`);
      if (!args.to) fail('Soga: say which language to convert to, e.g. --to zu');
      const from = args.lang || (/\.(c|cc|cpp|cxx|h|hpp|ino)$/i.test(file) ? 'cpp' : detectLanguage(file));
      if (!from) fail(`Soga: cannot tell the language of '${file}'. Pass --lang zu or --lang cpp`);
      const result = convert(fs.readFileSync(file, 'utf8'), from, args.to);
      if (args.out) fs.writeFileSync(args.out, result); else process.stdout.write(result);
      break;
    }
    case 'check': compile(args, { syntaxOnly: true }); process.stderr.write(`Soga: ${M.t('cli.ok', msgLang)}\n`); break;
    case 'arduino': arduino(args); break;
    case 'boards': boards(args); break;
    case 'ports': ports(); break;
    case 'sasl': sasl(args); break;
    case 'run': {
      const exe = compile(args);
      runProgram(exe, msgLang);
      break;
    }
    case 'languages':
      for (const l of listLanguages()) console.log(`${l.code}\t${l.name}${l.status ? '\t(' + l.status + ')' : ''}`);
      break;
    case 'keywords': {
      const lang = loadLanguage(args._[1] || args.lang || 'zu');
      console.log(`${lang.name} -> C++`);
      for (const [category, table] of Object.entries(lang.keywords)) {
        console.log(`\n[${category}]`);
        for (const [local, cpp] of Object.entries(table)) console.log(`  ${local.padEnd(28)} ${cpp}`);
      }
      console.log('\n[preprocessor]');
      for (const [local, cpp] of lang.directiveMap) console.log(`  #${local.padEnd(27)} #${cpp}`);
      console.log('\n[headers]');
      for (const [local, cpp] of lang.headerMap) console.log(`  <${local}>`.padEnd(30) + ` <${cpp}>`);
      for (const [category, table] of Object.entries(lang.library)) {
        console.log(`\n[${category}]`);
        for (const [local, cpp] of Object.entries(table)) console.log(`  ${local.padEnd(28)} ${cpp}`);
      }
      break;
    }
    default: fail(`Soga: unknown command '${cmd}'. Try: soga --help`);
  }
}

module.exports = { main };
if (require.main === module) main(process.argv.slice(2));
