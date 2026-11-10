export function initThemeArtwork(doc = document, onChange = () => {}, Observer = MutationObserver) {
 const images = [...doc.querySelectorAll('img[data-night-src]')];
 if (!images.length) return () => {};
 const sync = () => {
  const night = doc.documentElement.dataset.theme === 'night';
  for (const image of images) {
   const source = night ? image.dataset.nightSrc : image.dataset.daySrc;
   if (source && image.getAttribute('src') !== source) image.src = source;
  }
 };
 const recover = event => {
  const image = event.currentTarget;
  if (image.getAttribute('src') !== image.dataset.nightSrc) return;
  image.src = image.dataset.daySrc;
  onChange();
 };
 for (const image of images) image.addEventListener('error', recover);
 sync();
 const observer = new Observer(() => { sync(); onChange(); });
 observer.observe(doc.documentElement, {attributes: true, attributeFilter: ['data-theme']});
 return () => {
  observer.disconnect();
  for (const image of images) image.removeEventListener('error', recover);
 };
}
