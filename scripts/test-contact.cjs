const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function load(file, extra = {}) {
  const box = { exports: {}, require, URL, Request, Response, Intl, Date, Map, Set, Uint8Array, TextDecoder, RangeError, AbortSignal, console, process, ...extra };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, box);
  return box.exports;
}
const validation = load('src/components/contact/validation.ts');
function harness(options = {}) {
  const sent = [], pending = [], verified = [];
  const env = { NODE_ENV: 'production', SMTP_HOST: 'smtp.example.com', SMTP_USER: 'sender@example.com', SMTP_PASSWORD: 'test', ADMIN_EMAIL: 'admin@example.com', NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site-key', TURNSTILE_SECRET_KEY: 'secret-key', ...options.env };
  const site = { name: 'Sash Tech Digital', email: 'info@example.com', url: 'https://example.com' };
  const security = load('src/lib/form-security.ts', { process: { env }, require(id) { return id === './site' ? { site } : require(id); }, async fetch(url, init) {
    verified.push(JSON.parse(init.body));
    if (options.captchaThrow) throw new Error('provider unavailable');
    return Response.json({ success: true, hostname: 'example.com', action: 'website-form', ...options.captcha }, { status: options.captchaStatus || 200 });
  } });
  const route = load('src/app/api/contact/route.ts', { process: { env }, console: { error() {} }, require(id) {
    if (id === 'next/server') return { after: fn => pending.push(fn) };
    if (id === 'nodemailer') return { createTransport: () => ({ async sendMail(mail) {
      sent.push(mail);
      if (options.smtpFail) throw new Error('SMTP failure');
      return { accepted: ['ok'], rejected: options.smtpRejected ? ['rejected'] : [] };
    } }) };
    if (id === '@/lib/site') return { site };
    if (id === '@/lib/form-security') return security;
    if (id.includes('validation')) return validation;
    throw new Error('Unexpected import: ' + id);
  } });
  const data = { type: 'contact', kind: 'individual', name: 'Test <Customer>', email: 'client@example.com', message: 'Please help with my website project.', consent: true, captchaToken: 'valid-token' };
  const post = (overrides = {}, headers = {}, raw) => route.POST(new Request('https://example.com/api/contact', { method: 'POST', body: raw ?? JSON.stringify({ ...data, ...overrides }), headers: { 'content-type': 'application/json', origin: 'https://example.com', ...headers } }));
  return { post, route, security, sent, pending, verified };
}
async function blocked(options, overrides, headers, expected, raw) {
  const h = harness(options);
  const response = await h.post(overrides, headers, raw);
  assert.equal(response.status, expected);
  assert.equal(h.sent.length, 0, 'Blocked submissions must never send mail');
  assert.equal(h.pending.length, 0);
}
(async () => {
  for (const type of ['contact', 'meeting', 'newsletter']) {
    const h = harness();
    let datetime;
    for (let d = 1; d < 20; d++) {
      const candidate = new Date(Date.now() + d * 86400000); candidate.setUTCHours(7, 0, 0, 0);
      if (validation.isBookableInstant(+candidate, Date.now())) { datetime = candidate.toISOString(); break; }
    }
    assert.equal((await h.post({ type, datetime, timeZone: 'Asia/Karachi' })).status, 200);
    assert.equal(h.sent.length, 1); assert.equal(h.sent[0].to[0], 'admin@example.com');
    assert.equal(h.pending.length, 0, 'Visitor autoresponses disabled by default');
    assert(!h.sent[0].html.includes('Test <Customer>'));
    assert.equal(h.verified.length, 1);
  }
  for (const kind of ['project', 'partner']) assert.equal((await harness().post({ kind })).status, 200);
  await blocked({}, { captchaToken: '' }, {}, 403);
  await blocked({}, { captchaToken: 'x'.repeat(2049) }, {}, 403);
  await blocked({ captcha: { success: false, 'error-codes': ['timeout-or-duplicate'] } }, {}, {}, 403);
  await blocked({ captcha: { hostname: 'attacker.example' } }, {}, {}, 403);
  await blocked({ captcha: { action: 'other-action' } }, {}, {}, 403);
  await blocked({ captchaThrow: true }, {}, {}, 503);
  await blocked({ captchaStatus: 500 }, {}, {}, 503);
  await blocked({ env: { TURNSTILE_SECRET_KEY: '' } }, {}, {}, 503);
  await blocked({ env: { NEXT_PUBLIC_TURNSTILE_SITE_KEY: '' } }, {}, {}, 503);
  await blocked({}, {}, { origin: 'https://attacker.example' }, 403);
  await blocked({}, {}, { origin: '' }, 403);
  await blocked({}, {}, { 'sec-fetch-site': 'cross-site' }, 403);
  await blocked({}, {}, { 'content-type': 'text/plain' }, 415);
  await blocked({}, {}, {}, 413, JSON.stringify({ value: 'x'.repeat(17000) }));
  await blocked({}, {}, {}, 400, '{broken');
  await blocked({}, {}, {}, 400, '[]');
  await blocked({}, { email: 'invalid' }, {}, 422);
  await blocked({}, { botcheck: 'bot' }, {}, 200);
  await blocked({ env: { SMTP_HOST: '' } }, {}, {}, 503);
  for (const options of [{ smtpFail: true }, { smtpRejected: true }]) {
    const h = harness(options); assert.equal((await h.post()).status, 502); assert.equal(h.pending.length, 0);
  }
  const replay = harness();
  const simultaneous = await Promise.all([replay.post(), replay.post()]);
  assert.deepEqual(simultaneous.map(r => r.status).sort(), [200, 403]); assert.equal(replay.sent.length, 1);
  const duplicate = harness();
  assert.equal((await duplicate.post()).status, 200);
  assert.equal((await duplicate.post({ captchaToken: 'fresh-token' })).status, 429); assert.equal(duplicate.sent.length, 1);
  const flood = harness();
  for (let i=0;i<3;i++) assert.equal((await flood.post({ botcheck: 'bot' })).status, 200);
  assert.equal((await flood.post()).status, 429); assert.equal(flood.sent.length, 0);
  const limits = harness().security;
  for (let i=0;i<20;i++) assert.equal(limits.reserveMailAttempt(), true);
  assert.equal(limits.reserveMailAttempt(), false);
  const ipLimits = harness().security; const now = Date.now();
  for (let i=0;i<10;i++) assert.equal(ipLimits.rateLimited('ip', now + i*61000), false);
  assert.equal(ipLimits.rateLimited('ip', now + 610000), true);
  assert.equal(ipLimits.rateLimited('ip', now + 2*3600000), false);
  const ack = harness({ env: { CONTACT_SEND_ACKNOWLEDGEMENTS: 'true' } });
  assert.equal((await ack.post()).status, 200); assert.equal(ack.pending.length, 1);
  await ack.pending[0](); assert.equal(ack.sent[1].to[0], 'client@example.com');
  const health = await harness().route.GET().json();
  assert.equal(health.captcha.secretKey, true); assert(!JSON.stringify(health).includes('secret-key'));
  console.log('PASS: all form kinds; mandatory CAPTCHA, origin/action/hostname checks, outages, concurrent replay, deduplication, payload limits, honeypot, request/mail caps, SMTP failures and optional acknowledgements. No real mail sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
