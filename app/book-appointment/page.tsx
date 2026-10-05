import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { ContactList, Offices, PageHero, SectionHead } from '@/components/Blocks';

export const metadata: Metadata = {
  title: 'Book Appointment',
  description: 'Book a free consultation with LaSän Media Works. Tell us about your business and pick a convenient time.',
};

export default function BookPage() {
  return (
    <>
      <PageHero crumb="Book Appointment" eyebrow="Book Free Consultation" title="Book your" accent="free consultation." text="Tell us about your business and pick a time that suits you. We will confirm your slot and come prepared." img="/img/stock/h-book.jpg" actions={false} />

      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-side">
            <span className="eyebrow reveal">What to expect</span>
            <h2 className="reveal">Your first step to <em>growth.</em></h2>
            <p className="reveal">A focused conversation about your goals — no obligation.</p>
            <div className="next-steps">
              <div className="reveal"><h3>Book your slot</h3><p>Pick a date, time and how you&apos;d like to meet.</p></div>
              <div className="reveal"><h3>Discovery call</h3><p>We understand your business goals, challenges, and audience.</p></div>
              <div className="reveal"><h3>Your growth roadmap</h3><p>We craft a custom growth roadmap tailored to your needs.</p></div>
            </div>
            <div className="reveal"><ContactList /></div>
          </div>

          <EnquiryForm subject="Appointment request" primaryLabel="Book on WhatsApp">
            <h3>Book an appointment</h3>
            <p>Fields marked * are required.</p>
            <div className="f-row">
              <label className="f-field"><span>Full name *</span><input name="Name" required autoComplete="name" /></label>
              <label className="f-field"><span>Phone *</span><input name="Phone" type="tel" required autoComplete="tel" /></label>
            </div>
            <div className="f-row">
              <label className="f-field"><span>Email</span><input name="Email" type="email" autoComplete="email" /></label>
              <label className="f-field"><span>Business name</span><input name="Business" autoComplete="organization" /></label>
            </div>
            <label className="f-field"><span>What do you need help with? *</span>
              <select name="Service" required defaultValue="FREE Audit">
                <option value="FREE Audit" data-key="audit">FREE Business Audit</option>
                <option value="Business Strategy" data-key="strategy">Business Strategy</option>
                <option value="Branding Services" data-key="branding">Branding Services</option>
                <option value="Digital Marketing" data-key="digital">Digital Marketing (SMM, SEO, PPC)</option>
                <option value="Technology Solutions" data-key="tech">Website, App & CRM</option>
                <option value="Offline Marketing" data-key="offline">Offline Marketing</option>
                <option value="Not sure yet" data-key="unsure">Not sure yet</option>
              </select>
            </label>
            <div className="f-row">
              <label className="f-field"><span>Meeting type</span><select name="Meeting type"><option>Phone call</option><option>Video call</option><option>Office visit</option></select></label>
              <label className="f-field"><span>Office</span><select name="Office"><option>Tirupati (HQ)</option><option>Bangalore</option><option>Hyderabad</option></select></label>
            </div>
            <div className="f-row">
              <label className="f-field"><span>Preferred date *</span><input name="Preferred date" type="date" required /></label>
              <label className="f-field"><span>Preferred time</span><select name="Preferred time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
            </div>
            <label className="f-field"><span>Anything we should know? <em>(optional)</em></span><textarea name="Notes" placeholder="Your goals, challenges, current marketing…" /></label>
          </EnquiryForm>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="Visit us" title="Our" accent="offices." />
          <Offices />
        </div>
      </section>
    </>
  );
}
