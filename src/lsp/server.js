'use strict';
// Lula language server (Language Server Protocol). Works in VS Code and any LSP editor.
// Everything the user reads is in the language of the file they are editing.

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { fileURLToPath, pathToFileURL } = require('url');
const {
  createConnection, ProposedFeatures, TextDocuments, TextDocumentSyncKind, DiagnosticSeverity, DiagnosticTag,
  CompletionItemKind, InsertTextFormat, SymbolKind, MarkupKind, CodeActionKind, SemanticTokensBuilder,
  ResponseError, ErrorCodes, InlayHintKind, DocumentHighlightKind,
} = require('vscode-languageserver/node');
const { TextDocument } = require('vscode-languageserver-textdocument');
const { translate, loadLanguage, detectLanguage, packsFor, describeWord, listLanguages } = require('../translator');
const M = require('../messages');
const T = require('../toolchain');
const { analyse, tokenAt, resolve, references } = require('./analysis');

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const DEFAULTS = {
  defaultLanguage: 'zu', compilerPath: 'g++', compilerArgs: [], arduinoBoard: 'uno',
  diagnostics: { onType: true, delay: 600 }, messageLanguage: 'auto', inlayHints: { cppNames: false },
};
let settings = DEFAULTS;
let canConfigure = false;
let workspaceFolders = [];

const SEMANTIC_TYPES = ['namespace', 'class', 'enum', 'struct', 'function', 'method', 'variable', 'parameter', 'property', 'enumMember', 'macro', 'type'];
const SEMANTIC_MODS = ['declaration', 'readonly'];
const KIND_TO_SEMANTIC = { namespace: 'namespace', class: 'class', struct: 'struct', enum: 'enum', function: 'function', method: 'method',
  variable: 'variable', parameter: 'parameter', field: 'property', enumMember: 'enumMember', macro: 'macro', typedef: 'type' };
const KIND_TO_SYMBOL = { namespace: SymbolKind.Namespace, class: SymbolKind.Class, struct: SymbolKind.Struct, enum: SymbolKind.Enum,
  function: SymbolKind.Function, method: SymbolKind.Method, variable: SymbolKind.Variable, parameter: SymbolKind.Variable,
  field: SymbolKind.Field, enumMember: SymbolKind.EnumMember, macro: SymbolKind.Constant, typedef: SymbolKind.TypeParameter };
const KIND_TO_COMPLETION = { namespace: CompletionItemKind.Module, class: CompletionItemKind.Class, struct: CompletionItemKind.Struct,
  enum: CompletionItemKind.Enum, function: CompletionItemKind.Function, method: CompletionItemKind.Method, variable: CompletionItemKind.Variable,
  parameter: CompletionItemKind.Variable, field: CompletionItemKind.Field, enumMember: CompletionItemKind.EnumMember,
  macro: CompletionItemKind.Constant, typedef: CompletionItemKind.TypeParameter };

// ---------------------------------------------------------------------------------------------
// Languages and analysis
// ---------------------------------------------------------------------------------------------
const knownLanguages = new Set(listLanguages().map(l => l.code));
function langOf(uri) {
  const fromName = detectLanguage(uriToPath(uri) || uri);
  if (fromName && knownLanguages.has(fromName)) return fromName;
  return knownLanguages.has(settings.defaultLanguage) ? settings.defaultLanguage : 'zu';
}
function msgLangOf(uri) {
  const m = settings.messageLanguage;
  return m && m !== 'auto' && (m === 'en' || knownLanguages.has(m)) ? m : langOf(uri);
}
function uriToPath(uri) { try { return uri.startsWith('file:') ? fileURLToPath(uri) : null; } catch { return null; } }

const cache = new Map(); // uri -> { version, a }
function analysisOf(doc) {
  const hit = cache.get(doc.uri);
  if (hit && hit.version === doc.version) return hit.a;
  const a = analyse(doc.getText(), langOf(doc.uri));
  a.uri = doc.uri;
  for (const d of a.decls) d.uri = doc.uri;
  cache.set(doc.uri, { version: doc.version, a });
  return a;
}

// Workspace index: every .lula file, so names work across files.
const index = new Map(); // uri -> analysis (for files not open in the editor)
function indexFile(file) {
  try {
    const uri = pathToFileURL(file).toString();
    if (documents.get(uri)) return;
    const a = analyse(fs.readFileSync(file, 'utf8'), langOf(uri));
    a.uri = uri;
    for (const d of a.decls) d.uri = uri;
    index.set(uri, a);
  } catch { /* unreadable file: ignore */ }
}
function scanWorkspace() {
  let count = 0;
  const walk = dir => {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (count > 3000) return;
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.lula')) { count++; indexFile(p); }
    }
  };
  for (const f of workspaceFolders) { const p = uriToPath(f.uri); if (p) walk(p); }
}
function allAnalyses() {
  const out = new Map(index);
  for (const doc of documents.all()) if (doc.languageId === 'lula' || doc.uri.endsWith('.lula')) out.set(doc.uri, analysisOf(doc));
  return out;
}
/** Global declarations from every other file (for names used across files). */
function externalDecls(uri) {
  const out = [];
  for (const [u, a] of allAnalyses()) if (u !== uri) for (const d of a.decls) if (d.global) out.push(d);
  return out;
}
// The same declaration - and a function's prototype and definition count as one function.
const same = (x, y) => x && y && x.name === y.name && ((x.uri === y.uri && x.offset === y.offset) ||
  (x.kind === 'function' && y.kind === 'function' && x.global && y.global) ||
  (x.kind === 'method' && y.kind === 'method' && x.container && x.container === y.container));

