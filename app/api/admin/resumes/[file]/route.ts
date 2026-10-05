import fs from 'fs';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readCareers, RESUME_DIR, safeFile } from '@/lib/store';

const TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

// Resumes are private: only signed-in admins can download them.
export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  if (!isAdmin(req)) return unauthorized();
  const file = (await params).file;
  const app = readCareers().applications.find(a => a.resume?.file === file);
  const full = app && safeFile(RESUME_DIR, file);
  if (!app || !full) return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  const ext = file.split('.').pop() || '';
  return new NextResponse(fs.readFileSync(full), {
    headers: {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(app.resume!.name)}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
