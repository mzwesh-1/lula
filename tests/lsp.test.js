'use strict';
// Drives the real language server over the Language Server Protocol (stdio), like VS Code does.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

module.exports = async function ({ testAsync, ROOT }) {
  console.log('language server (LSP over stdio)');
  const rpc = require('vscode-jsonrpc/node');
  const ws = fs.mkdtempSync(path.join(os.tmpdir(), 'lula-ws-'));
  const write = (name, text) => { const f = path.join(ws, name); fs.writeFileSync(f, text); return { file: f, uri: pathToFileURL(f).toString(), text }; };
  const tools = write('tools.zu.lula', '#faka <okokufaka_nokukhipha>\ninombolo engeza(inombolo a, inombolo b) {\n    buyisa a + b;\n}\n');
  const main = write('main.zu.lula', [
    '#faka <okokufaka_nokukhipha>',                       // 0
    'isakhiwo Irobhothi {',                               // 1
    '    inombolo ijubane;',                              // 2
    '    ize hamba(inombolo amamitha) { ijubane = amamitha; }', // 3
    '};',                                                 // 4
    'inombolo engeza(inombolo a, inombolo b);',           // 5
    '',                                                   // 6
    'inombolo okuyinhloko() {',                           // 7
    '    Irobhothi r;',                                   // 8
    '    r.hamba(3);',                                    // 9
    '    inombolo isamba = engeza(2, r.ijubane);',        // 10
    '    jikeleza (inombolo i = 0; i < isamba; i++) {',   // 11
    '        inombolo isamba = i * 2;',                   // 12
    '        bhala << isamba << umugqa;',                 // 13
    '    }',                                              // 14
    '    bhala << isamba << umugqa;',                     // 15
    '    buyisa 0;',                                      // 16
    '}',                                                  // 17
  ].join('\n') + '\n');

  const child = spawn(process.execPath, [process.env.LULA_LSP_SERVER || path.join(ROOT, 'src', 'lsp', 'server.js'), '--stdio'], { stdio: ['pipe', 'pipe', 'inherit'] });
  const conn = rpc.createMessageConnection(new rpc.StreamMessageReader(child.stdout), new rpc.StreamMessageWriter(child.stdin));
  const diagnostics = new Map();
  const waiters = [];
  conn.onNotification('textDocument/publishDiagnostics', p => {
    diagnostics.set(p.uri, p.diagnostics);
    for (const w of [...waiters]) if (w.uri === p.uri && w.test(p.diagnostics)) { waiters.splice(waiters.indexOf(w), 1); w.resolve(p.diagnostics); }
  });
  const waitDiag = (uri, test, ms = 20000) => new Promise((resolve, reject) => {
    const have = diagnostics.get(uri);
    if (have && test(have)) return resolve(have);
    waiters.push({ uri, test, resolve });
    setTimeout(() => reject(new Error(`timeout waiting for diagnostics on ${uri}: ${JSON.stringify(diagnostics.get(uri))}`)), ms);
  });
  conn.listen();
  const req = (method, params) => conn.sendRequest(method, params);
  const open = (d, lang = 'lula') => conn.sendNotification('textDocument/didOpen', { textDocument: { uri: d.uri, languageId: lang, version: 1, text: d.text } });
  const pos = (line, character) => ({ line, character });
  const at = (d, line, character) => ({ textDocument: { uri: d.uri }, position: pos(line, character) });

  try {
    const init = await req('initialize', { processId: process.pid, rootUri: pathToFileURL(ws).toString(), workspaceFolders: [{ uri: pathToFileURL(ws).toString(), name: 'ws' }], capabilities: {} });
    await testAsync('initialize advertises the full feature set', async () => {
      const c = init.capabilities;
      for (const k of ['completionProvider', 'hoverProvider', 'definitionProvider', 'referencesProvider', 'renameProvider', 'documentSymbolProvider',
        'workspaceSymbolProvider', 'signatureHelpProvider', 'codeActionProvider', 'documentFormattingProvider', 'semanticTokensProvider', 'inlayHintProvider'])
        assert.ok(c[k], k);
    });
    conn.sendNotification('initialized', {});
    open(main);

    await testAsync('hover explains Lula words and your own names', async () => {
      let h = await req('textDocument/hover', at(main, 11, 6));
      assert.match(h.contents.value, /\*\*jikeleza\*\* \(isiZulu\) → C\+\+ `for`/);
      h = await req('textDocument/hover', at(main, 9, 8));
      assert.match(h.contents.value, /\(umsebenzi welungu\) `hamba`/);
      assert.match(h.contents.value, /ize hamba\(inombolo amamitha\)/);
    });
    await testAsync('go to definition: member, local, and a function defined in another file', async () => {
      let d = await req('textDocument/definition', at(main, 9, 6));
      assert.deepStrictEqual([d.uri, d.range.start], [main.uri, pos(3, 8)]);
      d = await req('textDocument/definition', at(main, 15, 14));
      assert.deepStrictEqual(d.range.start, pos(10, 13), 'outer isamba, not the one inside the loop');
      d = await req('textDocument/definition', at(main, 10, 23));
      assert.strictEqual(d.uri, tools.uri, 'engeza is defined in tools.zu.lula');
      assert.deepStrictEqual(d.range.start, pos(1, 9));
    });
    await testAsync('find references respects scopes (shadowed names)', async () => {
      const inner = await req('textDocument/references', { ...at(main, 12, 18), context: { includeDeclaration: true } });
      assert.deepStrictEqual(inner.map(r => r.range.start.line).sort(), [12, 13]);
      const outer = await req('textDocument/references', { ...at(main, 10, 15), context: { includeDeclaration: true } });
      assert.deepStrictEqual(outer.map(r => r.range.start.line).sort((a, b) => a - b), [10, 11, 15]);
    });
    await testAsync('rename a field everywhere; refuse reserved Lula words in the file language', async () => {
      const r = await req('textDocument/rename', { ...at(main, 2, 15), newName: 'isivinini' });
      const lines = r.changes[main.uri].map(e => `${e.range.start.line}:${e.range.start.character}`).sort();
      assert.deepStrictEqual(lines, ['10:34', '2:13', '3:35']);
      await assert.rejects(req('textDocument/rename', { ...at(main, 2, 15), newName: 'uma' }), /'uma' ligama le-Lula/);
      await assert.rejects(req('textDocument/rename', { ...at(main, 2, 15), newName: '9x' }), /akulona igama elivumelekile/);
      await assert.rejects(req('textDocument/prepareRename', at(main, 11, 6)), /amagama akho kuphela/);
    });
    await testAsync('rename a function across files', async () => {
      const r = await req('textDocument/rename', { ...at(main, 10, 24), newName: 'hlanganisa_amanani' });
      assert.ok(r.changes[tools.uri] && r.changes[main.uri], JSON.stringify(Object.keys(r.changes)));
      assert.strictEqual(r.changes[tools.uri].length, 1);
      assert.strictEqual(r.changes[main.uri].length, 2);
    });
    await testAsync('completion: members after ".", your names, keywords, snippets, library words', async () => {
      const afterDot = await req('textDocument/completion', at({ uri: main.uri }, 9, 6));
      const labels = (afterDot.items || afterDot).map(i => i.label);
      assert.ok(labels.includes('hamba') && labels.includes('ijubane'), labels.slice(0, 20).join(','));
      const all = await req('textDocument/completion', at(main, 16, 4));
      const items = all.items || all;
      const l = new Set(items.map(i => i.label));
      for (const w of ['isamba', 'r', 'Irobhothi', 'engeza', 'uma', 'jikeleza', 'bhala', 'okuyinhloko']) assert.ok(l.has(w), w);
      const snippet = items.find(i => i.label === 'uma' && i.kind === 15);
      assert.ok(snippet && snippet.insertText.startsWith('uma ('));
      const cv = items.find(i => i.label === 'Isithombe');
      assert.ok(cv && cv.additionalTextEdits[0].newText === '#faka <umbono>\n', 'OpenCV word offers to add #faka <umbono>');
    });
    await testAsync('completion of header names after #faka <', async () => {
      const d = { uri: pathToFileURL(path.join(ws, 'h.zu.lula')).toString(), text: '#faka <\n' };
      open(d);
      const r = await req('textDocument/completion', at(d, 0, 7));
      const l = (r.items || r).map(i => i.label);
      assert.ok(l.includes('iqoqo') && l.includes('umbono') && l.includes('ros2'));
    });
    await testAsync('signature help for your own functions', async () => {
      const s = await req('textDocument/signatureHelp', at(main, 10, 31));
      assert.match(s.signatures[0].label, /engeza\(inombolo a, inombolo b\)/);
      assert.strictEqual(s.activeParameter, 1);
    });
    await testAsync('outline (document symbols) and workspace symbols', async () => {
      const syms = await req('textDocument/documentSymbol', { textDocument: { uri: main.uri } });
      const robot = syms.find(s => s.name === 'Irobhothi');
      assert.deepStrictEqual(robot.children.map(c => c.name), ['ijubane', 'hamba']);
      assert.strictEqual(robot.detail, 'isakhiwo');
      assert.ok(syms.find(s => s.name === 'okuyinhloko'));
      const w = await req('workspace/symbol', { query: 'engeza' });
      assert.ok(w.some(s => s.location.uri === tools.uri) && w.some(s => s.location.uri === main.uri));
    });
    await testAsync('semantic tokens colour your own names', async () => {
      const st = await req('textDocument/semanticTokens/full', { textDocument: { uri: main.uri } });
      assert.ok(st.data.length >= 5 * 15);
    });
    await testAsync('format document fixes indentation', async () => {
      const d = { uri: pathToFileURL(path.join(ws, 'fmt.zu.lula')).toString(), text: 'inombolo okuyinhloko() {\numa (1) {\n        buyisa 1;   \n  }\n      buyisa 0;\n}\n' };
      open(d);
      const edits = await req('textDocument/formatting', { textDocument: { uri: d.uri }, options: { tabSize: 4, insertSpaces: true } });
      const lines = d.text.split('\n');
      for (const e of edits.sort((x, y) => y.range.start.line - x.range.start.line)) {
        const l = e.range.start.line;
        lines[l] = lines[l].slice(0, e.range.start.character) + e.newText + lines[l].slice(e.range.end.character);
      }
      assert.strictEqual(lines.join('\n'), 'inombolo okuyinhloko() {\n    uma (1) {\n        buyisa 1;\n    }\n    buyisa 0;\n}\n');
    });

    if (!spawnSync('g++', ['--version']).error) {
      await testAsync('errors as you type, in the file language (isiXhosa), with quick fixes', async () => {
        const bad = { uri: pathToFileURL(path.join(ws, 'bad.xh.lula')).toString(), text: 'inani engundoqo() {\n    inani x = 5\n    buyisa x;\n}\nize xela() {\n    bhala << 1;\n}\n' };
        open(bad);
        const ds = await waitDiag(bad.uri, list => list.some(d => d.source === 'lula' && d.severity === 1));
        const semi = ds.find(d => /kulahleke u-','/.test(d.message));
        assert.ok(semi, JSON.stringify(ds.map(d => d.message)));
        assert.strictEqual(semi.range.start.line, 2);
        const inc = ds.find(d => d.data && d.data.fix === 'include');
        assert.ok(inc, 'cout without its header offers to add it');
        assert.match(inc.message, /isiseko|bhala/);
        const actions = await req('textDocument/codeAction', { textDocument: { uri: bad.uri }, range: semi.range, context: { diagnostics: [semi, inc] } });
        const fixSemi = actions.find(a => a.title === "Yongeza u-; olahlekileyo");
        assert.ok(fixSemi, actions.map(a => a.title).join(' | '));
        assert.deepStrictEqual(fixSemi.edit.changes[bad.uri][0], { range: { start: pos(1, 15), end: pos(1, 15) }, newText: ';' });
        const fixInc = actions.find(a => a.title === 'Yongeza #faka <ngeniso_nokuphuma>');
        assert.ok(fixInc, actions.map(a => a.title).join(' | '));
      });
      await testAsync('a Lula word used as a name is explained instantly, with a rename fix', async () => {
        const d = { uri: pathToFileURL(path.join(ws, 'res.zu.lula')).toString(), text: 'inombolo okuyinhloko() {\n    inombolo isikhathi = 5;\n    buyisa isikhathi;\n}\n' };
        open(d);
        const ds = await waitDiag(d.uri, list => list.some(x => x.code === 'reserved-name'));
        const r = ds.find(x => x.code === 'reserved-name');
        assert.match(r.message, /u-'isikhathi' ligama le-Lula \(lisho std::time\)/);
        const actions = await req('textDocument/codeAction', { textDocument: { uri: d.uri }, range: r.range, context: { diagnostics: [r] } });
        assert.strictEqual(actions[0].edit.changes[d.uri].length, 2);
        assert.strictEqual(actions[0].edit.changes[d.uri][0].newText, 'isikhathi_');
      });
    }
    const core = ['/usr/share/arduino/hardware/arduino/avr'].find(c => fs.existsSync(path.join(c, 'cores/arduino/Arduino.h')));
    if (core && !spawnSync('avr-g++', ['--version']).error) {
      await testAsync('Arduino files are checked with the real AVR compiler', async () => {
        const d = { uri: pathToFileURL(path.join(ws, 'robot.zu.lula')).toString(), text: 'ize qala() {\n    setha_iphini(13, OKUPHUMAYO)\n}\nize phindaphinda() {\n    linda(100);\n}\n' };
        open(d);
        const ds = await waitDiag(d.uri, list => list.some(x => x.severity === 1));
        assert.match(ds.find(x => x.severity === 1).message, /kushoda u-';'/);
      });
    }
  } finally {
    try { await req('shutdown'); conn.sendNotification('exit'); } catch { /* ignore */ }
    child.kill();
  }
};
