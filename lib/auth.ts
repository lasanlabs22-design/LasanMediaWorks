// Admin session: HMAC-signed cookie, no extra dependencies.
import 'server-only';
import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';

const SESSION_HOURS = 12;
export const COOKIE = 'lmw_session';

// One secret per process (route bundles may load this module more than once).
const g = globalThis as typeof globalThis & { __lmwSecret?: string; __lmwHits?: Map<string, { count: number; since: number }> };
const SECRET = process.env.SESSION_SECRET || (g.__lmwSecret ??= crypto.randomBytes(32).toString('hex'));
const PASSWORD = process.env.ADMIN_PASSWORD || 'lasan-admin';
if (!process.env.ADMIN_PASSWORD && process.env.NODE_ENV === 'production') {
  console.warn('[warn] ADMIN_PASSWORD not set — using the default. Set it before going live.');
}

const sign = (v: string) => crypto.createHmac('sha256', SECRET).update(v).digest('hex');

export function makeToken() {
  const payload = `admin.${Date.now() + SESSION_HOURS * 3600 * 1000}`;
  return `${payload}.${sign(payload)}`;
}

function verify(token?: string) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const expected = Buffer.from(sign(`${parts[0]}.${parts[1]}`));
  const given = Buffer.from(parts[2]);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return false;
  return Number(parts[1]) > Date.now();
}

export const isAdmin = (req: NextRequest) => verify(req.cookies.get(COOKIE)?.value);

export function passwordMatches(input: unknown) {
  const a = crypto.createHash('sha256').update(String(input ?? '')).digest();
  const b = crypto.createHash('sha256').update(PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

export const sessionCookie = (req: NextRequest, value: string, maxAge: number) => ({
  name: COOKIE,
  value,
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
  maxAge,
  secure: req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https',
});
export const SESSION_SECONDS = SESSION_HOURS * 3600;

export const unauthorized = () => NextResponse.json({ error: 'Not signed in' }, { status: 401 });

export function clientIp(req: NextRequest) {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'local';
}

/** Simple in-memory rate limit: `max` hits per `windowMs` per key. Returns true when over the limit. */
export function limited(key: string, max: number, windowMs: number) {
  const hits = (g.__lmwHits ??= new Map());
  const now = Date.now();
  const rec = hits.get(key) || { count: 0, since: now };
  if (now - rec.since > windowMs) { rec.count = 0; rec.since = now; }
  rec.count++;
  hits.set(key, rec);
  return rec.count > max;
}
export const resetLimit = (key: string) => g.__lmwHits?.delete(key);
