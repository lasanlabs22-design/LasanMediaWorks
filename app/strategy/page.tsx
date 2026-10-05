import type { Metadata } from 'next';
import { Blueprint, Cases, CenterHead, CtaBand, PageHero, SectionHead, SolutionRows, Steps } from '@/components/Blocks';
import { PILLARS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Strategy',
  description: 'Unlock business challenges with winning strategies: business, brand, digital, technical, marketing & sales and operational strategy designed for ROI.',
};

export default function StrategyPage() {
  return (
    <>
      <PageHero crumb="Strategy" eyebrow="Strategy" title="Unlock business challenges with" accent="winning strategies." text="Strategic decision making and robust implementation frameworks designed for ROI." img="/img/stock/h-strategy.jpg" />

      <nav className="subnav" aria-label="On this page">
        <ul>
          {PILLARS.map(p => <li key={p.id}><a href={`#${p.id}`}>{p.title} {p.accent}</a></li>)}
          <li><a href="#blueprint">Blueprint</a></li>
          <li><a href="#process">Process</a></li>
        </ul>
      </nav>

      <section className="section">
        <div className="wrap">
          <CenterHead eyebrow="Six strategies" title="Our strategic" accent="solutions." text="Data-driven frameworks designed to accelerate your brand's growth trajectory." />
          <SolutionRows items={PILLARS} service="strategy" />
        </div>
      </section>

      <section className="section tint" id="blueprint">
        <div className="wrap">
          <SectionHead eyebrow="Our approach" title="Our success" accent="blueprint." text="A calculated approach to scaling your brand in the modern digital landscape." />
          <Blueprint />
        </div>
      </section>

      <section className="section dark" id="process">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Our simple" accent="process." text="We make growth easy with our proven 4-step framework." />
          <Steps />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Results" title="Strategy that" accent="shows up in numbers." text="Real results from real clients." />
          <Cases />
        </div>
      </section>

      <CtaBand title="Ready to transform" accent="your business?" text="Let's build a winning strategy tailored to your unique challenges and goals." primary={['Get Free Audit Report', '/book-appointment?service=audit']} secondary={['Book Appointment', '/book-appointment']} />
    </>
  );
}
