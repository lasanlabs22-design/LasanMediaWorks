import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/Blocks';
import { CONTACT } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use the LaSän Media Works Private Limited website.',
};

export default function Terms() {
  return (
    <>
      <PageHero crumb="Terms & Conditions" eyebrow="Legal" title="Terms &" accent="Conditions" text="The terms that apply when you use this website." img="/img/stock/h-about.jpg" actions={false} />

      <article className="prose legal">
        <p className="legal-date">Last updated: 6 October 2026</p>

        <p>These terms apply to your use of this website, operated by LaSän Media Works Private Limited (&quot;LaSän&quot;, &quot;we&quot;, &quot;us&quot;). By using the site you agree to them. If you do not agree, please do not use the site.</p>

        <h2>1. About this website</h2>
        <p>This website gives information about LaSän and our services, including strategy, branding, digital marketing, websites and media. The information is general and may change without notice.</p>

        <h2>2. Services, quotes and consultations</h2>
        <p>Any work we do for you is governed by a separate proposal or agreement between you and LaSän. Free audits and consultations carry no obligation. Prices, quotes and timelines discussed through the website are not binding until confirmed in writing by both parties.</p>

        <h2>3. No guarantee of results</h2>
        <p>Marketing results depend on many factors outside our control. Case studies, numbers and testimonials on this site describe past work and are not a promise of the same results for your business.</p>

        <h2>4. Intellectual property</h2>
        <p>All content on this website, including text, graphics, logos, images, videos and design, belongs to LaSän or is used with permission. This includes the LaSän Media Works, LaSän Talks, Life at LaSan, LaSan Labs and LaSän Academy names and logos. You may not copy, reproduce, modify or reuse any of it without our written permission, except to view and share pages for personal, non-commercial use. Ownership of work we create for clients is set out in the agreement for that work.</p>

        <h2>5. Using the website</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for anything unlawful, misleading or harmful.</li>
          <li>Try to gain unauthorised access to the site, its servers or the Studio Console.</li>
          <li>Interfere with the site&apos;s security or performance, or send spam or malicious files through its forms.</li>
          <li>Copy or scrape content in bulk.</li>
        </ul>

        <h2>6. Information you submit</h2>
        <p>When you send an enquiry or job application, you confirm that the information is accurate and that you have the right to share it. How we handle that information is explained in our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

        <h2>7. Third-party links</h2>
        <p>The site may link to other websites and services, such as WhatsApp. We do not control them and are not responsible for their content or practices.</p>

        <h2>8. Disclaimer and limitation of liability</h2>
        <p>The website is provided &quot;as is&quot;. We try to keep it accurate and available but do not guarantee that it will be error-free or uninterrupted. To the extent permitted by law, LaSän is not liable for any loss or damage arising from your use of, or reliance on, this website.</p>

        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of India. Any dispute relating to this website is subject to the exclusive jurisdiction of the courts at Tirupati, Andhra Pradesh.</p>

        <h2>10. Changes to these terms</h2>
        <p>We may update these terms from time to time. The &quot;Last updated&quot; date at the top shows when they last changed. Continuing to use the site after a change means you accept the updated terms.</p>

        <h2>11. Contact</h2>
        <p>LaSän Media Works Private Limited<br />Tirupati, Andhra Pradesh, India<br />Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />Phone: <a href={CONTACT.tel}>{CONTACT.phone}</a></p>
      </article>
    </>
  );
}
