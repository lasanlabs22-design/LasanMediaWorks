import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Icon';
import { Blueprint, CenterHead, Clients, CtaBand, Numbers, Offices, PageHero, Quotes, SectionHead, Team, Values, VideoBand } from '@/components/Blocks';

export const metadata: Metadata = {
  title: 'About',
  description: 'LaSän Media Works is a premium growth agency helping SMEs and startups achieve digital dominance. Meet our leadership, values and offices.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" eyebrow="About LaSän Media Works" title="A premium growth agency for" accent="ambitious SMEs & startups." text="Data-driven strategy, creative excellence and advanced technology — combined into growth engines that last." img="/img/stock/h-about.jpg" actions={false} />

      <section className="section">
        <div className="wrap split">
          <div className="copy">
            <span className="eyebrow reveal">Who we are</span>
            <h2 className="reveal" style={{ margin: '14px 0 22px' }}>Your success is <em>our benchmark.</em></h2>
            <p className="lead reveal">We are a premium growth agency focused on assisting SMEs and startups in achieving digital dominance through data-driven strategies, creative excellence, and advanced technology.</p>
            <p className="reveal">Our method integrates performance marketing, brand storytelling, and intelligent automation to yield measurable results throughout your growth journey.</p>
            <p className="reveal">We aim to construct sustainable growth engines — making your success our benchmark.</p>
            <Link href="/book-appointment" className="btn btn-primary reveal" style={{ marginTop: 8 }}>Book Free Consultation <Arrow /></Link>
          </div>
          <div className="media-frame reveal-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/stock/about-team.jpg" alt="The LaSän team collaborating" data-parallax="0.06" />
            <div className="media-badge glass"><b>200+</b><span>brands grown<br />across India</span></div>
          </div>
        </div>
      </section>

      <VideoBand>
        <SectionHead eyebrow="By the numbers" title="Growth you can" accent="measure." />
        <Numbers />
      </VideoBand>

      <section className="section" id="playbook">
        <div className="wrap">
          <SectionHead eyebrow="Our growth playbook" title="A calculated approach to" accent="scaling brands.">
            <Link href="/strategy#process" className="btn btn-ghost reveal">How we work <Arrow /></Link>
          </SectionHead>
          <Blueprint />
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="The DNA of success" title="The LaSän" accent="core values." text="Beyond metrics and ROI, we are driven by a set of non-negotiable principles that define our impact." />
          <Values />
        </div>
      </section>

      <section className="section" id="team">
        <div className="wrap">
          <SectionHead eyebrow="Leadership" title="Meet our" accent="leadership team." text="Experts dedicated to your success." />
          <Team />
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead eyebrow="Where we are" title="Our" accent="offices." text="Headquartered in Bangalore, with teams in Hyderabad and Tirupati." />
          <Offices />
        </div>
      </section>

      <section className="section" id="clients">
        <div className="wrap"><CenterHead eyebrow="Collaborations" title="Trusted by" accent="industry leaders." text="Partnering with 200+ forward-thinking brands across the globe." /></div>
        <Clients />
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Testimonials" title="What our" accent="clients say." text="Trusted by 200+ businesses across India." />
          <Quotes count={3} />
        </div>
      </section>

      <CtaBand title="Let's talk" accent="business." text="Ready to grow your business? We're here to help you achieve your goals." />
    </>
  );
}