function rangeOf(t) { return { start: { line: t.line, character: t.char }, end: { line: t.line, character: t.endChar } }; }
function declRange(d) { return { start: { line: d.line, character: d.char }, end: { line: d.line, character: d.endChar } }; }

function keywordOf(langCode, cpp) {
  const lang = loadLanguage(langCode);
  for (const [local, c] of lang.keywordMap) if (c === cpp) return local;
  return cpp;
}
function directiveOf(langCode, cpp) {
  const lang = loadLanguage(langCode);
  for (const [local, c] of lang.directiveMap) if (c === cpp) return local;
  return cpp;
}
function kindName(kind, lang) {
  const kwKinds = { class: 'class', struct: 'struct', enum: 'enum', namespace: 'namespace', typedef: 'typedef' };
  if (kwKinds[kind]) return M.keywordWord(kwKinds[kind], lang);
  if (kind === 'macro') return '#' + M.keywordWord('#define', lang);
  return M.t(`lsp.kind.${kind}`, lang);
}

// ---------------------------------------------------------------------------------------------
// Diagnostics: Lula's own checks instantly, then the real compiler (GCC / AVR) after a pause
// ---------------------------------------------------------------------------------------------
const TYPE_KW = new Set(['int', 'float', 'double', 'char', 'bool', 'void', 'short', 'long', 'signed', 'unsigned', 'auto', 'const', 'constexpr', 'static', 'volatile']);

function lulaChecks(a, msgLang) {
  const out = [];
  for (const t of a.sig) {
    if (t.type !== 'ident' || a.ctx.keywordMap.has(t.text)) continue;
    const cpp = a.ctx.libraryMap.get(t.text);
    if (!cpp || !cpp.includes('::')) continue;
    const prev = a.sig[t.i - 1], next = a.sig[t.i + 1];
    if (!prev || !next || !['=', ';', ',', '[', '{'].includes(next.text)) continue;
    const pc = a.cppOf(prev);
    const typeBefore = prev.type === 'ident' && (TYPE_KW.has(pc || '') || (pc && pc.includes('::') && !a.ctx.keywordMap.has(prev.text)) ||
      a.decls.some(d => d.name === prev.text && ['class', 'struct', 'enum', 'typedef'].includes(d.kind)));
    if (!typeBefore) continue;
    out.push({
      range: rangeOf(t), severity: DiagnosticSeverity.Error, source: 'lula', code: 'reserved-name',
      message: M.t('lsp.reserved_name', msgLang, `'${t.text}'`, cpp, `'${t.text}_'`),
      data: { fix: 'rename', with: `${t.text}_` },
    });
  }
  return out;
}

const running = new Map(); // uri -> child process
const timers = new Map();
const toolNotes = new Set();

function scheduleValidate(doc, delay) {
  clearTimeout(timers.get(doc.uri));
  timers.set(doc.uri, setTimeout(() => validate(doc).catch(e => connection.console.error(String(e && e.stack || e))), delay));
}

let cliPath;
function arduinoCli() { if (cliPath === undefined) cliPath = T.findArduinoCli(); return cliPath; }
function runAsync(fn) { return new Promise(res => setImmediate(() => res(fn()))); }
/** Run a compiler; a newer check for the same file cancels the older one. */
function runProcess(uri, cmd, args, cwd) {
  const prev = running.get(uri);
  if (prev) prev.kill();
  return new Promise(res => {
    let out = '', child;
    try { child = spawn(cmd, args, { env: T.C_ENV, cwd }); } catch (e) { res({ error: e }); return; }
    running.set(uri, child);
    child.stderr.on('data', d => { out += d; });
    child.on('error', e => res({ error: e }));
    child.on('close', (code, signal) => { if (running.get(uri) === child) running.delete(uri); res(signal ? { cancelled: true } : { text: out }); });
  });
}

