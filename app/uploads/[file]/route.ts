import fs from 'fs';
import path from 'path';
import { NextResponse, type NextRequest } from 'next/server';
import { safeFile, UPLOAD_DIR } from '@/lib/store';

const TYPES: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };

// Uploaded images live on the data volume (not in /public, which is fixed at build time).
export async function GET(_req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const full = safeFile(UPLOAD_DIR, (await params).file);
  const type = full && TYPES[path.extname(full).toLowerCase()];
  if (!full || !type) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(fs.readFileSync(full), {
    headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' },
  });
}
