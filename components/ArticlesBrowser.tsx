'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import { ArticleCard, Cover, fmtDate } from './Blocks';
import type { ArticleSummary } from '@/lib/store';

export default function ArticlesBrowser({ articles, categories, initialCategory, initialQuery }: { articles: ArticleSummary[]; categories: readonly string[]; initialCategory: string; initialQuery: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [q, setQ] = useState(initialQuery);

  // keep the URL shareable
  useEffect(() => {
    const qs = new URLSearchParams();
    if (category !== 'All') qs.set('category', category);
    if (q.trim()) qs.set('q', q.trim());
    history.replaceState(null, '', qs.toString() ? `?${qs}` : location.pathname);
  }, [category, q]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles.filter(a => (category === 'All' || a.category === category)
      && (!needle || [a.title, a.excerpt, (a.tags || []).join(' ')].join(' ').toLowerCase().includes(needle)));
  }, [articles, category, q]);

  const featured = category === 'All' && !q.trim() && list.length > 3 ? list.find(a => a.featured) || list[0] : null;
  const rest = featured ? list.filter(a => a !== featured) : list;

  return (
    <>
      <div className="toolbar">
        <div className="filters" aria-label="Filter by category">
          {['All', ...categories].map(c => (
            <button key={c} type="button" className={`filter${c === category ? ' active' : ''}`} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search articles</span>
          <Icon name="search" className="" />
          <input type="search" placeholder="Search articles…" value={q} onChange={e => setQ(e.target.value)} autoComplete="off" />
        </label>
      </div>
      <p className="count">{list.length} article{list.length === 1 ? '' : 's'}</p>

      {featured && (
        <Link className="feature reveal" href={`/article/${encodeURIComponent(featured.slug)}`}>
          <div className="card-cover"><Cover a={featured} big /></div>
          <div className="feature-body">
            <span className="label">Featured read</span>
            <div className="card-meta"><span>{featured.category}</span><i /><span>{fmtDate(featured.publishedAt)}</span><i /><span>{featured.readTime} min</span></div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="btn btn-primary">Read the story</span>
          </div>
        </Link>
      )}

      <div className="cards">
        {rest.length ? rest.map(a => <ArticleCard a={a} key={a.id} />)
          : !featured && <div className="empty">No articles match{q.trim() ? ` “${q.trim()}”` : ''} yet.</div>}
      </div>
    </>
  );
}
