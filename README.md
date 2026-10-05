# LaSän Media Works — website + Studio Console

Next.js 16 (App Router, TypeScript) site for LaSän Media Works, with a password-protected
Studio Console for publishing articles and reviewing careers submissions.

## Run it

```bash
npm install
cp .env.example .env   # then set ADMIN_PASSWORD and SESSION_SECRET
npm run dev            # http://localhost:3000
```

Production: `npm run build && npm start` (uses `PORT` if set).

- Site: `/` · `/about` · `/services` · `/strategy` · `/careers` · `/book-appointment` · `/articles`
- Studio Console: `/admin` (articles + careers inbox)

## Environment variables

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password for the Studio Console. **Required in production.** |
| `SESSION_SECRET` | Signs login cookies. Set a long random string so logins survive restarts. |
| `DATA_DIR` | Folder for `articles.json`, `careers.json`, `uploads/`, `resumes/`. Defaults to `./data`. On Railway, point it at a volume (e.g. `/data`). |
| `SITE_URL` | Public URL used for social sharing previews. |

On first start, if `DATA_DIR` has no `articles.json`, the seed articles from `data/articles.json` are copied in.

## Where things live

```
app/                 Pages (App Router) and API route handlers (app/api/*)
components/          Header (mega menus), Footer, motion effects, forms, shared blocks
lib/content.ts       All site copy (nav, services, strategy, team, testimonials, FAQ…)
lib/store.ts         File storage for articles, careers submissions, uploads, resumes
lib/auth.ts          Admin session cookie + rate limiting
public/admin.html    Studio Console (static page using /api/admin/*)
public/img, video    Photos, team portraits, logo, background videos
```

Contact and enquiry forms (Free Quote, Book Appointment) open WhatsApp or email with the
details filled in. Careers sign-ups and resumes are saved on the server and shown in the
console; resumes are private and only downloadable by a signed-in admin.

## Media credits

Stock photos: Unsplash (Unsplash License). Background videos: Mixkit (Mixkit License).
