import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import { NotifyForm, ResumeForm } from '@/components/CareersForms';
import { PageHero } from '@/components/Blocks';
import { CAREER_PERKS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the LaSän family — where ambition meets opportunity and creativity shapes the future.',
};

export default function CareersPage() {
  return (
    <>
      <PageHero crumb="Careers" eyebrow="Careers at LaSän" title="Join the" accent="LaSän Family." text="Where ambition meets opportunity and creativity shapes the future." img="/img/stock/h-careers.jpg" actions={false} />

      <section className="section">
        <div className="wrap split">
          <div className="copy">
            <span className="eyebrow reveal">Nurturing tomorrow&apos;s leaders</span>
            <h2 className="reveal" style={{ margin: '14px 0 22px' }}>We encourage fresh perspectives &amp; <em>bold ideas.</em></h2>
            <p className="lead reveal">At LaSän Media Works, we believe that the most innovative solutions come from diverse minds.</p>
            <p className="reveal">Whether you&apos;re a seasoned professional or a passionate fresher, we provide a launchpad for your talents. We don&apos;t just hire for skills — we invest in curiosity, resilience, and the hunger to grow.</p>
          </div>
          <div className="media-frame reveal-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/stock/careers-team.jpg" alt="Team members working together" data-parallax="0.06" />
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 56 }}>
          <div className="audience">
            {CAREER_PERKS.map(p => <div className="aud reveal" key={p.title}><Icon name={p.icon} /><h3>{p.title}</h3><p>{p.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section dark" id="openings">
        <div className="wrap openings">
          <div className="openings-empty reveal">
            <span className="eyebrow">Open roles</span>
            <h2>No active openings <em>at the moment.</em></h2>
            <p>We are constantly scouting for exceptional talent. New opportunities will be announced soon!</p>
          </div>
          <NotifyForm />
        </div>
      </section>

      <section className="section tint" id="resume">
        <div className="wrap contact-grid">
          <div className="contact-side">
            <span className="eyebrow reveal">Talent pool</span>
            <h2 className="reveal">Submit your resume / <em>portfolio.</em></h2>
            <p className="reveal">We&apos;ll keep your profile in our database for matching future opportunities.</p>
            <div className="next-steps">
              <div className="reveal"><h3>Share your profile</h3><p>Attach your resume or add a link to your portfolio or LinkedIn.</p></div>
              <div className="reveal"><h3>We match you</h3><p>When a role fits your skills, our team will reach out.</p></div>
              <div className="reveal"><h3>Join the family</h3><p>Grow with a team building growth engines for 200+ brands.</p></div>
            </div>
          </div>
          <ResumeForm />
        </div>
      </section>
    </>
  );
}
