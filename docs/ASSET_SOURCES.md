## Original fictional story map — 28 October 2026

images/journey/story-map.svg and story-map-night.svg contain original geometric road, park and river shapes authored for this request. No actual locations, third-party imagery or geographic data are used. Both are 1800×1400 SVGs, 8,794 bytes by day and 8,823 bytes by night, with the approved park/crossroads/bridge/open-road route and original roof-edge, offset-shadow and tree-map details. The route is original SVG geometry in journey-state.js. The abandoned real-geography flat-map assets were removed; historical NASA sources below remain unshipped artifacts.

# Asset sources

## Historical geographic journey — 27 October 2026 (superseded)

- Map renderer: MapLibre GL JS 6.16.0 from its npm release, BSD-3-Clause; license published at /vendor/maplibre/LICENSE.txt. Official examples: https://maplibre.org/maplibre-gl-js/docs/examples/display-buildings-in-3d/ and globe examples. Build changes only sibling .mjs module filename references to .js for static preview compatibility.
- Live vector geography: https://tiles.openfreemap.org/styles/liberty and https://tiles.openfreemap.org/planet, sourced from OpenStreetMap/OpenMapTiles. Required credit is supplied through MapLibre's always-expanded attribution control. https://openfreemap.org/ and https://www.openstreetmap.org/copyright describe service/license terms. The renderer is free of API keys; this is not a service-availability guarantee.
- Earth imagery: NASA GIBS BlueMarble_ShadedRelief via https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg. Credit: NASA Earth Observatory. Displayed only at low zoom, fading into geographic vector data. https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/ describes the dataset family.
- Local fallback texture: images/journey/earth-nasa.png, downloaded without pixel changes from https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.png; NASA Visible Earth/Blue Marble. This is an Earth texture, not a Manila satellite street layer.
- Coordinates: P. Casal [120.9877957,14.5953397] and Arlegui [120.9905617,14.596151] from OpenStreetMap records surfaced by Photon; OSM ways 174249109 and 90964087. Globe Tower chapter uses the average vertex coordinate [121.0498207,14.55343915] of OSM way 35826310 (Globe Telecom Headquarters), retrieved via https://www.openstreetmap.org/api/0.6/way/35826310/full. The first Photon Globe Tower result was a bus stop and was rejected as the chapter location. Public addresses/context were cross-checked with T.I.P.'s institutional flyer and Globe's reports; Dexter confirmed the campus/chapter mapping and Globe role. Footprints/heights are provider data, not surveyed building models. The OSM headquarters record itself can be incomplete; no photorealism or exact height guarantee is made.
- Data check: output/geographic-data-check.json records successful vector requests around the three areas (97, 97 and 190 building features in their containing tiles); positive render_height fields can contain provider defaults and do not establish measured height. Current endpoint snapshots are evidence, not permanent version pinning of remote map data.
- The generated illustrated-atlas concept was set aside when Dexter requested the geographic globe. It is not integrated or published.

## Night valley and foreground — 27 October 2026

User requested a generated night-mode background. Created with the built-in image generation tool as a lighting/weather edit of the original `review/animatic/backplate.webp`, without website UI. [Candidate PNG](../output/artwork/valley-night-v1.png), [full prompt](../output/artwork/valley-night-v1-prompt.md). Moonlit blue landscape, stars, warm existing-window lighting and river reflections; visually reviewed against the original valley. Output is 1671×941, 2,835,970 bytes, SHA-256 `e4cd09a6c58d0a0696ce95656640367bf0fe73d8e47ded245dd6bce2d6ce0bca`.

Dexter subsequently authorized using the background and requested a matching night version of the left foreground tree and wall. Generated the foreground with the built-in image tool using the original transparent `review/animatic/foreground.webp` as the edit target and the night background as the lighting reference. [Full foreground prompt](../output/artwork/foreground-night-v1-prompt.md). Source is `review/animatic/foreground-night.png`: 1672×941 RGBA, 804,316 bytes; center alpha confirmed 0. Original canvases were copied unchanged from generated outputs. The background is now `review/animatic/backplate-night.png`.

Production uses lossless `backplate-night.webp` (2,126,130 bytes) and `foreground-night.webp` (575,596 bytes), registered in scripts/valley-assets.json. The existing authoring encoder verified identical decoded RGBA bytes/dimensions between each generated PNG and WebP; it did not recolor, crop or resize the generated images. [Dimensions, sizes and source/encoded SHA-256](../output/artwork/night-assets.json). Original daytime art and generated PNGs remain retained.

Both night layers are now integrated into the local website, including theme selection and the entrance animation. Generated imagery is not a pixel-identical recolor of the day art; the night background is one pixel narrower. Desktop visual checks confirmed close landmark alignment and foreground framing; see VERIFICATION.md for exact rendered evidence and limits. No production publication is implied.

## Active painted valley — 23 October 2026

The active artwork is the existing painted countryside scene under `review/animatic/`: `backplate.png`, the transparent `foreground.png`, and six transparent `clouds/soft-*.png` sprites. These are the user-approved local source assets reused by the connected homepage and journey; no new artwork is introduced in the reliability pass. The old pixel-art direction below is historical and does not describe the active site. The exact original generation prompt for the active painted set is not established by this record.

