import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/Blocks';
import { CONTACT } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'When and how LaSän Media Works Private Limited refunds payments for its services.',
};

export default function RefundPolicy() {
  return (
    <>
      <PageHero crumb="Refund Policy" eyebrow="Legal" title="Refund" accent="Policy" text="When and how we refund payments for our services." img="/img/stock/h-about.jpg" actions={false} />

      <article className="prose legal">
        <p className="legal-date">Last updated: 12 October 2026</p>

        <p>This policy applies to payments made to LaSän Media Works Private Limited (&quot;LaSän&quot;, &quot;we&quot;, &quot;us&quot;) for our services, whether paid online, through a payment link or by bank transfer. If your signed proposal or agreement says something different, the proposal or agreement applies.</p>

        <h2>1. Our services</h2>
        <p>We provide professional services such as strategy, branding, digital marketing, websites and media production. Because this work is custom and time-based, refunds depend on how much of the work has been done when you ask for one.</p>

        <h2>2. Advance payments</h2>
        <ul>
          <li>If you cancel before we start work, we refund the advance in full.</li>
          <li>If you cancel after work has started, we deduct the value of work completed and any third-party costs already incurred, and refund the balance.</li>
        </ul>
        <p>How to cancel a project or retainer is explained in our <Link href="/cancellation-policy">Cancellation Policy</Link>.</p>

        <h2>3. What is not refundable</h2>
        <ul>
          <li>Work that has been delivered, approved or published.</li>
          <li>Third-party costs paid on your behalf, such as domains, hosting, software licences, stock media, printing and media bookings.</li>
          <li>Advertising budget that has already been spent on platforms such as Google or Meta.</li>
          <li>Monthly retainer fees for a month that has already started.</li>
          <li>Paid consultations or workshops that have already taken place.</li>
        </ul>

        <h2>4. Unused ad budget</h2>
        <p>If we hold advertising budget for you and a campaign ends or is cancelled, any amount not yet spent is refunded or, if you prefer, carried forward to your next campaign.</p>

        <h2>5. If a deliverable is not as agreed</h2>
        <p>Each proposal includes a set number of revisions. If a deliverable does not match what was agreed, tell us within 7 days of delivery and we will fix it. If we cannot deliver what was agreed, we refund the fee for that deliverable.</p>

        <h2>6. Duplicate or failed payments</h2>
        <p>If you are charged twice, or money is debited for a payment that failed, we refund the extra amount in full once our payment provider confirms it.</p>

        <h2>7. How to request a refund</h2>
        <p>Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with your name, invoice number, payment date and the reason for the request. We reply within 3 working days.</p>

        <h2>8. Refund timelines</h2>
        <p>Approved refunds are made to the original payment method within 7 to 10 working days. Your bank or card provider may take a few more days to show the credit. Taxes are refunded in line with applicable GST rules.</p>

        <h2>9. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &quot;Last updated&quot; date at the top shows when it last changed. Payments already made are covered by the version in force when you paid.</p>

        <h2>10. Contact</h2>
        <p>LaSän Media Works Private Limited<br />Tirupati, Andhra Pradesh, India<br />Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />Phone: <a href={CONTACT.tel}>{CONTACT.phone}</a></p>
      </article>
    </>
  );
}