let info2;
async function validate(doc) {
  const uri = doc.uri, version = doc.version;
  const lang = langOf(uri), msgLang = msgLangOf(uri);
  const file = uriToPath(uri) || path.join(os.tmpdir(), 'lula-untitled.' + lang + '.lula');
  const a = analysisOf(doc);
  const own = lulaChecks(a, msgLang);
  connection.sendDiagnostics({ uri, version, diagnostics: own }); // instant feedback

  let tr;
  try { tr = translate(doc.getText(), lang, { fileName: file }); } catch (e) { return; }
  const dir = path.join(os.tmpdir(), 'lula-lsp');
  fs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(dir, crypto.createHash('sha1').update(uri).digest('hex').slice(0, 12) + '.cpp');
  let cmd, args;
  const info = [];
  if (tr.arduino && arduinoCli()) {
    // Any board: ask arduino-cli for that board's exact compiler command, then check syntax only.
    const info = T.boardInfo(settings.arduinoBoard) || T.boardInfo('uno');
    const plain = translate(doc.getText(), lang, { target: 'arduino', lineDirective: false });
    const key = crypto.createHash('sha1').update(uri).digest('hex').slice(0, 12);
    const base = path.basename(file).replace(/(\.[a-z]{2,3})?\.lula$/i, '') || 'sketch';
    const sk = T.writeSketch(path.join(os.tmpdir(), 'lula-lsp', `sketch-${key}`), base, plain.cpp);
    const buildPath = path.join(os.tmpdir(), 'lula-lsp', `build-${key}-${info.fqbn.replace(/[^A-Za-z0-9]/g, '_')}`);
    const c = await runAsync(() => T.arduinoSyntaxCommand(arduinoCli(), info.fqbn, sk.sketchDir, buildPath));
    const now = documents.get(uri);
    if (now && now.version !== version) return;
    if (c.error) {
      const missing = /platform not installed|not found|Platform '.*' not found/i.test(c.error);
      info2 = [{ range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } }, severity: DiagnosticSeverity.Information, source: 'lula',
        message: missing ? M.t('cli.core_missing', msgLang, info.name, settings.arduinoBoard) : c.error.split('\n').slice(-3).join(' ') }];
      connection.sendDiagnostics({ uri, version, diagnostics: [...own, ...info2] });
      return;
    }
    const out = await runProcess(uri, c.cmd, c.args, c.cwd);
    if (!out || out.cancelled) return;
    const later = documents.get(uri);
    if (later && later.version !== version) return;
    connection.sendDiagnostics({ uri, version, diagnostics: [...own, ...parseCompilerOutput(out.text || '', sk.ino, doc, a, msgLang)] });
    return;
  }
  if (tr.arduino) {
    const core = T.findArduinoCore(), gpp = T.findTool('avr-g++');
    if (!core || !gpp) {
      info.push({ range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } }, severity: DiagnosticSeverity.Information, source: 'lula',
        message: M.t('cli.compiler_missing', msgLang, 'avr-g++ / Arduino IDE') });
      connection.sendDiagnostics({ uri, version, diagnostics: [...own, ...info] });
      return;
    }
    const setup = T.arduinoSetup(core, settings.arduinoBoard, tr.cpp);
    fs.writeFileSync(tmp, '#include <Arduino.h>\n' + tr.cpp);
    cmd = gpp.cmd; args = ['-fsyntax-only', ...setup.common, ...setup.cppFlags, ...setup.inc, tmp];
  } else {
    const { flags, notes } = T.packFlags(tr.packs);
    const lib = T.splitLibFlags(flags);
    for (const [name, how] of notes) {
      const inc = a.includes[0];
      info.push({ range: inc ? { start: { line: inc.line, character: inc.char }, end: { line: inc.line, character: inc.endChar } } : { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
        severity: DiagnosticSeverity.Information, source: 'lula', message: M.t('cli.pack_hint', msgLang, name, how) });
    }
    fs.writeFileSync(tmp, tr.cpp);
    cmd = settings.compilerPath || 'g++';
    args = ['-std=c++20', '-fsyntax-only', '-fdiagnostics-color=never', ...lib.defines, ...lib.includes, ...(settings.compilerArgs || []), tmp];
  }
  const prevChild = running.get(uri);
  if (prevChild) prevChild.kill();
  const stderr = await new Promise(res => {
    let out = '';
    let child;
    try { child = spawn(cmd, args, { env: T.C_ENV }); } catch (e) { res({ error: e }); return; }
    running.set(uri, child);
    child.stderr.on('data', d => { out += d; });
    child.on('error', e => res({ error: e }));
    child.on('close', (code, signal) => res(signal ? { cancelled: true } : { text: out }));
  });
  if (running.get(uri) && running.get(uri).killed) return;
  running.delete(uri);
  const current = documents.get(uri);
  if (current && current.version !== version) return; // the user typed again: a newer check is coming
  if (stderr.cancelled) return;
  if (stderr.error) {
    if (!toolNotes.has(cmd)) toolNotes.add(cmd);
    info.push({ range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } }, severity: DiagnosticSeverity.Information, source: 'lula',
      message: M.t('cli.compiler_missing', msgLang, cmd) });
    connection.sendDiagnostics({ uri, version, diagnostics: [...own, ...info] });
    return;
  }
  const compiler = parseCompilerOutput(stderr.text, file, doc, a, msgLang);
  connection.sendDiagnostics({ uri, version, diagnostics: [...own, ...info, ...compiler] });
}

