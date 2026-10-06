import type { Metadata } from 'next';
import { CenterHead, CtaBand, PageHero, SectionHead, SolutionRows, Team } from '@/components/Blocks';
import { ABOUT_NUMBERS, ABOUT_SECTIONS, ABOUT_TEAM, FOUNDERS, JOURNEY, MISSION, VISION } from '@/lib/content';
import { readRecognition } from '@/lib/store';

export const dynamic = 'force-dynamic'; // best performers are managed in the console

export const metadata: Metadata = {
  title: 'About',
  description: 'LaSän Media Works: your trusted partner in growth, innovation, and digital excellence since 2021. Meet our founders, team and best performers.',
};

const monthLabel = (m: string) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function AboutPage() {
  const [winner, ...past] = readRecognition();
  return (
    <>
      <PageHero crumb="About" eyebrow="About us" title="About" accent="LaSän Media Works" text="Your trusted partner in growth, innovation, and digital excellence since 2021." img="/img/stock/h-about.jpg" actions={false} />

      <nav className="subnav" aria-label="On this page">
        <ul>
          <li><a href="#aboutus">About Us</a></li>
          <li><a href="#team">Our Team</a></li>
          {ABOUT_SECTIONS.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title} {s.accent}</a></li>)}
        </ul>
      </nav>

      {/* FOUNDERS */}
      <section className="section" id="aboutus">
        <div className="wrap split">
          <div className="media-frame reveal-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOUNDERS.img} alt="LaSän Media Works founders Sreelatha Royal and Santhosh Rokaya" />
          </div>
          <div className="copy">
            <span className="eyebrow reveal">About our founders &amp; leadership</span>
            <h2 className="reveal" style={{ margin: '14px 0 20px' }}>About <em>Us</em></h2>
            {FOUNDERS.paras.map((p, i) => <p className={`reveal${i === 0 ? ' lead' : ''}`} key={i}>{p}</p>)}
            <ul className="chips reveal">{FOUNDERS.highlights.map(h => <li key={h}>{h}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section tint">
        <div className="wrap">
          <CenterHead eyebrow="What drives us" title="Our Vision &" accent="Mission" />
          <div className="vm">
            <article className="vm-card reveal"><span className="eyebrow">Our Vision</span><p>{VISION}</p></article>
            <article className="vm-card reveal"><span className="eyebrow">Our Mission</span><p>{MISSION}</p></article>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section">
        <div className="wrap">
          <CenterHead eyebrow="Since 2021" title="Our Journey" accent="So Far" />
          <ol className="journey">
            {JOURNEY.map(j => <li className="reveal" key={j.year}><b>{j.year}</b><span>{j.text}</span></li>)}
          </ol>
        </div>
      </section>

      {/* TEAM */}
      <section className="section tint" id="team">
        <div className="wrap">
          <SectionHead eyebrow="The people behind LaSän" title="Our Team" accent="Members" />
          <Team members={ABOUT_TEAM} />
        </div>
      </section>

      {/* BEST PERFORMERS */}
      {winner && (
        <section className="section recog" id="performers">
          <div className="wrap">
            <CenterHead eyebrow="Recognition" title="Best" accent="Performers" />
            <article className="eotm reveal">
              <span className="eotm-badge">★ Employee of the Month</span>
              <figure className="eotm-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={winner.photo} alt={winner.name} />
              </figure>
              <span className="eotm-month">{monthLabel(winner.month)}</span>
              <h3>{winner.name}</h3>
              {winner.role && <p className="eotm-role">{winner.role}</p>}
              <blockquote className="eotm-quote">
                <p>{winner.quote}</p>
                {winner.quoteBy && <cite>{winner.quoteBy}</cite>}
              </blockquote>
            </article>

            {past.length > 0 && (
              <>
                <h3 className="hof-h reveal">Hall of <em>Fame</em></h3>
                <div className="hof">
                  {past.map(p => (
                    <figure className="hof-card reveal" key={p.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photo} alt={p.name} loading="lazy" />
                      <figcaption><b>{p.name}</b><span>{monthLabel(p.month)}</span></figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* NUMBERS */}
      <section className="section dark" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="numbers">
            {ABOUT_NUMBERS.map(n => (
              <div className="glass reveal" key={n.label}><b data-count={n.value} data-suffix={n.suffix}>{n.value}{n.suffix}</b><span>{n.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATIONS, RESOURCES, HOW WE WORK, CAREERS, MEDIA */}
      <section className="section">
        <div className="wrap">
          <SolutionRows items={ABOUT_SECTIONS} service="audit" />
        </div>
      </section>

      <CtaBand title="Ready to work with" accent="industry experts?" text="Let's discuss how LaSän Media can help your brand achieve breakthrough results." primary={['Get Free Consultation', '/book-appointment']} />
    </>
  );
}
