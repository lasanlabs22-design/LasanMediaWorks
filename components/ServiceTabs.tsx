'use client';

import { useState } from 'react';
import { OFFLINE, ONLINE } from '@/lib/content';

const PANELS = [
  { key: 'online', tab: 'Online Marketing', title: 'Digital Excellence', count: '15+ Digital Growth Channels', img: '/img/brand/Digital_Excellence.jpg', list: ONLINE },
  { key: 'offline', tab: 'Offline Marketing', title: 'Offline Impact', count: '15+ Traditional Impact Drivers', img: '/img/brand/Offline_Marketing.jpg', list: OFFLINE },
];

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const p = PANELS[active];
  return (
    <>
      <div className="tabs" role="tablist">
        {PANELS.map((x, i) => (
          <button key={x.key} className={`tab${i === active ? ' active' : ''}`} role="tab" aria-selected={i === active} aria-controls={`panel-${x.key}`} onClick={() => setActive(i)}>{x.tab}</button>
        ))}
      </div>
      <div className="service-panel" id={`panel-${p.key}`} role="tabpanel" key={p.key}>
        <figure className="panel-media" style={{ margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.img} alt="" loading="lazy" />
          <figcaption><span>{p.count}</span><b>{p.title}</b></figcaption>
        </figure>
        <ul className="spectrum">{p.list.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
    </>
  );
}
