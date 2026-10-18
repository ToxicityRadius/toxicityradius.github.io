# Asset sources

## Town artwork
Generated with the built-in ChatGPT image tool on October 18, 2026. The earlier painted variant was abandoned after the user requested pixel art; it is not included in this site. Day and night assets were converted to lossless WebP without changing their geometry.

### Day prompt
Production website hero background: original cozy imaginative town in authentic premium PIXEL ART, crisp square pixels, limited harmonious palette, meticulous 16-bit adventure game environment art. Wide panoramic 1536x1024 landscape. No smooth painterly rendering, no gradients, no anti-aliased edges. Entire image pixel art with visibly chunky 3-4 px blocks. Warm pale cream-blue sky occupies top 38%, sparse blocky clouds, distant teal mountains. Lower 62% contains three clear buildings connected by cobblestone paths and gardens: left x24% cream campus with orange roof and clock tower, center x50% red-roof artisan repair workshop with green door, right x76% cozy library with sage roof and tall windows. Foreground stream with tiny stone bridge, flowers, pine and leafy trees. Beautiful carefully composed detailed environment, cozy nostalgic discovery, saturated but refined sage/coral/honey palette, sunny daytime. Clear separable building silhouettes for website clickable hotspots. View slightly elevated from front, not isometric. No text, no lettering, no UI, no characters, no watermarks. Flat pixel color clusters and dithered shadows, rich environmental details. Actual artwork asset, not website mockup.

### Night edit prompt
Change ONLY the time of day of this exact pixel-art town to cozy nighttime. Preserve exact pixel dimensions, every building position shape and scale, paths, bridge, trees, lake, mountain silhouettes and composition. Use deep indigo and teal night colors, tiny pixel stars in the dark blue sky and a small crescent moon, warm golden illuminated windows and street lanterns casting subtle light on paths. Keep all original pixel-art edges crisp. No added buildings, no text, no UI, no watermarks. This is an exactly aligned alternate state for a website day/night crossfade, so geometry must stay unchanged.

## Project evidence
- `images/advising-demo.webp`: existing Student Advising Portal demo dashboard capture from the user's October 2 presentation deliverable. Alex Reyes / DEMO-2026 and academic values are fictional demo data; the visible caption states this.
- `images/formproof-report.webp`: existing recorded FormProof report from the project's Remotion preview assets. Historical static-state-01 evidence, not a new evaluation or WCAG certification. The image and caption retain that distinction.
- `images/claimcheck-sample.jpg`: browser capture of https://claimcheck.pages.dev/results on October 18, 2026. Public sample, illustrative judgments, no live inference claim.
- Portraits: retained from the existing user-owned portfolio repository.

## Fonts and animation dependencies
- Outfit and Fraunces: self-hosted files downloaded from Google Fonts. License text in `fonts/`; source families https://github.com/google/fonts/tree/main/ofl/outfit and https://github.com/google/fonts/tree/main/ofl/fraunces.
- GSAP and ScrollTrigger 3.12.2: locally hosted copies of the existing site's dependency, from jsDelivr. Original license banners preserved in `vendor/`.
