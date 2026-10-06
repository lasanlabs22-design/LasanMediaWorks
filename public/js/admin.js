(function () {
  const { esc, md } = window.LMW;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const state = {
    articles: [],
    categories: [],
    filter: 'all',
    query: '',
    current: null, // article being edited (null = new)
    dirty: false,
  };

  /* ---------- api ---------- */
  async function api(url, opts = {}) {
    const res = await fetch(url, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && !url.endsWith('/login')) { showLogin(); throw new Error('Session expired — please sign in again'); }
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg, type = 'ok') {
    const t = $('#toast');
    t.textContent = msg;
    t.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* ---------- auth ---------- */
  function showLogin() {
    $('#app-view').hidden = true;
    $('#login-view').hidden = false;
    $('#password').focus();
  }

  async function showApp() {
    $('#login-view').hidden = true;
    $('#app-view').hidden = false;
    await loadArticles();
    route();
  }

  $('#login-form').addEventListener('submit', async e => {
    e.preventDefault();
    $('#login-error').textContent = '';
    try {
      await api('/api/admin/login', { method: 'POST', body: { password: $('#password').value } });
      $('#password').value = '';
      showApp();
    } catch (err) {
      $('#login-error').textContent = err.message;
    }
  });

  $('#logout').addEventListener('click', async () => {
    if (!confirmLeave()) return;
    await api('/api/admin/logout', { method: 'POST' }).catch(() => {});
    state.dirty = false;
    showLogin();
  });

  /* ---------- routing (#list, #new, #edit/<id>) ---------- */
  function confirmLeave() {
    return !state.dirty || confirm('You have unsaved changes. Leave without saving?');
  }

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    if (!confirmLeave()) return;
    state.dirty = false;
    location.hash = go.dataset.go;
  });

  window.addEventListener('hashchange', route);
  window.addEventListener('beforeunload', e => { if (state.dirty) { e.preventDefault(); e.returnValue = ''; } });

  function route() {
    if ($('#app-view').hidden) return;
    const [view, id] = location.hash.replace('#', '').split('/');
    $$('.side-nav [data-go]').forEach(b => b.classList.toggle('active', b.dataset.go === (view === 'edit' ? 'list' : view || 'list')));
    if (view === 'new') return openEditor(null);
    if (view === 'careers') return showCareers();
    if (view === 'jobs') return showJobs();
    if (view === 'recognition') return showRecognition();
    if (view === 'edit') {
      const a = state.articles.find(x => x.id === id);
      if (a) return openEditor(a);
      toast('Article not found', 'err');
      location.hash = 'list';
      return;
    }
    showList();
  }

  /* ---------- list ---------- */
  async function loadArticles() {
    const data = await api('/api/admin/articles');
    state.articles = data.articles;
    state.categories = data.categories;
  }

  const fmt = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const hash = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const thumb = a => a.cover
    ? `<img src="${esc(a.cover)}" alt="">`
    : `<div class="cover-art c${hash(a.title) % 4}"><span>${esc(a.title.split(' ').slice(0, 2).join(' '))}</span></div>`;

  function showList() {
    $('#editor-view').hidden = true;
    $('#careers-view').hidden = true;
    $('#jobs-view').hidden = true;
    $('#recognition-view').hidden = true;
    $('#list-view').hidden = false;
    renderList();
  }

  /* ---------- job openings ---------- */
  const jobsState = { jobs: [], types: [], editing: null };

  async function showJobs() {
    $('#list-view').hidden = true;
    $('#editor-view').hidden = true;
    $('#careers-view').hidden = true;
    $('#recognition-view').hidden = true;
    $('#jobs-view').hidden = false;
    try {
      Object.assign(jobsState, await api('/api/admin/jobs'));
    } catch (err) {
      toast(err.message, 'err');
    }
    $('#j-type').innerHTML = jobsState.types.map(t => `<option>${esc(t)}</option>`).join('');
    closeJobForm();
    renderJobs();
  }

  function renderJobs() {
    const list = jobsState.jobs;
    $('#jobs').innerHTML = list.length ? `
      <div class="job-row head"><span>Title</span><span>Type</span><span>Location</span><span>Status</span><span>Updated</span><span></span></div>
      ${list.map(j => `
        <div class="job-row" data-id="${esc(j.id)}">
          <span class="row-title" data-job="edit">${esc(j.title)}${j.experience ? `<small>${esc(j.experience)}</small>` : ''}</span>
          <span class="muted">${esc(j.type)}</span>
          <span class="muted">${esc(j.location || '—')}</span>
          <span><span class="badge ${j.status === 'open' ? 'pub' : ''}">${j.status === 'open' ? 'Open' : 'Closed'}</span></span>
          <span class="muted">${fmt(j.updatedAt)}</span>
          <div class="row-actions">
            <button class="mini" data-job="edit">Edit</button>
            <button class="mini" data-job="toggle">${j.status === 'open' ? 'Close' : 'Reopen'}</button>
            <button class="mini red" data-job="delete" aria-label="Delete opening">✕</button>
          </div>
        </div>`).join('')}`
      : '<div class="empty">No job openings yet. Click “New opening” to add one.</div>';
  }

  function openJobForm(job) {
    jobsState.editing = job;
    $('#job-form-title').textContent = job ? 'Edit opening' : 'New opening';
    $('#j-title').value = job ? job.title : '';
    $('#j-type').value = job ? job.type : jobsState.types[0] || '';
    $('#j-location').value = job ? job.location : '';
    $('#j-experience').value = job ? job.experience : '';
    $('#j-description').value = job ? job.description : '';
    $('#j-open').checked = job ? job.status === 'open' : true;
    $('#job-form').hidden = false;
    $('#j-title').focus();
  }

  function closeJobForm() {
    jobsState.editing = null;
    $('#job-form').hidden = true;
  }

  const jobBody = j => ({ title: j.title, type: j.type, location: j.location, experience: j.experience, description: j.description, status: j.status });

  $('#job-new').addEventListener('click', () => openJobForm(null));
  $('#job-cancel').addEventListener('click', closeJobForm);

  $('#job-form').addEventListener('submit', async e => {
    e.preventDefault();
    const body = {
      title: $('#j-title').value, type: $('#j-type').value, location: $('#j-location').value,
      experience: $('#j-experience').value, description: $('#j-description').value,
      status: $('#j-open').checked ? 'open' : 'closed',
    };
    try {
      const editing = jobsState.editing;
      const { job } = editing
        ? await api(`/api/admin/jobs/${encodeURIComponent(editing.id)}`, { method: 'PUT', body })
        : await api('/api/admin/jobs', { method: 'POST', body });
      jobsState.jobs = [job, ...jobsState.jobs.filter(j => j.id !== job.id)];
      closeJobForm();
      renderJobs();
      toast(editing ? 'Opening updated' : 'Opening added');
    } catch (err) {
      toast(err.message, 'err');
    }
  });

  $('#jobs').addEventListener('click', async e => {
    const btn = e.target.closest('[data-job]');
    if (!btn) return;
    const job = jobsState.jobs.find(j => j.id === btn.closest('.job-row').dataset.id);
    if (!job) return;
    try {
      if (btn.dataset.job === 'edit') return openJobForm(job);
      if (btn.dataset.job === 'toggle') {
        const { job: updated } = await api(`/api/admin/jobs/${encodeURIComponent(job.id)}`, { method: 'PUT', body: { ...jobBody(job), status: job.status === 'open' ? 'closed' : 'open' } });
        jobsState.jobs = jobsState.jobs.map(j => (j.id === updated.id ? updated : j));
        renderJobs();
        toast(updated.status === 'open' ? 'Opening is live on the Careers page' : 'Opening closed');
      }
      if (btn.dataset.job === 'delete') {
        if (!confirm(`Delete “${job.title}”? This can't be undone.`)) return;
        await api(`/api/admin/jobs/${encodeURIComponent(job.id)}`, { method: 'DELETE' });
        jobsState.jobs = jobsState.jobs.filter(j => j.id !== job.id);
        renderJobs();
        toast('Opening deleted');
      }
    } catch (err) {
      toast(err.message, 'err');
    }
  });

  /* ---------- careers inbox ---------- */
  const careers = { applications: [], subscribers: [] };
  const fmtTime = d => new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  async function showCareers() {
    $('#list-view').hidden = true;
    $('#editor-view').hidden = true;
    $('#jobs-view').hidden = true;
    $('#recognition-view').hidden = true;
    $('#careers-view').hidden = false;
    try {
      Object.assign(careers, await api('/api/admin/careers'));
    } catch (err) {
      toast(err.message, 'err');
    }
    renderCareers();
  }

  function renderCareers() {
    const { applications: apps, subscribers: subs } = careers;
    $('#s-apps').textContent = apps.length;
    $('#s-subs').textContent = subs.length;

    $('#apps').innerHTML = apps.length ? apps.map(a => `
      <article class="app-item" data-id="${esc(a.id)}">
        <div class="app-top">
          <div><b>${esc(a.name)}</b><small>${a.role ? `Applying for <strong>${esc(a.role)}</strong> · ` : 'General application · '}${esc(a.area || '—')} · ${esc(a.office || 'Any office')} · ${fmtTime(a.at)}</small></div>
          <div class="row-actions">
            ${a.resume ? `<a class="mini" href="/api/admin/resumes/${encodeURIComponent(a.resume.file)}">⤓ Resume</a>` : ''}
            ${a.link ? `<a class="mini" href="${esc(a.link)}" target="_blank" rel="noopener noreferrer">Portfolio ↗</a>` : ''}
            <button class="mini red" data-del-app="${esc(a.id)}" aria-label="Delete application">✕</button>
          </div>
        </div>
        <div class="app-contact"><a href="mailto:${esc(a.email)}">${esc(a.email)}</a><a href="tel:${esc(a.phone)}">${esc(a.phone)}</a></div>
        <p class="app-about">${esc(a.about)}</p>
      </article>`).join('') : '<div class="empty">No resume submissions yet.</div>';

    $('#subs').innerHTML = subs.length ? subs.map(s => `
      <div class="sub-item"><a href="mailto:${esc(s.email)}">${esc(s.email)}</a><span class="muted">${fmtTime(s.at)}</span>
        <button class="mini red" data-del-sub="${esc(s.email)}" aria-label="Remove subscriber">✕</button></div>`).join('')
      : '<div class="empty">No sign-ups yet.</div>';
  }

  $('#careers-refresh').addEventListener('click', showCareers);

  $('#careers-view').addEventListener('click', async e => {
    const delApp = e.target.closest('[data-del-app]');
    const delSub = e.target.closest('[data-del-sub]');
    try {
      if (delApp) {
        const a = careers.applications.find(x => x.id === delApp.dataset.delApp);
        if (!a || !confirm(`Delete ${a.name}'s application${a.resume ? ' and resume' : ''}? This can't be undone.`)) return;
        await api(`/api/admin/careers/applications/${encodeURIComponent(a.id)}`, { method: 'DELETE' });
        careers.applications = careers.applications.filter(x => x !== a);
        renderCareers();
        toast('Application deleted');
      } else if (delSub) {
        const email = delSub.dataset.delSub;
        if (!confirm(`Remove ${email} from the talent pool?`)) return;
        await api(`/api/admin/careers/subscribers/${encodeURIComponent(email)}`, { method: 'DELETE' });
        careers.subscribers = careers.subscribers.filter(s => s.email !== email);
        renderCareers();
        toast('Removed from talent pool');
      }
    } catch (err) {
      toast(err.message, 'err');
    }
  });

  $('#copy-emails').addEventListener('click', () => {
    const list = careers.subscribers.map(s => s.email).join(', ');
    if (!list) return toast('No emails to copy', 'err');
    navigator.clipboard.writeText(list).then(() => toast(`Copied ${careers.subscribers.length} email(s)`), () => toast('Could not copy', 'err'));
  });

  /* ---------- recognition (employee of the month) ---------- */
  const rec = { entries: [], quotes: [], editing: null };
  const fmtMonth = m => new Date(`${m}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  async function showRecognition() {
    $('#list-view').hidden = true;
    $('#editor-view').hidden = true;
    $('#careers-view').hidden = true;
    $('#jobs-view').hidden = true;
    $('#recognition-view').hidden = false;
    try {
      Object.assign(rec, await api('/api/admin/recognition'));
    } catch (err) {
      toast(err.message, 'err');
    }
    closeRecForm();
    renderRecognition();
  }

  function renderRecognition() {
    $('#rec-list').innerHTML = rec.entries.length ? rec.entries.map((r, i) => `
      <article class="rec-item${i === 0 ? ' current' : ''}" data-id="${esc(r.id)}">
        <img src="${esc(r.photo)}" alt="">
        <div class="rec-body">
          <span class="badge ${i === 0 ? 'feat' : ''}">${i === 0 ? '★ Featured · ' : ''}${esc(fmtMonth(r.month))}</span>
          <b>${esc(r.name)}</b>${r.role ? `<small>${esc(r.role)}</small>` : ''}
          <p>“${esc(r.quote)}”${r.quoteBy ? ` <em>${esc(r.quoteBy)}</em>` : ''}</p>
          <div class="row-actions">
            <button class="mini" data-rec="edit">Edit</button>
            <button class="mini red" data-rec="delete" aria-label="Delete winner">✕</button>
          </div>
        </div>
      </article>`).join('')
      : '<div class="empty">No winners yet. Click “New winner” to add this month’s best performer.</div>';
  }

  function updateRecPhoto() {
    const url = $('#r-photo').value.trim();
    $('#rec-img').hidden = !url;
    $('#rec-empty').hidden = !!url;
    if (url) $('#rec-img').src = url; else $('#rec-img').removeAttribute('src');
  }

  function openRecForm(r) {
    rec.editing = r;
    $('#rec-form-title').textContent = r ? 'Edit winner' : 'New winner';
    $('#r-name').value = r ? r.name : '';
    $('#r-role').value = r ? r.role : '';
    $('#r-month').value = r ? r.month : new Date().toISOString().slice(0, 7);
    $('#r-photo').value = r ? r.photo : '';
    $('#r-quote').value = r ? r.quote : '';
    $('#r-quote-by').value = r ? r.quoteBy : '';
    updateRecPhoto();
    $('#rec-form').hidden = false;
    $('#r-name').focus();
  }

  function closeRecForm() {
    rec.editing = null;
    $('#rec-form').hidden = true;
  }

  $('#rec-new').addEventListener('click', () => openRecForm(null));
  $('#rec-cancel').addEventListener('click', closeRecForm);
  $('#r-photo').addEventListener('input', updateRecPhoto);
  $('#rec-random').addEventListener('click', () => {
    const options = rec.quotes.filter(q => q.text !== $('#r-quote').value);
    const q = options[Math.floor(Math.random() * options.length)];
    if (!q) return;
    $('#r-quote').value = q.text;
    $('#r-quote-by').value = q.by;
  });

  async function setRecPhoto(file) {
    try {
      $('#r-photo').value = await upload(file);
      updateRecPhoto();
    } catch (err) { toast(err.message, 'err'); }
  }
  const recDrop = $('#rec-drop');
  $('#rec-file').addEventListener('change', e => { if (e.target.files[0]) setRecPhoto(e.target.files[0]); e.target.value = ''; });
  ['dragenter', 'dragover'].forEach(ev => recDrop.addEventListener(ev, e => { e.preventDefault(); recDrop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => recDrop.addEventListener(ev, e => { e.preventDefault(); recDrop.classList.remove('over'); }));
  recDrop.addEventListener('drop', e => { const file = e.dataTransfer.files[0]; if (file) setRecPhoto(file); });

  $('#rec-form').addEventListener('submit', async e => {
    e.preventDefault();
    const body = {
      name: $('#r-name').value, role: $('#r-role').value, month: $('#r-month').value,
      photo: $('#r-photo').value, quote: $('#r-quote').value, quoteBy: $('#r-quote-by').value,
    };
    if (!body.photo.trim()) return toast('Add a photo first', 'err');
    try {
      const editing = rec.editing;
      const { entry } = editing
        ? await api(`/api/admin/recognition/${encodeURIComponent(editing.id)}`, { method: 'PUT', body })
        : await api('/api/admin/recognition', { method: 'POST', body });
      rec.entries = [entry, ...rec.entries.filter(r => r.id !== entry.id)].sort((a, b) => b.month.localeCompare(a.month));
      closeRecForm();
      renderRecognition();
      toast(editing ? 'Winner updated' : 'Winner added to the About page');
    } catch (err) {
      toast(err.message, 'err');
    }
  });

  $('#rec-list').addEventListener('click', async e => {
    const btn = e.target.closest('[data-rec]');
    if (!btn) return;
    const r = rec.entries.find(x => x.id === btn.closest('.rec-item').dataset.id);
    if (!r) return;
    if (btn.dataset.rec === 'edit') return openRecForm(r);
    if (!confirm(`Remove ${r.name} (${fmtMonth(r.month)})? This can't be undone.`)) return;
    try {
      await api(`/api/admin/recognition/${encodeURIComponent(r.id)}`, { method: 'DELETE' });
      rec.entries = rec.entries.filter(x => x !== r);
      renderRecognition();
      toast('Winner removed');
    } catch (err) {
      toast(err.message, 'err');
    }
  });

  function renderList() {
    const all = state.articles;
    const pub = all.filter(a => a.status === 'published');
    $('#s-total').textContent = all.length;
    $('#s-pub').textContent = pub.length;
    $('#s-draft').textContent = all.length - pub.length;
    const feat = pub.find(a => a.featured);
    $('#s-feat').textContent = feat ? feat.title : 'None — latest is shown';

    let list = all;
    if (state.filter !== 'all') list = list.filter(a => a.status === state.filter);
    if (state.query) list = list.filter(a => a.title.toLowerCase().includes(state.query.toLowerCase()));

    const table = $('#table');
    if (!list.length) {
      table.innerHTML = `<div class="empty">${all.length ? 'No articles match this filter.' : 'No articles yet. Write your first one!'}</div>`;
      return;
    }
    table.innerHTML = `
      <div class="row head"><span></span><span>Title</span><span>Category</span><span>Status</span><span>Updated</span><span></span></div>
      ${list.map(a => `
        <div class="row" data-id="${esc(a.id)}">
          <div class="thumb">${thumb(a)}</div>
          <div class="row-title" data-act="edit">${esc(a.title)}<small>/article/${esc(a.slug)} · ${a.readTime} min</small></div>
          <span class="muted">${esc(a.category)}</span>
          <span><span class="badge ${a.status === 'published' ? 'pub' : ''}">${a.status === 'published' ? 'Live' : 'Draft'}</span>${a.featured ? '<span class="badge feat">★</span>' : ''}</span>
          <span class="muted">${fmt(a.updatedAt)}</span>
          <div class="row-actions">
            <button class="mini" data-act="edit">Edit</button>
            <button class="mini" data-act="toggle">${a.status === 'published' ? 'Unpublish' : 'Publish'}</button>
            ${a.status === 'published' ? `<a class="mini" href="/article/${encodeURIComponent(a.slug)}" target="_blank" rel="noopener">View</a>` : ''}
            <button class="mini red" data-act="delete" aria-label="Delete">✕</button>
          </div>
        </div>`).join('')}`;
  }

  $('#table').addEventListener('click', async e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = btn.closest('.row').dataset.id;
    const a = state.articles.find(x => x.id === id);
    if (!a) return;
    const act = btn.dataset.act;
    if (act === 'edit') location.hash = `edit/${id}`;
    if (act === 'toggle') {
      try {
        const status = a.status === 'published' ? 'draft' : 'published';
        await api(`/api/admin/articles/${id}`, { method: 'PUT', body: { ...a, status } });
        await loadArticles();
        renderList();
        toast(status === 'published' ? 'Published — it\'s live on the site' : 'Moved to drafts');
      } catch (err) { toast(err.message, 'err'); }
    }
    if (act === 'delete') removeArticle(a);
  });

  async function removeArticle(a) {
    if (!confirm(`Delete “${a.title}”? This can't be undone.`)) return;
    try {
      await api(`/api/admin/articles/${a.id}`, { method: 'DELETE' });
      await loadArticles();
      state.dirty = false;
      toast('Article deleted');
      if (location.hash.startsWith('#edit')) location.hash = 'list'; else renderList();
    } catch (err) { toast(err.message, 'err'); }
  }

  $('#status-filter').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    state.filter = b.dataset.status;
    $$('#status-filter button').forEach(x => x.classList.toggle('active', x === b));
    renderList();
  });
  $('#list-search').addEventListener('input', e => { state.query = e.target.value.trim(); renderList(); });

  /* ---------- editor ---------- */
  const f = {
    title: $('#f-title'), slug: $('#f-slug'), excerpt: $('#f-excerpt'), content: $('#f-content'),
    category: $('#f-category'), tags: $('#f-tags'), author: $('#f-author'), cover: $('#f-cover'), featured: $('#f-featured'),
    authorRole: $('#f-author-role'), authorPhoto: $('#f-author-photo'), coverCaption: $('#f-cover-caption'),
  };
  let slugTouched = false;

  function openEditor(a) {
    state.current = a;
    $('#list-view').hidden = true;
    $('#careers-view').hidden = true;
    $('#jobs-view').hidden = true;
    $('#recognition-view').hidden = true;
    $('#editor-view').hidden = false;
    $('#editor-title').textContent = a ? 'Edit article' : 'New article';
    f.category.innerHTML = state.categories.map(c => `<option>${esc(c)}</option>`).join('');

    f.title.value = a ? a.title : '';
    f.slug.value = a ? a.slug : '';
    f.excerpt.value = a ? a.excerpt : '';
    f.content.value = a ? a.content : '';
    f.category.value = a ? a.category : state.categories[0];
    f.tags.value = a ? (a.tags || []).join(', ') : '';
    f.author.value = a ? a.author : '';
    f.cover.value = a ? a.cover : '';
    f.featured.checked = a ? !!a.featured : false;
    f.authorRole.value = a ? a.authorRole || '' : '';
    f.authorPhoto.value = a ? a.authorPhoto || '' : '';
    f.coverCaption.value = a ? a.coverCaption || '' : '';
    slugTouched = !!a;

    $('#danger').hidden = !a;
    updateStatusUI();
    updateCover();
    updatePreview();
    state.dirty = false;
    $('#save-state').textContent = '';
    window.scrollTo(0, 0);
    if (!a) f.title.focus();
  }

  function updateStatusUI() {
    const a = state.current;
    const live = a && a.status === 'published';
    const badge = $('#status-badge');
    badge.textContent = live ? 'Live' : 'Draft';
    badge.className = `badge ${live ? 'pub' : ''}`;
    $('#publish').textContent = live ? 'Update live article' : 'Publish';
    $('#save-draft').textContent = live ? 'Unpublish to draft' : 'Save draft';
    $('#dates').textContent = a ? (live ? `Published ${fmt(a.publishedAt)}` : `Edited ${fmt(a.updatedAt)}`) : 'Not saved yet';
  }

  const slugify = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

  function markDirty() {
    state.dirty = true;
    $('#save-state').textContent = 'Unsaved changes';
  }

  $('#editor').addEventListener('input', e => {
    if (e.target === f.title && !slugTouched) f.slug.value = slugify(f.title.value);
    if (e.target === f.slug) slugTouched = true;
    if (e.target === f.content) updatePreview();
    if (e.target === f.cover) updateCover();
    markDirty();
  });
  $('#editor').addEventListener('change', markDirty);
  $('#editor').addEventListener('submit', e => e.preventDefault());

  function updatePreview() {
    const text = f.content.value;
    $('#preview').innerHTML = text.trim() ? md(text) : '<p class="muted">Nothing to preview yet.</p>';
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    $('#wc').textContent = `${words} word${words === 1 ? '' : 's'} · ${Math.max(1, Math.round(words / 220))} min read`;
  }

  // view mode
  $('#mode').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('#mode button').forEach(x => x.classList.toggle('active', x === b));
    $('.md-panes').dataset.mode = b.dataset.mode;
    updatePreview();
  });

  // markdown toolbar
  function wrapSel(before, after = '', placeholder = 'text') {
    const ta = f.content;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const sel = value.slice(s, e) || placeholder;
    ta.setRangeText(before + sel + after, s, e, 'end');
    ta.focus();
    ta.setSelectionRange(s + before.length, s + before.length + sel.length);
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  }
  function prefixLines(prefix) {
    const ta = f.content;
    const { value } = ta;
    const start = value.lastIndexOf('\n', ta.selectionStart - 1) + 1;
    let end = value.indexOf('\n', ta.selectionEnd);
    if (end === -1) end = value.length;
    const lines = value.slice(start, end).split('\n');
    const out = lines.map((l, i) => (typeof prefix === 'function' ? prefix(i) : prefix) + l).join('\n');
    ta.setRangeText(out, start, end, 'end');
    ta.focus();
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  }
  $('.md-toolbar').addEventListener('click', e => {
    const b = e.target.closest('[data-md]');
    if (!b) return;
    switch (b.dataset.md) {
      case 'h2': prefixLines('## '); break;
      case 'h3': prefixLines('### '); break;
      case 'bold': wrapSel('**', '**'); break;
      case 'italic': wrapSel('*', '*'); break;
      case 'ul': prefixLines('- '); break;
      case 'ol': prefixLines(i => `${i + 1}. `); break;
      case 'quote': prefixLines('> '); break;
      case 'link': {
        const url = prompt('Link URL', 'https://');
        if (url) wrapSel('[', `](${url})`, 'link text');
        break;
      }
      case 'img': pickInlineImage(); break;
      case 'stats': wrapSel('\n:::stats\n300+ | Brands\n', '\n:::\n', '7K+ | Posters'); break;
    }
  });

  function pickInlineImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp,image/gif';
    input.onchange = async () => {
      if (!input.files[0]) return;
      try {
        const url = await upload(input.files[0]);
        wrapSel('![', `](${url})`, 'image description');
      } catch (err) { toast(err.message, 'err'); }
    };
    input.click();
  }

  // cover image
  function updateCover() {
    const url = f.cover.value.trim();
    const img = $('#cover-img');
    img.hidden = !url;
    $('#cover-empty').hidden = !!url;
    if (url) img.src = url; else img.removeAttribute('src');
  }

  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  async function upload(file) {
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) throw new Error('Use a PNG, JPG, WEBP or GIF image');
    if (file.size > 5 * 1024 * 1024) throw new Error('Image must be under 5 MB');
    toast('Uploading image…');
    const { url } = await api('/api/admin/upload', { method: 'POST', body: { dataUrl: await readAsDataURL(file) } });
    toast('Image uploaded');
    return url;
  }

  async function setCoverFile(file) {
    try {
      f.cover.value = await upload(file);
      updateCover();
      markDirty();
    } catch (err) { toast(err.message, 'err'); }
  }

  const drop = $('#cover-drop');
  $('#cover-file').addEventListener('change', e => { if (e.target.files[0]) setCoverFile(e.target.files[0]); e.target.value = ''; });
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => { const file = e.dataTransfer.files[0]; if (file) setCoverFile(file); });
  $('#cover-clear').addEventListener('click', () => { f.cover.value = ''; updateCover(); markDirty(); });

  // save
  async function save(status) {
    const body = {
      title: f.title.value.trim(),
      slug: f.slug.value.trim(),
      excerpt: f.excerpt.value.trim(),
      content: f.content.value,
      category: f.category.value,
      tags: f.tags.value,
      author: f.author.value.trim(),
      cover: f.cover.value.trim(),
      featured: f.featured.checked,
      authorRole: f.authorRole.value.trim(),
      authorPhoto: f.authorPhoto.value.trim(),
      coverCaption: f.coverCaption.value.trim(),
      status,
    };
    if (!body.title) { toast('Give your article a title first', 'err'); f.title.focus(); return; }
    if (status === 'published' && !body.content.trim()) { toast('Write some content before publishing', 'err'); f.content.focus(); return; }

    const buttons = [$('#publish'), $('#save-draft')];
    buttons.forEach(b => b.disabled = true);
    try {
      const cur = state.current;
      const { article } = cur
        ? await api(`/api/admin/articles/${cur.id}`, { method: 'PUT', body })
        : await api('/api/admin/articles', { method: 'POST', body });

      // only one featured article at a time
      if (article.featured) {
        const others = state.articles.filter(a => a.featured && a.id !== article.id);
        await Promise.all(others.map(o => api(`/api/admin/articles/${o.id}`, { method: 'PUT', body: { ...o, featured: false } })));
      }

      await loadArticles();
      state.current = state.articles.find(a => a.id === article.id) || article;
      state.dirty = false;
      f.slug.value = article.slug;
      slugTouched = true;
      $('#danger').hidden = false;
      $('#editor-title').textContent = 'Edit article';
      updateStatusUI();
      $('#save-state').textContent = `Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      toast(status === 'published' ? 'Published — it\'s live in the Articles section' : 'Saved as draft');
      if (!cur) history.replaceState(null, '', `#edit/${article.id}`);
    } catch (err) {
      toast(err.message, 'err');
    } finally {
      buttons.forEach(b => b.disabled = false);
    }
  }

  $('#publish').addEventListener('click', () => save('published'));
  $('#save-draft').addEventListener('click', () => save('draft'));
  $('#delete').addEventListener('click', () => state.current && removeArticle(state.current));

  // Ctrl/Cmd + S saves (keeps current status)
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && !$('#editor-view').hidden) {
      e.preventDefault();
      save(state.current && state.current.status === 'published' ? 'published' : 'draft');
    }
  });

  /* ---------- boot ---------- */
  fetch('/api/admin/me').then(r => (r.ok ? showApp() : showLogin())).catch(showLogin);
})();
