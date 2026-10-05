import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { CATEGORIES, readArticles, readTime, sanitizeArticle, slugify, uniqueSlug, writeArticles, type Article } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const list = readArticles().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return NextResponse.json({ categories: CATEGORIES, articles: list });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const data = sanitizeArticle(body);
  if (!data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const list = readArticles();
  const now = new Date().toISOString();
  const article: Article = {
    id: crypto.randomUUID(),
    ...data,
    slug: uniqueSlug(slugify(body.slug || data.title), list),
    readTime: readTime(data.content),
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === 'published' ? now : null,
  };
  list.push(article);
  writeArticles(list);
  return NextResponse.json({ article }, { status: 201 });
}