Lossless optimized derivatives preserve the dimensions, decoded pixels and alpha of the source images. Original PNGs and standalone review sources remain available. The build selects the smaller verified format and publishes only the production asset set. See the optimization manifest and current verification record for exact byte counts and checks.

## Historical pixel-town artwork — superseded
Generated with the built-in ChatGPT image tool on October 18, 2026 for a previous direction. Day and night assets were converted to lossless WebP without changing their geometry. These historical assets remain in source for continuity; they are excluded from the current production bundle.

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
- Anime.js 4.5.0: pinned npm package requested by the user for the hero word reveal. The build copies its official minified ESM bundle and MIT license locally under `vendor/`; no runtime CDN request. The package's original copyright/license banner is preserved.
- Bricolage Grotesque: genuine variable WOFF2 downloaded on 24 October 2026 from the designer's official repository at commit `84745e5b96261ae5f8c6c856e262fe78d1d6efdd`: [original variable font](https://raw.githubusercontent.com/ateliertriay/bricolage/84745e5b96261ae5f8c6c856e262fe78d1d6efdd/fonts/webfonts/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.woff2). Self-hosted unchanged as `fonts/bricolage-grotesque.woff2` (204,636 bytes; SHA-256 `b51a8ebd169637e47cb7db430431ab3e122d2f09b03ee2a03ea06f4cb46f1a8e`). The font contains weight 200–800, optical size 12–96, and width 75–100 axes; the site uses weights 600–800 for headings. The author's [SIL OFL 1.1 license](https://raw.githubusercontent.com/ateliertriay/bricolage/84745e5b96261ae5f8c6c856e262fe78d1d6efdd/OFL.txt) is included as `fonts/BricolageGrotesque-OFL.txt` and copied into production. No runtime font service is required.
- Outfit: existing self-hosted Google Fonts file retained for body text at weight 400, with `fonts/Outfit-OFL.txt`; [source family](https://github.com/google/fonts/tree/main/ofl/outfit).
- Fraunces: historical self-hosted Google Fonts file and `fonts/Fraunces-OFL.txt` remain in source for continuity; they are excluded from the production font copy list and preloads. [Source family](https://github.com/google/fonts/tree/main/ofl/fraunces).
- GSAP and ScrollTrigger 3.12.2: locally hosted copies of the existing site's dependency, from jsDelivr. Original license banners preserved in `vendor/`.


Lenis 1.3.27: pinned npm distribution from darkroomengineering/lenis, MIT license copied into dist/vendor/lenis-LICENSE.txt; module and CSS are served locally. Smooth-wheel settings are based on the saved James source at output/reference-study-2026-10-27/james-home.html:6040–6044; current integration contract checked against the official repository README and installed package source on 28 October 2026.


29 October paper/town update: original jagged seam silhouette is embedded as an SVG mask in connected-home.css; no James image was copied. Reference technique is recorded in saved James HTML line265 (repeating tear image). Original fictional town blocks/lanes were added to the two existing map SVGs, with night colors raised for legibility. Narrative labels derive from the existing five chapter themes; they do not assert real locations.


Soft edge correction, 29 October 2026: inspected https://www.jameschugh.com/v2/h/tear.png (saved reference-only at output/reference-study-2026-10-27/james-tear-reference.png, 2400×150). It shows broad shallow changes and tiny irregular fibers. Production uses original images/paper/torn-edge.svg, generated from independently chosen wide contour anchors and deterministic fine edge points; no reference pixels copied. Static mask is 2400px wide desktop, 1800px phone, serving local theme-colored paper.


29 October linework correction: story-map.svg and story-map-night.svg now contain only original transparent street paths and two thin river-bank outlines, 1,351 bytes each. The prior filled-town artwork is superseded by this explicit request. No reference image or provider data used.


29 October preview clarification supersedes linework: detailed original map geometry restored from the earlier local authoring recipe, with only the canvas-sized land rectangle omitted. CSS restores the solid land backdrop for actual travel and removes it in compact preview. Current day/night SVG sizes: 8,768/8,797bytes.


Expanded preview, 29 October 2026: images/journey/preview-surround.svg is original abstract fictional street/plot linework (1600×900, 1791bytes), served locally for preview-only surroundings. No provider data, reference pixels or real-place content.


Continuous-town correction, 29 October 2026: preview-surround.svg is superseded and excluded from production. Original town-preview.svg (26,554 bytes) and town-preview-night.svg (26,583 bytes) contain matching-scale streets and muted buildings around the exact original central town geometry. Both use a 2400×1800 canvas and static outward SVG mask, only in compact previews. No geographic data, third-party imagery or reference pixels. Actual travel retains story-map.svg and story-map-night.svg.


Preview rollback, 29 October 2026: continuous-town assets are no longer used or shipped. Production again uses original preview-surround.svg for faint outer preview linework alongside the existing story-map assets.


Outer-backdrop clarification, 29 October 2026: preview-surround.svg is no longer referenced or shipped. Only the existing central story-map assets are used.
