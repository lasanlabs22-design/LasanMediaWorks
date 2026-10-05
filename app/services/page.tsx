import type { Metadata } from 'next';
import { CenterHead, CtaBand, Faq, HelpCards, PageHero, SectionHead, SolutionRows } from '@/components/Blocks';
import { OFFLINE, ONLINE, SERVICES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Market research, SMM/SEO/PPC, website & CRM, branding, marketing workforce and media PR — plus 15+ digital and 15+ offline marketing channels.',
};

function Spectrum({ id, eyebrow, title, accent, text, img, caption, list, tint }: { id: string; eyebrow: string; title: string; accent: string; text: string; img: string; caption: [string, string]; list: string[]; tint?: boolean }) {
  return (
    <section className={`section ${tint ? 'tint' : 'dark'}`} id={id}>
      <div className="wrap">
        <SectionHead eyebrow={eyebrow} title={title} accent={accent} text={text} />
        <div className="service-panel">
          <figure className="panel-media reveal-img" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" loading="lazy" />
            <figcaption><span>{caption[0]}</span><b>{caption[1]}</b></figcaption>
          </figure>
          <ul className="spectrum reveal">{list.map(s => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb="Services" eyebrow="Our services" title="Our complete" accent="service spectrum." text="Integrated marketing solutions across digital and traditional platforms — so your ads, your street presence and your sales team all pull in one direction." img="/img/stock/h-services.jpg" />

      <nav className="subnav" aria-label="On this page">
        <ul>
          {SERVICES.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.title} {s.accent}</a></li>)}
          <li><a href="#online">Online</a></li>
          <li><a href="#offline">Offline</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <section className="section">
        <div className="wrap">
          <CenterHead eyebrow="Six services" title="Our premium" accent="services." text="Comprehensive solutions designed to elevate your brand, drive growth, and maximize ROI." />
          <SolutionRows items={SERVICES} service="digital" />
        </div>
      </section>

      <Spectrum id="online" eyebrow="Online marketing" title="15+ digital" accent="growth channels." text="From the first search to the final WhatsApp reply — we build and run the digital journey that brings customers in and keeps them coming back." img="/img/brand/Digital_Excellence.jpg" caption={['Digital Marketing', 'Digital Excellence']} list={ONLINE} tint />
      <Spectrum id="offline" eyebrow="Offline marketing" title="15+ traditional" accent="impact drivers." text="Big, bold, physical presence that makes people look up — and then look you up." img="/img/brand/Offline_Marketing.jpg" caption={['Outdoor Advertising', 'Offline Impact']} list={OFFLINE} />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What we do" title="Here's how we" accent="can help." text="Four ways we plug into your business — pick one, or let us run them all together." />
          <HelpCards />
        </div>
      </section>

      <section className="section tint" id="faq">
        <div className="wrap">
          <CenterHead eyebrow="FAQ" title="Frequently asked" accent="questions." text="Everything about digital marketing, graphic design, video editing, web design & social media." />
          <Faq />
        </div>
      </section>

      <CtaBand title="Ready to scale" accent="your business?" text="Let's discuss how our services can help you achieve breakthrough results." primary={['Get Free Consultation', '/book-appointment']} />
    </>
  );
}
