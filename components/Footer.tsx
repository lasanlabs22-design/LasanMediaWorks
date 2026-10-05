import Link from 'next/link';
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
            </Link>
            <p>A growth agency helping SMEs and startups grow through strategy, creative and technology.</p>
            <a href={CONTACT.tel} className="footer-contact"><Icon name="phone" /> {CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="footer-contact"><Icon name="mail" /> {CONTACT.email}</a>
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
              <li><Link href="/">Home</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-offices">
          {OFFICES.map(o => (
            <div key={o.city}><b>{o.city}{o.hq ? ' (HQ)' : ''}</b><span>{o.address}</span></div>
          ))}
        </div>

        <p className="footer-seo">
          Digital marketing, SEO and branding agency serving Tirupati, Andhra Pradesh, Karnataka, Telangana and across India.{' '}
          {SEO_TAGS.join(' · ')}
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LaSän Media Works. All rights reserved.</span>
          <span className="powered">Powered by <span className="lasan-signature">Lasan Labs</span></span>
          <a href="#top" className="to-top">Back to top <Icon name="up" /></a>
        </div>
      </div>
    </footer>
  );
}
