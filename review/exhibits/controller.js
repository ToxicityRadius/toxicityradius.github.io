export function initWorkshopStages(exhibit, doc = document) {
  const get = selector => exhibit.querySelector(selector);
  const previous = get('#previous-stage'), next = get('#next-stage'), summary = get('#repair-summary');
  const stages = [...exhibit.querySelectorAll('.repair-stage')], steps = [...exhibit.querySelectorAll('.repair-progress li')];
  if (![previous, next, summary].every(Boolean) || stages.length !== 4 || steps.length !== 4) return;
  const marker = get('.repair-marker');
  let stage = 0;
  const refresh = () => {
    if (marker) marker.style.transform = `translateX(${steps[stage].offsetLeft}px) scaleX(${steps[stage].offsetWidth})`;
  };
  const setStage = value => {
    stage = Math.max(0, Math.min(stages.length - 1, value));
    stages.forEach((panel, index) => {
      const active = index === stage;
      panel.classList.toggle('is-active', active);
      panel.inert = !active;
      panel.setAttribute('aria-hidden', String(!active));
      steps[index].setAttribute('aria-current', active ? 'step' : 'false');
    });
    previous.setAttribute('aria-disabled', String(stage === 0));
    next.textContent = stage === stages.length - 1 ? 'Replay' : 'Next';
    summary.textContent = `${stage + 1} of ${stages.length} · ${steps[stage].textContent.trim()}`;
    refresh();
  };
  const reset = () => { setStage(0); exhibit.scrollTop = 0; };
  const moveStage = value => {
    exhibit.closest('.exhibit-shell')?.classList.add('is-staging');
    if (value === 0 && stage === stages.length - 1) reset();
    else setStage(value);
    if (stages[stage].getBoundingClientRect().top < 80) stages[stage].scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  previous.addEventListener('click', () => {
    if (exhibit.inert || stage === 0) return;
    moveStage(stage - 1);
  });
  next.addEventListener('click', () => {
    if (exhibit.inert) return;
    moveStage(stage === stages.length - 1 ? 0 : stage + 1);
  });
  setStage(0);
  previous.hidden = next.hidden = false;
  doc.defaultView?.addEventListener('resize', refresh);
  return { reset, getStage: () => stage, refresh };
}

const projectHash = '#project-formproof';

export function initWorkshopExhibit(doc = document, win = window) {
  const get = selector => doc.querySelector(selector);
  const shell = get('.exhibit-shell'), trigger = get('#workshop-trigger'), exhibit = get('#workshop-exhibit');
  const heading = get('#workshop-title'), close = get('#close-workshop'), valley = get('.valley-pane');
  if (![shell, trigger, exhibit, heading, close, valley].every(Boolean)) return;
  const stages = initWorkshopStages(exhibit, doc);
  if (!stages) return;
  let open = false;
  const setOpen = (value, focus = true) => {
    const changed = value !== open;
    open = value;
    shell.dataset.open = String(open);
    trigger.setAttribute('aria-expanded', String(open));
    exhibit.inert = !open;
    exhibit.setAttribute('aria-hidden', String(!open));
    valley.inert = open;
    valley.setAttribute('aria-hidden', String(open));
    if (!open) shell.classList.remove('is-staging');
    if (open && changed) { stages.reset(); }
    if (focus && changed) (open ? heading : trigger).focus({ preventScroll: true });
  };
  const navigate = value => {
    const url = new URL(win.location.href);
    if (value) url.hash = projectHash;
    else if (url.hash === projectHash) url.hash = '';
    if (url.href !== win.location.href) win.history.pushState(win.history.state, '', url.href);
    setOpen(value);
  };
  const syncLocation = () => setOpen(win.location.hash === projectHash);
  setOpen(false, false);
  shell.classList.add('is-enhanced');
  for (const control of [trigger, close]) control.hidden = false;
  trigger.addEventListener('click', () => navigate(true));
  get('.skip-link')?.addEventListener('click', event => { event.preventDefault(); navigate(true); });
  close.addEventListener('click', () => navigate(false));
  doc.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); navigate(false); }
  });
  win.addEventListener('popstate', syncLocation);
  win.addEventListener('hashchange', syncLocation);
  syncLocation();
}
if (typeof document !== 'undefined' && document.querySelector('[data-standalone-workshop]')) initWorkshopExhibit();
