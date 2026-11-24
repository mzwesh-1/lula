'use strict';
const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');
const { translate, convert, listLanguages, loadLanguage, detectLanguage } = require('./lib/translator');
// Works both unbundled (extension.js next to lib/) and bundled (lib/extension.js)
const LIB = fs.existsSync(path.join(__dirname, 'cli.js')) ? __dirname : path.join(__dirname, 'lib');
const CLI = path.join(LIB, 'cli.js');
const sasl = require('./lib/sasl');

const CPP_SCHEME = 'lula-cpp';
const cppViews = new Map(); // virtual doc uri -> source uri

function config() { return vscode.workspace.getConfiguration('lula'); }
function langOf(doc) { return detectLanguage(doc.fileName) || config().get('defaultLanguage') || 'zu'; }
function safeLang(doc) { try { return loadLanguage(langOf(doc)); } catch { return null; } }
function saslDir() {
  const custom = config().get('sasl.dictionaryPath');
  return custom && fs.existsSync(path.join(custom, 'signs.json')) ? custom : sasl.defaultDir();
}
function saslCommandLink(args, label) {
  return `[${label}](command:lula.sasl.show?${encodeURIComponent(JSON.stringify([args]))})`;
}
let saslPanel = null;
function showSign(context, { word, lang }) {
  const dir = saslDir();
  const found = sasl.lookup(word, lang, dir);
  if (!found) { vscode.window.showInformationMessage(`Lula: '${word}' is not a Lula keyword or library name.`); return; }
  const videosDir = vscode.Uri.file(path.join(dir, 'videos'));
  if (!saslPanel) {
    saslPanel = vscode.window.createWebviewPanel('lulaSasl', 'SASL', { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
      { enableScripts: true, localResourceRoots: [videosDir] });
    saslPanel.onDidDispose(() => { saslPanel = null; }, null, context.subscriptions);
  }
  const wv = saslPanel.webview;
  let videoSrc;
  if (found.entry) videoSrc = /^https:/i.test(found.video) ? found.video : wv.asWebviewUri(vscode.Uri.file(found.video)).toString();
  let langName = '';
  try { langName = lang ? loadLanguage(lang).name : ''; } catch { /* unknown language */ }
  saslPanel.title = `SASL: ${word}`;
  wv.html = sasl.playerHtml({
    concept: found.concept, word, langName, entry: found.entry, videoSrc, words: sasl.wordsFor(found.concept),
    cspSource: wv.cspSource, nonce: require('crypto').randomBytes(16).toString('hex'),
  });
  saslPanel.reveal(vscode.ViewColumn.Beside, true);
}

let client = null;

/** Start the Lula language server: errors as you type, completion, hover, go to definition, rename, ... */
function startLanguageServer(context) {
  const module = context.asAbsolutePath(path.join('lib', 'lsp', 'server.js'));
  const serverOptions = {
    run: { module, transport: TransportKind.ipc },
    debug: { module, transport: TransportKind.ipc, options: { execArgv: ['--nolazy', '--inspect=6009'] } },
  };
  const clientOptions = {
    documentSelector: [{ scheme: 'file', language: 'lula' }, { scheme: 'untitled', language: 'lula' }],
    synchronize: { configurationSection: 'lula', fileEvents: vscode.workspace.createFileSystemWatcher('**/*.lula') },
    outputChannelName: 'Lula',
  };
  client = new LanguageClient('lula', 'Lula', serverOptions, clientOptions);
  client.start();
  context.subscriptions.push({ dispose: () => client && client.stop() });
}

function activate(context) {
  startLanguageServer(context);
  const changed = new vscode.EventEmitter();
  context.subscriptions.push(changed);

  // Read-only "show the C++" view that updates as you type.
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(CPP_SCHEME, {
    onDidChange: changed.event,
    provideTextDocumentContent(uri) {
      const src = vscode.workspace.textDocuments.find(d => d.uri.toString() === cppViews.get(uri.toString()));
      if (!src) return '// Source file is closed';
      try { return translate(src.getText(), langOf(src)).cpp; } catch (e) { return `// ${e.message}`; }
    },
  }));
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => {
    for (const [view, src] of cppViews) if (src === e.document.uri.toString()) changed.fire(vscode.Uri.parse(view));
  }));

  context.subscriptions.push(vscode.commands.registerCommand('lula.showCpp', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'lula') return;
    const uri = vscode.Uri.parse(`${CPP_SCHEME}:${path.basename(ed.document.fileName)}.cpp`);
    cppViews.set(uri.toString(), ed.document.uri.toString());
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.languages.setTextDocumentLanguage(doc, 'cpp');
    vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside, preview: true, preserveFocus: true });
  }));

  context.subscriptions.push(vscode.commands.registerCommand('lula.run', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'lula') return;
    await ed.document.save();
    const cli = path.join(__dirname, 'lib', 'cli.js');
    const args = [cli, 'run', ed.document.fileName, '--lang', langOf(ed.document), '--cxx', config().get('compilerPath')];
    const extra = config().get('compilerArgs');
    if (extra.length) args.push('--', ...extra);
    const exec = new vscode.ProcessExecution(process.execPath, args, { env: { ELECTRON_RUN_AS_NODE: '1' } });
    const task = new vscode.Task({ type: 'lula' }, vscode.TaskScope.Workspace, path.basename(ed.document.fileName), 'lula', exec);
    task.presentationOptions = { reveal: vscode.TaskRevealKind.Always, focus: true, clear: true };
    vscode.tasks.executeTask(task);
  }));

  context.subscriptions.push(vscode.commands.registerCommand('lula.exportArduino', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'lula') return;
    const base = path.basename(ed.document.fileName).replace(/(\.[a-z]{2,3})?\.lula$/i, '');
    const dir = path.join(path.dirname(ed.document.fileName), base);
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${base}.ino`);
    fs.writeFileSync(out, translate(ed.document.getText(), langOf(ed.document), { fileName: ed.document.fileName }).cpp);
    vscode.window.showInformationMessage(`Lula: wrote ${out} - open it in the Arduino IDE or PlatformIO.`);
  }));

  // Convert the open C++ file (or the selection) into a Lula language.
  context.subscriptions.push(vscode.commands.registerCommand('lula.convertFromCpp', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed) return;
    const pick = await vscode.window.showQuickPick(
      listLanguages().map(l => ({ label: l.name, description: l.code, code: l.code })), { placeHolder: 'Convert to which language?' });
    if (!pick) return;
    const from = ed.document.languageId === 'lula' ? langOf(ed.document) : 'cpp';
    const text = ed.selection.isEmpty ? ed.document.getText() : ed.document.getText(ed.selection);
    const result = convert(text, from, pick.code);
    if (ed.document.uri.scheme === 'file') {
      const base = ed.document.fileName.replace(/(\.[a-z]{2,3})?\.(kh|cpp|cc|cxx|ino|h|hpp)$/i, '');
      const target = vscode.Uri.file(`${base}.${pick.code}.lula`);
      await vscode.workspace.fs.writeFile(target, Buffer.from(result, 'utf8'));
      vscode.window.showTextDocument(target);
    } else {
      const doc = await vscode.workspace.openTextDocument({ language: 'lula', content: result });
      vscode.window.showTextDocument(doc);
    }
  }));

  // SASL sign-video dictionary.
  context.subscriptions.push(vscode.commands.registerCommand('lula.sasl.show', (args) => {
    if (args && args.word) return showSign(context, args);
    const ed = vscode.window.activeTextEditor;
    if (!ed) return;
    const range = ed.document.getWordRangeAtPosition(ed.selection.active);
    if (!range) return;
    showSign(context, { word: ed.document.getText(range), lang: ed.document.languageId === 'lula' ? langOf(ed.document) : null });
  }));
  context.subscriptions.push(vscode.commands.registerCommand('lula.sasl.browse', async () => {
    const dir = saslDir();
    const dict = sasl.loadDictionary(dir);
    const ed = vscode.window.activeTextEditor;
    const lang = ed && ed.document.languageId === 'lula' ? langOf(ed.document) : config().get('defaultLanguage');
    const st = sasl.status(dir);
    const items = sasl.allConcepts().map(c => {
      const w = sasl.wordsFor(c)[lang] || c;
      return { label: `${dict.signs[c] ? '🤟' : '○'} ${w}`, description: c, detail: dict.signs[c] ? `Signed by ${dict.signs[c].signer}` : 'Not recorded yet', concept: c, word: w };
    }).sort((a, b) => (b.label.startsWith('🤟') - a.label.startsWith('🤟')) || a.word.localeCompare(b.word));
    const pick = await vscode.window.showQuickPick(items, { placeHolder: `SASL dictionary: ${st.recorded} of ${st.total} signs recorded`, matchOnDescription: true });
    if (pick) showSign(context, { word: pick.word, lang: pick.word === pick.concept ? null : lang });
  }));

  // SASL: the language server explains words; this adds the sign-video link to the same hover.
  context.subscriptions.push(vscode.languages.registerHoverProvider('lula', {
    provideHover(doc, pos) {
      if (!config().get('sasl.enabled')) return;
      const lang = safeLang(doc); if (!lang) return;
      const range = doc.getWordRangeAtPosition(pos); if (!range) return;
      const word = doc.getText(range);
      if (lang.headerMap.has(word)) return;
      const found = sasl.lookup(word, lang.code, saslDir());
      if (!found) return;
      if (found.entry) {
        const md = new vscode.MarkdownString(saslCommandLink({ word, lang: lang.code }, '🤟 SASL'));
        md.isTrusted = { enabledCommands: ['lula.sasl.show'] };
        return new vscode.Hover(md, range);
      }
      if (config().get('sasl.showMissing')) return new vscode.Hover(new vscode.MarkdownString('🤟 _SASL: —_'), range);
    },
  }));

  // Build (and optionally upload) an Arduino program.
  context.subscriptions.push(vscode.commands.registerCommand('lula.arduino', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'lula') return;
    await ed.document.save();
    const board = await vscode.window.showQuickPick(['uno', 'nano', 'mega'], { placeHolder: 'Arduino board' });
    if (!board) return;
    const port = await vscode.window.showInputBox({ prompt: 'Upload to port (e.g. /dev/ttyUSB0 or COM3). Leave empty to only build the .hex', value: config().get('arduinoPort') });
    const args = [CLI, 'arduino', ed.document.fileName, '--lang', langOf(ed.document), '--board', board, ...(port ? ['--upload', port] : [])];
    const exec = new vscode.ProcessExecution(process.execPath, args, { env: { ELECTRON_RUN_AS_NODE: '1' } });
    const task = new vscode.Task({ type: 'lula' }, vscode.TaskScope.Workspace, `Arduino ${board}`, 'lula', exec);
    task.presentationOptions = { reveal: vscode.TaskRevealKind.Always, clear: true };
    vscode.tasks.executeTask(task);
  }));
}

function deactivate() { return client ? client.stop() : undefined; }
module.exports = { activate, deactivate };
