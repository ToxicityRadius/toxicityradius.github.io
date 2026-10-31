(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shallow = window.matchMedia('(max-width: 760px), (pointer: coarse)');
  document.querySelectorAll('[data-project-box]').forEach(box => {
    let observer;
    let revealed = false;
    let settleTimer;
    const reveal = (immediate = false) => {
      if (revealed && !immediate) return;
      revealed = true;
      clearTimeout(settleTimer);
      box.dataset.revealState = immediate ? 'settled' : 'revealing';
      if (immediate) {
        box.dataset.revealImmediate = 'true';
        requestAnimationFrame(() => requestAnimationFrame(() => { delete box.dataset.revealImmediate; }));
      }
      box.dataset.open = 'true';
      observer?.disconnect();
      if (!immediate) settleTimer = setTimeout(() => { box.dataset.revealState = 'settled'; }, 420);
    };
    const syncMotion = () => {
      const paused = document.querySelector('.experience-shell')?.dataset.motionPaused === 'true';
      box.dataset.motionPaused = String(paused);
      if (paused || reducedMotion.matches || shallow.matches) reveal(true);
    };
    box.classList.add('is-enhanced');
    box.addEventListener('focusin', () => reveal(true));
    // Navigation is handled by the shared project router. Never delay a click.
    box.addEventListener('pointerdown', () => reveal(true));
    document.addEventListener('portfolio:motionchange', event => {
      box.dataset.motionPaused = String(Boolean(event.detail?.paused));
      if (event.detail?.paused) reveal(true);
    });
    reducedMotion.addEventListener('change', syncMotion);
    shallow.addEventListener('change', syncMotion);
    syncMotion();
    if (!revealed && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) reveal();
      }, { threshold: 0.15 });
      observer.observe(box);
    } else reveal(true);
  });
})();