/** GCC output (English, LC_ALL=C) -> LSP diagnostics in the user's language, with quick-fix data. */
function parseCompilerOutput(text, file, doc, a, msgLang) {
  const target = path.resolve(file);
  const isUser = f => { try { return path.resolve(f) === target; } catch { return false; } };
  const diags = [];
  let last = null, foreign = null, includedFromUser = null;
  const at = (line, col) => {
    const l = Math.max(0, line - 1), c = Math.max(0, col - 1);
    const tok = a.sig.find(t => t.line === l && t.char <= c && c < Math.max(t.endChar, t.char + 1));
    return tok ? rangeOf(tok) : { start: { line: l, character: c }, end: { line: l, character: c + 1 } };
  };
  const localize = msg => M.translateMessageText(msg, msgLang) ?? require('../translator').localizeMessage(msg, msgLang);
  for (const raw of text.split('\n')) {
    let m = /^In file included from (.+?):(\d+)[:,]/.exec(raw) || /^\s+from (.+?):(\d+)[:,]/.exec(raw);
    if (m && isUser(m[1])) { includedFromUser = Number(m[2]); continue; }
    m = /^(.*?):(\d+):(\d+):\s+required from here$/.exec(raw);
    if (m && isUser(m[1]) && foreign) {
      diags.push({ ...foreign, range: at(Number(m[2]), Number(m[3])) });
      foreign = null;
      continue;
    }
    m = /^(.*?):(\d+):(\d+): (error|warning|note|fatal error): (.*)$/.exec(raw);
    if (!m) continue;
    const [, f, line, col, sev, msg] = m;
    if (sev === 'note') {
      const hdr = /is defined in header '<([^>]+)>'/.exec(msg);
      if (hdr && last) last.data = { ...(last.data || {}), fix: 'include', header: hdr[1] };
      if (last && isUser(f)) {
        last.relatedInformation = last.relatedInformation || [];
        last.relatedInformation.push({ location: { uri: doc.uri, range: at(Number(line), Number(col)) }, message: localize(msg) });
      }
      continue;
    }
    const d = {
      severity: sev === 'warning' ? DiagnosticSeverity.Warning : DiagnosticSeverity.Error,
      source: 'lula', message: localize(msg),
    };
    const dym = /; did you mean '([^']+)'\?/.exec(msg);
    if (dym) d.data = { fix: 'replace', with: require('../translator').localizeMessage(`'${dym[1]}'`, msgLang).slice(1, -1) };
    if (/^expected '[;,]'(?: or '[;,]')* before/.test(msg)) d.data = { fix: 'semicolon' };
    if (/unused (variable|parameter)/.test(msg)) d.tags = [DiagnosticTag.Unnecessary];
    const flag = /\[(-W[^\]]+)\]$/.exec(msg);
    if (flag) d.code = flag[1];
    if (isUser(f)) {
      d.range = at(Number(line), Number(col));
      diags.push(d); last = d;
    } else {
      last = null;
      if (sev !== 'warning') { foreign = d; if (includedFromUser) { diags.push({ ...d, range: at(includedFromUser, 1) }); foreign = null; } }
    }
    includedFromUser = null;
  }
  return diags;
}

// ---------------------------------------------------------------------------------------------
// Completion
// ---------------------------------------------------------------------------------------------
function snippets(langCode) {
  const k = c => keywordOf(langCode, c);
  const lib = c => { const lang = loadLanguage(langCode); for (const [l, v] of lang.libraryMap) if (v === c) return l; return c; };
  return [
    [k('if'), `${k('if')} (\${1:condition}) {\n\t$0\n}`],
    [`${k('if')} ${k('else')}`, `${k('if')} (\${1:condition}) {\n\t$2\n} ${k('else')} {\n\t$0\n}`],
    [k('for'), `${k('for')} (${k('int')} \${1:i} = 0; \${1:i} < \${2:n}; \${1:i}++) {\n\t$0\n}`],
    [`${k('for')} :`, `${k('for')} (${k('const')} ${k('auto')}& \${1:x} : \${2:items}) {\n\t$0\n}`],
    [k('while'), `${k('while')} (\${1:condition}) {\n\t$0\n}`],
    [k('do'), `${k('do')} {\n\t$0\n} ${k('while')} (\${1:condition});`],
    [k('switch'), `${k('switch')} (\${1:value}) {\n\t${k('case')} \${2:1}:\n\t\t$0\n\t\t${k('break')};\n\t${k('default')}:\n\t\t${k('break')};\n}`],
    [k('class'), `${k('class')} \${1:Name} {\n${k('public')}:\n\t\${1:Name}() {}\n\t$0\n${k('private')}:\n};`],
    [k('struct'), `${k('struct')} \${1:Name} {\n\t$0\n};`],
    [k('try'), `${k('try')} {\n\t$1\n} ${k('catch')} (${k('const')} ${lib('std::exception')}& e) {\n\t$0\n}`],
    [lib('main'), `${k('int')} ${lib('main')}() {\n\t$0\n\t${k('return')} 0;\n}`],
    [`${lib('setup')} + ${lib('loop')} (Arduino)`, `${k('void')} ${lib('setup')}() {\n\t${lib('pinMode')}(\${1:13}, ${lib('OUTPUT')});\n}\n\n${k('void')} ${lib('loop')}() {\n\t$0\n}`],
  ];
}

function insertIncludeEdit(a, langCode, headerLocal) {
  const word = directiveOf(langCode, 'include');
  const line = a.includes.length ? a.includes[a.includes.length - 1].line + 1 : 0;
  return { range: { start: { line, character: 0 }, end: { line, character: 0 } }, newText: `#${word} <${headerLocal}>\n` };
}

