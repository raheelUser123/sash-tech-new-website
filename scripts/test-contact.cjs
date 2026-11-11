const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function load(file, extra = {}) {
  const box = { exports: {}, require, URL, Request, Response, Intl, Date, Map, console, process, ...extra };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, box);
  return box.exports;
}
const validation = load('src/components/contact/validation.ts');
async function test(type, mode = 'ok', kind = 'individual') {
  const sent = [], pending = [];
  const env = { SMTP_HOST: 'smtp.example.com', SMTP_USER: 'sender@example.com', SMTP_PASSWORD: 'test', ADMIN_EMAIL: 'admin@example.com' };
  if (mode === 'missing') delete env.SMTP_HOST;
  const route = load('src/app/api/contact/route.ts', { process: { env }, console: { error() {} }, require(id) {
    if (id === 'next/server') return { after: fn => pending.push(fn) };
    if (id === 'nodemailer') return { createTransport: () => ({ async sendMail(mail) {
      sent.push(mail);
      if (mode === 'fail' || (mode === 'ack-fail' && sent.length === 2)) throw new Error('SMTP failure');
      return { accepted: ['ok'], rejected: mode === 'rejected' ? ['rejected'] : [] };
    } }) };
    if (id === '@/lib/site') return { site: { name: 'Sash Tech Digital', email: 'info@example.com' } };
    if (id.includes('validation')) return validation;
    throw new Error('Unexpected import: ' + id);
  } });
  let datetime;
  for (let d = 1; d < 20; d++) {
    const candidate = new Date(Date.now() + d * 86400000); candidate.setUTCHours(7, 0, 0, 0);
    if (validation.isBookableInstant(+candidate, Date.now())) { datetime = candidate.toISOString(); break; }
  }
  const data = { type, kind, name: 'Test <Customer>', email: mode === 'invalid' ? 'bad' : 'client@example.com', message: 'Please help with my website project.', consent: true, datetime, timeZone: 'Asia/Karachi' };
  const response = await route.POST(new Request('https://example.com/api/contact', { method: 'POST', body: JSON.stringify(data), headers: { 'content-type': 'application/json' } }));
  assert.equal(response.status, mode === 'missing' ? 503 : mode === 'invalid' ? 422 : ['fail', 'rejected'].includes(mode) ? 502 : 200);
  if (['ok', 'ack-fail'].includes(mode)) {
    assert.equal(sent.length, 1); assert.equal(sent[0].to[0], 'admin@example.com');
    await pending[0](); assert.equal(sent.length, 2); assert.equal(sent[1].to[0], 'client@example.com');
    assert(sent[1].html.includes('Sash Tech Digital')); assert(!sent[1].html.includes('Test <Customer>'));
    if (type === 'meeting') assert(sent[1].text.includes('pending confirmation'));
  } else assert.equal(pending.length, 0);
  assert(!('crm' in await route.GET().json()));
}
(async () => {
  for (const type of ['contact', 'meeting', 'newsletter']) await test(type);
  for (const kind of ['project', 'partner']) await test('contact', 'ok', kind);
  for (const mode of ['missing', 'fail', 'rejected', 'invalid', 'ack-fail']) await test('contact', mode);
  console.log('PASS: all form kinds, admin/customer SMTP routing, template escaping, validation and delivery failures. No real mail sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
