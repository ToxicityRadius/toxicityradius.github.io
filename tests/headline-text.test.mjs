import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile(new URL('../headline-text.js', import.meta.url), 'utf8'))
 .replace(/^import .*;\r?\n/gm, '').replace('export function', 'function');

function fixture({phase = 'waiting', phone = false, reduced = false, paused = false, hidden = false, failure} = {}) {
 const listeners = new Map(), observers = [], animations = [], splits = [];
 const target = name => ({
  addEventListener(type, callback) { listeners.set(`${name}:${type}`, callback); },
  removeEventListener(type) { listeners.delete(`${name}:${type}`); },
 });
 const original = 'Curious enough to ask.<br><span class="marker hero-marker">Ready to build.</span>'; 
 const heading = {innerHTML: original};
 const stage = {dataset: {textPhase: phase}};
 const shell = {dataset: {motionPaused: String(paused)}};
 const media = {phone: {...target('phone'), matches: phone}, reduced: {...target('reduced'), matches: reduced}};
 const document = {...target('document'), hidden,
  querySelector(selector) { return {'.intro h1': heading, '.stage': stage, '.connected-home': shell}[selector]; },
 };
 const window = {...target('window'), matchMedia(query) { return query.includes('max-width') ? media.phone : media.reduced; }};
 const notify = element => observers.filter(observer => observer.element === element).forEach(observer => observer.callback());
 let finishes = 0;
 const dependencies = {
  document, window,
  MutationObserver: class {
   constructor(callback) { this.callback = callback; observers.push(this); }
   observe(element, options) { this.element = element; this.options = options; }
   disconnect() { this.element = null; }
  },
  finishEntrance() { finishes++; stage.dataset.textPhase = 'settled'; },
  splitText(element, options) {
   element.innerHTML = '<span aria-hidden="true">split words</span><span>accessible clone</span>';
   if (failure === 'split') throw Error('split failed');
   const split = {options, words: [1, 2, 3, 4, 5, 6, 7], reverted: 0,
    revert() { this.reverted++; element.innerHTML = original; },
   };
   splits.push(split); return split;
  },
  animate(words, options) {
   if (failure === 'animate') throw Error('animate failed');
   const animation = {words, options, cancelled: 0, cancel() { this.cancelled++; }};
   animations.push(animation); return animation;
  },
  stagger(value) { return value; },
  cubicBezier(...values) { return values; },
 };
 const context = vm.createContext({...dependencies, document: undefined, window: undefined});
 vm.runInContext(`${source}\nglobalThis.start = initHeadlineText;`, context);
 const dispose = context.start(dependencies);
 return {heading, stage, shell, media, document, original, animations, splits, observers, dispose,
  get finishes() { return finishes; },
  phase(value) { stage.dataset.textPhase = value; notify(stage); },
  pause() { shell.dataset.motionPaused = 'true'; notify(shell); },
  emit(name, type, event = {}) { listeners.get(`${name}:${type}`)?.(event); },
 };
}

test('fresh desktop reveals words once and restores semantic heading including br', () => {
 const f = fixture();
 assert.equal(f.splits.length, 0);
 f.phase('reveal'); f.phase('reveal');
 assert.equal(f.animations.length, 1);
 assert.equal(JSON.stringify(f.splits[0].options), JSON.stringify({words: true, lines: false, chars: false, accessible: true}));
 const animation = f.animations[0];
 assert.equal(animation.options.duration, 500);
 assert.equal(animation.options.delay, 45);
 assert.equal(JSON.stringify(animation.options.translateY), JSON.stringify(['.6em', '0em']));
 assert.equal(animation.words, f.splits[0].words);
 animation.options.onComplete();
 assert.equal(f.heading.innerHTML, f.original);
 assert.equal(f.splits[0].reverted, 1);
 assert.equal(animation.cancelled, 1);
 assert.equal(JSON.stringify(f.observers[0].options.attributeFilter), '["data-text-phase"]');
});

test('settled visits and static contexts never split the heading', () => {
 for (const options of [{phase: 'settled'}, {phone: true}, {reduced: true}, {paused: true}, {hidden: true}]) {
  const f = fixture(options);
  if (options.phase !== 'settled') f.phase('reveal');
  assert.equal(f.splits.length, 0);
  assert.equal(f.heading.innerHTML, f.original);
 }
});

test('pointer replay resets a partial reveal; stale completion cannot revert the next reveal', () => {
 const f = fixture({phase: 'reveal'});
 const previous = f.animations[0];
 f.phase('waiting');
 assert.equal(previous.cancelled, 1);
 assert.equal(f.heading.innerHTML, f.original);
 f.phase('reveal');
 previous.options.onComplete();
 assert.equal(f.splits[1].reverted, 0);
 f.phase('settled');
 assert.equal(f.splits[1].reverted, 1);
 assert.equal(f.heading.innerHTML, f.original);
});

test('pause, resize, visibility and reduced-motion changes cancel and settle immediately', () => {
 const actions = [f => f.pause(), f => f.emit('window', 'resize'),
  f => { f.document.hidden = true; f.emit('document', 'visibilitychange'); },
  f => { f.media.reduced.matches = true; f.emit('reduced', 'change'); }];
 for (const action of actions) {
  const f = fixture({phase: 'reveal'});
  action(f);
  assert.equal(f.animations[0].cancelled, 1);
  assert.equal(f.heading.innerHTML, f.original);
  assert.equal(f.stage.dataset.textPhase, 'settled');
  f.document.hidden = false; f.emit('document', 'visibilitychange');
  f.phase('settled');
  assert.equal(f.animations.length, 1);
 }
});

test('navigation keys settle parent opacity without preventing native keys or editing input', () => {
 const f = fixture({phase: 'reveal'});
 f.emit('document', 'keydown', {key: 'ArrowLeft', target: {closest: () => true}, preventDefault() { assert.fail(); }});
 assert.equal(f.finishes, 0);
 f.emit('document', 'keydown', {key: 'Tab', target: {closest: () => false}, preventDefault() { assert.fail(); }});
 assert.equal(f.finishes, 1);
 assert.equal(f.heading.innerHTML, f.original);
});

test('keyboard replay settles and blocks the replay handler; pointer replay remains available', () => {
 const f = fixture();
 let stopped = 0;
 const click = detail => ({detail, target: {closest: () => true}, stopImmediatePropagation() { stopped++; }});
 f.emit('document', 'click', click(1));
 assert.equal(f.finishes, 0);
 f.emit('document', 'click', click(0));
 assert.equal(f.finishes, 1);
 assert.equal(stopped, 1);
 assert.equal(f.animations.length, 0);
});

test('split or animation failures restore original markup and settle the entrance', () => {
 for (const failure of ['split', 'animate']) {
  const f = fixture({phase: 'reveal', failure});
  assert.equal(f.heading.innerHTML, f.original);
  assert.equal(f.finishes, 1);
 }
});

test('disposing a partial reveal cancels, reverts and removes observers and handlers', () => {
 const f = fixture({phase: 'reveal'});
 f.dispose();
 assert.equal(f.heading.innerHTML, f.original);
 assert.equal(f.animations[0].cancelled, 1);
 assert.equal(f.observers.every(observer => observer.element === null), true);
 f.emit('window', 'resize');
 assert.equal(f.finishes, 0);
});
