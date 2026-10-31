# Current technical requirements — 23 October 2026

The site is a static Node-generated portfolio using existing vanilla HTML/CSS/JavaScript, native links/dialogs/details and locally hosted GSAP. The later explicit text-animation request adds pinned, locally hosted Anime.js 4.5.0 for the main headline only. [Root DESIGN.md](../../DESIGN.md) defines the active painted-valley composition. Preserve source artwork; smaller lossless derivatives may be published with verified dimensions/pixels/alpha. No backend, account, analytics or contact form is added.

Authorized night artwork includes a separate generated backdrop and transparent foreground. `theme-artwork.js` selects saved-theme image sources before the entrance's initial decode, observes the existing root theme attribute for live changes, and falls back to day on a failed night request. Live switches settle entrance playback. Original day URLs remain the native/no-script baseline for the entrance. Manifest assets are copied and validated by the existing build.

The journey uses original local fictional SVG map backgrounds (under 6 KB each) and a small inline route overlay, moved together through one bounded CSS transform. There are no real map coordinates or provider assets. MapLibre and its 25 dependency packages were removed; the build no longer emits its CSS/modules/workers or Earth imagery. The selected map image is decoded lazily near the section; failure restores all HTML chapters. No network map provider, geolocation or API key is used. journey-state.js owns logical canvas coordinates and route curves. Scale is capped at 1.8 desktop/1.4 phone; chapter updates are deduplicated and offscreen desktop updates exit before painting. Map cards have no blur. Existing page choreography remains unchanged.

Production builds clean a verified dist directory, publish explicit local assets and validate references. Development review routes are prepared separately. Archive category state is public URL state (`?category=data-science|web-apps|websites`); All has no category parameter, unrelated query/hash values survive, and no-JS shows all records. Theme state remains local and resilient to unavailable storage.

Essential content and native routes remain usable during pending/failed artwork, without JavaScript, on short screens and under reduced motion. Keyboard/direct/history and paused previews settle immediately. Pointer cameras remain interruptible; reduced-motion pointer entry is opacity-only. See ../VERIFICATION.md for evidence rather than assuming coverage from historical records.

The remainder is a **superseded historical checkpoint**, including old art and hosting status. It does not establish current production behavior or replace root DESIGN.md.

# Historical technical requirements — superseded

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-18  
Scope: Pixel-art town portfolio redesign

## Existing environment and constraints

| Area | Current fact | Evidence / action |
|---|---|---|
| Front end | Vanilla HTML, CSS, JavaScript, and GSAP are the existing approach. | `index.html` loads the existing stylesheet and GSAP scripts; inspect all assets/scripts before edits. |
| Hosting | Existing site is associated with GitHub Pages. Cloudflare Pages project `dexter-soriano-portfolio` has been created; deployment is in progress and unverified. | The current metadata references `toxicityradius.github.io`; keep the old site until migration verification. See `../VERIFICATION.md`. |
| Application services | No backend, form, or analytics is in scope. | Use static pages and direct email/social links. |
| Browser state | Theme choice is stored locally. | Use browser local storage only for the day/night preference; handle unavailable storage with day theme. |

## Architecture and boundaries

Static site: browser loads HTML, CSS, JavaScript and local assets from the static host. No accounts, server endpoints, database, or submitted form data. Case studies should use verified project facts and avoid exposing private ClaimCheck features.

Keep existing project/archive content reachable during redesign. Update domain-dependent canonical and social metadata only after the Cloudflare Pages address exists and is verified.

## Quality requirements

- Preserve semantic HTML, direct links, and a useful experience when animation is unavailable.
- Provide keyboard-operable landmark navigation and visible focus. Respect `prefers-reduced-motion`; essential information cannot depend on motion.
- Support narrow and wide viewports without clipping or requiring hover.
- Produce the town artwork as generated raster source assets; preserve crisp pixel edges with a consistent pixel scale and responsive pixel rendering. Avoid painted or gouache texture.
- Keep site typography as readable HTML text, using Outfit with an appropriate display face; do not render body copy as pixel text or bake essential text into raster artwork.
- Keep dependencies consistent with the existing project unless inspection establishes a need to change them.
- Do not add a backend, analytics, or form merely to support the visual redesign.

Inspect the current implementation before making subsequent changes. Actual local checks and their coverage limits are recorded in `../VERIFICATION.md`; deployment and migration steps are tracked in `IMPLEMENTATION_PLAN.md`.


28 October scrolling update: pinned MIT Lenis 1.3.27 is published locally as vendor/lenis.mjs, lenis.css and license. smooth-scroll.js loads it only for eligible fine-pointer desktop screens, then schedules RAF only while movement is active. An active-time clock prevents an idle gap becoming a scroll jump. Native links/keyboard clicks reset pending inertia before their existing handlers; no anchor destinations are replaced. ScrollTrigger updates follow Lenis scroll events. Native scrolling remains for touch, live reduced motion, shared pause, hidden pages, dialogs and failed loading. The source module is loaded on all generated pages.

Path progress: routeAt(progress) splits the active cubic curve using de Casteljau interpolation, reusing the route controls rather than approximating a straight line or measuring SVG geometry on every scroll frame. Only the partial path and leading-marker transform/visibility update during progress. Phone tween RAF is bounded to 420ms and canceled/replaced by new progress, hidden/preview settling and disposal. Desktop uses the existing scheduled scroll update.

Map polish update: desktop camera centers on exact route geometry, with bounded midpoint zoom relief and unchanged stop/final framing. routeAt returns the curve tangent in the same calculation for the directional beacon. Proximity halos, route ribbon and dotted phase reuse scroll/tween updates. Chapter-card arrivals use native bounded 280ms WAAPI on opacity/transform, feature-detected and canceled for direct navigation, pause/reduced motion, hidden/preview/failure and disposal. No new scheduler, filter or dependency was added.
