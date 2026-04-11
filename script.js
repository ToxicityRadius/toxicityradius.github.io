(function () {
  'use strict';

  /* ─── Utility ─── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  const GH_CACHE_KEY = 'portfolio-gh-stats-v1';
  const GH_CACHE_TTL_MS = 10 * 60 * 1000;

  function getCachedJson(key, ttlMs) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.ts || !parsed.data) return null;
      if (Date.now() - parsed.ts > ttlMs) return null;
      return parsed.data;
    } catch (_err) {
      return null;
    }
  }

  function setCachedJson(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: data }));
    } catch (_err) {
      // Ignore storage failures (private mode/quota).
    }
  }

  /* ─── Particle Canvas ─── */
  function initParticles() {
    const canvas = qs('#particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const COUNT = isMobile ? 35 : 75;
    const MAX_DIST = 140;

    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function createParticles() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          vx: rand(-0.22, 0.22),
          vy: rand(-0.22, 0.22),
          r: rand(2.1, 3.8),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(72, 149, 239, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(72, 149, 239, 0.28)';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
  }

  /* ─── Typing Effect ─── */
  function initTyping() {
    const el = qs('#changing-subtext');
    if (!el) return;

    const phrases = ['Data Science Major', 'ML & CV Engineer', 'Frontend Developer', 'Problem Solver', 'Lifelong Learner'];
    let idx = 0;

    function type(text, i, cb) {
      if (i <= text.length) {
        el.textContent = text.slice(0, i) + '|';
        setTimeout(() => type(text, i + 1, cb), 85);
      } else {
        el.textContent = text;
        setTimeout(cb, 1400);
      }
    }

    function erase(text, i, cb) {
      if (i >= 0) {
        el.textContent = text.slice(0, i) + '|';
        setTimeout(() => erase(text, i - 1, cb), 42);
      } else {
        el.textContent = '';
        cb();
      }
    }

    function loop() {
      type(phrases[idx], 0, () => {
        erase(phrases[idx], phrases[idx].length, () => {
          idx = (idx + 1) % phrases.length;
          setTimeout(loop, 250);
        });
      });
    }

    loop();
  }

  /* ─── GSAP Animations ─── */
  function initAnimations() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero cascade on load
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-badge',       { opacity: 0, y: 24, duration: 0.65, delay: 0.15 })
      .from('.hero-name',        { opacity: 0, y: 48, duration: 0.85 }, '-=0.35')
      .from('.hero-spec',        { opacity: 0, y: 16, duration: 0.55 }, '-=0.55')
      .from('.hero-role',        { opacity: 0, y: 24, duration: 0.65 }, '-=0.4')
      .from('.hero-tagline',     { opacity: 0, y: 20, duration: 0.6  }, '-=0.45')
      .from('.hero-socials',     { opacity: 0, y: 20, duration: 0.6  }, '-=0.4')
      .from('.hero-cta',         { opacity: 0, y: 20, duration: 0.6  }, '-=0.4')
      .from('.hero-scroll-hint', { opacity: 0, duration: 0.5          }, '-=0.2')
      .from('.hero-image-wrap',  { opacity: 0, scale: 0.8, duration: 0.9, ease: 'power2.out' }, '-=1');

    if (typeof ScrollTrigger === 'undefined') return;

    // About section
    gsap.from('.about-image-frame', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, x: -50, duration: 0.85, ease: 'power2.out'
    });
    gsap.from('.about-text-col > *', {
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
      opacity: 0, y: 28, duration: 0.7, ease: 'power2.out', stagger: 0.14
    });

    // Education
    gsap.from('.timeline-item', {
      scrollTrigger: { trigger: '.timeline', start: 'top 82%' },
      opacity: 0, x: -36, duration: 0.75, ease: 'power2.out', stagger: 0.2
    });

    // Skills bento
    gsap.from('.bento-card', {
      scrollTrigger: { trigger: '.bento-grid', start: 'top 82%' },
      opacity: 0, y: 36, duration: 0.7, ease: 'power2.out', stagger: 0.1
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 0, y: 28, duration: 0.7, ease: 'power2.out'
      });
    });

    // Footer brand
    gsap.from('.footer-brand, .footer-contacts, .footer-social', {
      scrollTrigger: { trigger: 'footer', start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.65, ease: 'power2.out', stagger: 0.12
    });

    // Projects
    gsap.from('.project-card', {
      scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
      opacity: 0, y: 36, duration: 0.7, ease: 'power2.out', stagger: 0.12
    });

    // Interactive project lab
    gsap.from('.lab-list, .lab-view', {
      scrollTrigger: { trigger: '.lab-layout', start: 'top 82%' },
      opacity: 0, y: 30, duration: 0.75, ease: 'power2.out', stagger: 0.12
    });

    // Experience
    gsap.from('.exp-card', {
      scrollTrigger: { trigger: '.exp-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', stagger: 0.08
    });

    // Certifications
    gsap.from('.cert-card', {
      scrollTrigger: { trigger: '.cert-grid', start: 'top 82%' },
      opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', stagger: 0.1
    });

    // GitHub stats
    gsap.from('.github-profile-card, .github-langs-card', {
      scrollTrigger: { trigger: '.github-stats-wrap', start: 'top 85%' },
      opacity: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.15
    });
  }

  /* ─── GitHub Stats ─── */
  function animateCount(el, target) {
    if (!el || typeof target !== 'number') return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
  }

  function initGitHubStats() {
    const username = 'ToxicityRadius';
    const colors = {
      JavaScript: '#f7df1e', Python: '#3572A5', HTML: '#e34c26',
      CSS: '#563d7c', Java: '#b07219', TypeScript: '#2b7489',
      'C++': '#f34b7d', C: '#555555', PHP: '#777bb4'
    };

    function renderUser(data) {
      const avatar = qs('#github-avatar');
      if (avatar && data.avatar_url) avatar.src = data.avatar_url;
      animateCount(qs('#gh-repos'), data.public_repos || 0);
      animateCount(qs('#gh-followers'), data.followers || 0);
    }

    function renderRepos(repos) {
      if (!Array.isArray(repos)) return;

      const totalStars = repos.reduce(function (sum, r) { return sum + (r.stargazers_count || 0); }, 0);
      animateCount(qs('#gh-stars'), totalStars);

      const langCounts = {};
      repos.forEach(function (r) {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      });

      const sorted = Object.entries(langCounts)
        .sort(function (a, b) { return b[1] - a[1]; })
        .slice(0, 5);

      const total = sorted.reduce(function (s, e) { return s + e[1]; }, 0);
      const langsEl = qs('#gh-langs');
      if (!langsEl || !sorted.length) return;

      langsEl.textContent = '';
      sorted.forEach(function (entry) {
        const lang = entry[0];
        const count = entry[1];
        const pct = Math.round(count / total * 100);
        const color = colors[lang] || '#8a8a8a';

        const item = document.createElement('div');
        item.className = 'github-lang-item';

        const header = document.createElement('div');
        header.className = 'github-lang-header';

        const name = document.createElement('span');
        name.className = 'github-lang-name';

        const dot = document.createElement('span');
        dot.className = 'github-lang-dot';
        dot.style.background = color;
        name.appendChild(dot);
        name.appendChild(document.createTextNode(lang));

        const pctEl = document.createElement('span');
        pctEl.className = 'github-lang-pct';
        pctEl.textContent = pct + '%';

        header.appendChild(name);
        header.appendChild(pctEl);

        const bar = document.createElement('div');
        bar.className = 'github-lang-bar';
        const fill = document.createElement('div');
        fill.className = 'github-lang-bar-fill';
        fill.style.width = pct + '%';
        fill.style.background = color;
        bar.appendChild(fill);

        item.appendChild(header);
        item.appendChild(bar);
        langsEl.appendChild(item);
      });
    }

    function renderFallback(message) {
      const reposEl = qs('#gh-repos');
      const starsEl = qs('#gh-stars');
      const followersEl = qs('#gh-followers');
      const langsEl = qs('#gh-langs');

      if (reposEl && reposEl.textContent === '—') reposEl.textContent = 'N/A';
      if (starsEl && starsEl.textContent === '—') starsEl.textContent = 'N/A';
      if (followersEl && followersEl.textContent === '—') followersEl.textContent = 'N/A';
      if (langsEl && !langsEl.children.length) {
        langsEl.textContent = message;
      }
    }

    const cached = getCachedJson(GH_CACHE_KEY, GH_CACHE_TTL_MS) || {};

    if (cached.user) {
      renderUser(cached.user);
    } else {
      fetch('https://api.github.com/users/' + username)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (data) {
          renderUser(data);
          const current = getCachedJson(GH_CACHE_KEY, Number.MAX_SAFE_INTEGER) || {};
          current.user = data;
          setCachedJson(GH_CACHE_KEY, current);
        })
        .catch(function () { renderFallback('GitHub stats are temporarily unavailable.'); });
    }

    if (cached.repos) {
      renderRepos(cached.repos);
    } else {
      fetch('https://api.github.com/users/' + username + '/repos?per_page=100&sort=updated')
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (repos) {
          renderRepos(repos);
          const current = getCachedJson(GH_CACHE_KEY, Number.MAX_SAFE_INTEGER) || {};
          current.repos = repos;
          setCachedJson(GH_CACHE_KEY, current);
        })
        .catch(function () { renderFallback('GitHub languages are temporarily unavailable.'); });
    }
  }

  /* ─── Interactive Project Lab ─── */
  function initProjectLab() {
    const section = qs('#projects');
    if (!section) return;

    const listEl = section.querySelector('.lab-list');
    const items = section.querySelectorAll('.lab-item');
    const badgeEl = qs('#lab-badge');
    const titleEl = qs('#lab-title');
    const descEl = qs('#lab-desc');
    const stackEl = qs('#lab-stack');
    const iframeEl = qs('#lab-embed');
    const fallbackEl = qs('#lab-fallback');
    const repoLinkEl = qs('#lab-repo-link');
    const secondaryLinkEl = qs('#lab-secondary-link');

    if (!items.length || !badgeEl || !titleEl || !descEl || !stackEl || !iframeEl || !fallbackEl || !repoLinkEl || !secondaryLinkEl) {
      return;
    }

    let loadTimeout = null;
    let loadToken = 0;

    function showFallback(show) {
      fallbackEl.hidden = !show;
      iframeEl.style.visibility = show ? 'hidden' : 'visible';
    }

    function renderStack(stack) {
      const tags = (stack || '')
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean);

      stackEl.innerHTML = '';
      tags.forEach(function (tag) {
        const tagEl = document.createElement('span');
        tagEl.className = 'lab-stack-tag';
        tagEl.textContent = tag;
        stackEl.appendChild(tagEl);
      });
    }

    function setSecondaryLink(label, href) {
      secondaryLinkEl.href = href || '#';
      secondaryLinkEl.textContent = label || 'Open Link';

      const iconEl = document.createElement('i');
      iconEl.className = 'fa-solid fa-arrow-right';
      iconEl.setAttribute('aria-hidden', 'true');
      secondaryLinkEl.appendChild(document.createTextNode(' '));
      secondaryLinkEl.appendChild(iconEl);
    }

    function getEmbedPolicy(url) {
      if (!url || url.charAt(0) === '#') {
        return { allow: false, timeoutMs: 0 };
      }

      try {
        const parsed = new URL(url, window.location.origin);
        const host = parsed.hostname.toLowerCase();

        const blockedHosts = [
          'github.com',
          'www.github.com',
          'project-unite.onrender.com'
        ];

        const trustedHosts = [
          'dbms-s1.github.io',
          'nbviewer.org',
          'www.nbviewer.org'
        ];

        if (blockedHosts.indexOf(host) !== -1) {
          return { allow: false, timeoutMs: 0 };
        }

        if (trustedHosts.indexOf(host) !== -1) {
          return { allow: true, timeoutMs: 8000 };
        }

        return { allow: true, timeoutMs: 5500 };
      } catch (_err) {
        return { allow: false, timeoutMs: 0 };
      }
    }

    function activate(item) {
      const data = item.dataset;

      items.forEach(function (btn) {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      });
      item.classList.add('is-active');
      item.setAttribute('aria-pressed', 'true');

      badgeEl.textContent = data.label || 'Project';
      titleEl.textContent = data.title || 'Project Preview';
      descEl.textContent = data.desc || '';
      renderStack(data.stack || '');

      repoLinkEl.href = data.repo || '#';
      setSecondaryLink(data.secondaryLabel || 'Open Link', data.secondary || '#');

      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }

      const embedUrl = data.embed || '';
      loadToken += 1;
      const token = loadToken;

      const embedPolicy = getEmbedPolicy(embedUrl);

      if (!embedPolicy.allow) {
        iframeEl.removeAttribute('src');
        showFallback(true);
        return;
      }

      showFallback(false);

      iframeEl.onload = function () {
        if (token !== loadToken) return;
        if (loadTimeout) {
          clearTimeout(loadTimeout);
          loadTimeout = null;
        }
        showFallback(false);
      };

      iframeEl.onerror = function () {
        if (token !== loadToken) return;
        if (loadTimeout) {
          clearTimeout(loadTimeout);
          loadTimeout = null;
        }
        showFallback(true);
      };

      loadTimeout = setTimeout(function () {
        if (token !== loadToken) return;
        showFallback(true);
      }, embedPolicy.timeoutMs || 5500);

      iframeEl.src = embedUrl;
    }

    function handleActivationFromEventTarget(target) {
      const item = target.closest('.lab-item');
      if (!item || !section.contains(item)) return;
      activate(item);
    }

    if (listEl) {
      listEl.addEventListener('click', function (event) {
        handleActivationFromEventTarget(event.target);
      });

      listEl.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        handleActivationFromEventTarget(event.target);
      });
    } else {
      items.forEach(function (item) {
        item.addEventListener('click', function () {
          activate(item);
        });
      });
    }

    activate(items[0]);

    // "Explore Live" deep-link from project cards
    document.querySelectorAll('.project-link--lab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const card = btn.closest('[data-lab-target]');
        if (!card) return;
        const target = card.dataset.labTarget;
        const matchingItem = Array.from(items).find(function (i) {
          return i.dataset.title === target;
        });
        if (matchingItem) {
          activate(matchingItem);
          const divider = document.querySelector('.lab-divider');
          if (divider) {
            divider.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /* ─── Custom Cursor ─── */
  function initCursor() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const dot  = qs('.cursor-dot');
    const ring = qs('.cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }, { passive: true });

    (function animRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
  }

  /* ─── Navbar ─── */
  function initNavbar() {
    const navbar = qs('#navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    // Active link highlight
    const sections  = document.querySelectorAll('section[id], footer[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('active', isActive);
            if (isActive) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => obs.observe(s));

    // Logo → scroll to top
    qs('#dexter-button')?.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Mobile Menu ─── */
  function initMobileMenu() {
    const hamburger   = qs('#hamburger');
    const mobileMenu  = qs('#mobile-menu');
    const overlay     = qs('#menu-overlay');
    const closeBtn    = qs('#menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    let lastFocused = null;

    function getFocusable() {
      return Array.from(qsa('button, a[href], [tabindex]:not([tabindex="-1"])', mobileMenu))
        .filter(function (el) { return !el.hasAttribute('disabled'); });
    }

    function handleTabTrap(e) {
      if (!mobileMenu.classList.contains('open') || e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function open() {
      lastFocused = document.activeElement;
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
    }

    function close() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    hamburger?.addEventListener('click', () => mobileMenu.classList.contains('open') ? close() : open());
    overlay?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    mobileLinks.forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      handleTabTrap(e);
    });
  }

  function initProjectFilters() {
    const buttons = qsa('.project-filter-btn');
    const cards = qsa('.projects-grid .project-card');
    const count = qs('#project-filter-count');
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
      let visible = 0;
      cards.forEach(function (card) {
        const categoryList = (card.dataset.category || 'other')
          .split(',')
          .map(function (entry) { return entry.trim(); })
          .filter(Boolean);
        const show = filter === 'all' || categoryList.indexOf(filter) !== -1;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          // Prevent stale GSAP inline transforms/opacities after filtering.
          card.style.opacity = '1';
          card.style.transform = 'none';
        }
        if (show) visible += 1;
      });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }

      if (count) {
        const suffix = visible === 1 ? 'project' : 'projects';
        count.textContent = 'Showing ' + visible + ' ' + suffix;
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = button.dataset.filter || 'all';
        buttons.forEach(function (b) {
          const active = b === button;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        applyFilter(filter);
      });
    });

    applyFilter('all');
  }

  function initBackToTop() {
    const button = qs('#back-to-top');
    if (!button) return;

    window.addEventListener('scroll', function () {
      button.classList.toggle('show', window.scrollY > window.innerHeight * 0.65);
    }, { passive: true });

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initCurrentYear() {
    const yearEl = qs('#current-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    function safeInit(fn) {
      try {
        fn();
      } catch (_err) {
        // Keep other UI modules interactive even if one initializer fails.
      }
    }

    [
      initParticles,
      initTyping,
      initCursor,
      initNavbar,
      initMobileMenu,
      initProjectFilters,
      initBackToTop,
      initCurrentYear,
      initProjectLab,
      initGitHubStats
    ].forEach(safeInit);

    window.addEventListener('load', initAnimations);
  });
})();
