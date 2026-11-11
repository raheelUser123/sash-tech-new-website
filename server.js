// cPanel/Passenger entry point. Vercel continues to use its standard Next.js adapter.
const fs = require('node:fs');
const path = require('node:path');
process.env.NODE_ENV = 'production';
const entry = path.join(__dirname, '.next', 'standalone', 'server.js');
if (!fs.existsSync(entry)) throw new Error('Missing standalone build. Run npm run build && npm run prepare:standalone.');
if (process.env.PORT && (!/^\d+$/.test(process.env.PORT) || Number(process.env.PORT) < 1 || Number(process.env.PORT) > 65535)) {
  throw new Error('PORT must be the numeric port assigned by your host.');
}
// Passenger intercepts the generated server's first listen() call when PORT is absent.
// Keep an assigned PORT intact; no application port is hardcoded here.
process.env.HOSTNAME = '0.0.0.0';
require(entry);
