import {readFileSync} from 'node:fs';

export const valleyAssets = JSON.parse(readFileSync(new URL('./valley-assets.json', import.meta.url), 'utf8'));
export const valleyUrl = source => {
 const asset = valleyAssets.find(asset => asset.source === source);
 if (!asset) throw new Error(`Unknown valley asset: ${source}`);
 return '/world/animatic/' + asset.file;
};

export function useValleyAssets(html) {
 for (const asset of valleyAssets) html = html.replaceAll('/world/animatic/' + asset.source, valleyUrl(asset.source));
 return html
  .replace('class="plate"', `class="plate" fetchpriority="high" data-day-src="${valleyUrl('backplate.png')}" data-night-src="${valleyUrl('backplate-night.png')}"`)
  .replace('class="foreground"', `class="foreground" data-day-src="${valleyUrl('foreground.png')}" data-night-src="${valleyUrl('foreground-night.png')}"`);
}
