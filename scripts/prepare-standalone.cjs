const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const target = path.join(root, '.next', 'standalone');
if (!fs.existsSync(path.join(target, 'server.js'))) throw new Error('Run npm run build successfully before preparing standalone.');
for (const [source, destination] of [['public', 'public'], ['.next/static', '.next/static']]) {
  if (!fs.existsSync(path.join(root, source))) throw new Error('Missing build asset directory: ' + source);
  fs.cpSync(path.join(root, source), path.join(target, destination), { recursive: true, force: true });
}
// Next output tracing may copy local env files. Production uses cPanel environment variables.
for (const name of fs.readdirSync(target)) if (/^\.env(?:\.|$)/.test(name)) fs.unlinkSync(path.join(target, name));
console.log('Standalone ready: public and .next/static copied; root env files excluded.');
