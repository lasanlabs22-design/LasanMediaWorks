import Link from 'next/link';
import Icon, { Arrow } from '@/components/Icon';
import HeroSlider from '@/components/HeroSlider';
import HeroMotion from '@/components/HeroMotion';
import ServiceTabs from '@/components/ServiceTabs';
import EnquiryForm from '@/components/EnquiryForm';
import {
  ArticleCard, Blueprint, Cases, CenterHead, Clients, ContactList, Faq, HelpCards, Quotes,
  SectionHead, Steps, Team, Values, VideoBand,
} from '@/components/Blocks';
import BrandName from '@/components/BrandName';
import { INSIGHT_TYPES, NUMBERS, VENTURES } from '@/lib/content';
import { publishedArticles } from '@/lib/store';

export const dynamic = 'force-dynamic'; // latest articles come from the admin console

export default function Home() {
  const latest = publishedArticles({ limit: 3 });

  return (
    <>
      {/* HERO — headline + looping motion graphics of what LaSän does */}
      <section className="hero hero-m">
        <div className="wrap hero-m-grid">
          <div className="hero-inner"><HeroSlider /></div>
          <HeroMotion />
        </div>
      </section>

      {/* OFFER BAND */}
      <section className="offer-band">
        <div className="wrap offer-band-inner">
          <h2>Is your marketing bringing in customers? Get a free business audit and find out.</h2>
          <Link href="/book-appointment?service=audit" className="btn btn-dark">Get My Free Audit <Arrow /></Link>
        </div>
      </section>

      {/* GROW + NUMBERS */}
      <section className="section">
        <div className="wrap grow">
          <div className="reveal">
            <h2>Grow your business with <em>LaSän</em></h2>
            <p className="grow-sub">Strategy, branding, digital and offline marketing, handled by one team.</p>
            <p>We work with schools, hospitals, restaurants, retailers and startups across Andhra Pradesh, Karnataka and Telangana. We study your market, build a plan around your goals and run the campaigns, then report the leads and sales they bring in.</p>
            <Link href="/book-appointment" className="btn btn-primary btn-sm">Enquire Now <Arrow /></Link>
          </div>
          <dl className="grow-stats reveal">
            {NUMBERS.map(n => (
              <div key={n.label}><dd data-count={n.value} data-suffix={n.suffix}>{n.value}{n.suffix}</dd><dt>{n.label}</dt></div>
            ))}
          </dl>
        </div>
      </section>

      {/* HELP */}
      <section className="section tint">
        <div className="wrap">
          <CenterHead eyebrow="What we do" title="Why should your business grow with" accent="LaSän?" text="Four ways we help business owners get found, get chosen and grow." />
          <HelpCards />
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="From first call to" accent="first results." text="Four clear steps. You always know what we are doing and what it is bringing in." />
          <Steps />
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section tint" id="work">
        <div className="wrap">
          <SectionHead eyebrow="Our work" title="Results our clients" accent="can measure." text="Real numbers from businesses we work with." />
          <Cases />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section" id="clients">
        <div className="wrap"><CenterHead eyebrow="Our clients" title="Trusted by" accent="200+ businesses." text="Schools, hospitals, restaurants, retailers and builders across South India." /></div>
        <Clients />
      </section>

      {/* SERVICE SPECTRUM */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead eyebrow="Solutions" title="Everything your business needs," accent="online and offline." text="Integrated marketing solutions across digital and traditional platforms." />
          <ServiceTabs />
          <div className="svc-foot reveal"><p>Digital excellence + offline impact, under one roof.</p><Link href="/services" className="btn btn-primary">See All Solutions <Arrow /></Link></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Testimonials" title="What business owners" accent="say about us." text="Trusted by 200+ businesses across India." />
          <Quotes />
        </div>
      </section>

      {/* VALUES */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Our values" title="What you can" accent="expect from us." text="Beyond metrics and ROI, we are driven by a set of non-negotiable principles that define our impact." />
          <Values />
        </div>
      </section>

      {/* BLUEPRINT */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our approach" title="How we scale" accent="your brand." text="A calculated approach to scaling your brand in the modern digital landscape." />
          <Blueprint />
        </div>
      </section>

      {/* TEAM */}
      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Leadership" title="Meet our" accent="leadership team." text="Experts dedicated to your success." />
          <Team />
        </div>
      </section>

      {/* SISTER COMPANIES */}
      <section className="section" id="family">
        <div className="wrap">
          <CenterHead eyebrow="The LaSän family" title="More from" accent="LaSän." text="Companies that are part of LaSän Media Works." />
          <div className="ventures">
            {VENTURES.map(v => (
              <article className="venture reveal" key={v.name}>
                <div className="venture-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.logo} alt={`${v.name} logo`} loading="lazy" />
                </div>
                <BrandName before={v.before} after={v.after} mark={v.mark} sub={v.sub} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section tint">
        <div className="wrap">
          <CenterHead eyebrow="FAQ" title="Questions business owners" accent="ask us." text="Everything about digital marketing, graphic design, video editing, web design & social media." />
          <Faq />
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Insights" title="Free guides to" accent="grow your business.">
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

      {/* CLOSING CTA over the city video */}
      <VideoBand>
        <div className="closing reveal">
          <h2>Join 200+ businesses growing with LaSän</h2>
          <p>Tell us where you want your business to be in a year. We will show you how to get there.</p>
          <Link href="/book-appointment" className="btn btn-primary">Partner with LaSän <Arrow /></Link>
        </div>
      </VideoBand>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="wrap contact-grid">
          <div className="contact-side reveal">
            <span className="eyebrow">Contact</span>
            <h2>Let&apos;s talk about <em>your business.</em></h2>
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
    </>
  );
}
