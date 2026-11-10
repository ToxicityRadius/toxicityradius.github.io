import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { renderEngineeringSpaces } from '../scripts/engineering-spaces.mjs';
import { projects, evidence } from '../scripts/portfolio-content.mjs';

const html = renderEngineeringSpaces(projects, evidence, '→');
const details = [...html.matchAll(/<details class="([^"]+)">([\s\S]*?)<\/details>/g)];
const drawers = details.filter(([, name]) => name === 'engineering-drawer');
const notes = details.filter(([, name]) => name === 'engineering-note');
const source = await readFile(new URL('../engineering-spaces.js', import.meta.url), 'utf8');

function disclosure({ reduced = false, paused = false } = {}) {
  const events = {}, summaryEvents = {}, documentEvents = {};
  const summary = { innerText: 'Web systems +', attributes: {}, setAttribute(name, value) { this.attributes[name] = value; }, addEventListener(name, callback) { summaryEvents[name] = callback; } };
  const drawer = { dataset: {}, open: false, querySelector() { return summary; }, addEventListener(name, callback) { events[name] = callback; } };
  const preference = { matches: reduced, addEventListener(name, callback) { this.change = callback; } };
  let timer;
  vm.runInNewContext(source, {
    window: { matchMedia: () => preference },
    document: { querySelectorAll: () => [drawer], querySelector: () => ({ dataset: { motionPaused: String(paused) } }), addEventListener(name, callback) { documentEvents[name] = callback; } },
    setTimeout(callback, delay) { assert.equal(delay, 140); timer = callback; return 1; },
    clearTimeout() { timer = undefined; },
  });
  const toggle = (detail) => {
    if (detail !== undefined) summaryEvents.click({ detail });
    drawer.open = !drawer.open;
    events.toggle();
  };
  return { drawer, summary, preference, documentEvents, summaryEvents, toggle, settle: () => timer?.() };
}

test('pointer toggle rotates only the icon while native content opens and closes immediately', () => {
  const f = disclosure();
  f.toggle(1);
  assert.equal(f.drawer.open, true);
  assert.equal(f.drawer.dataset.iconMotion, 'pointer');
  assert.equal(f.summary.attributes['aria-label'], 'Close: Web systems');
  f.settle();
  assert.equal(f.drawer.dataset.iconMotion, 'instant');
  f.toggle(1);
  assert.equal(f.drawer.open, false);
  assert.equal(f.drawer.dataset.iconMotion, 'pointer');
});

test('keyboard, programmatic, paused and reduced disclosures update instantly', () => {
  for (const options of [{}, { reduced: true }, { paused: true }]) {
    const f = disclosure(options);
    f.toggle(options.reduced || options.paused ? 1 : 0);
    assert.equal(f.drawer.dataset.iconMotion, 'instant');
    assert.equal(f.drawer.open, true);
  }
  const f = disclosure();
  f.toggle(1);
  f.toggle();
  assert.equal(f.drawer.dataset.iconMotion, 'instant');
  f.toggle(1);
  f.summaryEvents.keydown();
  assert.equal(f.drawer.dataset.iconMotion, 'instant');
});

test('pause and reduced motion changes cancel a running icon transition', () => {
  const f = disclosure();
  f.toggle(1);
  f.documentEvents['portfolio:motionchange']({ detail: { paused: true } });
  assert.equal(f.drawer.dataset.iconMotion, 'instant');
  f.toggle(1);
  f.preference.matches = true;
  f.preference.change();
  assert.equal(f.drawer.dataset.iconMotion, 'instant');
});

test('three toolbox categories connect each real project to its own actual technologies', () => {
  assert.equal(drawers.length, 3);
  const categories = ['Web systems', 'Developer tooling', 'Evidence workflows'];
  for (const [index, project] of projects.entries()) {
    const content = drawers[index][2];
    assert.ok(content.includes(`<strong>${categories[index]}</strong>`));
    const renderedTech = [...content.matchAll(/<li>(.*?)<\/li>/g)].map(([, tech]) => tech);
    assert.deepEqual(renderedTech, project.tech);
    assert.ok(content.includes(`href="/projects/${project.slug}/" data-project-open="${project.slug}"`));
  }
  assert.match(drawers[2][2], /illustrative fixtures; live inference is disabled/);
});

test('technology lists derive from project input rather than a second copied inventory', () => {
  const changed = projects.map((project, index) => ({ ...project, tech: [`Input technology ${index}`] }));
  const rendered = renderEngineeringSpaces(changed, evidence, '→');
  const lists = [...rendered.matchAll(/<ul aria-label="[^"]+ technologies">([\s\S]*?)<\/ul>/g)];
  assert.deepEqual(lists.map(([, list]) => list), changed.map(project => `<li>${project.tech[0]}</li>`));
});

test('personal desk preserves verified roles and separates past and present dates', () => {
  assert.match(html, /<dt>Supreme Student Council President<\/dt><dd>T\.I\.P\. Manila · 2025–2026 · Past role<\/dd>/);
  assert.match(html, /<dt>Globe Digital Thumbprint Program<br>Campus Ambassador Head<\/dt><dd>April 2025–Present<\/dd>/);
  assert.match(html, /Computer Engineering student at T\.I\.P\. Manila/);
});

test('desk uses only the existing portrait photograph', async () => {
  const desk = html.slice(html.indexOf('<div class="engineering-desk">'));
  const imageSources = [...desk.matchAll(/<img[^>]+src="([^"]+)"/g)].map(([, src]) => src);
  assert.deepEqual(imageSources, ['/images/about-portrait.jpg']);
  await access(new URL('../images/about-portrait.jpg', import.meta.url));
  assert.doesNotMatch(desk, /<svg|background-image|draggable=/);
});

test('drawers and project notes retain native disclosure and navigation without JavaScript', () => {
  assert.equal(details.length, 6);
  assert.equal(notes.length, projects.length);
  for (const [, , content] of details) {
    assert.match(content, /^<summary>[\s\S]+<\/summary>/);
    assert.match(content, /href="\/projects\/[^/]+\/" data-project-open="[^"]+"/);
    assert.doesNotMatch(content, /\shidden(?:\s|=|>)|\sinert(?:\s|=|>)|tabindex="-1"|onclick=/);
  }
  for (const [index, project] of projects.entries()) {
    assert.ok(notes[index][2].includes(project.decisions[0][0]));
    assert.ok(notes[index][2].includes(project.decisions[0][1]));
  }
  assert.equal((html.match(/id="toolbox"/g) || []).length, 1);
  assert.equal((html.match(/id="about"/g) || []).length, 1);
});
