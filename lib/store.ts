// File-based storage for articles, careers submissions and uploads.
// DATA_DIR should point at a persistent volume in production (e.g. /data on Railway).
import 'server-only';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SEED_DIR = path.join(process.cwd(), 'data');
export const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : SEED_DIR;
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
export const RESUME_DIR = path.join(DATA_DIR, 'resumes'); // private: only served to signed-in admins
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');

export const CATEGORIES = ['Tips', 'Trends', 'Strategies', 'Case Studies', 'News'] as const;

let ready = false;
function ensure() {
  if (ready) return;
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.mkdirSync(RESUME_DIR, { recursive: true });
  if (!fs.existsSync(ARTICLES_FILE)) {
    const seed = path.join(SEED_DIR, 'articles.json');
    fs.writeFileSync(ARTICLES_FILE, seed !== ARTICLES_FILE && fs.existsSync(seed) ? fs.readFileSync(seed) : '[]');
  }
  ready = true;
}

function readJSON<T>(file: string, fallback: T): T {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(file: string, data: unknown) {
  ensure();
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}

/* ---------- articles ---------- */

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover: string;
  author: string;
  status: 'published' | 'draft';
  featured: boolean;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type ArticleSummary = Omit<Article, 'content'>;

export const readArticles = () => readJSON<Article[]>(ARTICLES_FILE, []);
export const writeArticles = (list: Article[]) => writeJSON(ARTICLES_FILE, list);

const byPublished = (a: Article, b: Article) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();

export function summary({ content, ...rest }: Article): ArticleSummary {
  return rest;
}

export function publishedArticles(opts: { category?: string | null; q?: string | null; limit?: number } = {}) {
  let list = readArticles().filter(a => a.status === 'published');
  if (opts.category && opts.category !== 'All') list = list.filter(a => a.category === opts.category);
  if (opts.q) {
    const needle = opts.q.toLowerCase();
    list = list.filter(a => [a.title, a.excerpt, a.content, (a.tags || []).join(' ')].join(' ').toLowerCase().includes(needle));
  }
  list.sort(byPublished);
  if (opts.limit) list = list.slice(0, opts.limit);
  return list.map(summary);
}

export function publishedArticle(slug: string) {
  const list = readArticles().filter(a => a.status === 'published');
  const article = list.find(a => a.slug === slug);
  if (!article) return null;
  const related = list.filter(a => a.id !== article.id && a.category === article.category).sort(byPublished).slice(0, 3).map(summary);
  return { article, related };
}

export function slugify(str: string) {
  return String(str).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'article';
}

export function uniqueSlug(base: string, list: Article[], ignoreId?: string) {
  let slug = base;
  let n = 2;
  while (list.some(a => a.slug === slug && a.id !== ignoreId)) slug = `${base}-${n++}`;
  return slug;
}

export function readTime(content: string) {
  const words = String(content || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function sanitizeArticle(body: Record<string, unknown>, existing: Partial<Article> = {}) {
  const tags = Array.isArray(body.tags)
    ? body.tags.map(t => str(t, 30)).filter(Boolean).slice(0, 8)
    : str(body.tags, 300).split(',').map(t => t.trim()).filter(Boolean).slice(0, 8);
  const out = {
    title: str(body.title, 200),
    excerpt: str(body.excerpt, 400),
    content: typeof body.content === 'string' ? body.content.slice(0, 100000) : '',
    category: (CATEGORIES as readonly string[]).includes(body.category as string) ? (body.category as string) : 'Tips',
    tags,
    cover: str(body.cover, 500),
    author: str(body.author, 80) || existing.author || 'LaSän Editorial',
    status: (body.status === 'published' ? 'published' : 'draft') as Article['status'],
    featured: Boolean(body.featured),
  };
  if (out.cover && !/^(https?:\/\/|\/uploads\/)/i.test(out.cover)) out.cover = '';
  if (!out.excerpt && out.content) {
    out.excerpt = out.content.replace(/[#>*_`[\]()!-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 180);
  }
  return out;
}

/* ---------- careers ---------- */

export type Application = {
  id: string; name: string; email: string; phone: string; area: string; office: string;
  link: string; about: string; resume: { file: string; name: string } | null; at: string;
};
export type Subscriber = { email: string; at: string };
type Careers = { subscribers: Subscriber[]; applications: Application[] };

export function readCareers(): Careers {
  const d = readJSON<Partial<Careers>>(CAREERS_FILE, {});
  return { subscribers: d.subscribers || [], applications: d.applications || [] };
}
export const writeCareers = (d: Careers) => writeJSON(CAREERS_FILE, d);

/* ---------- files ---------- */

export function saveFile(dir: string, ext: string, buf: Buffer) {
  ensure();
  const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(dir, name), buf);
  return name;
}

export function safeFile(dir: string, name: string) {
  if (!/^[\w.-]+$/.test(name)) return null;
  ensure();
  const full = path.join(dir, name);
  return fs.existsSync(full) ? full : null;
}
