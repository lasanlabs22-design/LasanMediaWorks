import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readCareers } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const d = readCareers();
  const byDate = (a: { at: string }, b: { at: string }) => new Date(b.at).getTime() - new Date(a.at).getTime();
  return NextResponse.json({ applications: d.applications.sort(byDate), subscribers: d.subscribers.sort(byDate) });
}
