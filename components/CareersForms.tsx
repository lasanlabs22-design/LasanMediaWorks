'use client';

// Talent-pool sign-up and resume submission — both saved on the server.
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Icon';

type Status = { msg: string; ok: boolean };

const readFile = (file: File) => new Promise<string>((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(String(r.result));
  r.onerror = () => reject(new Error('Could not read the file'));
  r.readAsDataURL(file);
});

async function post(url: string, body: unknown) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
}

export function NotifyForm() {
  const [status, setStatus] = useState<Status>({ msg: 'No spam, only career updates. Unsubscribe anytime.', ok: false });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setBusy(true);
    try {
      await post('/api/careers/subscribe', { email: new FormData(form).get('email') });
      form.reset();
      setStatus({ msg: "You're on the list — we'll email you when new roles open.", ok: true });
    } catch (err) {
      setStatus({ msg: (err as Error).message, ok: false });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="notify-card glass reveal" onSubmit={onSubmit} noValidate>
      <h3>Stay tuned for updates</h3>
      <p>Be the first to know when we launch new roles, internships, and career programs. Subscribe to our talent pool — we&apos;ll reach out when your dream role appears.</p>
      <div className="notify-row">
        <label className="sr-only" htmlFor="notify-email">Your email address</label>
        <input id="notify-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
        <button type="submit" className="btn btn-sun" disabled={busy}>Notify Me <Arrow /></button>
      </div>
      <p className={`f-note${status.ok ? ' ok' : ''}`} role="status">{status.msg}</p>
    </form>
  );
}

export function ResumeForm({ jobs = [] }: { jobs?: { id: string; title: string }[] }) {
  const [status, setStatus] = useState<Status>({ msg: '', ok: false });
  const roleRef = useRef<HTMLSelectElement>(null);

  // "Apply for this role" links come in as /careers?role=<job id>#resume
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('role');
    const job = jobs.find(j => j.id === id);
    if (job && roleRef.current) roleRef.current.value = job.title;
  }, [jobs]);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setBusy(true);
    setStatus({ msg: 'Sending…', ok: false });
    try {
      const fd = new FormData(form);
      const body: Record<string, unknown> = {};
      for (const k of ['name', 'email', 'phone', 'role', 'area', 'office', 'link', 'about']) body[k] = String(fd.get(k) || '').trim();
      const file = fd.get('resume');
      if (file instanceof File && file.size) {
        if (file.size > 5 * 1024 * 1024) throw new Error('Resume must be under 5 MB.');
        body.resume = { name: file.name, dataUrl: await readFile(file) };
      }
      await post('/api/careers/apply', body);
      form.reset();
      setStatus({ msg: "Thank you! Your profile is in our talent pool — we'll be in touch when a role fits.", ok: true });
    } catch (err) {
      setStatus({ msg: (err as Error).message, ok: false });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <h3>Your profile</h3>
      <p>Fields marked * are required. Attach a resume or add a link.</p>
      {jobs.length > 0 && (
        <label className="f-field"><span>Applying for</span>
          <select name="role" ref={roleRef} defaultValue="">
            <option value="">General application</option>
            {jobs.map(j => <option key={j.id} value={j.title}>{j.title}</option>)}
          </select>
        </label>
      )}
      <label className="f-field"><span>Full name *</span><input name="name" required autoComplete="name" maxLength={100} /></label>
      <div className="f-row">
        <label className="f-field"><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
        <label className="f-field"><span>Phone *</span><input name="phone" type="tel" required autoComplete="tel" maxLength={30} /></label>
      </div>
      <div className="f-row">
        <label className="f-field"><span>Area of interest</span>
          <select name="area">
            <option>Digital Marketing</option><option>Social Media & Content</option><option>Graphic Design & Video Editing</option>
            <option>Web Development</option><option>Sales & Business Development</option><option>Internship</option><option>Other</option>
          </select>
        </label>
        <label className="f-field"><span>Preferred office</span><select name="office"><option>Bangalore</option><option>Hyderabad</option><option>Tirupati</option><option>Any</option></select></label>
      </div>
      <label className="f-field"><span>Resume <em>(PDF or Word, max 5 MB)</em></span><input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
      <label className="f-field"><span>Portfolio / LinkedIn link</span><input name="link" type="url" placeholder="https://" /></label>
      <label className="f-field"><span>About you *</span><textarea name="about" required maxLength={3000} placeholder="Your experience, skills and what you'd love to work on…" /></label>
      <div className="f-actions"><button type="submit" className="btn btn-primary" disabled={busy}>Submit profile <Arrow /></button></div>
      <p className={`f-note${status.ok ? ' ok' : ''}`} role="status">{status.msg}</p>
    </form>
  );
}
