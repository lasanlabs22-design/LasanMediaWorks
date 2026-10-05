'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Icon';
import { SLIDES } from '@/lib/content';

const INTERVAL = 6500;

// Splits a line into words that slide up one after another.
function Words({ text, offset = 0, accent = false }: { text: string; offset?: number; accent?: boolean }) {
  const words = text.split(' ');
  const inner = words.map((w, i) => (
    <span className="w" key={i}>
      <span style={{ transitionDelay: `${(offset + i) * 0.06}s` }}>{w}</span>{i < words.length - 1 ? ' ' : ''}
    </span>
  ));
  return accent ? <em>{inner}</em> : <>{inner}</>;
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shown, setShown] = useState(false); // first slide animates in after mount
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), INTERVAL);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, current]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <span className="hero-tag"><b>LaSän</b> Growth agency for SMEs &amp; startups</span>
      <div className="slides" aria-roledescription="carousel" aria-label="Highlights">
        {SLIDES.map((s, i) => {
          const active = shown && i === current;
          const Title = i === 0 ? 'h1' : 'h2';
          const n = s.title.split(' ').length;
          return (
            <div key={i} className={`slide${active ? ' active' : ''}`} aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`} aria-hidden={!active && i !== 0 ? true : undefined}>
              <Title className="slide-title"><Words text={s.title} /> <Words text={s.accent} offset={n} accent /></Title>
              <p className="hero-lede">{s.lede}</p>
              <div className="hero-actions">
                <Link href="/book-appointment?service=audit" className="btn btn-primary" tabIndex={active ? undefined : -1}>Get FREE Audit <Arrow /></Link>
                <Link href="/book-appointment" className="btn btn-ghost" tabIndex={active ? undefined : -1}>Book Now</Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`slide-dots${paused ? ' paused' : ''}`}>
        {SLIDES.map((_, i) => (
          <button key={`${i}-${current}`} type="button" aria-label={`Show slide ${i + 1}`} className={i === current ? 'active' : undefined} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