connection.onCompletion(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const a = analysisOf(doc);
  const lang = loadLanguage(langOf(doc.uri));
  const lineText = doc.getText({ start: { line: params.position.line, character: 0 }, end: params.position });
  const items = [];
  // #faka <...> : header names
  if (/^\s*#\s*[\p{L}_]+\s*<[^>]*$/u.test(lineText)) {
    for (const [local, cpp] of lang.headerMap) items.push({ label: local, kind: CompletionItemKind.File, detail: `<${cpp}>` });
    for (const p of packsFor(lang.code)) for (const [local, cpp] of p.headers) items.push({ label: local, kind: CompletionItemKind.File, detail: `<${cpp}> · ${p.name}` });
    return items;
  }
  // # : directives
  if (/^\s*#\s*[\p{L}_]*$/u.test(lineText)) {
    for (const [local, cpp] of lang.directiveMap) items.push({ label: local, kind: CompletionItemKind.Keyword, detail: `#${cpp}` });
    return items;
  }
  const member = /(\.|->)\s*[\p{L}\p{N}_]*$/u.test(lineText);
  const userItem = d => ({ label: d.name, kind: KIND_TO_COMPLETION[d.kind], detail: `${kindName(d.kind, msgLangOf(doc.uri))} · ${d.detail}`, sortText: '0' + d.name });
  if (member) {
    const seen = new Set();
    for (const d of [...a.decls, ...externalDecls(doc.uri)]) if ((d.kind === 'field' || d.kind === 'method') && !seen.has(d.name)) { seen.add(d.name); items.push(userItem(d)); }
    for (const [local, cpp] of lang.libraryMap) if (!cpp.includes('::') && /^[a-z_]/.test(cpp)) items.push({ label: local, kind: CompletionItemKind.Method, detail: cpp, sortText: '1' + local });
    for (const p of packsFor(lang.code)) for (const [local, cpp] of p.names) if (!cpp.includes('::') && /^[a-z]/.test(cpp)) items.push({ label: local, kind: CompletionItemKind.Method, detail: `${cpp} · ${p.name}`, sortText: '2' + local });
    return items;
  }
  const offset = doc.offsetAt(params.position);
  for (const d of a.decls) {
    if (!d.global && !(d.scopeStart <= offset && offset <= d.scopeEnd)) continue;
    if (d.kind === 'field' || d.kind === 'method') continue;
    items.push(userItem(d));
  }
  for (const d of externalDecls(doc.uri)) if (d.kind !== 'field' && d.kind !== 'method') items.push(userItem(d));
  for (const [local, cpp] of lang.keywordMap) items.push({ label: local, kind: CompletionItemKind.Keyword, detail: cpp, sortText: '3' + local });
  for (const [label, body] of snippets(lang.code)) items.push({ label, kind: CompletionItemKind.Snippet, insertText: body, insertTextFormat: InsertTextFormat.Snippet, sortText: '4' + label });
  for (const [local, cpp] of a.ctx.libraryMap) items.push({ label: local, kind: /^[A-Z_0-9]+$/.test(local) ? CompletionItemKind.Constant : CompletionItemKind.Function, detail: cpp, sortText: '5' + local });
  // Words from libraries not included yet: choosing one adds the #faka line too.
  const active = new Set([...a.ctx.libraryMap.keys()]);
  for (const p of packsFor(lang.code)) {
    if (p.always) continue;
    const headerLocal = [...p.headers.keys()][0];
    if (!headerLocal) continue;
    for (const [local, cpp] of p.names) {
      if (active.has(local)) continue;
      items.push({ label: local, kind: CompletionItemKind.Function, detail: `${cpp} · ${p.name}`, sortText: '6' + local,
        additionalTextEdits: [insertIncludeEdit(a, lang.code, headerLocal)],
        documentation: M.t('lsp.fix_include', msgLangOf(doc.uri), directiveOf(lang.code, 'include'), headerLocal) });
    }
  }
  return items;
});

// ---------------------------------------------------------------------------------------------
// Hover, definition, references, highlights, rename
// ---------------------------------------------------------------------------------------------
function findDecl(doc, position) {
  const a = analysisOf(doc);
  const t = tokenAt(a, position.line, position.character);
  if (!t) return { a, t: null, decl: null };
  return { a, t, decl: t.type === 'ident' ? resolve(a, t, externalDecls(doc.uri)) : null };
}

connection.onHover(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const { a, t, decl } = findDecl(doc, params.position);
  if (!t) return null;
  const lang = langOf(doc.uri), msgLang = msgLangOf(doc.uri);
  const langName = loadLanguage(lang).name;
  if (decl) {
    const where = decl.uri !== doc.uri ? `\n\n${M.t('lsp.declared_in', msgLang, path.basename(uriToPath(decl.uri) || decl.uri))}` : '';
    return { range: rangeOf(t), contents: { kind: MarkupKind.Markdown, value: `(${kindName(decl.kind, msgLang)}) \`${decl.name}\`\n\`\`\`lula\n${decl.detail}\n\`\`\`${where}` } };
  }
  const word = t.type === 'header' ? t.text.slice(1, -1).trim() : t.text;
  const found = describeWord(word, lang) || (a.ctx.libraryMap.has(word) ? { cpp: a.ctx.libraryMap.get(word), source: 'library' } : null);
  if (!found) return null;
  const where = ['keyword', 'library', 'directive', 'header'].includes(found.source) ? '' : ` · ${found.source}`;
  return { range: rangeOf(t), contents: { kind: MarkupKind.Markdown, value: `**${word}** (${langName}${where}) → C++ \`${found.cpp}\`` } };
});

connection.onDefinition(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const { decl, t, a } = findDecl(doc, params.position);
  if (decl) return { uri: decl.uri, range: declRange(decl) };
  // #faka "file.lula" style local headers are not used by Lula; nothing else to jump to.
  void t; void a;
  return null;
});

