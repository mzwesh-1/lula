'use strict';
const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const { translate, convert, listLanguages, loadLanguage, detectLanguage, localizeMessage } = require('./lib/translator');

const CPP_SCHEME = 'khanya-cpp';
const cppViews = new Map(); // virtual doc uri -> source uri

function config() { return vscode.workspace.getConfiguration('khanya'); }
function langOf(doc) { return detectLanguage(doc.fileName) || config().get('defaultLanguage') || 'zu'; }
function safeLang(doc) { try { return loadLanguage(langOf(doc)); } catch { return null; } }

function activate(context) {
  const diagnostics = vscode.languages.createDiagnosticCollection('khanya');
  const changed = new vscode.EventEmitter();
  context.subscriptions.push(diagnostics, changed);

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

  context.subscriptions.push(vscode.commands.registerCommand('khanya.showCpp', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'khanya') return;
    const uri = vscode.Uri.parse(`${CPP_SCHEME}:${path.basename(ed.document.fileName)}.cpp`);
    cppViews.set(uri.toString(), ed.document.uri.toString());
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.languages.setTextDocumentLanguage(doc, 'cpp');
    vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside, preview: true, preserveFocus: true });
  }));

  context.subscriptions.push(vscode.commands.registerCommand('khanya.run', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'khanya') return;
    await ed.document.save();
    const cli = path.join(__dirname, 'lib', 'cli.js');
    const args = [cli, 'run', ed.document.fileName, '--lang', langOf(ed.document), '--cxx', config().get('compilerPath')];
    const extra = config().get('compilerArgs');
    if (extra.length) args.push('--', ...extra);
    const exec = new vscode.ProcessExecution(process.execPath, args, { env: { ELECTRON_RUN_AS_NODE: '1' } });
    const task = new vscode.Task({ type: 'khanya' }, vscode.TaskScope.Workspace, path.basename(ed.document.fileName), 'khanya', exec);
    task.presentationOptions = { reveal: vscode.TaskRevealKind.Always, focus: true, clear: true };
    vscode.tasks.executeTask(task);
  }));

  context.subscriptions.push(vscode.commands.registerCommand('khanya.exportArduino', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== 'khanya') return;
    const base = path.basename(ed.document.fileName).replace(/(\.[a-z]{2,3})?\.kh$/i, '');
    const dir = path.join(path.dirname(ed.document.fileName), base);
    fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, `${base}.ino`);
    fs.writeFileSync(out, translate(ed.document.getText(), langOf(ed.document), { fileName: ed.document.fileName }).cpp);
    vscode.window.showInformationMessage(`Khanya: wrote ${out} - open it in the Arduino IDE or PlatformIO.`);
  }));

  // Convert the open C++ file (or the selection) into a Khanya language.
  context.subscriptions.push(vscode.commands.registerCommand('khanya.convertFromCpp', async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed) return;
    const pick = await vscode.window.showQuickPick(
      listLanguages().map(l => ({ label: l.name, description: l.code, code: l.code })), { placeHolder: 'Convert to which language?' });
    if (!pick) return;
    const from = ed.document.languageId === 'khanya' ? langOf(ed.document) : 'cpp';
    const text = ed.selection.isEmpty ? ed.document.getText() : ed.document.getText(ed.selection);
    const result = convert(text, from, pick.code);
    if (ed.document.uri.scheme === 'file') {
      const base = ed.document.fileName.replace(/(\.[a-z]{2,3})?\.(kh|cpp|cc|cxx|ino|h|hpp)$/i, '');
      const target = vscode.Uri.file(`${base}.${pick.code}.kh`);
      await vscode.workspace.fs.writeFile(target, Buffer.from(result, 'utf8'));
      vscode.window.showTextDocument(target);
    } else {
      const doc = await vscode.workspace.openTextDocument({ language: 'khanya', content: result });
      vscode.window.showTextDocument(doc);
    }
  }));

  // Hover: show the C++ meaning of a word.
  context.subscriptions.push(vscode.languages.registerHoverProvider('khanya', {
    provideHover(doc, pos) {
      const lang = safeLang(doc); if (!lang) return;
      const range = doc.getWordRangeAtPosition(pos); if (!range) return;
      const word = doc.getText(range);
      const cpp = lang.keywordMap.get(word) || lang.libraryMap.get(word) || lang.directiveMap.get(word) || lang.headerMap.get(word);
      if (!cpp) return;
      return new vscode.Hover(new vscode.MarkdownString(`**${word}** (${lang.name}) → C++ \`${cpp}\``), range);
    },
  }));

  // Completion: offer keywords of the file's language with their C++ meaning.
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('khanya', {
    provideCompletionItems(doc) {
      const lang = safeLang(doc); if (!lang) return [];
      const items = [];
      for (const [w, cpp] of lang.keywordMap) {
        const it = new vscode.CompletionItem(w, vscode.CompletionItemKind.Keyword); it.detail = cpp; items.push(it);
      }
      for (const [w, cpp] of lang.libraryMap) {
        const it = new vscode.CompletionItem(w, vscode.CompletionItemKind.Function); it.detail = cpp; items.push(it);
      }
      return items;
    },
  }));

  // Error checking: translate, run the compiler with -fsyntax-only, show problems in the editor.
  const check = doc => {
    if (doc.languageId !== 'khanya' || doc.uri.scheme !== 'file' || !config().get('checkOnSave')) return;
    const lang = langOf(doc);
    let cpp;
    try { cpp = translate(doc.getText(), lang, { fileName: doc.fileName }).cpp; }
    catch (e) { vscode.window.showErrorMessage(e.message); return; }
    const tmp = path.join(os.tmpdir(), `khanya-check-${process.pid}.cpp`);
    fs.writeFileSync(tmp, cpp);
    const args = ['-std=c++20', ...config().get('compilerArgs'), '-fsyntax-only', tmp];
    execFile(config().get('compilerPath'), args, { encoding: 'utf8' }, (err, _out, stderr) => {
      if (err && err.code === 'ENOENT') { diagnostics.delete(doc.uri); return; }
      const list = [];
      const re = /^(.*?):(\d+):(\d+): (error|warning|fatal error): (.*)$/gm;
      const target = path.resolve(doc.fileName).replace(/\\/g, '/');
      let m;
      while ((m = re.exec(stderr || ''))) {
        if (path.resolve(m[1]).replace(/\\/g, '/') !== target) continue;
        const line = Math.max(0, +m[2] - 1), col = Math.max(0, +m[3] - 1);
        const range = doc.getWordRangeAtPosition(new vscode.Position(line, col)) || new vscode.Range(line, col, line, col + 1);
        const sev = m[4] === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Error;
        const d = new vscode.Diagnostic(range, localizeMessage(m[5], lang), sev);
        d.source = 'khanya'; list.push(d);
      }
      diagnostics.set(doc.uri, list);
    });
  };
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(check), vscode.workspace.onDidOpenTextDocument(check));
  vscode.workspace.textDocuments.forEach(check);
}

function deactivate() {}
module.exports = { activate, deactivate };
