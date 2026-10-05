import { NextResponse, type NextRequest } from 'next/server';
import { clientIp, limited, makeToken, passwordMatches, resetLimit, SESSION_SECONDS, sessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const key = `login:${clientIp(req)}`;
  if (limited(key, 8, 15 * 60 * 1000)) return NextResponse.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  if (!passwordMatches(body.password)) return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  resetLimit(key);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie(req, makeToken(), SESSION_SECONDS));
  return res;
}
