import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard, Cover, CtaBand, fmtDate, SectionHead } from '@/components/Blocks';
import ShareBar from '@/components/ShareBar';
import { renderMarkdown } from '@/lib/markdown';
import { publishedArticle } from '@/lib/store';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = publishedArticle(decodeURIComponent((await params).slug));
  if (!found) return { title: 'Article not found' };
  const { article: a } = found;
  return { title: a.title, description: a.excerpt, openGraph: { title: a.title, description: a.excerpt, type: 'article', images: a.cover ? [a.cover] : undefined } };
}

export default async function ArticlePage({ params }: Props) {
  const found = publishedArticle(decodeURIComponent((await params).slug));
  if (!found) notFound();
  const { article: a, related } = found;

  return (
    <>
      <section className="page-hero article-hero">
        <div className="ph-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.cover || '/img/stock/h-articles.jpg'} alt="" />
        </div>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Link href="/articles" className="back">← All articles</Link><br />
          <span className="chip">{a.category}</span>
          <h1>{a.title}</h1>
          <div className="card-meta"><span>{a.author}</span><i /><span>{fmtDate(a.publishedAt)}</span><i /><span>{a.readTime} min read</span></div>
        </div>
      </section>

      <div className="article-cover"><div><Cover a={a} big /></div></div>

      <article className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(a.content) }} />
      {!!a.tags?.length && <div className="tags">{a.tags.map(t => <span key={t}>#{t}</span>)}</div>}
      <ShareBar title={a.title} />

      {!!related.length && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <SectionHead eyebrow="Keep reading" title="More like" accent="this." />
            <div className="cards">{related.map(r => <ArticleCard a={r} key={r.id} />)}</div>
          </div>
        </section>
      )}

      <CtaBand title="Want results like" accent="these?" text="Book a free consultation and we'll show you where the growth is hiding." />
    </>
  );
}
