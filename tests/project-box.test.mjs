import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { renderProjectBox } from '../scripts/project-box.mjs';
import { projects, evidence } from '../scripts/portfolio-content.mjs';
const source = await readFile(new URL('../project-box.js', import.meta.url), 'utf8');
function fixture({ reduced = false, coarse = false, paused = false } = {}) {
  const listeners = {};
  const media = [];
  const box = { dataset: {}, classList: { add() {} }, addEventListener(name, fn) { listeners[name] = fn; } };
  let intersection;
  let disconnected = false;
  class IntersectionObserver {
    constructor(callback) { intersection = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  }
  const documentListeners = {};
  let settle;
  const frames = [];
  vm.runInNewContext(source, {
    window: { matchMedia(query) { const item = { matches: query.includes('reduced') ? reduced : coarse, addEventListener() {} }; media.push(item); return item; }, IntersectionObserver },
    IntersectionObserver,
    clearTimeout() { settle = undefined; },
    setTimeout(callback, delay) { assert.equal(delay, 420); settle = callback; return 1; },
    requestAnimationFrame(callback) { frames.push(callback); },
    document: { querySelectorAll: () => [box], querySelector: () => ({ dataset: { motionPaused: String(paused) } }), addEventListener(name, fn) { documentListeners[name] = fn; } },
  });
  return { box, listeners, documentListeners, intersection, frame: () => frames.shift()?.(), settle: () => settle?.(), get disconnected() { return disconnected; } };
}

test('wood box opens on visibility and never intercepts project navigation', () => {
  const f = fixture();
  assert.equal(f.box.dataset.open, undefined);
  f.intersection([{ isIntersecting: true }]);
  assert.equal(f.box.dataset.open, 'true');
  assert.equal(f.box.dataset.revealState, 'revealing');
  f.settle();
  assert.equal(f.box.dataset.revealState, 'settled');
  f.intersection([{ isIntersecting: true }]);
  assert.equal(f.box.dataset.revealState, 'settled');
  assert.equal(f.disconnected, true);
  assert.equal(f.listeners.click, undefined);
});

test('keyboard and pointer access bypass the reveal sequence immediately', () => {
  for (const event of ['focusin', 'pointerdown']) {
    const f = fixture();
    f.listeners[event]();
    assert.equal(f.box.dataset.open, 'true');
    assert.equal(f.box.dataset.revealState, 'settled');
  }
});

test('focus during reveal settles every card immediately and cancels the reveal timer', () => {
  const f = fixture();
  f.intersection([{ isIntersecting: true }]);
  f.listeners.focusin();
  assert.equal(f.box.dataset.revealState, 'settled');
  assert.equal(f.box.dataset.revealImmediate, 'true');
  f.frame();
  assert.equal(f.box.dataset.revealImmediate, 'true');
  f.frame();
  assert.equal(f.box.dataset.revealImmediate, undefined);
  f.settle();
  assert.equal(f.box.dataset.revealState, 'settled');
});

test('reduced motion, touch and global pause start in a complete direct state', () => {
  for (const options of [{ reduced: true }, { coarse: true }, { paused: true }]) {
    const f = fixture(options);
    assert.equal(f.box.dataset.open, 'true');
  }
  const f = fixture();
  f.documentListeners['portfolio:motionchange']({ detail: { paused: true } });
  assert.equal(f.box.dataset.open, 'true');
  assert.equal(f.box.dataset.motionPaused, 'true');
});

test('renderer keeps all three truthful evidence cards available without JavaScript', () => {
  const html = renderProjectBox(projects, evidence, '→');
  assert.equal((html.match(/<article /g) || []).length, 3);
  assert.equal((html.match(/<img /g) || []).length, 3);
  assert.equal((html.match(/data-project-open=/g) || []).length, 3);
  for (const project of projects) {
    assert.ok(html.includes(`href="/projects/${project.slug}/" data-project-open="${project.slug}"`));
    assert.ok(html.includes(evidence[project.slug].caption));
  }
  assert.match(html, /Co-creator &amp; major contributor/);
  assert.doesNotMatch(html, /\binert\b|aria-hidden="true"[^>]*data-project-card|<article[^>]*\bhidden/);
});

