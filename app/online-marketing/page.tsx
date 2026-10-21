import type { Metadata } from 'next';
import ChannelPage from '@/components/ChannelPage';
import { ONLINE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Online Marketing',
  description: 'SEO, social media, paid ads, websites, WhatsApp automation and 15+ digital growth channels that bring your business enquiries and sales.',
};

export default function OnlineMarketingPage() {
  return (
    <ChannelPage
      crumb="Online Marketing"
      title="Get found and chosen"
      accent="online."
      text="From the first Google search to the final WhatsApp reply, we build and run the digital journey that brings customers in and keeps them coming back."
      img="/img/brand/Digital_Excellence.jpg"
      listTitle="15+ digital"
      listAccent="growth channels."
      listText="Pick one channel or let us run them together, with one monthly report on the leads and sales they bring in."
      list={ONLINE}
      other={['See Offline Marketing', '/offline-marketing']}
    />
  );
}
