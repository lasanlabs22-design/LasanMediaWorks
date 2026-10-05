'use client';

// Page-wide motion: scroll progress bar, reveal-on-scroll, number counters,
// light parallax, and lazy background videos.
// Re-scans the DOM on every route change.
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    // progress bar
    const bar = document.querySelector<HTMLElement>('.progress');
    const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        if (!reduced) {
          for (const el of parallax) {
            const r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > innerHeight) continue;
            const speed = Number(el.dataset.parallax) || 0.08;
            el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) * -speed).toFixed(1)}px, 0)`;
          }
        }
        ticking = false;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    cleanups.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); });

    // reveals: stagger siblings that enter together
    const io = new IntersectionObserver(entries => {
      let n = 0;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${Math.min(n++, 5) * 0.08}s`);
        el.classList.add('in');
        io.unobserve(el);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    // .reveal-img starts fully clipped, which never counts as intersecting, so watch its parent instead
    const imgIo = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.querySelectorAll(':scope > .reveal-img').forEach(el => el.classList.add('in'));
        imgIo.unobserve(e.target);
      }
    }, { threshold: 0.1 });
    cleanups.push(() => imgIo.disconnect());
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in), .step:not(.in)').forEach(el => io.observe(el));
      document.querySelectorAll('.reveal-img:not(.in)').forEach(el => el.parentElement && imgIo.observe(el.parentElement));
    };
    observe();
    // content rendered later (e.g. fetched article cards)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => { io.disconnect(); mo.disconnect(); });

    // counters
    const cio = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        cio.unobserve(el);
        const to = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (reduced) { el.textContent = `${to}${suffix}`; continue; }
        const start = performance.now();
        const dur = 1600;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
    cleanups.push(() => cio.disconnect());


    // background videos: load + play only while visible
    const vio = new IntersectionObserver(entries => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          if (!reduced) v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    }, { rootMargin: '200px 0px' });
    document.querySelectorAll('video[data-src], video[data-autoplay]').forEach(v => vio.observe(v));
    cleanups.push(() => vio.disconnect());

    return () => cleanups.forEach(fn => fn());
  }, [pathname]);

  return <div className="progress" aria-hidden="true" />;
}
