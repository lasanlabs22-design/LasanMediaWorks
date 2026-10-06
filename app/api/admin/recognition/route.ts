import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { QUOTES, readRecognition, sanitizeRecognition, writeRecognition, type Recognition } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  return NextResponse.json({ quotes: QUOTES, entries: readRecognition() });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const data = sanitizeRecognition(await req.json().catch(() => ({})));
  if (!data.name || !data.month || !data.photo) return NextResponse.json({ error: 'Name, month and photo are required' }, { status: 400 });
  const now = new Date().toISOString();
  const entry: Recognition = { id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now };
  writeRecognition([...readRecognition(), entry]);
  return NextResponse.json({ entry }, { status: 201 });
}
