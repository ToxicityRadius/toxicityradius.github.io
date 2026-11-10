import test from 'node:test';
import assert from 'node:assert/strict';
import { initWorkshopExhibit, initWorkshopStages } from '../review/exhibits/controller.js';

function fixture({ hash = '', missing = '', shared = false } = {}) {
  const listeners = new Map(), events = {};
  let active;
  const make = () => {
    const handlers = {}, classes = new Set();
    return {
      dataset: {}, attributes: {}, style: {}, hidden: true, inert: false, textContent: '',
      top: 100, scrolls: [],
      getBoundingClientRect() { return { top: this.top }; },
      scrollIntoView(options) { this.scrolls.push(options); },
      classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name), toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); } },
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, listener) { handlers[name] = listener; },
      fire(name, event = {}) { handlers[name]?.(event); },
      focus(options) { active = { element: this, options }; },
    };
  };
  const nodes = Object.fromEntries(['.exhibit-shell', '.skip-link', '.valley-pane', '#workshop-trigger', '#workshop-exhibit', '#workshop-title', '#close-workshop', '#previous-stage', '#next-stage', '#repair-summary', '.repair-marker'].map(selector => [selector, make()]));
  const stages = Array.from({length:4}, make), steps = ['Finding','Review','Change','Verification'].map(label => Object.assign(make(), {textContent:label}));
  steps.forEach((step,index) => { step.offsetLeft = index * 100; step.offsetWidth = 80; });
  const exhibit = nodes['#workshop-exhibit'];
  exhibit.querySelector = selector => selector === missing ? null : nodes[selector];
  exhibit.querySelectorAll = selector => selector === '.repair-stage' ? stages : steps;
  exhibit.closest = () => nodes['.exhibit-shell'];
  const doc = { querySelector: selector => selector === missing ? null : nodes[selector], querySelectorAll: selector => selector === '.repair-stage' ? stages : steps, addEventListener: (name, handler) => { events[name] = handler; } };
  const pushes = [];
  const win = {
    location: new URL(`https://example.test/review/exhibits/?review=1${hash}`),
    history: { state: { keep: true }, pushState(state, _, url) { pushes.push({ state, url }); win.location = new URL(url); } },
    addEventListener: (name, handler) => listeners.set(name, handler),
  };
  const controller = shared ? initWorkshopStages(exhibit, doc) : initWorkshopExhibit(doc, win);
  return { nodes, stages, steps, win, pushes, controller, active: () => active,
    fireKey(key) { let prevented = false; events.keydown?.({ key, preventDefault() { prevented = true; } }); return prevented; },
    navigate(hash, event = 'popstate') { win.location.hash = hash; listeners.get(event)?.(); },
  };
}

function assertStage(f, expected) {
  f.stages.forEach((panel, index) => {
    assert.equal(panel.classList.contains('is-active'), index === expected);
    assert.equal(panel.inert, index !== expected);
    assert.equal(panel.attributes['aria-hidden'], String(index !== expected));
    assert.equal(f.steps[index].attributes['aria-current'], index === expected ? 'step' : 'false');
  });
  assert.match(f.nodes['#repair-summary'].textContent, new RegExp(`^${expected + 1} of 4`));
}

test('open and Escape restore focus and history while the underlying valley is inert', () => {
  const f = fixture(), n = f.nodes;
  assert.equal(n['#workshop-exhibit'].inert, true);
  assert.equal(n['.valley-pane'].inert, false);
  n['#workshop-trigger'].fire('click');
  assert.equal(n['.exhibit-shell'].dataset.open, 'true');
  assert.equal(n['#workshop-trigger'].attributes['aria-expanded'], 'true');
  assert.equal(n['#workshop-exhibit'].inert, false);
  assert.equal(n['.valley-pane'].inert, true);
  assert.equal(n['.valley-pane'].attributes['aria-hidden'], 'true');
  assert.equal(f.active().element, n['#workshop-title']);
  assert.equal(f.active().options.preventScroll, true);
  assert.equal(f.win.location.hash, '#project-formproof');
  assert.equal(f.win.location.search, '?review=1');
  assert.equal(f.fireKey('Escape'), true);
  assert.equal(f.active().element, n['#workshop-trigger']);
  assert.equal(n['.valley-pane'].inert, false);
  assert.equal(n['#workshop-exhibit'].inert, true);
  assert.equal(f.win.location.hash, '');
  assert.equal(f.pushes.length, 2);
  assert.deepEqual(f.pushes[0].state, { keep: true });
  assert.equal(f.fireKey('Escape'), false);
});

