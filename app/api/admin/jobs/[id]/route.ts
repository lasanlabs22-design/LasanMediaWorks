import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readJobs, sanitizeJob, writeJobs } from '@/lib/store';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readJobs();
  const idx = list.findIndex(j => j.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  const data = sanitizeJob(await req.json().catch(() => ({})));
  if (!data.title) return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
  list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
  writeJobs(list);
  return NextResponse.json({ job: list[idx] });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readJobs();
  const next = list.filter(j => j.id !== id);
  if (next.length === list.length) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  writeJobs(next);
  return NextResponse.json({ ok: true });
}
