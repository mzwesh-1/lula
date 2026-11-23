'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { translate, convert, listLanguages, loadLanguage, detectLanguage, localizeMessage } = require('./translator');

const HELP = `Lula - C++ in South African languages

Usage:
  lula translate <file.zu.lula> [-o out.cpp]       Write the C++ translation
  lula build <file.zu.lula> [-o program] [options] [-- compiler flags]
  lula run <file.zu.lula> [options] [-- compiler flags]
  lula check <file.zu.lula>                        Check for errors only
  lula convert <file> --to <zu|af|cpp> [-o out]  Convert C++ -> Lula, or between languages
  lula sasl status | check | list [-o file]       SASL sign-video dictionary
  lula sasl show <word> [--lang zu]               Which sign a word uses
  lula sasl add <concept> <video.mp4|https-url> --signer "Name" --license CC-BY-4.0 --consent
                  [--gloss IF] [--region Gauteng] [--reviewed-by "Name"] [--note "..."]
  lula sasl remove <concept>
  lula keywords [zu|af|...]                      Show the keyword table
  lula languages                                  List languages

Options:
  --lang <code>     Language (default: from file name, e.g. robot.zu.lula)
  --cxx <compiler>  C++ compiler (default: g++). For robots/embedded use e.g.
                    avr-g++, arm-none-eabi-g++, xtensa-esp32-elf-g++
  --no-defaults     Do not add the default flags (-std=c++20 -O2)

Examples:
  lula run examples/sawubona.zu.lula
  lula build robot.zu.lula --cxx avr-g++ -- -mmcu=atmega328p -Os
  lula translate robot.zu.lula -o robot/robot.ino     (open in Arduino IDE)
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

function translateFile(file, langOpt) {
  if (!file) fail('Lula: no input file given. Try: lula --help');
  if (!fs.existsSync(file)) fail(`Lula: file not found: ${file}`);
  const lang = langOpt || detectLanguage(file);
  if (!lang) fail(`Lula: cannot tell the language of '${file}'. Name it like program.zu.lula or pass --lang zu`);
  const source = fs.readFileSync(file, 'utf8');
  const { cpp } = translate(source, lang, { fileName: path.resolve(file) });
  return { cpp, lang };
}

function tempCpp(file, cpp) {
  const dir = path.join(os.tmpdir(), 'lula');
  fs.mkdirSync(dir, { recursive: true });
  const hash = crypto.createHash('sha1').update(path.resolve(file)).digest('hex').slice(0, 10);
  const base = path.basename(file).replace(/\.[a-z]{2,3}\.lula$/i, '').replace(/\.lula$/i, '');
  const cppPath = path.join(dir, `${base}-${hash}.cpp`);
  fs.writeFileSync(cppPath, cpp);
  return { dir, base, hash, cppPath };
}

function compile(args, { syntaxOnly = false, outPath } = {}) {
  const file = args._[1];
  const { cpp, lang } = translateFile(file, args.lang);
  const tmp = tempCpp(file, cpp);
  const cxx = args.cxx || process.env.LULA_CXX || 'g++';
  const flags = args.noDefaults ? [] : ['-std=c++20', '-O2'];
  const exe = outPath || path.join(tmp.dir, tmp.base + '-' + tmp.hash + (process.platform === 'win32' ? '.exe' : ''));
  const cmd = [...flags, ...args.extra, tmp.cppPath, ...(syntaxOnly ? ['-fsyntax-only'] : ['-o', exe])];
  const r = spawnSync(cxx, cmd, { encoding: 'utf8' });
  if (r.error) fail(`Lula: could not start compiler '${cxx}': ${r.error.message}`);
  if (r.stderr) process.stderr.write(localizeMessage(r.stderr, lang));
  if (r.status !== 0) process.exit(r.status || 1);
  return exe;
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
        if (!word) fail('Lula: which word? e.g. lula sasl show uma --lang zu');
        const r = S.lookup(word, args.lang || null, dir);
        if (!r) fail(`Lula: '${word}' is not a Lula keyword or library name${args.lang ? '' : ' (add --lang zu?)'}`);
        console.log(`${word} -> C++ ${r.concept}`);
        console.log(r.entry ? `SASL sign: ${r.video}\nSigned by ${r.entry.signer} (${r.entry.license})` : 'No SASL sign recorded yet for this concept.');
        break;
      }
      case 'add': {
        const [concept, video] = [args._[2], args._[3]];
        if (!concept || !video) fail('Lula: usage: lula sasl add <concept> <video.mp4> --signer "Name" --license CC-BY-4.0 --consent');
        let source = video;
        if (/\.mp4$/i.test(video) && fs.existsSync(video) && args.consent) {
          // VS Code's built-in player may not play H.264 .mp4; .webm (VP9) always plays. Convert when ffmpeg exists.
          const webm = path.join(os.tmpdir(), `lula-sasl-${process.pid}.webm`);
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
        if (!S.removeSign(args._[2], dir)) fail(`Lula: no SASL sign recorded for '${args._[2]}'`);
        console.log(`Removed SASL sign for '${args._[2]}'.`);
        break;
      default: fail('Lula: sasl commands: status, check, list, show, add, remove');
    }
  } catch (e) { fail(e.message); }
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
      const def = file.replace(/\.[a-z]{2,3}\.lula$/i, '').replace(/\.lula$/i, '') + (process.platform === 'win32' ? '.exe' : '');
      const exe = compile(args, { outPath: path.resolve(args.out || def) });
      process.stderr.write(`Lula: built ${exe}\n`);
      break;
    }
    case 'convert': {
      const file = args._[1];
      if (!file || !fs.existsSync(file)) fail(`Lula: file not found: ${file || ''}`);
      if (!args.to) fail('Lula: say which language to convert to, e.g. --to zu');
      const from = args.lang || (/\.(c|cc|cpp|cxx|h|hpp|ino)$/i.test(file) ? 'cpp' : detectLanguage(file));
      if (!from) fail(`Lula: cannot tell the language of '${file}'. Pass --lang zu or --lang cpp`);
      const result = convert(fs.readFileSync(file, 'utf8'), from, args.to);
      if (args.out) fs.writeFileSync(args.out, result); else process.stdout.write(result);
      break;
    }
    case 'check': compile(args, { syntaxOnly: true }); process.stderr.write('Lula: OK\n'); break;
    case 'sasl': sasl(args); break;
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
    default: fail(`Lula: unknown command '${cmd}'. Try: lula --help`);
  }
}

module.exports = { main };
if (require.main === module) main(process.argv.slice(2));