function referencesOf(decl) {
  const out = [];
  const analyses = allAnalyses();
  const files = decl.global ? [...analyses.values()] : [analyses.get(decl.uri)].filter(Boolean);
  for (const a of files) {
    const ext = externalDecls(a.uri);
    for (const t of references(a, decl, ext, same)) out.push({ uri: a.uri, range: rangeOf(t) });
  }
  return out;
}

connection.onReferences(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const { decl } = findDecl(doc, params.position);
  if (!decl) return [];
  const refs = referencesOf(decl);
  return params.context.includeDeclaration ? refs : refs.filter(r => !(r.uri === decl.uri && r.range.start.line === decl.line && r.range.start.character === decl.char));
});

connection.onDocumentHighlight(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const { decl } = findDecl(doc, params.position);
  if (!decl) return [];
  return referencesOf(decl).filter(r => r.uri === doc.uri).map(r => ({ range: r.range, kind: DocumentHighlightKind.Text }));
});

function isReserved(name, a) {
  return a.ctx.keywordMap.has(name) || a.ctx.libraryMap.has(name) || [...packsFor(langOf(a.uri))].some(p => p.names.has(name));
}

connection.onPrepareRename(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const { t, decl } = findDecl(doc, params.position);
  if (!t || !decl) throw new ResponseError(ErrorCodes.InvalidRequest, M.t('lsp.cannot_rename', msgLangOf(doc.uri)));
  return { range: rangeOf(t), placeholder: t.text };
});

connection.onRenameRequest(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const msgLang = msgLangOf(doc.uri);
  const { a, decl } = findDecl(doc, params.position);
  if (!decl) throw new ResponseError(ErrorCodes.InvalidRequest, M.t('lsp.cannot_rename', msgLang));
  const name = params.newName;
  if (!/^[\p{L}_][\p{L}\p{M}\p{N}_]*$/u.test(name)) throw new ResponseError(ErrorCodes.InvalidParams, M.t('lsp.rename_invalid', msgLang, `'${name}'`));
  if (isReserved(name, a)) throw new ResponseError(ErrorCodes.InvalidParams, M.t('lsp.rename_reserved', msgLang, `'${name}'`));
  const changes = {};
  for (const r of referencesOf(decl)) (changes[r.uri] = changes[r.uri] || []).push({ range: r.range, newText: name });
  return { changes };
});

// ---------------------------------------------------------------------------------------------
// Outline, workspace symbols, signature help
// ---------------------------------------------------------------------------------------------
connection.onDocumentSymbol(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const a = analysisOf(doc);
  const msgLang = msgLangOf(doc.uri);
  const top = [], byContainer = new Map();
  for (const d of a.decls) {
    if (d.kind === 'parameter' || (d.kind === 'variable' && !d.global)) continue;
    const sym = { name: d.name, detail: kindName(d.kind, msgLang), kind: KIND_TO_SYMBOL[d.kind], range: declRange(d), selectionRange: declRange(d), children: [] };
    if (d.bodyEnd !== undefined) {
      const end = doc.positionAt(d.bodyEnd + 1);
      sym.range = { start: { line: d.line, character: 0 }, end };
    }
    if (['class', 'struct', 'enum', 'namespace'].includes(d.kind)) byContainer.set(d.name, sym);
    const parent = d.container && byContainer.get(d.container);
    (parent ? parent.children : top).push(sym);
  }
  return top;
});

connection.onWorkspaceSymbol(params => {
  const q = (params.query || '').toLowerCase();
  const out = [];
  for (const [uri, a] of allAnalyses()) {
    for (const d of a.decls) {
      if (!d.global || d.kind === 'parameter') continue;
      if (q && !d.name.toLowerCase().includes(q)) continue;
      out.push({ name: d.name, kind: KIND_TO_SYMBOL[d.kind], location: { uri, range: declRange(d) }, containerName: d.container || undefined });
      if (out.length > 500) return out;
    }
  }
  return out;
});

connection.onSignatureHelp(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;
  const a = analysisOf(doc);
  const offset = doc.offsetAt(params.position);
  // Walk back to the '(' of the call we are inside.
  let depth = 0, commas = 0, open = null;
  for (let k = a.sig.length - 1; k >= 0; k--) {
    const t = a.sig[k];
    if (t.offset >= offset) continue;
    if (t.text === ')' || t.text === ']' || t.text === '}') depth++;
    else if (t.text === '(' || t.text === '[' || t.text === '{') { if (depth === 0) { if (t.text === '(') open = t; break; } depth--; }
    else if (t.text === ',' && depth === 0) commas++;
    else if (t.text === ';' && depth === 0) break;
  }
  if (!open) return null;
  const nameTok = a.sig[open.i - 1];
  if (!nameTok || nameTok.type !== 'ident') return null;
  const fns = [...a.decls, ...externalDecls(doc.uri)].filter(d => d.name === nameTok.text && (d.kind === 'function' || d.kind === 'method') && d.params);
  if (fns.length) {
    return {
      signatures: fns.map(f => ({ label: `${f.name}(${f.params.map(p => p.text).join(', ')})`, parameters: f.params.map(p => ({ label: p.text })) })),
      activeSignature: 0, activeParameter: commas,
    };
  }
  const cpp = a.ctx.libraryMap.get(nameTok.text);
  if (cpp) return { signatures: [{ label: `${nameTok.text}(…)`, documentation: `C++ ${cpp}`, parameters: [] }], activeSignature: 0, activeParameter: commas };
  return null;
});

