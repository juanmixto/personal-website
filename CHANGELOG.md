# Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

- Profile photo pending
- Certifications section pending (data needed from user)

## [1.3.0] – 2026-04-07 — Security Hardening

### Security fixes
- **HSTS** added: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- **CSP strengthened**: full `Content-Security-Policy` with `default-src 'self'`, `script-src 'self'`, `style-src 'self'`, `font-src 'self'`, `object-src 'none'`, `form-action 'none'`
- **Server version hidden**: `server_tokens off` — header now shows `nginx` without version
- **Permissions-Policy** added: blocks camera, microphone, geolocation, payment, USB
- **Inline JS removed**: all `onclick=` handlers moved to `addEventListener` in `app.js`
- **Email obfuscated**: address assembled at runtime in JS, absent from raw HTML
- **Rate limiting**: `limit_req_zone` 30r/m per IP with burst of 20
- **X-XSS-Protection** removed (deprecated header, no longer needed)

### Refactor
- All page JS consolidated into `assets/js/app.js` (single external file, both EN & ES)

## [1.2.0] – 2026-04-07

### Added
- Self-hosted Inter font (48KB WOFF2 variable font, no Google Fonts dependency)
- JSON-LD Person structured data (EN & ES) for Google rich results
- Language auto-detect on index.html (redirects ES browsers to /es/)
- Open-to-work banner with green pulse dot below header
- Scroll progress bar (gradient line at top of page)
- Typing animation cycling through phrases in hero headline
- Custom 404 page with branded design
- Gzip compression in nginx (CSS: ~28KB → ~7KB)
- Cache-Control headers: 1 year for assets, no-cache for HTML

### Changed
- nginx.conf: added gzip, cache headers, custom error_page 404
- index.html: replaced meta-refresh with JS language detection + noscript fallback

## [1.1.0] – 2026-04-07

### Added
- Favicon SVG with "JO" initials
- `robots.txt` and `sitemap.xml` with hreflang
- Open Graph + Twitter Card meta tags (EN & ES)
- Canonical URL meta tags + hreflang link tags
- Skip-to-content link (keyboard / screen reader accessibility)
- Scroll spy: active nav link highlights current section
- Mobile hamburger menu (nav was hidden on small screens)
- Hero scroll arrow with bounce animation
- Back-to-top button (appears after 500px scroll)
- Copy-to-clipboard button on email contact link
- LinkedIn URL linked to real profile

### Fixed
- Nav links now hidden behind hamburger on mobile instead of disappearing

---

## [1.0.0] – 2026-04-07

### Added
- Full site redesign: executive dark/light mode theme
- Bilingual support: English (`/en/`) and Spanish (`/es/`)
- Sections: Hero, About, Leadership, AI & Innovation, Experience, Skills, Contact
- Scroll-reveal animations via Intersection Observer
- Theme toggle (dark/light) with localStorage persistence
- Contact form using mailto
- Responsive layout (mobile + desktop)
- Git repository initialised and pushed to GitHub
- nginx MIME types fix (CSS was served as `application/octet-stream`)
- Authelia bypass configured for public domain

### Fixed
- CSS path changed from absolute (`/assets/…`) to relative (`../assets/…`) for correct loading from subdirectories
- Authelia was blocking all static assets including stylesheets
