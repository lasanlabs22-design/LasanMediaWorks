'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon, { Arrow } from './Icon';
import { CONTACT, MEGA, NAV } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menus on navigation / Escape
  useEffect(() => { setOpen(false); setOpenMega(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      (document.activeElement as HTMLElement | null)?.blur();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href) || (href === '/articles' && pathname.startsWith('/article/')));
  const closeAll = () => { setOpen(false); (document.activeElement as HTMLElement | null)?.blur(); };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <Link href="/book-appointment" className="tb-cta"><Icon name="spark" /> Book Free Consultation</Link>
          <div className="tb-links">
            <a href={CONTACT.tel}><Icon name="phone" /> {CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}><Icon name="mail" /> {CONTACT.email}</a>
            <span className="tb-item"><Icon name="pin" /> Bangalore · Hyderabad · Tirupati</span>
          </div>
        </div>
      </div>
      <div className="wrap">
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Main">
          <Link href="/" className="logo" aria-label="LaSän Media Works — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="LaSän Media Works" width={624} height={782} />
          </Link>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-links">
              {NAV.map(item => {
                const mega = MEGA[item.key];
                const active = isActive(item.href);
                if (!mega) {
                  return (
                    <li key={item.key}>
                      <Link href={item.href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined} onClick={closeAll}>{item.label}</Link>
                    </li>
                  );
                }
                const isOpen = openMega === item.key;
                return (
                  <li key={item.key} className={`has-mega${isOpen ? ' open' : ''}`}>
                    <Link href={item.href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined} onClick={closeAll}>
                      {item.label} <Icon name="chev" className="chev" />
                    </Link>
                    <button type="button" className="mega-toggle" aria-expanded={isOpen} aria-controls={`mega-${item.key}`}
                      aria-label={`Show ${item.label} menu`} onClick={() => setOpenMega(isOpen ? null : item.key)}>
                      <Icon name="chev" className="" />
                    </button>
                    <div className="mega" id={`mega-${item.key}`}>
                      <div className="mega-side">
                        <h3>{mega.side.title}</h3>
                        <p>{mega.side.text}</p>
                        <Link href={mega.side.href} className="btn btn-dark" onClick={closeAll}>{mega.side.cta} <Arrow /></Link>
                      </div>
                      <ul className="mega-grid" aria-label={item.label}>
                        {mega.items.map(m => (
                          <li key={m.title}>
                            <Link href={m.href} className="mega-item" onClick={closeAll}>
                              <span className="mi"><Icon name={m.icon} /></span>
                              <b>{m.title}</b>
                              <span>{m.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
            <a href={CONTACT.tel} className="nav-phone"><span className="ic"><Icon name="phone" /></span>{CONTACT.phone}</a>
            <Link href="/book-appointment" className="btn btn-primary nav-cta" onClick={closeAll}>Book Appointment <Arrow /></Link>
          </div>
          <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen(o => !o)}>
            <span /><span />
          </button>
        </nav>
      </div>
    </header>
  );
}
