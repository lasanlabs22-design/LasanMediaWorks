// Small presentational pieces shared across pages (server components).
import Link from 'next/link';
import Icon, { Arrow, PATHS } from './Icon';
import { BLUEPRINT, CASES, CLIENTS_A, CLIENTS_B, CONTACT, FAQ, HELP, HERO_ORBIT, INDUSTRIES, NUMBERS, OFFICES, PROCESS, TEAM, TESTIMONIALS, VALUES, type Client, type Solution } from '@/lib/content';
import type { ArticleSummary } from '@/lib/store';

export function SectionHead({ eyebrow, title, accent, text, children }: { eyebrow: string; title: string; accent?: string; text?: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <div className="reveal"><span className="eyebrow">{eyebrow}</span><h2>{title} {accent && <em>{accent}</em>}</h2></div>
      {text && <p className="reveal">{text}</p>}
      {children}
    </div>
  );
}

export function CenterHead({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent?: string; text?: string }) {
  return (
    <div className="center-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title} {accent && <em>{accent}</em>}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({ crumb, eyebrow, title, accent, text, img, actions = true }: { crumb: string; eyebrow: string; title: string; accent?: string; text: string; img: string; actions?: boolean }) {
  return (
    <section className="page-hero">
      <div className="ph-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" />
      </div>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{crumb}</span></nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title} {accent && <em>{accent}</em>}</h1>
        <p>{text}</p>
        {actions && (
          <div className="hero-actions">
            <Link href="/book-appointment?service=audit" className="btn btn-primary">Get FREE Audit <Arrow /></Link>
            <Link href="/book-appointment" className="btn btn-ghost">Book Now</Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function ContactList() {
  return (
    <ul className="contact-list">
      <li><a href={CONTACT.tel}><span className="ic"><Icon name="phone" /></span><span><small>Call us</small>{CONTACT.phone}</span></a></li>
      <li><a href={`mailto:${CONTACT.email}`}><span className="ic"><Icon name="mail" /></span><span><small>Email us</small>{CONTACT.email}</span></a></li>
      <li><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"><span className="ic"><Icon name="chat" /></span><span><small>WhatsApp</small>Chat with the team</span></a></li>
      <li><div><span className="ic"><Icon name="pin" /></span><span><small>Visit us</small>Tirupati (HQ) · Bangalore · Hyderabad</span></div></li>
    </ul>
  );
}

export function CtaBand({ title, accent, text, primary = ['Book Appointment', '/book-appointment'], secondary = ['Get FREE Audit', '/book-appointment?service=audit'] }: { title: string; accent: string; text: string; primary?: [string, string]; secondary?: [string, string] }) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <div>
            <h2>{title} <em>{accent}</em></h2>
            <p>{text}</p>
            <div className="hero-actions" style={{ marginTop: 26 }}>
              <Link href={primary[1]} className="btn btn-primary">{primary[0]} <Arrow /></Link>
              <Link href={secondary[1]} className="btn btn-ghost">{secondary[0]}</Link>
            </div>
          </div>
          <ContactList />
        </div>
      </div>
    </section>
  );
}

/* Home hero visual, after leadschool.in/school-owner. One SVG (circle centre 250,250):
   a light disc (r 150), a thin ring on the right, stepped thick segments on the left,
   the founders' cutout clipped by the circle below its centre but free above it,
   and one icon per service on the outer edge (r 200) with a two-line label, dot and line. */
const HC_STEPS: [number, number, number][] = [[160, 196, 192], [196, 232, 210], [232, 270, 228], [270, 308, 212], [308, 350, 194]]; // from°, to°, outer r
const HC_NODES = [336, 292, 248, 204]; // degrees clockwise from 12 o'clock
const hcPoint = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return [250 + r * Math.sin(t), 250 - r * Math.cos(t)];
};
const hcSector = (r0: number, r1: number, a0: number, a1: number) => {
  const f = (r: number, a: number) => hcPoint(r, a).map(v => v.toFixed(1)).join(' ');
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${f(r1, a0)}A${r1} ${r1} 0 ${large} 1 ${f(r1, a1)}L${f(r0, a1)}A${r0} ${r0} 0 ${large} 0 ${f(r0, a0)}Z`;
};
// "Branding & Creative" -> ["Branding &", "Creative"]: split where the two lines are most even
const twoLines = (s: string) => {
  const w = s.split(' ');
  let best = 1;
  for (let i = 1; i < w.length; i++) if (Math.abs(w.slice(0, i).join(' ').length - w.slice(i).join(' ').length) < Math.abs(w.slice(0, best).join(' ').length - w.slice(best).join(' ').length)) best = i;
  return [w.slice(0, best).join(' '), w.slice(best).join(' ')];
};

export function HeroCircle() {
  return (
    <div className="hc">
      <svg viewBox="-200 20 640 460" role="img" aria-label="LaSän founders Sree Latha and Santhosh Rokaya, with the four parts of the LaSän Growth System">
        <defs>
          <clipPath id="hc-clip"><circle cx="250" cy="250" r="172" /><rect x="-200" y="0" width="700" height="250" /></clipPath>
        </defs>
        {HC_STEPS.map(([a0, a1, r]) => <path key={a0} className="hc-ring" d={hcSector(148, r, a0, a1)} />)}
        <path className="hc-ring" d={hcSector(148, 172, -14, 162)} />
        <circle className="hc-disc" cx="250" cy="250" r="150" />
        <image href="/img/about/founders-cut.png" x="96" y="50" width="330" height="391" clipPath="url(#hc-clip)" />
        {HERO_ORBIT.map((o, i) => {
          const [x, y] = hcPoint(200, HC_NODES[i]);
          const dot = x - 112;
          const [l1, l2] = twoLines(o.label);
          return (
            <g key={o.label}>
              <line className="hc-line" x1={dot} y1={y} x2={x - 40} y2={y} />
              <circle className="hc-dot" cx={dot} cy={y} r="4" />
              <text className="hc-text" textAnchor="end"><tspan x={dot - 14} y={y - 4}>{l1}</tspan><tspan x={dot - 14} y={y + 18}>{l2}</tspan></text>
              <circle className="hc-node" cx={x} cy={y} r="40" />
              <svg x={x - 19} y={y - 19} width="38" height="38" viewBox="0 0 24 24" className="hc-icon" dangerouslySetInnerHTML={{ __html: PATHS[o.icon] }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function HeroCopy() {
  return (
    <div className="hero-inner">
      <h1 className="hero-title">Marketing solutions to make your business <em>the best one in your area</em></h1>
      <p className="hero-sub">The LaSän Growth System transforms your business through proven marketing solutions:</p>
      <ul className="hero-list">{HERO_ORBIT.map(o => <li key={o.label}>{o.label}</li>)}</ul>
      <div className="hero-actions">
        <Link href="/book-appointment" className="btn btn-primary">Enquire Now <Arrow /></Link>
        <Link href="/book-appointment?service=audit" className="btn btn-ghost">Get a Free Audit</Link>
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <div className="industries">
      {INDUSTRIES.map(n => (
        <article className="industry reveal" key={n.title}>
          <span className="ic"><Icon name={n.icon} /></span>
          <h3>{n.title}</h3>
          <p>{n.text}</p>
          <small>{n.clients}</small>
        </article>
      ))}
    </div>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {PROCESS.map(s => <div className="step reveal" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>)}
    </div>
  );
}

export function Numbers() {
  return (
    <div className="numbers">
      {NUMBERS.map(n => (
        <div className="glass reveal" key={n.label}><b data-count={n.value} data-suffix={n.suffix}>{n.value}{n.suffix}</b><span>{n.label}</span></div>
      ))}
    </div>
  );
}

export function VideoBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="video-band">
      <video muted loop playsInline preload="none" poster="/img/stock/city-poster.jpg" data-src="/video/city.mp4" aria-hidden="true" />
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Cases() {
  return (
    <div className="cases">
      {CASES.map(c => (
        <article className="case reveal" key={c.name}>
          <div className="case-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt="" loading="lazy" />
            <div className="case-over">
              <h3>{c.name}</h3>
              <div className="case-metrics"><div><b>{c.a[0]}</b><span>{c.a[1]}</span></div><div><b>{c.b[0]}</b><span>{c.b[1]}</span></div></div>
            </div>
          </div>
          <div className="case-body"><p>{c.text}</p><Link href="/articles?category=Case%20Studies" className="more-link">Read Case Study <Arrow /></Link></div>
        </article>
      ))}
    </div>
  );
}

export function Values() {
  return (
    <div className="values">
      {VALUES.map(([h, p], i) => <article className="value reveal" key={h}><span className="vn">0{i + 1}</span><h3>{h}</h3><p>{p}</p></article>)}
    </div>
  );
}

export function Clients() {
  // each row is doubled so the marquee loops seamlessly; the copy is hidden from screen readers
  const row = (list: Client[], rev = false) => (
    <div className={`clients-row${rev ? ' rev' : ''}`}>
      {[...list, ...list].map((c, i) => (
        <span className="client-tile" key={i} title={c.name} aria-hidden={i >= list.length ? true : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.logo} alt={i >= list.length ? '' : c.name} loading="lazy" />
        </span>
      ))}
    </div>
  );
  return <div className="clients" aria-label="Clients">{row(CLIENTS_A)}{row(CLIENTS_B, true)}</div>;
}

export function HelpCards() {
  return (
    <div className="offer-cards">
      {HELP.map(h => (
        <Link className="offer reveal" href={h.href} key={h.title}>
          <div className="offer-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={h.img} alt="" loading="lazy" />
          </div>
          <div className="offer-body"><h3>{h.title}</h3><p>{h.text}</p><span className="btn btn-primary btn-sm">Know more</span></div>
        </Link>
      ))}
    </div>
  );
}

export function Team({ members = TEAM }: { members?: { name: string; role: string; photo: string }[] }) {
  return (
    <div className="team">
      {members.map(m => (
        <article className="member reveal" key={m.name}>
          <div className="member-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.photo} alt={m.name} loading="lazy" />
          </div>
          <div className="member-info"><h3>{m.name}</h3><p>{m.role}</p></div>
        </article>
      ))}
    </div>
  );
}

export function Quotes({ count = 6 }: { count?: number }) {
  return (
    <div className="quotes">
      {/* quotes with a real photo lead */}
      {[...TESTIMONIALS].sort((a, b) => Number(!!b.photo) - Number(!!a.photo)).slice(0, count).map(t => (
        <figure className="quote reveal" key={t.name}>
          <div className="stars" aria-label="5 out of 5">★★★★★</div>
          <p>“{t.quote}”</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <footer>{t.photo ? <img className="q-av" src={t.photo} alt="" loading="lazy" /> : <span className="q-av" aria-hidden="true">{t.name.replace('Dr. ', '')[0]}</span>}<div><b>{t.name}</b><small>{t.role}</small></div></footer>
        </figure>
      ))}
    </div>
  );
}

export function Blueprint() {
  return (
    <div className="deliver">
      {BLUEPRINT.map(b => <div className="reveal" key={b.title}><Icon name={b.icon} /><h3>{b.title}</h3><p>{b.text}</p></div>)}
    </div>
  );
}

export function Faq() {
  return (
    <div className="faq">
      {FAQ.map(([q, a], i) => <details className="reveal" key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
    </div>
  );
}

export function Offices() {
  return (
    <div className="offices">
      {OFFICES.map(o => (
        <div className="office reveal" key={o.city}>
          <h3>{o.city}{o.hq && <span className="hq">HQ</span>}</h3>
          <p>{o.address}</p>
          <a href={CONTACT.tel}><Icon name="phone" /> {CONTACT.phone}</a>
          {o.email && <a href={`mailto:${CONTACT.email}`}><Icon name="mail" /> {CONTACT.email}</a>}
        </div>
      ))}
    </div>
  );
}

export function SolutionRows({ items, service }: { items: Solution[]; service: string }) {
  return (
    <div className="strat-list">
      {items.map((s, n) => (
        <article className="strat-row" id={s.id} key={s.id}>
          <div className={`strat-art s${(n % 4) + 1} reveal-img`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt="" loading="lazy" />
            <Icon name={s.icon} />
            <span className="num" aria-hidden="true">0{n + 1} / 0{items.length}</span>
            <span className="big">{s.title} {s.accent}</span>
            {s.stats && <div className="strat-stats">{s.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>}
          </div>
          <div className="strat-copy reveal">
            <span className="eyebrow">{s.tag}</span>
            <h3>{s.title} <em>{s.accent}</em></h3>
            {s.paras.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            <ul className="chips">{s.focus.map(f => <li key={f}>{f}</li>)}</ul>
            {s.link
              ? <Link href={s.link[1]} className="more-link">{s.link[0]} <Arrow /></Link>
              : <Link href={`/book-appointment?service=${service}`} className="more-link">Discuss {s.title} {s.accent} <Arrow /></Link>}
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------- articles ---------- */

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
export const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

export function Cover({ a, big = false }: { a: ArticleSummary; big?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (a.cover) return <img src={a.cover} alt="" loading="lazy" />;
  const words = a.title.split(/\s+/).slice(0, big ? 5 : 3).join(' ');
  return <div className={`cover-art c${hash(a.title) % 4}`}><div><span>{words}…</span><em>{a.category}</em></div></div>;
}

export function ArticleCard({ a }: { a: ArticleSummary }) {
  return (
    <Link className="card reveal" href={`/article/${encodeURIComponent(a.slug)}`}>
      <div className="card-cover"><Cover a={a} /></div>
      <div className="card-body">
        <span className="kicker">{a.category}</span>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <div className="card-meta"><span>{a.author}</span><i /><span>{fmtDate(a.publishedAt)}</span><i /><span>{a.readTime} min read</span></div>
      </div>
    </Link>
  );
}
