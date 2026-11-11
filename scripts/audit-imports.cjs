const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const tracked = new Set(execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0'));
const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const errors = [];
let checked = 0;
function verify(file, specifier, target) {
  const relative = path.relative(root, target).split(path.sep).join('/');
  let current = root;
  for (const part of relative.split('/')) {
    if (!fs.readdirSync(current).includes(part)) { errors.push(file + ': incorrect case in ' + specifier + ' -> ' + relative); return; }
    current = path.join(current, part);
  }
  if (!tracked.has(relative)) errors.push(file + ': imported file is not tracked: ' + relative);
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(?:[cm]?[jt]sx?)$/.test(file)) continue;
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (!tracked.has(relative)) errors.push('Source file is not tracked: ' + relative);
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node) {
      let specifier;
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) specifier = node.moduleSpecifier.text;
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === 'require') && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) specifier = node.arguments[0].text;
      if (specifier && (specifier.startsWith('.') || specifier.startsWith('@/'))) {
        checked++;
        const resolved = ts.resolveModuleName(specifier, file, options, ts.sys).resolvedModule;
        const asset = specifier.startsWith('@/') ? path.join(root, 'src', specifier.slice(2)) : path.resolve(path.dirname(file), specifier);
        const target = resolved?.resolvedFileName || (fs.existsSync(asset) && fs.statSync(asset).isFile() ? asset : null);
        if (!target) errors.push(relative + ': cannot resolve ' + specifier);
        else verify(relative, specifier, target);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk(path.join(root, 'src'));
const folded = new Map();
for (const file of tracked) { const key = file.toLowerCase(); if (folded.has(key) && folded.get(key) !== file) errors.push('Case collision: ' + file + ' / ' + folded.get(key)); folded.set(key, file); }
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('PASS: ' + checked + ' local imports resolve with exact Linux casing and tracked source files.');
