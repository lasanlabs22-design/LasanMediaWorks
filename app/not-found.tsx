import Link from 'next/link';
import { Arrow } from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <h1>404</h1>
        <p style={{ fontSize: 18, margin: '10px 0 30px', color: 'var(--muted)' }}>This page took a wrong turn.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">Back to home <Arrow /></Link>
          <Link href="/book-appointment" className="btn btn-ghost">Book Appointment</Link>
        </div>
      </div>
    </section>
  );
}
