import { NextResponse, type NextRequest } from 'next/server';
import { clientIp, limited } from '@/lib/auth';
import { readCareers, writeCareers } from '@/lib/store';

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  if (limited(`form:${clientIp(req)}`, 15, 60 * 60 * 1000)) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  const d = readCareers();
  if (!d.subscribers.some(s => s.email === email)) {
    d.subscribers.push({ email, at: new Date().toISOString() });
    writeCareers(d);
  }
  return NextResponse.json({ ok: true });
}
