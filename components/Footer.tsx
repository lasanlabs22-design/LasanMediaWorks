import Link from 'next/link';
import Icon, { Arrow } from './Icon';
import { CONTACT, MEGA, OFFICES, SEO_TAGS } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" aria-label="LaSän Media Works — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.png" alt="LaSän Media Works" width={624} height={782} loading="lazy" />
            </Link>
            <p style={{ marginTop: 20 }}>We are a premium growth agency helping SMEs and startups achieve digital dominance through data-driven strategy, creative excellence and advanced technology.</p>
            <Link href="/book-appointment" className="btn btn-primary" style={{ marginTop: 6 }}>Book Free Consultation <Arrow /></Link>
          </div>
          <div>
            <h4>Services</h4>
            <ul>{MEGA.services.items.map(i => <li key={i.title}><Link href={i.href}>{i.title}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Strategy</h4>
            <ul>{MEGA.strategy.items.map(i => <li key={i.title}><Link href={i.href}>{i.title}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/articles">Articles</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/book-appointment">Book Appointment</Link></li>
            </ul>
          </div>
          <div>
            <h4>Our Offices</h4>
            {OFFICES.map(o => (
              <div className="footer-office" key={o.city}><b>{o.city}{o.hq ? ' (HQ)' : ''}</b>{o.address}</div>
            ))}
            <ul style={{ marginTop: 14 }}>
              <li><a href={CONTACT.tel}>{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-seo">
          <h4>Top-Rated Digital Agency</h4>
          <ul>{SEO_TAGS.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LaSän Media Works — All Rights Reserved.</span>
          <span>Digital Marketing, SEO &amp; Branding Agency serving Tirupati, Andhra Pradesh, Karnataka, Telangana and across India.</span>
          <a href="#top" className="to-top">Back to top <Icon name="up" /></a>
        </div>
      </div>
    </footer>
  );
}
