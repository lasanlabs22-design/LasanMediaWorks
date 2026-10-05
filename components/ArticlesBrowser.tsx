'use client';

import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import { ArticleCard } from './Blocks';
import type { ArticleSummary } from '@/lib/store';

const PER_PAGE = 9; // 3 x 3 grid

export default function ArticlesBrowser({ articles, categories, initialCategory, initialQuery }: { articles: ArticleSummary[]; categories: readonly string[]; initialCategory: string; initialQuery: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [q, setQ] = useState(initialQuery);
  const [page, setPage] = useState(1);

  // keep the URL shareable
  useEffect(() => {
    const qs = new URLSearchParams();
    if (category !== 'All') qs.set('category', category);
    if (q.trim()) qs.set('q', q.trim());
    history.replaceState(null, '', qs.toString() ? `?${qs}` : location.pathname);
  }, [category, q]);

  // featured first, then newest
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles
      .filter(a => (category === 'All' || a.category === category)
        && (!needle || [a.title, a.excerpt, a.author, (a.tags || []).join(' ')].join(' ').toLowerCase().includes(needle)))
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [articles, category, q]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const go = (p: number) => { setPage(p); document.querySelector('.mag-bar')?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <div className="mag-bar">
        <div className="filters" role="tablist" aria-label="Categories">
          {['All', ...categories].map(c => (
            <button key={c} type="button" role="tab" aria-selected={c === category} className={`filter${c === category ? ' active' : ''}`} onClick={() => { setCategory(c); setPage(1); }}>{c}</button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search articles</span>
          <Icon name="search" className="" />
          <input type="search" placeholder="Search articles" value={q} onChange={e => { setQ(e.target.value); setPage(1); }} autoComplete="off" />
        </label>
      </div>

      {!articles.length && <div className="empty">No articles yet. New stories will appear here as soon as they are published.</div>}
      {!!articles.length && !list.length && <div className="empty">No articles match{q.trim() ? ` “${q.trim()}”` : ' this category'} yet.</div>}

      {!!shown.length && <div className="cards">{shown.map(a => <ArticleCard a={a} key={a.id} />)}</div>}

      {pages > 1 && (
        <nav className="pager" aria-label="Pages">
          <button type="button" onClick={() => go(current - 1)} disabled={current === 1}>Previous</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button type="button" key={p} className={p === current ? 'on' : undefined} aria-current={p === current ? 'page' : undefined} onClick={() => go(p)}>{p}</button>
          ))}
          <button type="button" onClick={() => go(current + 1)} disabled={current === pages}>Next</button>
        </nav>
      )}
    </>
  );
}
