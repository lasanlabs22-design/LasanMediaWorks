'use client';

// Realistic laptop + phone mockups with live screen animations. Decorative only.
import { useEffect, useRef } from 'react';

const FEED = ['/img/stock/v-smm.jpg', '/img/stock/s-brand.jpg', '/img/stock/careers-team.jpg'];
const CAMPAIGNS = [['Meta Ads', 82], ['Google Search', 64], ['Hoardings', 91]] as const;

function StatusBar() {
  return (
    <div className="ios-status">
      <span>9:41</span>
      <span className="ios-icons">
        <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.2 6.6a6.8 6.8 0 0 1 9.6 0l-1.6 1.6a4.5 4.5 0 0 0-6.4 0zM.8 4.2a10.2 10.2 0 0 1 14.4 0l-1.6 1.6a7.9 7.9 0 0 0-11.2 0z" /></svg>
        <span className="ios-battery"><i /></span>
      </span>
    </div>
  );
}

function Post({ src }: { src: string }) {
  return (
    <div className="ig-post">
      <div className="ig-post-head"><i /><b>lasanmedia</b></div>
      <div className="ig-photo" style={{ backgroundImage: `url(${src})` }}>
        <svg className="ig-burst" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.6 1-1.1a5.5 5.5 0 0 0 0-7.7z" /></svg>
      </div>
      <div className="ig-actions">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.6 1-1.1a5.5 5.5 0 0 0 0-7.7z" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4z" /></svg>
      </div>
      <b className="ig-likes">2,814 likes</b>
    </div>
  );
}

export default function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);

  // gentle 3D tilt that follows the pointer across the hero
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = el.closest('section') || document.body;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${(x * 40).toFixed(1)}%`);
      });
    };
    const reset = () => { el.style.setProperty('--ry', '-6deg'); el.style.setProperty('--rx', '3deg'); el.style.setProperty('--gx', '0%'); };
    hero.addEventListener('pointermove', onMove as EventListener);
    hero.addEventListener('pointerleave', reset);
    return () => { hero.removeEventListener('pointermove', onMove as EventListener); hero.removeEventListener('pointerleave', reset); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="dev-scene" aria-hidden="true">
      <div className="dev-stage" ref={ref}>
        {/* ---------- laptop ---------- */}
        <div className="mbp">
          <div className="mbp-lid">
            <span className="mbp-notch" />
            <div className="mbp-screen">
              <div className="mac-menubar"><b>LaSän Growth</b><span>File</span><span>View</span><span>Reports</span><em>Mon 9:41</em></div>
              <div className="mac-app">
                <aside className="mac-side">
                  <span className="mac-traffic"><i /><i /><i /></span>
                  {['Overview', 'Campaigns', 'SEO', 'Social', 'Leads'].map((n, i) => <span key={n} className={i === 0 ? 'on' : undefined}><i />{n}</span>)}
                </aside>
                <main className="mac-main">
                  <div className="mac-head"><b>Growth overview</b><span>Last 30 days</span></div>
                  <div className="mac-kpis">
                    <div><span>New leads</span><b data-count="1284">1284</b><em>▲ 38%</em></div>
                    <div><span>ROAS</span><b>4.8x</b><em>▲ 1.2x</em></div>
                    <div><span>Reach</span><b>2.1M</b><em>▲ 64%</em></div>
                  </div>
                  <div className="mac-chart">
                    <svg viewBox="0 0 300 90" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dev-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#800080" stopOpacity=".55" /><stop offset="1" stopColor="#800080" stopOpacity="0" /></linearGradient>
                      </defs>
                      <path className="mac-area" d="M0 78 C30 74 50 66 75 68 S120 52 150 50 S205 30 230 28 S275 12 300 8 L300 90 L0 90 Z" fill="url(#dev-area)" />
                      <path className="mac-line" d="M0 78 C30 74 50 66 75 68 S120 52 150 50 S205 30 230 28 S275 12 300 8" />
                    </svg>
                  </div>
                  <div className="mac-camps">
                    {CAMPAIGNS.map(([name, pct], i) => (
                      <div key={name}><span>{name}</span><i><b style={{ ['--pct' as string]: `${pct}%`, animationDelay: `${0.2 + i * 0.25}s` }} /></i><em>{pct}%</em></div>
                    ))}
                  </div>
                  <div className="mac-cta"><span className="idle">Boost campaign</span><span className="live">Live ✓</span></div>
                  <svg className="mac-cursor" viewBox="0 0 24 24"><path d="M4 2l15 10-6.5 1.3L16 21l-3 1.4-3.6-7.6L4 19z" /></svg>
                </main>
              </div>
              <span className="screen-glare" />
            </div>
          </div>
          <div className="mbp-hinge" />
          <div className="mbp-deck"><span /></div>
          <div className="mbp-shadow" />
        </div>

        {/* ---------- phone ---------- */}
        <div className="iph">
          <span className="iph-btn power" /><span className="iph-btn vol1" /><span className="iph-btn vol2" />
          <div className="iph-screen">
            <span className="iph-island" />
            <StatusBar />
            <div className="ig-top"><b>LaSän</b><span><i /><i /></span></div>
            <div className="ig-stories">{['#ffcc00', '#800080', '#d69cf5', '#ffcc00'].map((c, i) => <i key={i} style={{ borderColor: c }} />)}</div>
            <div className="ig-feed"><div className="ig-track">{[...FEED, FEED[0]].map((src, i) => <Post src={src} key={i} />)}</div></div>
            <div className="ios-banner b1"><i>L</i><div><b>LaSän Leads <em>now</em></b><span>New enquiry from Robo Diner</span></div></div>
            <div className="ios-banner b2"><i>L</i><div><b>LaSän Ads <em>now</em></b><span>Campaign reached 10,000 people</span></div></div>
            <span className="iph-home" />
            <span className="screen-glare" />
          </div>
          <div className="iph-shadow" />
        </div>
      </div>
    </div>
  );
}
