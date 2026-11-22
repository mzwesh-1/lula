'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { translate, convert, listLanguages, loadLanguage, detectLanguage, localizeMessage } = require('./translator');

const HELP = `Khanya - C++ in South African languages

Usage:
  khanya translate <file.zu.kh> [-o out.cpp]       Write the C++ translation
  khanya build <file.zu.kh> [-o program] [options] [-- compiler flags]
  khanya run <file.zu.kh> [options] [-- compiler flags]
  khanya check <file.zu.kh>                        Check for errors only
  khanya convert <file> --to <zu|af|cpp> [-o out]  Convert C++ -> Khanya, or between languages
  khanya keywords [zu|af|...]                      Show the keyword table
  khanya languages                                  List languages

Options:
  --lang <code>     Language (default: from file name, e.g. robot.zu.kh)
  --cxx <compiler>  C++ compiler (default: g++). For robots/embedded use e.g.
                    avr-g++, arm-none-eabi-g++, xtensa-esp32-elf-g++
  --no-defaults     Do not add the default flags (-std=c++20 -O2)

Examples:
  khanya run examples/sawubona.zu.kh
  khanya build robot.zu.kh --cxx avr-g++ -- -mmcu=atmega328p -Os
  khanya translate robot.zu.kh -o robot/robot.ino     (open in Arduino IDE)
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
    else if (a === '--no-defaults') args.noDefaults = true;
    else if (a === '-h' || a === '--help') args.help = true;
    else args._.push(a);
  }
  return args;
}

function fail(msg) { process.stderr.write(msg + '\n'); process.exit(1); }

function translateFile(file, langOpt) {
  if (!file) fail('Khanya: no input file given. Try: khanya --help');
  if (!fs.existsSync(file)) fail(`Khanya: file not found: ${file}`);
  const lang = langOpt || detectLanguage(file);
  if (!lang) fail(`Khanya: cannot tell the language of '${file}'. Name it like program.zu.kh or pass --lang zu`);
  const source = fs.readFileSync(file, 'utf8');
  const { cpp } = translate(source, lang, { fileName: path.resolve(file) });
  return { cpp, lang };
}

function tempCpp(file, cpp) {
  const dir = path.join(os.tmpdir(), 'khanya');
  fs.mkdirSync(dir, { recursive: true });
  const hash = crypto.createHash('sha1').update(path.resolve(file)).digest('hex').slice(0, 10);
  const base = path.basename(file).replace(/\.[a-z]{2,3}\.kh$/i, '').replace(/\.kh$/i, '');
  const cppPath = path.join(dir, `${base}-${hash}.cpp`);
  fs.writeFileSync(cppPath, cpp);
  return { dir, base, hash, cppPath };
}

function compile(args, { syntaxOnly = false, outPath } = {}) {
  const file = args._[1];
  const { cpp, lang } = translateFile(file, args.lang);
  const tmp = tempCpp(file, cpp);
  const cxx = args.cxx || process.env.KHANYA_CXX || 'g++';
  const flags = args.noDefaults ? [] : ['-std=c++20', '-O2'];
  const exe = outPath || path.join(tmp.dir, tmp.base + '-' + tmp.hash + (process.platform === 'win32' ? '.exe' : ''));
  const cmd = [...flags, ...args.extra, tmp.cppPath, ...(syntaxOnly ? ['-fsyntax-only'] : ['-o', exe])];
  const r = spawnSync(cxx, cmd, { encoding: 'utf8' });
  if (r.error) fail(`Khanya: could not start compiler '${cxx}': ${r.error.message}`);
  if (r.stderr) process.stderr.write(localizeMessage(r.stderr, lang));
  if (r.status !== 0) process.exit(r.status || 1);
  return exe;
}

function main(argv) {
  const args = parseArgs(argv);
  const cmd = args._[0];
  if (!cmd || args.help) { process.stdout.write(HELP); return; }

  switch (cmd) {
    case 'translate': {
      const { cpp } = translateFile(args._[1], args.lang);
      if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(args.out, cpp); }
      else process.stdout.write(cpp);
      break;
    }
    case 'build': {
      const file = args._[1] || '';
      const def = file.replace(/\.[a-z]{2,3}\.kh$/i, '').replace(/\.kh$/i, '') + (process.platform === 'win32' ? '.exe' : '');
      const exe = compile(args, { outPath: path.resolve(args.out || def) });
      process.stderr.write(`Khanya: built ${exe}\n`);
      break;
    }
    case 'convert': {
      const file = args._[1];
      if (!file || !fs.existsSync(file)) fail(`Khanya: file not found: ${file || ''}`);
      if (!args.to) fail('Khanya: say which language to convert to, e.g. --to zu');
      const from = args.lang || (/\.(c|cc|cpp|cxx|h|hpp|ino)$/i.test(file) ? 'cpp' : detectLanguage(file));
      if (!from) fail(`Khanya: cannot tell the language of '${file}'. Pass --lang zu or --lang cpp`);
      const result = convert(fs.readFileSync(file, 'utf8'), from, args.to);
      if (args.out) fs.writeFileSync(args.out, result); else process.stdout.write(result);
      break;
    }
    case 'check': compile(args, { syntaxOnly: true }); process.stderr.write('Khanya: OK\n'); break;
    case 'run': {
      const exe = compile(args);
      const r = spawnSync(exe, [], { stdio: 'inherit' });
      process.exit(r.status === null ? 1 : r.status);
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
    default: fail(`Khanya: unknown command '${cmd}'. Try: khanya --help`);
  }
}

module.exports = { main };
if (require.main === module) main(process.argv.slice(2));