test('direct links, Back and hash navigation synchronize without adding history', () => {
  const f = fixture({ hash: '#project-formproof' });
  assert.equal(f.nodes['.exhibit-shell'].dataset.open, 'true');
  assertStage(f, 0);
  f.navigate('');
  assert.equal(f.nodes['#workshop-exhibit'].inert, true);
  f.navigate('#project-formproof', 'hashchange');
  assert.equal(f.nodes['#workshop-exhibit'].inert, false);
  assert.equal(f.pushes.length, 0);
});

test('skip link enters the workshop and focuses its heading', () => {
  const f = fixture(); let prevented = false;
  f.nodes['.skip-link'].fire('click', { preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(f.active().element, f.nodes['#workshop-title']);
  assert.equal(f.win.location.hash, '#project-formproof');
});

test('Next, Previous and Replay select exactly one accessible artifact without navigation', () => {
  const f = fixture({ hash: '#project-formproof' }), n = f.nodes;
  assertStage(f, 0);
  assert.equal(n['#previous-stage'].attributes['aria-disabled'], 'true');
  n['#previous-stage'].fire('click'); assertStage(f, 0);
  for (let index = 1; index < 4; index++) { n['#next-stage'].fire('click'); assertStage(f, index); }
  assert.equal(n['#next-stage'].textContent, 'Replay');
  n['#previous-stage'].fire('click'); assertStage(f, 2);
  n['#next-stage'].fire('click'); n['#next-stage'].fire('click'); assertStage(f, 0);
  assert.equal(n['#next-stage'].textContent, 'Next');
  assert.equal(f.pushes.length, 0);
});

test('hidden controls do not change stages and reopening resets the artifact and scroll', () => {
  const f = fixture(), n = f.nodes;
  n['#next-stage'].fire('click'); assertStage(f, 0);
  n['#workshop-trigger'].fire('click');
  n['#next-stage'].fire('click'); n['#next-stage'].fire('click'); assertStage(f, 2);
  n['#close-workshop'].fire('click');
  assert.equal(n['.exhibit-shell'].classList.contains('is-staging'), false);
  n['#next-stage'].fire('click'); n['#previous-stage'].fire('click'); assertStage(f, 2);
  n['#workshop-exhibit'].scrollTop = 640;
  n['#workshop-trigger'].fire('click');
  assertStage(f, 0);
  assert.equal(n['#workshop-exhibit'].scrollTop, 0);
});

test('stage changes reveal cropped headings on short screens without moving already visible artifacts', () => {
  const f = fixture({ hash: '#project-formproof' }), n = f.nodes;
  f.stages[0].top = 20;
  n['#previous-stage'].fire('click');
  assert.deepEqual(f.stages[0].scrolls, [], 'Previous at the first stage must do nothing');
  f.stages[1].top = 40;
  n['#next-stage'].fire('click');
  assert.deepEqual(f.stages[1].scrolls, [{ block: 'start', behavior: 'instant' }]);
  n['#next-stage'].fire('click');
  assert.deepEqual(f.stages[2].scrolls, [], 'visible heading does not need scrolling');
  n['#previous-stage'].fire('click');
  assert.equal(f.stages[1].scrolls.length, 2, 'Previous also reveals a cropped heading');
  assertStage(f, 1);
});

test('incomplete prototype markup is left unenhanced', () => {
  for (const missing of ['.exhibit-shell', '.valley-pane', '#next-stage']) {
    const f = fixture({ missing });
    assert.equal(f.nodes['.exhibit-shell'].classList.contains('is-enhanced'), false);
  }
  assert.doesNotThrow(() => initWorkshopExhibit({ querySelector: () => null, querySelectorAll: () => [] }, {}));
});


test('shared stage controller retains its place, updates marker geometry and explicitly resets replay', () => {
  const f = fixture({ shared: true }), n = f.nodes;
  n['#next-stage'].fire('click');
  assert.equal(f.controller.getStage(), 1);
  assert.equal(n['.repair-marker'].style.transform, 'translateX(100px) scaleX(80)');
  n['#workshop-exhibit'].inert = true;
  n['#next-stage'].fire('click');
  assertStage(f, 1);
  n['#workshop-exhibit'].inert = false;
  n['#next-stage'].fire('click');
  n['#next-stage'].fire('click');
  n['#workshop-exhibit'].scrollTop = 640;
  n['#next-stage'].fire('click');
  assertStage(f, 0);
  assert.equal(n['#workshop-exhibit'].scrollTop, 0);
  f.steps[0].offsetWidth = 92;
  f.controller.refresh();
  assert.equal(n['.repair-marker'].style.transform, 'translateX(0px) scaleX(92)');
});
