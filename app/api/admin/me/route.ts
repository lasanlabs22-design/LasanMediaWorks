import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  return isAdmin(req) ? NextResponse.json({ ok: true }) : unauthorized();
}
