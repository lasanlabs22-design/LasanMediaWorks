import type { Metadata } from 'next';
import ChannelPage from '@/components/ChannelPage';
import { OFFLINE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Offline Marketing',
  description: 'Hoardings, LED boards, transit ads, print, events, vehicle branding and 15+ traditional channels that put your business in front of your city.',
};

export default function OfflineMarketingPage() {
  return (
    <ChannelPage
      crumb="Offline Marketing"
      title="Own the streets of"
      accent="your city."
      text="Big, bold, physical presence that makes people look up, and then look you up. Planned and run alongside your digital campaigns."
      img="/img/brand/Offline_Marketing.jpg"
      listTitle="15+ traditional"
      listAccent="impact drivers."
      listText="Hoardings to field sales, we plan the placements, produce the creative and track the footfall they bring in."
      list={OFFLINE}
      other={['See Online Marketing', '/online-marketing']}
    />
  );
}
