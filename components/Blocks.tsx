// Small presentational pieces shared across pages (server components).
import Link from 'next/link';
import Icon, { Arrow } from './Icon';
import { BLUEPRINT, CASES, CLIENTS_A, CLIENTS_B, CONTACT, FAQ, HELP, NUMBERS, OFFICES, PROCESS, TEAM, TESTIMONIALS, VALUES, type Client, type Solution } from '@/lib/content';
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
      {HELP.map((h, n) => (
        <Link className="offer reveal" href={h.href} key={h.title}>
          <div className="offer-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={h.img} alt="" loading="lazy" />
            <Icon name={h.icon} /><span className="num">0{n + 1}</span><span className="big">{h.title}</span>
          </div>
          <div className="offer-body"><p>{h.text}</p><span className="more-link">Learn more <Arrow /></span></div>
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
      {TESTIMONIALS.slice(0, count).map(t => (
        <figure className="quote reveal" key={t.name}>
          <div className="stars" aria-label="5 out of 5">★★★★★</div>
          <p>“{t.quote}”</p>
          <footer><span className="q-av" aria-hidden="true">{t.name.replace('Dr. ', '')[0]}</span><div><b>{t.name}</b><small>{t.role}</small></div></footer>
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
