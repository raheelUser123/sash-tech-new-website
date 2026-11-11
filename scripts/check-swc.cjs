const { createRequire } = require('node:module');
const nextRequire = createRequire(require.resolve('next/package.json'));
async function main() {
  const major = Number(process.versions.node.split('.')[0]);
  if (![22, 24].includes(major)) throw new Error('Use Node 22 or 24 LTS for this project.');
  const report = process.report.getReport();
  console.log(JSON.stringify({ node: process.version, platform: process.platform, arch: process.arch, glibc: report.header.glibcVersionRuntime || null, next: require('next/package.json').version }));
  if (process.platform === 'linux') {
    const suffix = report.header.glibcVersionRuntime ? 'gnu' : 'musl';
    const pkg = '@next/swc-linux-' + process.arch + '-' + suffix;
    try { nextRequire(pkg); console.log('Native SWC loads: ' + pkg); }
    catch (error) { console.warn('Native SWC unavailable: ' + pkg + '\n' + error.message); }
  }
  const swc = require('next/dist/build/swc');
  const bindings = await swc.loadBindings(process.argv.includes('--wasm'));
  const result = await bindings.transform('export const check: number = 1;', { filename: 'check.ts', jsc: { parser: { syntax: 'typescript' }, target: 'es2017' }, module: { type: 'commonjs' } });
  if (!result.code.includes('check')) throw new Error('SWC transform failed');
  console.log('PASS: SWC TypeScript transform (' + (bindings.isWasm ? 'WASM' : 'native') + '). Production build must also pass.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
