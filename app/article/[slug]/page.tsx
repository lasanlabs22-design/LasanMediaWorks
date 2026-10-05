import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard, CtaBand, fmtDate } from '@/components/Blocks';
import ShareBar from '@/components/ShareBar';
import { renderMarkdown } from '@/lib/markdown';
import { publishedArticle, type ArticleSummary } from '@/lib/store';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = publishedArticle(decodeURIComponent((await params).slug));
  if (!found) return { title: 'Article not found' };
  const { article: a } = found;
  return { title: a.title, description: a.excerpt, openGraph: { title: a.title, description: a.excerpt, type: 'article', images: a.cover ? [a.cover] : undefined } };
}

function Avatar({ a, size = 48 }: { a: ArticleSummary; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (a.authorPhoto) return <img className="avatar-img" src={a.authorPhoto} alt="" width={size} height={size} />;
  return <span className="avatar-img initials" style={{ width: size, height: size }} aria-hidden="true">{a.author.charAt(0)}</span>;
}

export default async function ArticlePage({ params }: Props) {
  const found = publishedArticle(decodeURIComponent((await params).slug));
  if (!found) notFound();
  const { article: a, related } = found;

  return (
    <>
      <article className="story">
        <header className="story-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/articles">Articles</Link><span>/</span>
            <Link href={`/articles?category=${encodeURIComponent(a.category)}`}>{a.category}</Link>
          </nav>
          <span className="kicker">{a.category}</span>
          <h1 className="story-title">{a.title}</h1>
          {a.excerpt && <p className="story-dek">{a.excerpt}</p>}
          <div className="byline">
            <Avatar a={a} />
            <div className="byline-who"><b>{a.author}</b>{a.authorRole && <span>{a.authorRole}</span>}</div>
            <div className="byline-meta"><time dateTime={a.publishedAt || undefined}>{fmtDate(a.publishedAt)}</time><i />{a.readTime} min read</div>
          </div>
        </header>

        {a.cover && (
          <figure className="story-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.cover} alt={a.coverCaption || ''} />
            {a.coverCaption && <figcaption>{a.coverCaption}</figcaption>}
          </figure>
        )}

        <div className="story-body">
          <aside className="story-rail" aria-label="Share this article"><ShareBar title={a.title} /></aside>
          <div className="story-text prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(a.content) }} />
        </div>

        <footer className="story-foot">
          {!!a.tags?.length && <div className="story-tags">{a.tags.map(t => <Link key={t} href={`/articles?q=${encodeURIComponent(t)}`}>{t}</Link>)}</div>}
          <div className="author-box">
            <Avatar a={a} size={64} />
            <div><span className="kicker">Written by</span><b>{a.author}</b>{a.authorRole && <span>{a.authorRole}, LaSän Media Works</span>}</div>
          </div>
        </footer>
      </article>

      {!!related.length && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="mag-rule"><h2>More from LaSän</h2><Link href="/articles" className="more-link">All articles</Link></div>
            <div className="cards">{related.map(r => <ArticleCard a={r} key={r.id} />)}</div>
          </div>
        </section>
      )}

      <CtaBand title="Want results like" accent="these?" text="Book a free consultation and we'll show you where the growth is hiding." />
    </>
  );
}
