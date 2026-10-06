'use client';

// Best performers on the About page: one "Employee of the Month" poster per winner.
// Entrance motion is CSS (driven by the .reveal/.in class from Effects); this
// component adds the pointer tilt.
import type { CSSProperties, PointerEvent } from 'react';

export type Performer = {
  id: string; name: string; role: string; photo: string; quote: string; quoteBy: string; monthLabel: string;
};

const canTilt = () => matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;

function tilt(e: PointerEvent<HTMLDivElement>) {
  if (!canTilt()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`);
  el.style.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`);
  el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
  el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  el.style.setProperty('--tx', `${((0.5 - x) * 8).toFixed(1)}px`);
  el.style.setProperty('--ty', `${((0.5 - y) * 8).toFixed(1)}px`);
}

function untilt(e: PointerEvent<HTMLDivElement>) {
  ['--rx', '--ry', '--tx', '--ty'].forEach(p => e.currentTarget.style.removeProperty(p));
}

const Rosette = () => (
  <svg className="ep-rosette" viewBox="0 0 40 52" aria-hidden="true">
    <path d="M12 26 6 50l8-5 4 7 5-20zM28 26l6 24-8-5-4 7-5-20z" fill="#c9971f" />
    <circle cx="20" cy="18" r="16" fill="#f5c542" />
    <circle cx="20" cy="18" r="11.5" fill="#e0a92a" stroke="#fde49a" strokeWidth="1.5" />
    <path d="m20 11 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" fill="#fff6d6" />
  </svg>
);

export default function Performers({ items }: { items: Performer[] }) {
  return (
    <div className="eotm-grid">
      {items.map((w, i) => (
        <article className={`eotm reveal${i === 0 ? ' current' : ''}`} key={w.id} style={{ '--d': `${(i % 4) * 0.12}s` } as CSSProperties}>
          <div className="eotm-inner" onPointerMove={tilt} onPointerLeave={untilt}>
            <span className="ep-brand">LaSän Media Works</span>
            <span className="ep-month">{w.monthLabel}</span>

            <div className="ep-orbit">
              <svg className="ep-arc" viewBox="0 0 200 200" aria-hidden="true">
                <defs><path id={`arc-${w.id}`} d="M100 100m-84 0a84 84 0 1 1 168 0a84 84 0 1 1-168 0" /></defs>
                <text><textPath href={`#arc-${w.id}`}>KEEP UP THE GREAT WORK.</textPath></text>
              </svg>
              <figure className="ep-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.photo} alt={w.name} loading={i < 4 ? undefined : 'lazy'} />
              </figure>
            </div>

            <h3 className="ep-title">
              <span>Employee</span>
              <span>Of The <Rosette /></span>
              <b>Month</b>
            </h3>

            <div className="ep-foot">
              <p className="ep-name">{w.name}</p>
              {w.role && <p className="ep-role">{w.role}</p>}
              <blockquote className="ep-quote" title={w.quote}>
                <p>{w.quote.split(/\s+/).map((word, n, all) => <span key={n} style={{ '--w': n } as CSSProperties}>{n < all.length - 1 ? `${word} ` : word}</span>)}</p>
                {w.quoteBy && <cite>{w.quoteBy}</cite>}
              </blockquote>
            </div>
            <span className="eotm-sheen" aria-hidden="true" />
          </div>
        </article>
      ))}
    </div>
  );
}
