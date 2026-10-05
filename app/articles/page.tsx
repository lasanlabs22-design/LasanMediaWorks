import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import ArticlesBrowser from '@/components/ArticlesBrowser';
import { INSIGHT_TYPES } from '@/lib/content';
import { CATEGORIES, publishedArticles } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'The LaSän Journal: stories, tips, trends and strategies on digital marketing, SEO, branding and growth from the LaSän Media Works team.',
};

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const sp = await searchParams;
  const category = sp.category && (CATEGORIES as readonly string[]).includes(sp.category) ? sp.category : 'All';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <div className="masthead-top"><span>{today}</span><span>Tirupati · Bangalore · Hyderabad</span></div>
          <h1>The LaSän <em>Journal</em></h1>
          <p>Stories, insights and playbooks on growth, branding and digital marketing from the LaSän Media Works team.</p>
        </div>
      </header>

      <section className="wrap mag">
        <ArticlesBrowser articles={publishedArticles()} categories={CATEGORIES} initialCategory={category} initialQuery={sp.q || ''} />
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="mag-rule"><h2>What we write about</h2></div>
          <div className="insight-types">
            {INSIGHT_TYPES.map(t => (
              <article className="insight reveal" key={t.label}>
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
    </>
  );
}
