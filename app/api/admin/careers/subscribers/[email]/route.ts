import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readCareers, writeCareers } from '@/lib/store';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  if (!isAdmin(req)) return unauthorized();
  const email = decodeURIComponent((await params).email);
  const d = readCareers();
  const next = d.subscribers.filter(s => s.email !== email);
  if (next.length === d.subscribers.length) return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
  d.subscribers = next;
  writeCareers(d);
  return NextResponse.json({ ok: true });
}
