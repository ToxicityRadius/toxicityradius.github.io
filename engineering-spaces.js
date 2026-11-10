// Native details keep the toolbox and pinned notes usable without JavaScript.
// This enhancement gives their summaries explicit action labels in every state.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => document.querySelector('.experience-shell')?.dataset.motionPaused === 'true';
  document.querySelectorAll('.engineering-drawer, .engineering-note').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    const label = summary.innerText.replace(/\+/g, '').trim().replace(/\s+/g, ' ');
    let pointerToggle = false;
    let timer;
    const stop = () => { clearTimeout(timer); details.dataset.iconMotion = 'instant'; };
    summary.addEventListener('click', event => {
      stop();
      pointerToggle = event.detail > 0 && !reduced.matches && !paused();
      if (pointerToggle) details.dataset.iconMotion = 'pointer';
    });
    summary.addEventListener('keydown', () => { pointerToggle = false; stop(); });
    const sync = () => {
      summary.setAttribute('aria-label', `${details.open ? 'Close' : 'Open'}: ${label}`);
      if (pointerToggle) timer = setTimeout(stop, 140); else stop();
      pointerToggle = false;
    };
    reduced.addEventListener('change', () => { if (reduced.matches) stop(); });
    document.addEventListener('portfolio:motionchange', event => { if (event.detail?.paused) stop(); });
    details.addEventListener('toggle', sync);
    sync();
  });
})();
