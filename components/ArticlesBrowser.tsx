'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import { ArticleCard, Cover, fmtDate } from './Blocks';
import type { ArticleSummary } from '@/lib/store';

const href = (a: ArticleSummary) => `/article/${encodeURIComponent(a.slug)}`;

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
      && (!needle || [a.title, a.excerpt, a.author, (a.tags || []).join(' ')].join(' ').toLowerCase().includes(needle)));
  }, [articles, category, q]);

  // front page layout only when browsing everything
  const front = category === 'All' && !q.trim();
  const lead = front ? list.find(a => a.featured) || list[0] : undefined;
  const side = front ? list.filter(a => a !== lead).slice(0, 4) : [];
  const rest = front ? list.filter(a => a !== lead && !side.includes(a)) : list;

  return (
    <>
      <div className="mag-bar">
        <div className="filters" role="tablist" aria-label="Categories">
          {['All', ...categories].map(c => (
            <button key={c} type="button" role="tab" aria-selected={c === category} className={`filter${c === category ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search articles</span>
          <Icon name="search" className="" />
          <input type="search" placeholder="Search articles" value={q} onChange={e => setQ(e.target.value)} autoComplete="off" />
        </label>
      </div>

      {!articles.length && <div className="empty">No articles yet. New stories will appear here as soon as they are published.</div>}
      {!!articles.length && !list.length && <div className="empty">No articles match{q.trim() ? ` “${q.trim()}”` : ' this category'} yet.</div>}

      {lead && (
        <div className="mag-front">
          <Link href={href(lead)} className="mag-lead">
            <div className="mag-lead-img"><Cover a={lead} big /></div>
            <span className="kicker">{lead.category}</span>
            <h2>{lead.title}</h2>
            {lead.excerpt && <p>{lead.excerpt}</p>}
            <div className="card-meta"><span>{lead.author}</span><i /><span>{fmtDate(lead.publishedAt)}</span><i /><span>{lead.readTime} min read</span></div>
          </Link>
          {!!side.length && (
            <div className="mag-side">
              <h3 className="mag-side-title">Latest</h3>
              {side.map(a => (
                <Link href={href(a)} className="mag-item" key={a.id}>
                  <div>
                    <span className="kicker">{a.category}</span>
                    <h4>{a.title}</h4>
                    <div className="card-meta"><span>{fmtDate(a.publishedAt)}</span><i /><span>{a.readTime} min</span></div>
                  </div>
                  <div className="mag-thumb"><Cover a={a} /></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {!!rest.length && (
        <>
          {front && <div className="mag-rule"><h2>More stories</h2></div>}
          <div className="cards">{rest.map(a => <ArticleCard a={a} key={a.id} />)}</div>
        </>
      )}
    </>
  );
}
