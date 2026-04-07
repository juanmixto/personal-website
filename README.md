# Juan Ortega – Personal Website

Personal website for Juan Ortega, Engineering Leader / Head of Engineering. Bilingual (EN/ES), dark/light mode, static HTML + CSS + vanilla JS.

🔗 **Live:** https://mypage.traeficserver.duckdns.org

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS |
| Fonts | Inter via Google Fonts |
| Web server | nginx:alpine (Docker container) |
| Reverse proxy | Traefik v2 with Let's Encrypt |
| Auth | Authelia (bypassed for this domain) |
| Hosting | Self-hosted, DuckDNS |

---

## Project structure

```
my_personal_web/
├── index.html              # Redirect → /en/index.html
├── en/
│   └── index.html          # English version
├── es/
│   └── index.html          # Spanish version
└── assets/
    ├── css/
    │   └── style.css       # All styles (dark/light mode, responsive)
    └── img/                # Images (currently empty)
```

---

## Sections

- **Hero** — Headline, subheadline, CTA buttons
- **About** — Professional story + stats cards
- **Leadership** — 4 pillars (Teams, Org Design, Continuous Improvement, Business Impact)
- **AI & Innovation** — 3 cards on AI in engineering
- **Experience** — 3 roles with achievement bullets
- **Skills** — 4 groups of skill tags
- **Contact** — mailto form + LinkedIn link

---

## Running locally

No build step needed. Just open the file in a browser:

```bash
# Option 1 — direct file
open en/index.html

# Option 2 — local server (recommended, avoids relative path issues)
python3 -m http.server 8080
# then visit http://localhost:8080/en/
```

---

## Deployment

The site is served via a Docker container defined in `/opt/docker/my_personal_web/`.

```bash
# Rebuild / restart container
cd /opt/docker/my_personal_web
docker compose up -d

# Reload nginx after config changes (no downtime)
docker exec my_personal_web nginx -s reload
```

Content changes in `/srv/www/my_personal_web/` are live immediately — the directory is mounted read-only into the container.

---

## Making changes

### Update content
Edit `en/index.html` and/or `es/index.html` directly. Changes are live on save (no build step).

### Update styles
Edit `assets/css/style.css`. Both language versions share the same stylesheet.

### Commit and push
```bash
git add .
git commit -m "brief description of change"
git push
```

---

## Key config files

| File | Purpose |
|------|---------|
| `/opt/docker/my_personal_web/docker-compose.yml` | Container definition + Traefik labels |
| `/opt/docker/my_personal_web/nginx.conf` | nginx config (MIME types, security headers) |
| `/opt/docker/authelia/config/configuration.yml` | Auth rules — this domain is set to `bypass` |

---

## Pending

- [ ] Add LinkedIn profile URL (currently `href="#"` in both EN and ES)
- [ ] Add profile photo to `assets/img/`
- [ ] Add favicon
