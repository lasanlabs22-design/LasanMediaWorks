// Tiny, safe markdown renderer (escapes HTML first, then applies formatting).
// Mirrors public/js/md.js, which the admin console uses for its live preview.

export function esc(s: unknown) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const safeUrl = (u: string) => /^(https?:\/\/|\/|#|mailto:)/i.test(u);

function inline(s: string) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, url) => (safeUrl(url) ? `<img src="${url}" alt="${alt}" loading="lazy">` : ''))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) => (safeUrl(url) ? `<a href="${url}" target="_blank" rel="noopener">${text}</a>` : text))
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
}

// A paragraph that is only an image becomes a figure; the optional "title" is the caption.
function figure(line: string) {
  const m = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/.exec(line.trim());
  if (!m || !safeUrl(m[2])) return null;
  const cap = m[3] ? `<figcaption>${esc(m[3])}</figcaption>` : '';
  return `<figure><img src="${esc(m[2])}" alt="${esc(m[1])}" loading="lazy">${cap}</figure>`;
}

export function renderMarkdown(src: string) {
  const lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // :::stats ... ::: with one "value | label" per line
    if (/^:::\s*stats\s*$/i.test(line)) {
      const items: string[] = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        const [value, ...label] = lines[i++].split('|');
        if (value.trim()) items.push(`<div><b>${esc(value.trim())}</b><span>${esc(label.join('|').trim())}</span></div>`);
      }
      i++;
      out.push(`<div class="stat-band">${items.join('')}</div>`);
      continue;
    }
    const fig = figure(line);
    if (fig) { out.push(fig); i++; continue; }
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const lvl = Math.min(h[1].length + 1, 5);
      out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote><p>${inline(buf.join(' '))}</p></blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) buf.push(lines[i++].replace(/^\s*[-*]\s+/, ''));
      out.push(`<ul>${buf.map(b => `<li>${inline(b)}</li>`).join('')}</ul>`);
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) buf.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ''));
      out.push(`<ol>${buf.map(b => `<li>${inline(b)}</li>`).join('')}</ol>`);
      continue;
    }
    if (!line.trim()) { i++; continue; }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|```|\s*[-*]\s+|\s*\d+[.)]\s+|-{3,}\s*$|:::)/.test(lines[i]) && !figure(lines[i])) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}
