import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPhotoWall } from '../scripts/photo-wall.mjs';

const photos = Array.from({ length: 6 }, (_, index) => ({ src: `/images/moment-${index}.jpg`, width: 1200, height: 900, alt: `Photo ${index}`, caption: `Moment ${index}` }));

test('empty gallery shows six honest noninteractive placeholders; incomplete records stay omitted', () => {
  for (const input of [undefined, []]) {
    const html = renderPhotoWall(input);
    assert.equal((html.match(/class="photo-wall-placeholder"/g) || []).length, 6);
    assert.doesNotMatch(html, /<a |<dialog|<img/);
    assert.match(html, /Photos from my journey, coming soon\./);
    assert.equal((html.match(/<figcaption>Photo coming soon<\/figcaption>/g) || []).length, 6);
  }
  for (const input of [null, photos.slice(0, 5), [...photos, photos[0]], photos.map((p, i) => i ? p : { ...p, caption: '' })]) assert.equal(renderPhotoWall(input), '');
});

test('photo wall rejects unsafe URLs, missing metadata, dimensions, and duplicates', () => {
  for (const change of [{ src: 'javascript:alert(1)' }, { src: 'https://example.com/photo.jpg' }, { src: '/images/../photo.jpg' }, { src: '/images//photo.jpg' }, { width: 0 }, { height: 2.5 }, { alt: ' ' }, { src: photos[1].src }]) {
    assert.equal(renderPhotoWall(photos.map((p, i) => i ? p : { ...p, ...change })), '');
  }
});

test('six photos retain native full image links and a labelled dialog', () => {
  const html = renderPhotoWall(photos);
  assert.equal((html.match(/data-photo-index=/g) || []).length, 6);
  assert.equal((html.match(/class="photo-wall-row"/g) || []).length, 2);
  for (const [index, photo] of photos.entries()) {
    assert.ok(html.includes(`data-photo-index="${index}" href="${photo.src}"`));
    assert.ok(html.includes(`width="1200" height="900" alt="Photo ${index}"`));
  }
  assert.match(html, /<dialog class="photo-lightbox" aria-labelledby="photo-lightbox-title">/);
  assert.match(html, /class="photo-lightbox-close"/);
});

test('alt text and captions are escaped in the generated markup', () => {
  const html = renderPhotoWall(photos.map((p, i) => i ? p : { ...p, alt: 'A "photo" & <scene>', caption: '<script>"hello"</script> & friends' }));
  assert.ok(html.includes('alt="A &quot;photo&quot; &amp; &lt;scene&gt;"'));
  assert.ok(html.includes('&lt;script&gt;&quot;hello&quot;&lt;/script&gt; &amp; friends'));
  assert.doesNotMatch(html, /<script>/);
});
