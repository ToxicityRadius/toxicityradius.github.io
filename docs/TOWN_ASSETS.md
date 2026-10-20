# Town artwork and animation assets

Approved static direction: 2026-10-19. Quiet countryside, warm stone, greenery, restrained detail; full town on phones with HTML project links beneath it. Built-in image generation was used, not the API/CLI fallback.

## Current layered experience

After approving the quiet countryside master, the user selected James Chugh's portfolio as an interaction reference for the whole experience while retaining pixel art. The entrance now uses genuinely independent assets, not clipped copies of the flattened master:

- Sky: flat SVG color field and simple pixel clouds; matching header/entrance background.
- `town-hills.webp`: transparent distant horizon, without architecture or foreground.
- `town-terrain.webp`: transparent clean ground plate. Buildings and their shadows are absent; grass is reconstructed behind all three building positions. Paths, bridge, and water remain.
- `town-campus.webp`, `town-workshop.webp`, `town-library.webp`: separate transparent architecture with complete stairs/lower edges. Nested SVG view boxes normalize their source bounds into the shared 1672 × 941 scene coordinates.
- `town-foreground.webp`: transparent near-corner foliage, rocks, and fence fragments.
- `town-traveler.webp`, `town-smoke.webp`: the same generated animation sprites described below.

All eight WebP files are lossless exports of the generated PNG sources. Dimensions and every visible RGBA pixel were compared after encoding with the bundled Sharp runtime; no resizing, color change, alpha cleanup, or additional project dependency was introduced. Combined active image payload: 2,941,636 bytes. PNG sources remain for reproducibility. The approved master remains a reference and social/case-study illustration, but is not an image layer in the entrance.

Independent generation does not guarantee perfect matching pixel grids: source architecture carries faint alpha fringes. Desktop and phone composition review is still necessary after any asset replacement. Shallow scroll travel and overscan prevent exposed canvas edges; mobile and reduced-motion views use the complete static composition.

### Layer generation briefs

All edits referenced `images/town-master-v2.png`, requested genuine transparency, and preserved the approved warm-stone/moss-green palette, chunky pixel shapes, left-lit perspective, and campus/workshop/library mapping. The built-in image tool produced the assets; API/CLI generation was not used.

- Terrain: remove every building, old shadow, skyline, distant hills, and foreground vegetation; reconstruct simple grass behind former building silhouettes. Retain the connecting path, central bridge, and lower stream on the original 16:9 canvas. Transparent above the irregular ground horizon; no architecture residue.
- Hills: retain only the quiet distant blue hills, green fields, small lake, and thin horizon treeline on a transparent 16:9 canvas. No sky, near terrain, buildings, or foreground silhouettes.
- Foreground: sparse dark-moss foliage, stepped banks, rocks, and short fence fragments in the bottom corners; upper area and central stream opening transparent. No town, water, sky, or continuous ground rectangle.
- Buildings: one edit per building, preserving its approved architecture and complete stairs on transparency, without trees, grass, sky, paths, text, or cast ground shadows. Campus: pale stone, terracotta roof, bell/clock tower. Workshop: timber/stone, slate roof, copper chimney, no smoke. Library: pale stone, green roof, book relief.

## Original approved master and sprite sources

- `images/town-master-v2.png`: approved 1672 × 941 daylight master. All scene geometry uses these intrinsic coordinates. This supersedes the old day/night images in generated pages; the old source files remain for recovery.
- `images/town-traveler.png`: transparent 2172 × 724 four-cell strip; each cell is 543 × 724. Rendered strip 216 × 72, frame 54 × 72. Anonymous resident, not a likeness of Dexter.
- `images/town-smoke.png`: transparent puff, reused with staggered transform/opacity animation.

The preceding ambient-only prototype reused the master through SVG clipping. That implementation was superseded by the independent layers above. Night remains a coordinated color treatment with lighting overlays; it does not swap in a differently composed town. Water uses clipped stepped highlights over the raster stream.

The resident fades in near the campus and out near the library. The route resets only while invisible. The step strip uses four frames over 800ms; the route takes 40 seconds. Water runs a four-step 1.2-second loop, and three smoke puffs repeat every six seconds with two-second offsets. A shared controller pauses every effect for user pause, reduced motion, offscreen placement, or hidden document. Mobile omits resident/smoke but retains water and its pause control.

## Final generation prompts

### Approved master: revision of the initial countryside composition

Edit the town image just generated. KEEP the three-building positions and roles, quiet countryside, connected path and bridge, and 16:9 overall composition. RADICALLY CHANGE the rendering and detail density: redraw as genuine very low resolution 2D pixel game background, only 384x216 effective pixels enlarged with hard nearest-neighbor square blocks. Reduce detail by 80 percent. Every smallest visible feature must be at least 4x4 output pixels. Use only 24-32 solid flat colors; each roof only 3 colors, grass only 3 colors, trees simple 3-shade block clusters. Remove ALL realistic brick textures, intricate roof tiles, flower speckles, realistic clouds, shaded beveled trim and airbrushed lighting. No gradients anywhere: sky is ONE flat pale blue color with 2 simple flat cream clouds. Hills two or three flat stepped silhouettes. Buildings simplified bold silhouettes and flat warm-stone walls with a handful of deliberate pixel marks, chunky dark doorways; campus tower left, timber workshop center, library green roof and book emblem right. Doors and windows simple rectangular or stepped pixel shapes. Simple teal stream with a few straight chunky ripple pixels; one compact bridge. Restrained low-resolution 16-bit era tilemap style rather than high resolution pixel painting. No anti-aliasing. No realistic rendering, no painterly detail. No people, text, UI, labels, smoke, watermark. The priority is intentional low-resolution pixel construction and clean readable shapes, NOT elaborate visual detail.

### Traveler

Create a transparent-background game sprite sheet. Exactly FOUR equal-size cells in ONE horizontal row, wide 4:1 canvas, no other rows, no text, no grid lines. Each cell contains the SAME anonymous countryside traveler in a different successive frame of a side-facing RIGHTWARD walking cycle: left leg forward, legs passing, right leg forward, legs passing. Character identical head, body, outfit, scale across all four cells, feet aligned on precisely same baseline; torso center each cell. Full body, small crisp 16-bit low-resolution pixel art, 24 pixels tall in logical art scaled with hard square pixels, no antialiasing, no soft shadows, no blur, no ground. Warm orange/copper jacket, moss green pants, brown shoes, dark brown hair, warm tan face, modest small satchel. Friendly anonymous adult, no hat. Bold clear silhouette, restrained flat colors, no texture or tiny details. Very important legs and opposite swinging arms change between the FOUR frames; same person same body proportions. All empty space actual alpha transparency. No extra characters, no environment. Keep some identical padding within each cell, no clipping. This will be animated with 4-step sprite translation, so cell centers and foot baseline MUST match.

The generator returned a 3:1 sheet with four cells; rendering follows its actual dimensions rather than distorting it to the requested 4:1 canvas.

### Smoke

One small chimney smoke puff sprite on genuine transparent alpha background, centered full visible, square canvas. Crisp deliberately low-resolution pixel art game sprite using only three flat colors: warm cream, light gray-beige, muted gray. Shape like a small loose curling cloud formed from 6 to 8 chunky square-pixel clusters, asymmetrical, softly rounded in stepped pixel silhouette but NOT blurred. About 24 by 24 logical pixels enlarged with nearest neighbor, no antialiasing or gradients, generous transparent margin. No chimney, no fire, no environment, no ground, no text, no outline, no shadow, no second separate puff. For restrained countryside workshop chimney animation. Transparent areas fully alpha, no checkerboard.
