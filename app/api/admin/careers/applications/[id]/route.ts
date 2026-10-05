import fs from 'fs';
import path from 'path';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readCareers, RESUME_DIR, writeCareers } from '@/lib/store';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const d = readCareers();
  const found = d.applications.find(a => a.id === id);
  if (!found) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  d.applications = d.applications.filter(a => a !== found);
  writeCareers(d);
  if (found.resume) fs.rm(path.join(RESUME_DIR, path.basename(found.resume.file)), { force: true }, () => {});
  return NextResponse.json({ ok: true });
}
