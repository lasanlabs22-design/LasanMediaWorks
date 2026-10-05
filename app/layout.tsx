import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Effects from '@/components/Effects';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.lasanmediaworks.com'),
  title: { default: 'LaSän Media Works — Growth Agency for SMEs & Startups', template: '%s — LaSän Media Works' },
  description: 'LaSän Media Works is a premium growth agency in Bangalore, Hyderabad and Tirupati — business strategy, branding, digital marketing, technology and offline media for SMEs and startups.',
  icons: { icon: '/img/logo.png', apple: '/img/logo.png' },
  openGraph: { siteName: 'LaSän Media Works', type: 'website', images: ['/img/brand/Unlock_Business.jpg'] },
};

export const viewport: Viewport = { themeColor: '#230039' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body id="top">
        <Effects />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
