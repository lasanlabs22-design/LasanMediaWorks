import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import ArticlesBrowser from '@/components/ArticlesBrowser';
import { PageHero } from '@/components/Blocks';
import { INSIGHT_TYPES } from '@/lib/content';
import { CATEGORIES, publishedArticles } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Latest insights: tips, trends and strategies on digital marketing, SEO, AI search, branding and offline media from the LaSän Media Works team.',
};

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const sp = await searchParams;
  const category = sp.category && (CATEGORIES as readonly string[]).includes(sp.category) ? sp.category : 'All';

  return (
    <>
      <PageHero crumb="Articles" eyebrow="Latest insights" title="Tips, trends &" accent="strategies." text="Insights from our experts on digital marketing, SEO, AI search, branding and offline media." img="/img/stock/h-articles.jpg" actions={false} />

      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="wrap">
          <div className="insight-types">
            {INSIGHT_TYPES.map(t => (
              <article className="insight spot reveal" key={t.label}>
                <span className="lbl"><Icon name={t.icon} /> {t.label}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <ul className="ticks">{t.examples.map(x => <li key={x}>{x}</li>)}</ul>
                <p className="helps">{t.helps}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap">
        <ArticlesBrowser articles={publishedArticles()} categories={CATEGORIES} initialCategory={category} initialQuery={sp.q || ''} />
      </section>
    </>
  );
}
