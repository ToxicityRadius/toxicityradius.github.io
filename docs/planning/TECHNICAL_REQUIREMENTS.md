# Technical requirements

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
