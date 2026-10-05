import Link from 'next/link';
import Icon, { Arrow } from '@/components/Icon';
import HeroSlider from '@/components/HeroSlider';
import ServiceTabs from '@/components/ServiceTabs';
import EnquiryForm from '@/components/EnquiryForm';
import {
  ArticleCard, Blueprint, Cases, CenterHead, Clients, ContactList, Faq, HelpCards, Numbers, Quotes,
  SectionHead, Steps, Team, Values, VideoBand,
} from '@/components/Blocks';
import { INSIGHT_TYPES, MARQUEE, NUMBERS } from '@/lib/content';
import { publishedArticles } from '@/lib/store';

export const dynamic = 'force-dynamic'; // latest articles come from the admin console

export default function Home() {
  const latest = publishedArticles({ limit: 3 });

  return (
    <>
      {/* HERO — full-screen video */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/img/stock/hero-poster.jpg" aria-hidden="true" data-autoplay>
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="wrap hero-inner">
          <HeroSlider />
        </div>
        <div className="wrap">
          <dl className="hero-facts">
            {NUMBERS.map(n => (
              <div key={n.label}><dt>{n.label}</dt><dd data-count={n.value} data-suffix={n.suffix}>{n.value}{n.suffix}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">{[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Our simple" accent="process." text="We make growth easy with our proven 4-step framework." />
          <Steps />
        </div>
      </section>

      {/* WHY — numbers over video */}
      <VideoBand>
        <SectionHead eyebrow="Why LaSän" title="Why businesses" accent="choose LaSän?" text="Numbers we're proud of — earned one client, one campaign at a time." />
        <Numbers />
      </VideoBand>

      {/* CASE STUDIES */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Case studies" title="Our success" accent="stories." text="Real results from real clients." />
          <Cases />
        </div>
      </section>

      {/* VALUES */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="The DNA of success" title="The LaSän" accent="core values." text="Beyond metrics and ROI, we are driven by a set of non-negotiable principles that define our impact." />
          <Values />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section" id="clients">
        <div className="wrap"><CenterHead eyebrow="Our clients" title="Trusted by" accent="industry leaders." text="Partnering with 200+ forward-thinking brands across the globe." /></div>
        <Clients />
      </section>

      {/* HELP */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title="Here's how we" accent="can help.">
            <Link href="/services" className="btn btn-ghost reveal">All services <Arrow /></Link>
          </SectionHead>
          <HelpCards />
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Leadership" title="Meet our" accent="leadership team." text="Experts dedicated to your success." />
          <Team />
        </div>
      </section>

      {/* SERVICE SPECTRUM */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead eyebrow="Services" title="Our complete" accent="service spectrum." text="Integrated marketing solutions across digital and traditional platforms." />
          <ServiceTabs />
          <div className="svc-foot reveal"><p>Digital excellence + offline impact, under one roof.</p><Link href="/services" className="btn btn-primary">Get Complete Marketing Solutions <Arrow /></Link></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Testimonials" title="What our" accent="clients say." text="Trusted by 200+ businesses across India." />
          <Quotes />
        </div>
      </section>

      {/* BLUEPRINT */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Our approach" title="Our success" accent="blueprint." text="A calculated approach to scaling your brand in the modern digital landscape." />
          <Blueprint />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <CenterHead eyebrow="FAQ" title="Frequently asked" accent="questions." text="Everything about digital marketing, graphic design, video editing, web design & social media." />
          <Faq />
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Latest insights" title="Tips, trends &" accent="strategies.">
            <Link href="/articles" className="btn btn-ghost reveal">All articles <Arrow /></Link>
          </SectionHead>
          <div className="insight-types">
            {INSIGHT_TYPES.map(t => (
              <article className="insight reveal" key={t.label}>
                <span className="lbl"><Icon name={t.icon} /> {t.label}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <ul className="ticks">{t.examples.map(x => <li key={x}>{x}</li>)}</ul>
                <p className="helps">{t.helps}</p>
              </article>
            ))}
          </div>
          <div className="cards">
            {latest.length ? latest.map(a => <ArticleCard a={a} key={a.id} />) : <div className="empty">Fresh ideas are on the way. Check back soon.</div>}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="wrap contact-grid">
          <div className="contact-side reveal">
            <span className="eyebrow">Contact</span>
            <h2>Let&apos;s talk <em>business.</em></h2>
            <p>Ready to grow your business? We&apos;re here to help you achieve your goals.</p>
            <ContactList />
          </div>
          <EnquiryForm subject="Free quote request" primaryLabel="Send Message">
            <h3>Get a free quote</h3>
            <p>Tell us about your project and we&apos;ll get back to you.</p>
            <label className="f-field"><span>Your Name</span><input name="Name" required autoComplete="name" /></label>
            <div className="f-row">
              <label className="f-field"><span>Email Address</span><input name="Email" type="email" required autoComplete="email" /></label>
              <label className="f-field"><span>Phone Number</span><input name="Phone" type="tel" required autoComplete="tel" /></label>
            </div>
            <label className="f-field"><span>Tell us about your project</span><textarea name="Project" required /></label>
          </EnquiryForm>
        </div>
      </section>

      <div className="brand-mark reveal" aria-hidden="true"><span className="mk-p">La</span><span className="mk-y">Sän</span></div>
    </>
  );
}
