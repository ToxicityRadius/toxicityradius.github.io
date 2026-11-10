import test from 'node:test';
import assert from 'node:assert/strict';
import {initThemeArtwork} from '../theme-artwork.js';

function fixture(theme = 'day') {
 const root = {dataset: {theme}}, images = ['plate', 'foreground', 'journey'].map(name => ({
  dataset: {daySrc: `/${name}-day.webp`, nightSrc: `/${name}-night.webp`},
  src: `/${name}-day.webp`, listeners: new Map(),
  getAttribute(name) { return this[name]; },
  addEventListener(name, callback) { this.listeners.set(name, callback); },
  removeEventListener(name) { this.listeners.delete(name); },
 }));
 let changes = 0, observer;
 const dispose = initThemeArtwork({documentElement: root, querySelectorAll: () => images}, () => changes++, class {
  constructor(callback) { observer = this; this.callback = callback; }
  observe(target, options) { this.options = options; }
  disconnect() { this.disconnected = true; }
 });
 return {images, root, dispose, get changes() { return changes; }, get observer() { return observer; },
  theme(value) { root.dataset.theme = value; observer.callback(); },
  fail(image) { image.listeners.get('error')?.({currentTarget: image}); },
 };
}

test('saved night theme selects both layers and journey before initial decoding', () => {
 const f = fixture('night');
 assert.deepEqual(f.images.map(image => image.src), ['/plate-night.webp', '/foreground-night.webp', '/journey-night.webp']);
 assert.equal(f.changes, 0, 'initial selection must not cancel the entrance');
 assert.deepEqual(f.observer.options.attributeFilter, ['data-theme']);
});

test('live theme changes switch every artwork layer and settle active playback', () => {
 const f = fixture();
 f.theme('night');
 assert.ok(f.images.every(image => image.src === image.dataset.nightSrc));
 f.theme('day');
 assert.ok(f.images.every(image => image.src === image.dataset.daySrc));
 assert.equal(f.changes, 2);
});

test('a failed night image falls back to day without a repeating error loop', () => {
 const f = fixture('night'), image = f.images[0];
 f.fail(image);
 assert.equal(image.src, image.dataset.daySrc);
 assert.equal(f.changes, 1);
 f.fail(image);
 assert.equal(f.changes, 1);
 assert.equal(f.images[1].src, f.images[1].dataset.nightSrc);
 f.dispose();
 assert.equal(f.observer.disconnected, true);
 assert.equal(image.listeners.size, 0);
});
