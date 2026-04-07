/* ── app.js — Juan Ortega personal site ─────────────────── */

(function () {
    'use strict';

    const lang = document.documentElement.lang || 'en';
    const isES = lang === 'es';

    /* ── Theme ──────────────────────────────────────────── */
    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = t === 'light' ? '☾' : '☀';
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }

    /* ── Mobile menu ────────────────────────────────────── */
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            const nav = document.getElementById('main-nav');
            if (!nav) return;
            const open = nav.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', open);
            hamburger.classList.toggle('is-open', open);
        });
    }

    /* ── Scroll reveal ──────────────────────────────────── */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ── Scroll spy ─────────────────────────────────────── */
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const spyObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const a = document.querySelector(`.main-nav a[href="#${e.target.id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => spyObs.observe(s));

    /* ── Scroll progress bar ────────────────────────────── */
    const prog = document.getElementById('scroll-progress');
    if (prog) {
        window.addEventListener('scroll', () => {
            const h = document.documentElement;
            prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
        }, { passive: true });
    }

    /* ── Back to top ────────────────────────────────────── */
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            btt.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
    }

    /* ── Typing animation ───────────────────────────────── */
    const phrases = isES
        ? ['sistemas escalables', 'equipos de alto impacto', 'organizaciones AI-native', 'cultura de ingeniería']
        : ['scalable systems', 'high-impact teams', 'AI-driven orgs', 'engineering culture'];

    const typedEl = document.getElementById('typed-word');
    if (typedEl) {
        let pi = 0, ci = phrases[0].length, deleting = false;
        function type() {
            const word = phrases[pi];
            if (!deleting) {
                typedEl.textContent = word.slice(0, ++ci);
                if (ci === word.length) { deleting = true; setTimeout(type, 2200); return; }
            } else {
                typedEl.textContent = word.slice(0, --ci);
                if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
            }
            setTimeout(type, deleting ? 55 : 85);
        }
        setTimeout(type, 3000);
    }

    /* ── Copy email ─────────────────────────────────────── */
    // Email assembled at runtime — not in raw HTML
    const ep = ['juan.ortega', '.saceda', '@gmail', '.com'];
    const email = ep.join('');

    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.classList.add('copied');
                setTimeout(() => copyBtn.classList.remove('copied'), 2000);
            });
        });
    }

    // Populate email display spans so it's not in raw HTML
    document.querySelectorAll('[data-email]').forEach(el => {
        if (el.tagName === 'A') {
            el.href = 'mailto:' + email;
            el.textContent = email;
        } else {
            el.textContent = email;
        }
    });

    /* ── Contact form → Web3Forms ───────────────────────── */
    const CONTACT_ENDPOINT = '/api/contact'; // proxied → n8n webhook

    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = isES ? 'Enviando…' : 'Sending…';

            const payload = {
                name:    document.getElementById('name').value,
                email:   document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const res  = await fetch(CONTACT_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                if (data.success) {
                    form.reset();
                    showStatus('success', isES
                        ? '✓ Mensaje enviado. Te respondo pronto.'
                        : '✓ Message sent. I\'ll get back to you soon.');
                } else {
                    throw new Error(data.message || 'Error');
                }
            } catch {
                showStatus('error', isES
                    ? 'Error al enviar. Escríbeme directamente a juan.ortega.saceda@gmail.com'
                    : 'Send failed. Email me directly at juan.ortega.saceda@gmail.com');
            } finally {
                btn.disabled = false;
                btn.textContent = isES ? 'Enviar mensaje' : 'Send Message';
            }
        });
    }

    function showStatus(type, msg) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = 'form-status form-status--' + type;
        formStatus.hidden = false;
        setTimeout(() => { formStatus.hidden = true; }, 6000);
    }
}());
