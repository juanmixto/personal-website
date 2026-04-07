# Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

- Profile photo pending

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
