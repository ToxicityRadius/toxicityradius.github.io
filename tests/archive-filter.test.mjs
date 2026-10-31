import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../script.js', import.meta.url), 'utf8');
function fixture(href = 'https://example.test/projects/?ref=home#shelves') {
  const buttons = ['All', 'Data science', 'Web apps', 'Websites'].map(label => ({
    dataset: { filter: label }, attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    addEventListener(name, callback) { this[name] = callback; },
  }));
  const records = ['Data science', 'Web apps', 'Web apps', 'Websites'].map(category => ({ dataset: { category }, hidden: false }));
  const controls = { hidden: true }, count = {}, listeners = {}, pushes = [];
  const location = { href };
  const history = { state: { preserved: true }, pushState(state, title, url) { pushes.push({ state, url: String(url) }); location.href = String(url); } };
  const document = {
    documentElement: { dataset: {} },
    querySelector(selector) { return selector === '.filters' ? controls : selector === '#project-count' ? count : null; },
    querySelectorAll(selector) { return selector === '[data-filter]' ? buttons : selector === '[data-category]' ? records : []; },
  };
  vm.runInNewContext(source, { document, window: { location, history, addEventListener(name, callback) { listeners[name] = callback; } }, URL });
  return { buttons, records, controls, count, location, listeners, pushes };
}

test('deep link selects category, counts records and enables the enhancement without moving focus', () => {
  const f = fixture('https://example.test/projects/?category=web-apps&ref=home#shelves');
  assert.deepEqual(f.records.map(record => record.hidden), [true, false, false, true]);
  assert.equal(f.buttons[2].attributes['aria-pressed'], 'true');
  assert.equal(f.count.textContent, '2 projects');
  assert.equal(f.controls.hidden, false);
  assert.equal(f.pushes.length, 0);
});

test('selection preserves unrelated query and hash, pushes changes once and omits All', () => {
  const f = fixture();
  f.buttons[3].click();
  assert.equal(f.location.href, 'https://example.test/projects/?ref=home&category=websites#shelves');
  assert.equal(f.count.textContent, '1 project');
  assert.equal(f.pushes[0].state.preserved, true);
  f.buttons[3].click();
  assert.equal(f.pushes.length, 1);
  f.buttons[0].click();
  assert.equal(f.location.href, 'https://example.test/projects/?ref=home#shelves');
  assert.equal(f.count.textContent, '4 projects');
});

test('Back and Forward restore records, pressed state and count without adding history', () => {
  const f = fixture();
  f.buttons[1].click();
  f.location.href = 'https://example.test/projects/?ref=home#shelves';
  f.listeners.popstate();
  assert.equal(f.buttons[0].attributes['aria-pressed'], 'true');
  assert.equal(f.count.textContent, '4 projects');
  f.location.href = 'https://example.test/projects/?ref=home&category=data-science#shelves';
  f.listeners.popstate();
  assert.equal(f.buttons[1].attributes['aria-pressed'], 'true');
  assert.equal(f.count.textContent, '1 project');
  assert.equal(f.pushes.length, 1);
});

test('unknown categories leave the complete archive visible', () => {
  const f = fixture('https://example.test/projects/?category=unknown');
  assert.equal(f.records.some(record => record.hidden), false);
  assert.equal(f.buttons[0].attributes['aria-pressed'], 'true');
  f.buttons[0].click();
  assert.equal(f.pushes.length, 0, 'selecting the active fallback must not add history');
});
