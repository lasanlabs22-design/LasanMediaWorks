import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readRecognition, sanitizeRecognition, writeRecognition } from '@/lib/store';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readRecognition();
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  const data = sanitizeRecognition(await req.json().catch(() => ({})));
  if (!data.name || !data.month || !data.photo) return NextResponse.json({ error: 'Name, month and photo are required' }, { status: 400 });
  list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
  writeRecognition(list);
  return NextResponse.json({ entry: list[idx] });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readRecognition();
  const next = list.filter(r => r.id !== id);
  if (next.length === list.length) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  writeRecognition(next);
  return NextResponse.json({ ok: true });
}
