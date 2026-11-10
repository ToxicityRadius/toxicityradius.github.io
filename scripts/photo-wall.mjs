import { photoWallPhotos } from './photo-wall-content.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function isPhoto(photo) {
  if (!photo || typeof photo !== 'object') return false;
  const { src, width, height, alt, caption } = photo;
  if (typeof src !== 'string' || !/^\/images\/[a-zA-Z0-9_/-]+\.(?:avif|webp|jpe?g|png)$/i.test(src) || src.includes('//')) return false;
  return Number.isSafeInteger(width) && width > 0 && Number.isSafeInteger(height) && height > 0
    && typeof alt === 'string' && alt.trim().length > 0
    && typeof caption === 'string' && caption.trim().length > 0;
}

function wire() {
  return `<svg class="photo-wall-wire" viewBox="0 0 1000 470" aria-hidden="true" focusable="false"><path class="photo-wall-cord-shadow" d="M30 50 Q500 170 970 50"/><path class="photo-wall-cord" d="M30 50 Q500 170 970 50"/>${[95, 290, 710, 905].map(x => {
    const t = (x - 30) / 940;
    const y = 50 + 240 * t * (1 - t);
    return `<g transform="translate(${x} ${y.toFixed(2)})"><path class="photo-wall-bulb-drop" d="M0 0v14"/><rect class="photo-wall-bulb-cap" x="-4" y="12" width="8" height="7" rx="1"/><ellipse class="photo-wall-bulb" cy="25" rx="7" ry="10"/></g>`;
  }).join('')}<circle class="photo-wall-nail" cx="30" cy="50" r="4"/><circle class="photo-wall-nail" cx="970" cy="50" r="4"/></svg>`;
}

export function renderPhotoWall(photos = photoWallPhotos) {
  if (!Array.isArray(photos)) return '';
  const pending = photos.length === 0;
  if (!pending && (photos.length !== 6 || !photos.every(isPhoto) || new Set(photos.map(photo => photo.src)).size !== 6)) return '';
  const slots = pending ? Array(6).fill(null) : photos;
  return `<section class="photo-wall" id="photo-wall" aria-labelledby="photo-wall-title"><div class="photo-wall-heading"><h3 id="photo-wall-title">A few moments along the way.</h3><p>${pending ? 'Photos from my journey, coming soon.' : 'Open a photo for a closer look.'}</p></div><div class="photo-wall-gallery" role="group" aria-label="Personal photo gallery" tabindex="0">${[0, 1].map(row => `<div class="photo-wall-row">${wire()}${slots.slice(row * 3, row * 3 + 3).map((photo, column) => photo ? `<a class="photo-wall-photo photo-wall-photo-${column + 1}" data-photo-index="${row * 3 + column}" href="${escape(photo.src)}"><span class="photo-wall-clip" aria-hidden="true"></span><figure><img src="${escape(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${escape(photo.alt)}" loading="lazy" decoding="async"><figcaption>${escape(photo.caption)}</figcaption></figure></a>` : `<div class="photo-wall-photo photo-wall-photo-${column + 1}"><span class="photo-wall-clip" aria-hidden="true"></span><figure><div class="photo-wall-placeholder"><span aria-hidden="true">0${row * 3 + column + 1}</span><span>Photo coming soon</span></div><figcaption>Photo coming soon</figcaption></figure></div>`).join('')}</div>`).join('')}</div>${pending ? '' : `<dialog class="photo-lightbox" aria-labelledby="photo-lightbox-title"><div class="photo-lightbox-panel"><div class="photo-lightbox-toolbar"><h3 id="photo-lightbox-title">Photo viewer</h3><button class="photo-lightbox-close" type="button" aria-label="Close photo">Close<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div><figure><img class="photo-lightbox-image" alt=""><figcaption class="photo-lightbox-caption"></figcaption></figure></div></dialog>`}</section>`;
}
