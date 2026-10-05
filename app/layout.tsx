import type { Metadata, Viewport } from 'next';
import { Source_Sans_3, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import './globals.css';

const sans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-sans', display: 'swap' });
// only used for the "Powered by Lasan Labs" signature
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.lasanmediaworks.com'),
  title: { default: 'LaSän Media Works — Growth Agency for SMEs & Startups', template: '%s — LaSän Media Works' },
  description: 'LaSän Media Works is a premium growth agency headquartered in Tirupati, with offices in Bangalore and Hyderabad — business strategy, branding, digital marketing, technology and offline media for SMEs and startups.',
  icons: { icon: '/img/logo.png', apple: '/img/logo.png' },
  openGraph: { siteName: 'LaSän Media Works', type: 'website', images: ['/img/brand/Unlock_Business.jpg'] },
};

export const viewport: Viewport = { themeColor: '#230039' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${grotesk.variable}`}>
      <body id="top">
        <Effects />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
