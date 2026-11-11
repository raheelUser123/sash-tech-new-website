const fs = require('node:fs');
const path = require('node:path');
const source = path.dirname(require.resolve('@next/swc-wasm-nodejs/package.json'));
const next = path.dirname(require.resolve('next/package.json'));
const installed = require('@next/swc-wasm-nodejs/package.json').version;
if (installed !== require('next/package.json').version) throw new Error('Next and SWC WASM versions must match.');
// Next 16.4.3 loads its fallback from this directory after native bindings fail.
// Stage the locked package here so restricted hosts need no compiler download during builds.
const destination = path.join(next, 'wasm', '@next', 'swc-wasm-nodejs');
fs.mkdirSync(destination, { recursive: true });
fs.cpSync(source, destination, { recursive: true, force: true });
console.log('Prepared version-matched SWC WASM fallback: ' + installed);
