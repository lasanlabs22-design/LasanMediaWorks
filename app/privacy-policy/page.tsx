import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/Blocks';
import { CONTACT } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How LaSän Media Works Private Limited collects, uses and protects personal information shared through this website.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero crumb="Privacy Policy" eyebrow="Legal" title="Privacy" accent="Policy" text="How we collect, use and protect the information you share with us." img="/img/stock/h-about.jpg" actions={false} />

      <article className="prose legal">
        <p className="legal-date">Last updated: 6 October 2026</p>

        <p>This policy explains how LaSän Media Works Private Limited (&quot;LaSän&quot;, &quot;we&quot;, &quot;us&quot;) handles personal information when you visit this website or contact us through it. By using the site you agree to the practices described here.</p>

        <h2>1. Information we collect</h2>
        <h3>Enquiries and quote requests</h3>
        <p>When you fill in a contact, quote or appointment form, the website does not store your message. It opens WhatsApp or your email app with the details you entered, and you choose whether to send it. We then receive whatever you send, such as your name, phone number, email address and project details.</p>
        <h3>Job applications</h3>
        <p>When you apply through the Careers page, we store the details you submit: your name, email address, phone number, area of interest, preferred office, portfolio or profile link, the note you write about yourself, the role you applied for and your résumé file.</p>
        <h3>Talent pool sign-ups</h3>
        <p>If you use &quot;Notify Me&quot; on the Careers page, we store your email address and the date you signed up.</p>
        <h3>Technical information</h3>
        <p>Like most websites, our hosting provider may record basic technical details when pages are requested, such as your IP address, browser type and the pages you visit. We use these only to keep the site running and secure.</p>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To reply to your enquiry and provide quotes, consultations and services you ask for.</li>
          <li>To review job applications and contact candidates about roles.</li>
          <li>To tell talent pool members about new openings.</li>
          <li>To operate, secure and improve this website.</li>
          <li>To meet legal and regulatory obligations.</li>
        </ul>
        <p>We do not sell or rent your personal information, and we do not use it for advertising profiles.</p>

        <h2>3. Cookies</h2>
        <p>This website does not use advertising or analytics tracking cookies for visitors. A single sign-in cookie is used only by LaSän staff when they log in to manage the website.</p>

        <h2>4. Sharing your information</h2>
        <p>We share personal information only when needed:</p>
        <ul>
          <li>With service providers that help us run the website and communicate with you, such as our hosting provider and the WhatsApp or email service you choose to contact us through. Their own privacy policies apply to how they handle your messages.</li>
          <li>When required by law, court order or a government authority.</li>
          <li>To protect the rights, property or safety of LaSän, our clients or the public.</li>
        </ul>

        <h2>5. Third-party content and links</h2>
        <p>Some images and videos on this site are loaded from external providers, and some pages link to other websites. Those providers may receive basic technical information such as your IP address when the content loads. We are not responsible for the privacy practices of other websites.</p>

        <h2>6. How long we keep information</h2>
        <p>We keep personal information only as long as we need it for the purpose it was collected. Job applications and résumés are kept while we consider you for roles. Talent pool emails are kept until you ask to be removed. You can ask us to delete your information at any time.</p>

        <h2>7. Your rights</h2>
        <p>Subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023, you can ask us to:</p>
        <ul>
          <li>Tell you what personal information we hold about you.</li>
          <li>Correct or update inaccurate information.</li>
          <li>Delete your information, or withdraw consent you have given.</li>
          <li>Remove you from the talent pool.</li>
        </ul>
        <p>Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond within a reasonable time.</p>

        <h2>8. Security</h2>
        <p>We take reasonable technical and organisational steps to protect your information. Résumés are stored privately and are available only to signed-in LaSän staff. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>

        <h2>9. Children</h2>
        <p>This website is not intended for children under 18, and we do not knowingly collect their personal information.</p>

        <h2>10. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &quot;Last updated&quot; date at the top shows when it last changed.</p>

        <h2>11. Contact and grievances</h2>
        <p>For questions, requests or complaints about your personal information, contact us:</p>
        <p>LaSän Media Works Private Limited<br />Tirupati, Andhra Pradesh, India<br />Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />Phone: <a href={CONTACT.tel}>{CONTACT.phone}</a></p>
        <p>See also our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.</p>
      </article>
    </>
  );
}
