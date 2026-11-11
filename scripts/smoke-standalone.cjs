const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const reservation = net.createServer();
  await new Promise(resolve => reservation.listen(0, '127.0.0.1', resolve));
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const child = spawn(process.execPath, ['server.js'], { cwd: path.resolve(__dirname, '..'), env: { ...process.env, PORT: String(port) }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  child.stdout.on('data', chunk => { log += chunk; }); child.stderr.on('data', chunk => { log += chunk; });
  const base = 'http://127.0.0.1:' + port;
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null) throw new Error('Server exited: ' + log);
      try { const res = await fetch(base + '/api/contact', { signal: AbortSignal.timeout(1000) }); if (res.ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    assert(ready, 'Standalone server did not start: ' + log);
    let home;
    for (const route of ['/', '/about', '/services', '/portfolio', '/pricing', '/contact']) {
      const response = await fetch(base + route); assert.equal(response.status, 200, route);
      if (route === '/') home = await response.text();
    }
    const asset = home.match(/(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/);
    assert(asset, 'No static asset found in HTML');
    assert.equal((await fetch(base + asset[1].replaceAll('&amp;', '&'))).status, 200, 'Next static asset');
    assert.equal((await fetch(base + '/images/logo.webp')).status, 200, 'Public logo');
    const health = await (await fetch(base + '/api/contact')).json(); assert(health.smtp); assert.equal(typeof health.smtp.password, 'boolean');
    console.log('PASS: root server.js respects assigned PORT; six pages, static asset, public image and safe SMTP health endpoint respond.');
  } finally {
    child.kill();
    await new Promise(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', resolve); });
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