// ---------------------------------------------------------------------------------------------
// Quick fixes
// ---------------------------------------------------------------------------------------------
connection.onCodeAction(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const a = analysisOf(doc);
  const lang = langOf(doc.uri), msgLang = msgLangOf(doc.uri);
  const actions = [];
  for (const d of params.context.diagnostics) {
    const data = d.data;
    if (!data || !data.fix) continue;
    const edit = edits => ({ changes: { [doc.uri]: edits } });
    if (data.fix === 'include') {
      const all = new Map(loadLanguage(lang).headerMap);
      for (const p of packsFor(lang)) for (const [l, c] of p.headers) all.set(l, c);
      const local = [...all].find(([, c]) => c === data.header)?.[0] || data.header;
      actions.push({ title: M.t('lsp.fix_include', msgLang, directiveOf(lang, 'include'), local), kind: CodeActionKind.QuickFix, diagnostics: [d], isPreferred: true,
        edit: edit([insertIncludeEdit(a, lang, local)]) });
    } else if (data.fix === 'replace') {
      actions.push({ title: M.t('lsp.fix_replace', msgLang, data.with), kind: CodeActionKind.QuickFix, diagnostics: [d], isPreferred: true,
        edit: edit([{ range: d.range, newText: data.with }]) });
    } else if (data.fix === 'semicolon') {
      const off = doc.offsetAt(d.range.start);
      const prev = [...a.sig].reverse().find(t => t.end <= off);
      if (prev) actions.push({ title: M.t('lsp.fix_semicolon', msgLang), kind: CodeActionKind.QuickFix, diagnostics: [d], isPreferred: true,
        edit: edit([{ range: { start: { line: prev.endLine, character: prev.endChar }, end: { line: prev.endLine, character: prev.endChar } }, newText: ';' }]) });
    } else if (data.fix === 'rename') {
      const start = doc.offsetAt(d.range.start);
      const word = doc.getText(d.range);
      // rename this declaration and the later uses of the same word in the same block
      let depth = 0;
      const edits = [];
      for (const t of a.sig) {
        if (t.offset < start) continue;
        if (t.text === '{') depth++;
        else if (t.text === '}') { if (depth === 0) break; depth--; }
        else if (t.type === 'ident' && t.text === word) edits.push({ range: rangeOf(t), newText: data.with });
      }
      actions.push({ title: M.t('lsp.fix_rename', msgLang, data.with), kind: CodeActionKind.QuickFix, diagnostics: [d], isPreferred: true, edit: edit(edits) });
    }
  }
  return actions;
});

// ---------------------------------------------------------------------------------------------
// Semantic colouring of the user's own names, optional C++ hints, formatting
// ---------------------------------------------------------------------------------------------
connection.languages.semanticTokens.on(params => {
  const doc = documents.get(params.textDocument.uri);
  const builder = new SemanticTokensBuilder();
  if (!doc) return builder.build();
  const a = analysisOf(doc);
  const ext = externalDecls(doc.uri);
  const constWord = keywordOf(langOf(doc.uri), 'const'), constexprWord = keywordOf(langOf(doc.uri), 'constexpr');
  for (const t of a.sig) {
    if (!a.declarable(t)) continue;
    const d = resolve(a, t, ext);
    if (!d) continue;
    const type = SEMANTIC_TYPES.indexOf(KIND_TO_SEMANTIC[d.kind]);
    if (type < 0) continue;
    let mods = 0;
    if (d.offset === t.offset && d.uri === doc.uri) mods |= 1;
    if (new RegExp(`(^|[^\\p{L}\\p{N}_])(${constWord}|${constexprWord})([^\\p{L}\\p{N}_]|$)`, 'u').test(d.detail)) mods |= 2;
    builder.push(t.line, t.char, t.endChar - t.char, type, mods);
  }
  return builder.build();
});

connection.languages.inlayHint.on(params => {
  if (!settings.inlayHints || !settings.inlayHints.cppNames) return [];
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const a = analysisOf(doc);
  const hints = [];
  for (const t of a.sig) {
    if (t.line < params.range.start.line || t.line > params.range.end.line) continue;
    const cpp = t.type === 'ident' ? a.cppOf(t) : (t.type === 'directive' ? a.ctx.directiveMap.get(t.text) : null);
    if (!cpp || cpp === t.text) continue;
    hints.push({ position: { line: t.line, character: t.endChar }, label: cpp.replace(/^std::/, ''), kind: InlayHintKind.Type, paddingLeft: true });
  }
  return hints;
});

