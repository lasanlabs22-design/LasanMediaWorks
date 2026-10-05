import { NextResponse, type NextRequest } from 'next/server';
import { publishedArticle } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const found = publishedArticle((await params).slug);
  if (!found) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  return NextResponse.json(found);
}
