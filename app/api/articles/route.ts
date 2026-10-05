import { NextResponse, type NextRequest } from 'next/server';
import { CATEGORIES, publishedArticles } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get('limit')) || undefined;
  return NextResponse.json({ categories: CATEGORIES, articles: publishedArticles({ category: sp.get('category'), q: sp.get('q'), limit }) });
}
