import Link from 'next/link';
import BrandName from './BrandName';
import Icon from './Icon';
import { CONTACT, MEGA, OFFICES, SEO_TAGS } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="LaSän Media Works — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.png" alt="LaSän Media Works" width={624} height={782} loading="lazy" />
              <span aria-hidden="true"><BrandName after=" Media Works" sub="Private Limited" className="logo-name" /></span>
            </Link>
            <p>A growth agency helping SMEs and startups grow through strategy, creative and technology.</p>
            <div className="footer-contacts">
              <a href={CONTACT.tel} className="footer-contact"><Icon name="phone" /> {CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="footer-contact"><Icon name="mail" /> {CONTACT.email}</a>
            </div>
          </div>
          <nav aria-label="Services">
            <h4>Services</h4>
            <ul>{MEGA.services.items.map(i => <li key={i.title}><Link href={i.href}>{i.title}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Strategy">
            <h4>Strategy</h4>
            <ul>{MEGA.strategy.items.map(i => <li key={i.title}><Link href={i.href}>{i.title}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Company">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/articles">Articles</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/book-appointment">Book Appointment</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-mid">
          <ul className="footer-offices" aria-label="Offices">
            {OFFICES.map(o => (
              <li key={o.city} title={o.address}><Icon name="pin" /> {o.city.replace(', IND', '')}{o.hq ? <em>HQ</em> : null}<span>{o.address}</span></li>
            ))}
          </ul>
          <details className="footer-seo">
            <summary>Areas we serve</summary>
            <p>
              Digital marketing, SEO and branding agency serving Tirupati, Andhra Pradesh, Karnataka, Telangana and across India.{' '}
              {SEO_TAGS.join(' · ')}
            </p>
          </details>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LaSän Media Works Private Limited</span>
          <nav className="footer-legal" aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </nav>
          <span className="powered">Powered by <span className="lasan-signature">Lasan Labs</span></span>
          <a href="#top" className="to-top" aria-label="Back to top"><Icon name="up" /></a>
        </div>
      </div>
    </footer>
  );
}
