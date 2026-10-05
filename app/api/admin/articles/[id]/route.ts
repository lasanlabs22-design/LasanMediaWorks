import { NextResponse, type NextRequest } from 'next/server';
import { isAdmin, unauthorized } from '@/lib/auth';
import { readArticles, readTime, sanitizeArticle, slugify, uniqueSlug, writeArticles } from '@/lib/store';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readArticles();
  const idx = list.findIndex(a => a.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  const existing = list[idx];
  const body = await req.json().catch(() => ({}));
  const data = sanitizeArticle(body, existing);
  if (!data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const now = new Date().toISOString();
  list[idx] = {
    ...existing,
    ...data,
    slug: uniqueSlug(slugify(body.slug || existing.slug || data.title), list, existing.id),
    readTime: readTime(data.content),
    updatedAt: now,
    publishedAt: data.status === 'published' ? existing.publishedAt || now : existing.publishedAt,
  };
  writeArticles(list);
  return NextResponse.json({ article: list[idx] });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!isAdmin(req)) return unauthorized();
  const { id } = await params;
  const list = readArticles();
  const next = list.filter(a => a.id !== id);
  if (next.length === list.length) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  writeArticles(next);
  return NextResponse.json({ ok: true });
}