connection.onDocumentFormatting(params => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return [];
  const a = analysisOf(doc);
  const unit = params.options.insertSpaces ? ' '.repeat(params.options.tabSize) : '\t';
  const lines = doc.getText().split('\n');
  // depth at the start of each line, counting only real braces/parens (not in strings or comments)
  const depthAt = new Array(lines.length).fill(0), parenAt = new Array(lines.length).fill(0), skip = new Array(lines.length).fill(false);
  let depth = 0, paren = 0;
  const firstTokOnLine = new Map();
  for (const t of a.toks) {
    if ((t.type === 'comment' || t.type === 'literal') && t.endLine > t.line) for (let l = t.line + 1; l <= t.endLine; l++) skip[l] = true;
  }
  let line = 0;
  for (const t of a.sig) {
    while (line <= t.line) { depthAt[line] = depth; parenAt[line] = paren; line++; }
    if (!firstTokOnLine.has(t.line)) firstTokOnLine.set(t.line, t);
    if (t.text === '{') depth++; else if (t.text === '}') depth = Math.max(0, depth - 1);
    else if (t.text === '(' || t.text === '[') paren++; else if (t.text === ')' || t.text === ']') paren = Math.max(0, paren - 1);
  }
  while (line < lines.length) { depthAt[line] = depth; parenAt[line] = paren; line++; }
  const edits = [];
  const accessWords = new Set(['public', 'private', 'protected'].map(c => keywordOf(langOf(doc.uri), c)));
  const caseWords = new Set(['case', 'default'].map(c => keywordOf(langOf(doc.uri), c)));
  lines.forEach((text, l) => {
    const body = text.replace(/\s+$/, '').replace(/\r$/, '');
    if (skip[l] || parenAt[l] > 0) { if (body !== text.replace(/\r$/, '')) edits.push({ range: { start: { line: l, character: body.length }, end: { line: l, character: text.replace(/\r$/, '').length } }, newText: '' }); return; }
    const trimmed = body.trimStart();
    if (!trimmed) { if (text.replace(/\r$/, '').length) edits.push({ range: { start: { line: l, character: 0 }, end: { line: l, character: text.replace(/\r$/, '').length } }, newText: '' }); return; }
    let d = depthAt[l];
    const first = firstTokOnLine.get(l);
    if (first && first.text === '}') d = Math.max(0, d - 1);
    if (trimmed.startsWith('#')) d = 0;
    else if (first && accessWords.has(first.text) && a.sig[first.i + 1] && a.sig[first.i + 1].text === ':') d = Math.max(0, d - 1);
    else if (first && caseWords.has(first.text)) d = Math.max(0, d);
    const want = unit.repeat(d) + trimmed;
    const have = text.replace(/\r$/, '');
    if (want !== have) edits.push({ range: { start: { line: l, character: 0 }, end: { line: l, character: have.length } }, newText: want });
  });
  return edits;
});

// ---------------------------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------------------------
connection.onInitialize(params => {
  canConfigure = !!(params.capabilities.workspace && params.capabilities.workspace.configuration);
  workspaceFolders = params.workspaceFolders || (params.rootUri ? [{ uri: params.rootUri, name: 'root' }] : []);
  if (params.initializationOptions && params.initializationOptions.settings) settings = { ...DEFAULTS, ...params.initializationOptions.settings };
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: { triggerCharacters: ['.', '>', ':', '<', '#'], resolveProvider: false },
      hoverProvider: true,
      definitionProvider: true,
      referencesProvider: true,
      documentHighlightProvider: true,
      renameProvider: { prepareProvider: true },
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,
      signatureHelpProvider: { triggerCharacters: ['(', ','] },
      codeActionProvider: { codeActionKinds: [CodeActionKind.QuickFix] },
      documentFormattingProvider: true,
      inlayHintProvider: true,
      semanticTokensProvider: { legend: { tokenTypes: SEMANTIC_TYPES, tokenModifiers: SEMANTIC_MODS }, full: true },
    },
    serverInfo: { name: 'lula-language-server', version: require('../../package.json').version },
  };
});

async function loadSettings() {
  if (!canConfigure) return;
  try {
    const s = await connection.workspace.getConfiguration('lula');
    settings = { ...DEFAULTS, ...(s || {}), diagnostics: { ...DEFAULTS.diagnostics, ...((s && s.diagnostics) || {}) }, inlayHints: { ...DEFAULTS.inlayHints, ...((s && s.inlayHints) || {}) } };
  } catch { /* keep defaults */ }
}

connection.onInitialized(async () => {
  await loadSettings();
  scanWorkspace();
  for (const doc of documents.all()) scheduleValidate(doc, 0);
});
connection.onDidChangeConfiguration(async change => {
  if (change && change.settings && change.settings.lula) settings = { ...DEFAULTS, ...change.settings.lula };
  else await loadSettings();
  cache.clear();
  for (const doc of documents.all()) scheduleValidate(doc, 0);
});
connection.onDidChangeWatchedFiles(change => {
  for (const c of change.changes) {
    const p = uriToPath(c.uri);
    if (!p || !p.endsWith('.lula')) continue;
    if (c.type === 3) index.delete(c.uri); else indexFile(p);
  }
});

documents.onDidOpen(e => { index.delete(e.document.uri); scheduleValidate(e.document, 0); });
documents.onDidChangeContent(e => { if (settings.diagnostics.onType !== false) scheduleValidate(e.document, settings.diagnostics.delay ?? 600); });
documents.onDidSave(e => scheduleValidate(e.document, 0));
documents.onDidClose(e => {
  cache.delete(e.document.uri);
  const p = uriToPath(e.document.uri);
  if (p && fs.existsSync(p)) indexFile(p);
  connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] });
});

documents.listen(connection);
connection.listen();
