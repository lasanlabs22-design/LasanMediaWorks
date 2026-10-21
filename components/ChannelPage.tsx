// Shared layout for /online-marketing and /offline-marketing (linked from the header tabs).
import { CenterHead, CtaBand, Industries, PageHero, SectionHead, Steps } from './Blocks';
import Icon from './Icon';

type Props = {
  crumb: string;
  title: string;
  accent: string;
  text: string;
  img: string;
  listTitle: string;
  listAccent: string;
  listText: string;
  list: readonly string[];
  other: [string, string]; // label + href of the sister page
};

export default function ChannelPage({ crumb, title, accent, text, img, listTitle, listAccent, listText, list, other }: Props) {
  return (
    <>
      <PageHero crumb={crumb} eyebrow={crumb} title={title} accent={accent} text={text} img={img} />

      <section className="section">
        <div className="wrap">
          <CenterHead eyebrow="What we run for you" title={listTitle} accent={listAccent} text={listText} />
          <ul className="channels">
            {list.map(c => <li className="reveal" key={c}><span className="ic"><Icon name="check" /></span>{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="From first call to" accent="first results." text="Four clear steps. You always know what we are doing and what it is bringing in." />
          <Steps />
        </div>
      </section>

      <section className="section sun">
        <div className="wrap">
          <CenterHead eyebrow="Who we help" title="Built for businesses" accent="like yours." text="Six industries, 200+ clients across Andhra Pradesh, Karnataka and Telangana." />
          <Industries />
        </div>
      </section>

      <CtaBand title="Ready to grow" accent="your business?" text="Tell us your goal and we will suggest the right mix of channels." primary={['Enquire Now', '/book-appointment']} secondary={other} />
    </>
  );
}
