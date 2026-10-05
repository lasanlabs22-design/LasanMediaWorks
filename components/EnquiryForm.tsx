'use client';

// Collects named fields and opens WhatsApp or the visitor's email app with
// the details filled in. Field labels come from each input's `name`.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { CONTACT } from '@/lib/content';

export default function EnquiryForm({ subject, children, primaryLabel = 'Send on WhatsApp' }: { subject: string; children: React.ReactNode; primaryLabel?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [note, setNote] = useState('');

  // ?service=audit → preselect the matching <option data-key="audit">
  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    const wanted = new URLSearchParams(location.search).get('service');
    if (wanted) {
      const opt = [...form.querySelectorAll('option')].find(o => o.dataset.key === wanted);
      if (opt) opt.selected = true;
    }
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach(i => { i.min = iso; });
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const lines: string[] = [];
    new FormData(form).forEach((v, k) => { const s = String(v).trim(); if (s) lines.push(`${k}: ${s}`); });
    const text = `Hi LaSän Media Works,\n\n${subject}\n\n${lines.join('\n')}`;
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value || 'whatsapp';
    if (via === 'email') {
      location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${subject} — website`)}&body=${encodeURIComponent(text)}`;
      setNote('Opening your email app with the details filled in — just hit send.');
    } else {
      window.open(`https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setNote('Opening WhatsApp with your details filled in — just hit send.');
    }
  }

  return (
    <form ref={ref} className="form-card reveal" onSubmit={onSubmit} noValidate>
      {children}
      <div className="f-actions">
        <button type="submit" className="btn btn-primary" value="whatsapp"><Icon name="chat" className="" /> {primaryLabel}</button>
        <button type="submit" className="btn btn-ghost" value="email"><Icon name="mail" className="" /> Send by email</button>
      </div>
      <p className={`f-note${note ? ' ok' : ''}`} role="status">{note}</p>
    </form>
  );
}
