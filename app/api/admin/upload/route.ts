import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { saveFile, UPLOAD_DIR } from '@/lib/store';

const MIME_EXT: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };

// Cover / inline images arrive as a data URL; stored on the data volume and served from /uploads/<name>.
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const m = /^data:(image\/[a-z]+);base64,([A-Za-z0-9+/=]+)$/.exec(body.dataUrl || '');
  if (!m || !MIME_EXT[m[1]]) return NextResponse.json({ error: 'Use a PNG, JPG, WEBP or GIF image' }, { status: 400 });
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 5 * 1024 * 1024) return NextResponse.json({ error: 'Image must be under 5 MB' }, { status: 400 });
  const name = saveFile(UPLOAD_DIR, MIME_EXT[m[1]], buf);
  return NextResponse.json({ url: `/uploads/${name}` });
}
