import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { JOB_TYPES, readJobs, sanitizeJob, writeJobs, type Job } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const jobs = readJobs().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json({ types: JOB_TYPES, jobs });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const data = sanitizeJob(await req.json().catch(() => ({})));
  if (!data.title) return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
  const now = new Date().toISOString();
  const job: Job = { id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now };
  writeJobs([...readJobs(), job]);
  return NextResponse.json({ job }, { status: 201 });
}
