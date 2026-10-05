'use client';

import { useEffect, useState } from 'react';

export default function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(location.href), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  return (
    <div className="share">
      <b>Share</b>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button type="button" onClick={() => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })}>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
