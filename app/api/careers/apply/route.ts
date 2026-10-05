import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { clientIp, limited } from '@/lib/auth';
import { readCareers, RESUME_DIR, saveFile, writeCareers } from '@/lib/store';

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const RESUME_EXT: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};
const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(req: NextRequest) {
  if (limited(`form:${clientIp(req)}`, 15, 60 * 60 * 1000)) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  const b = await req.json().catch(() => ({}));
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const app = {
    name: str(b.name, 100),
    email: str(b.email, 254).toLowerCase(),
    phone: str(b.phone, 30),
    area: str(b.area, 80),
    office: str(b.office, 40),
    link: str(b.link, 500),
    about: str(b.about, 3000),
    role: str(b.role, 120),
  };
  if (!app.name || !app.phone || !app.about) return bad('Please fill in your name, phone and a few words about you.');
  if (!EMAIL_RE.test(app.email)) return bad('Please enter a valid email address.');
  if (app.link && !/^https?:\/\//i.test(app.link)) return bad('Portfolio link must start with http:// or https://');

  let resume: { file: string; name: string } | null = null;
  if (b.resume?.dataUrl) {
    const m = /^data:([\w/.+-]+);base64,([A-Za-z0-9+/=]+)$/.exec(b.resume.dataUrl);
    if (!m || !RESUME_EXT[m[1]]) return bad('Resume must be a PDF or Word document.');
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > 5 * 1024 * 1024) return bad('Resume must be under 5 MB.');
    const file = saveFile(RESUME_DIR, RESUME_EXT[m[1]], buf);
    resume = { file, name: str(b.resume.name, 120).replace(/[^\w.\- ]/g, '') || file };
  }
  if (!resume && !app.link) return bad('Please attach your resume or add a portfolio / LinkedIn link.');

  const d = readCareers();
  d.applications.push({ id: crypto.randomUUID(), ...app, resume, at: new Date().toISOString() });
  writeCareers(d);
  return NextResponse.json({ ok: true }, { status: 201 });
}
