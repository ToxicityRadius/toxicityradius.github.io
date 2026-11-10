export function revealGeometry(rect, width, height) {
 const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
 return {x, y, radius: Math.hypot(Math.max(x, width - x), Math.max(y, height - y))};
}

export function createThemeReveal({doc = document, win = window, button, applyTheme}) {
 let busy = false;
 const prepared = new Map();
 const bounded = (promise, ms) => new Promise(resolve => {
  const timer = win.setTimeout(resolve, ms);
  Promise.resolve(promise).catch(() => {}).finally(() => {win.clearTimeout(timer); resolve();});
 });
 const prepare = theme => {
  const sources = [...new Set([...doc.querySelectorAll('img[data-night-src]')].map(image =>
   theme === 'night' ? image.dataset.nightSrc : image.dataset.daySrc).filter(Boolean))];
  return Promise.all(sources.map(source => {
   if (!prepared.has(source)) {
    const image = new win.Image(); image.src = source;
    prepared.set(source, bounded(image.decode(), 1200));
   }
   return prepared.get(source);
  }));
 };
 return async event => {
  if (busy) return;
  const target = doc.documentElement.dataset.theme === 'night' ? 'day' : 'night';
  const still = event.detail === 0 || win.matchMedia('(prefers-reduced-motion: reduce)').matches ||
   doc.querySelector('.connected-home')?.dataset.motionPaused === 'true';
  if (still || !doc.startViewTransition) {applyTheme(target); return;}
  const root = doc.documentElement;
  busy = true;
  button.disabled = true;
  let transition;
  try {
   await prepare(target);
   doc.dispatchEvent(new win.Event('portfolio:themeprepare'));
   const {x, y, radius} = revealGeometry(button.getBoundingClientRect(), win.innerWidth, win.innerHeight);
   root.style.setProperty('--theme-reveal-x', `${x}px`);
   root.style.setProperty('--theme-reveal-y', `${y}px`);
   root.style.setProperty('--theme-reveal-radius', `${radius}px`);
   root.style.setProperty('--theme-reveal-duration', win.matchMedia('(max-width: 900px)').matches ? '300ms' : '450ms');
   root.dataset.themeReveal = 'active';
   transition = doc.startViewTransition(async () => {
    applyTheme(target);
    // Let the artwork observer swap all three sources before the new snapshot.
    await Promise.resolve();
    await bounded(Promise.all([...doc.querySelectorAll('img[data-night-src]')].map(image => image.decode())), 300);
   });
   await transition.ready;
   await transition.finished;
  } catch {
   transition?.skipTransition();
   applyTheme(target);
  } finally {
   if (transition) await transition.finished.catch(() => {});
   delete root.dataset.themeReveal;
   for (const name of ['x','y','radius','duration']) root.style.removeProperty(`--theme-reveal-${name}`);
   button.disabled = false;
   busy = false;
  }
 };
}
