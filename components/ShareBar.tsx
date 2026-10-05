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
      <span className="share-label">Share</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">in</a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">WA</a>
      <button type="button" aria-label="Copy link" onClick={() => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })}>
        {copied ? '✓' : '⧉'}
      </button>
    </div>
  );
}
