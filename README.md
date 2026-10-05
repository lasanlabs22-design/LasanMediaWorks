# LaSän Media Works — website + Studio Console

A fresh rebuild of the LaSän Media Works site (purple + yellow), with a password-protected
admin console. Articles published in the console appear on the live site straight away.

## Run it

```bash
npm install
# Windows PowerShell:  $env:ADMIN_PASSWORD="your-strong-password"; npm start
# macOS / Linux:       ADMIN_PASSWORD="your-strong-password" npm start
```

- Site: http://localhost:3000
- Articles: http://localhost:3000/articles
- Admin console: http://localhost:3000/admin  (default password `lasan-admin` if `ADMIN_PASSWORD` isn't set)

## Environment variables

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password for the admin console. **Set this in production.** |
| `SESSION_SECRET` | Signs login cookies. If unset, a random one is generated each start (everyone gets logged out on restart). |
| `PORT` | Port to listen on (default `3000`). |

## Admin console features

- Write articles in Markdown with a formatting toolbar and Write / Split / Preview modes
- Save as draft or publish; unpublish anytime
- Cover image upload (drag & drop) or paste an image URL; inline images in the article body
- Categories (Tips, Trends, Strategies, Case Studies, News), tags, author, custom URL slug
- Mark one article as **Featured** — it gets the big hero card on the Articles page
- Search and filter by status; Ctrl/Cmd + S to save

## Where things live

```
server.js              Express server, article API, auth, uploads
data/articles.json     Article storage (back this file up!)
public/uploads/        Uploaded images
public/index.html      Home page
public/articles.html   Articles listing (filters + search)
public/article.html    Single article page (/article/<slug>)
public/admin.html      Studio Console
public/css, public/js  Styles and scripts
```

## Deploying

Needs a host that runs Node and keeps files on disk (a VPS, Render/Railway with a persistent
disk, etc.), because articles and uploads are stored in `data/` and `public/uploads/`.
Serverless hosts with read-only filesystems won't keep new articles — swap the JSON store for a
database if you go that route.
