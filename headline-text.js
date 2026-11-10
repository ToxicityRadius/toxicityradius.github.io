import {animate, splitText, stagger, cubicBezier} from './vendor/anime.esm.min.js';
import {finishEntrance} from './world/animatic/controller.js';

export function initHeadlineText(options = {}) {
 const doc = options.document || document, win = options.window || window;
 const library = {animate, splitText, stagger, cubicBezier, ...options};
 const finish = options.finishEntrance || finishEntrance;
 const Observer = options.MutationObserver || win.MutationObserver;
 const heading = doc.querySelector('.intro h1'), stage = doc.querySelector('.stage');
 if (!heading || !stage) return;
 const shell = doc.querySelector('.connected-home');
 const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
 const phone = win.matchMedia('(max-width:700px)');
 const original = heading.innerHTML;
 let split = null, animation = null, lastPhase, generation = 0;
 const staticView = () => reduced.matches || phone.matches || doc.hidden || shell?.dataset.motionPaused === 'true';

 function restore() {
  generation++;
  const previousAnimation = animation, previousSplit = split;
  animation = split = null;
  previousAnimation?.cancel();
  try { previousSplit?.revert(); }
  catch { heading.innerHTML = original; }
 }
 function settle() { restore(); finish(); }
 function sync() {
  const phase = stage.dataset.textPhase;
  if (phase === lastPhase) return;
  lastPhase = phase;
  restore();
  if (staticView()) { finish(); return; }
  if (phase !== 'reveal') return;
  const current = generation;
  try {
   split = library.splitText(heading, {words: true, lines: false, chars: false, accessible: true});
   animation = library.animate(split.words, {
    opacity: [0, 1], translateY: ['.6em', '0em'], duration: 500,
    delay: library.stagger(45), ease: library.cubicBezier(.23, 1, .32, 1),
    onComplete: () => { if (generation === current) restore(); },
   });
  } catch {
   restore();
   heading.innerHTML = original;
   finish();
  }
 }
 const phaseObserver = new Observer(sync);
 phaseObserver.observe(stage, {attributes: true, attributeFilter: ['data-text-phase']});
 const pauseObserver = new Observer(() => { if (staticView()) settle(); });
 if (shell) pauseObserver.observe(shell, {attributes: true, attributeFilter: ['data-motion-paused']});
 const preference = () => { if (staticView()) settle(); };
 const keydown = event => {
  if (event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])')) return;
  if (['Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) settle();
 };
 const replay = event => {
  if (event.detail !== 0 || !event.target.closest('#intro-control')) return;
  event.stopImmediatePropagation();
  settle();
 };
 reduced.addEventListener('change', preference);
 phone.addEventListener('change', preference);
 doc.addEventListener('visibilitychange', preference);
 doc.addEventListener('keydown', keydown, true);
 doc.addEventListener('click', replay, true);
 win.addEventListener('resize', settle);
 sync();
 return () => {
  restore();
  phaseObserver.disconnect(); pauseObserver.disconnect();
  reduced.removeEventListener('change', preference); phone.removeEventListener('change', preference);
  doc.removeEventListener('visibilitychange', preference);
  doc.removeEventListener('keydown', keydown, true); doc.removeEventListener('click', replay, true);
  win.removeEventListener('resize', settle);
 };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') initHeadlineText();
