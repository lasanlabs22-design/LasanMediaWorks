import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/Blocks';
import { CONTACT } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'How to cancel a consultation, project or retainer with LaSän Media Works Private Limited.',
};

export default function CancellationPolicy() {
  return (
    <>
      <PageHero crumb="Cancellation Policy" eyebrow="Legal" title="Cancellation" accent="Policy" text="How to cancel a consultation, project or retainer with us." img="/img/stock/h-about.jpg" actions={false} />

      <article className="prose legal">
        <p className="legal-date">Last updated: 12 October 2026</p>

        <p>This policy explains how you can cancel services from LaSän Media Works Private Limited (&quot;LaSän&quot;, &quot;we&quot;, &quot;us&quot;), and when we may cancel. If your signed proposal or agreement says something different, the proposal or agreement applies.</p>

        <h2>1. Consultations and appointments</h2>
        <ul>
          <li>Free consultations and audits can be cancelled or rescheduled at any time. Please let us know at least 24 hours before.</li>
          <li>Paid consultations cancelled at least 24 hours before the session are refunded in full or rescheduled, as you prefer.</li>
          <li>Paid consultations cancelled with less than 24 hours&apos; notice, or missed, can be rescheduled once. They are not refunded.</li>
        </ul>

        <h2>2. Cancelling a project</h2>
        <ul>
          <li><strong>Before work starts:</strong> you can cancel at no cost and your advance is refunded in full.</li>
          <li><strong>After work starts:</strong> send us written notice by email. We stop work, bill for the work done up to that date and any third-party costs already committed, and refund the rest of your advance.</li>
        </ul>
        <p>Work you have paid for is handed over to you after cancellation.</p>

        <h2>3. Cancelling a monthly retainer</h2>
        <p>Retainers, such as social media management, SEO and performance marketing, can be cancelled with 30 days&apos; written notice. The current month is billed in full. Nothing is charged for months after the notice period ends.</p>

        <h2>4. Pausing or stopping ad campaigns</h2>
        <p>If you ask us to stop a paid campaign, we pause it within 1 working day. Budget spent before the pause is not refundable. Unspent budget is handled as set out in our <Link href="/refund-policy">Refund Policy</Link>.</p>

        <h2>5. Cancellation by LaSän</h2>
        <p>We may cancel a project or retainer if:</p>
        <ul>
          <li>Invoices remain unpaid after the due date.</li>
          <li>You ask for work that is unlawful, misleading or harmful.</li>
          <li>You breach the agreement or our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.</li>
          <li>We are unable to deliver the work.</li>
        </ul>
        <p>If we cancel because we cannot deliver, we refund the fee for any work not delivered. In the other cases, we bill for the work done up to the date of cancellation.</p>

        <h2>6. How to cancel</h2>
        <p>Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> from the email address you use with us, and include your name and the project or invoice number. We confirm the cancellation within 2 working days. Refunds that follow a cancellation are made under our <Link href="/refund-policy">Refund Policy</Link>.</p>

        <h2>7. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &quot;Last updated&quot; date at the top shows when it last changed.</p>

        <h2>8. Contact</h2>
        <p>LaSän Media Works Private Limited<br />Tirupati, Andhra Pradesh, India<br />Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />Phone: <a href={CONTACT.tel}>{CONTACT.phone}</a></p>
      </article>
    </>
  );
}
