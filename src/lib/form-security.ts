import { createHash } from "node:crypto";
import { site } from "./site";

const requests = new Map<string, number[]>();
const tokens = new Map<string, number>();
const deliveries = new Map<string, number>();
let mailAttempts: number[] = [];
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const HOUR = 3_600_000;

// These caps apply per Node process. Use an edge/WAF limit as well for multiple workers.
export function rateLimited(ip: string, now = Date.now()) {
  for (const [key, times] of requests) if (times.every(t => now - t >= HOUR)) requests.delete(key);
  const recent = (requests.get(ip) ?? []).filter(t => now - t < HOUR);
  if ((!requests.has(ip) && requests.size >= 5000) || recent.length >= 10 || recent.filter(t => now - t < 60_000).length >= 3) return true;
  requests.set(ip, [...recent, now]);
  return false;
}

export function validOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin || req.headers.get("sec-fetch-site") === "cross-site") return false;
  try {
    const allowed = new Set([new URL(site.url).origin]);
    if (process.env.NODE_ENV !== "production") allowed.add(new URL(req.url).origin);
    return allowed.has(origin);
  } catch { return false; }
}

export async function readFormBody(req: Request): Promise<unknown> {
  const max = 16_384;
  if (Number(req.headers.get("content-length")) > max) throw new RangeError("Body too large");
  if (!req.body) throw new Error("Empty body");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); throw new RangeError("Body too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(buffer));
}

export async function verifyCaptcha(token: unknown): Promise<"ok" | "invalid" | "unavailable"> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()) return "unavailable";
  if (typeof token !== "string" || !token || token.length > 2048) return "invalid";
  const now = Date.now();
  for (const [key, expiry] of tokens) if (expiry <= now) tokens.delete(key);
  const key = hash(token);
  if (tokens.has(key) || tokens.size >= 5000) return "invalid";
  // Reserve before awaiting verification to prevent concurrent token replay locally.
  tokens.set(key, now + 300_000);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return "unavailable";
    const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
    return result.success === true && result.hostname === new URL(site.url).hostname && result.action === "website-form" ? "ok" : "invalid";
  } catch { return "unavailable"; }
}

export function reserveDelivery(email: string, content: string, now = Date.now()) {
  for (const [key, expiry] of deliveries) if (expiry <= now) deliveries.delete(key);
  const key = hash(email.toLowerCase() + "\n" + content);
  if (deliveries.has(key) || deliveries.size >= 5000) return false;
  deliveries.set(key, now + 900_000);
  return true;
}

export function releaseDelivery(email: string, content: string) {
  deliveries.delete(hash(email.toLowerCase() + "\n" + content));
}

export function reserveMailAttempt(now = Date.now()) {
  mailAttempts = mailAttempts.filter(t => now - t < HOUR);
  if (mailAttempts.length >= 20) return false;
  mailAttempts.push(now);
  return true;
}
