# Dexter Soriano portfolio

A static portfolio presented as a painted countryside valley, with brief project overlays, a full-screen geographic journey, physical project files, an engineering toolbox, a personal desk, dedicated case studies, and a browsable archive. The site is built with vanilla HTML, CSS, and JavaScript using a small Node.js static-site generator; GSAP is vendored for motion. It has no application backend, contact form, or analytics.

The journey is a completely custom fictional map and winding blue path inspired by James's portfolio. No real locations, streets or geographic coordinates are used for the map; the five chapters retain Dexter's factual biography. Two original SVG map backgrounds are under 6 KB each, selected by theme near the section. The runtime has no WebGL, map engine, workers, live tile traffic, blur or continuous render loop. Desktop retains scroll-driven travel; phones retain chapter links, previous/next and horizontal swipes without intercepting vertical page scrolling. Reduced motion/shared pause switch views immediately, and local image failure restores all five HTML chapters. Actual iPhone FPS remains unmeasured.

The first desktop entrance includes a restrained Anime.js word reveal on the main headline. Anime.js 4.5.0 is pinned in the lockfile and copied locally by the build. Phones, reduced motion, keyboard navigation and interruptions keep the text immediate; paragraphs and navigation stay still.

## Local development

Requires Node.js. From the repository root:

```powershell
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:4173/` for the connected homepage. `/review/experience/` is the older standalone workshop prototype. The build writes the homepage, three case studies, project archive, 404 page, and assets into `dist/`.

Production builds recreate `dist/` from a verified clean target and exclude development reviews. `npm run dev` prepares review routes at startup. If you rebuild while that server is already running, run `npm run prepare:reviews` to restore the review pages; the main portfolio remains available from the running server.

The ten valley images (day/night backdrop and foreground plus six shared cloud sprites) use verified lossless WebP derivatives (9,965,045 → 6,623,860 bytes), listed in `scripts/valley-assets.json`. Theme artwork is selected before entrance decoding and switches with the existing theme control; failed night images fall back to their day counterpart. Ordinary builds need only Node and the existing project dependencies. To regenerate derivatives after deliberately changing the original art, use an existing Python installation with Pillow/WebP support: `python scripts/optimize-valley.py`. The script verifies decoded RGBA pixels/dimensions and keeps PNG wherever WebP is not smaller. Original PNGs are retained.

Run the automated checks with:

```powershell
npm test
```

## Personal photo wall

The hanging-photo wall above the personal desk displays six labeled, noninteractive placeholders. Add real files under `images/` and populate `scripts/photo-wall-content.mjs` with six records: `{src: '/images/filename.jpg', width: 1600, height: 1200, alt: 'Description of the photo', caption: 'Confirmed short caption'}`. Use actual image dimensions, unique local image paths and confirmed captions. All six complete records replace the placeholders and enable the separate keyboard-accessible lightbox; native full-image links remain available without JavaScript. Rebuild after adding them. No stock photos or sample records are published.

## Deployment

The site is deployed on Cloudflare Pages at <https://dexter-soriano-portfolio.pages.dev> (project `dexter-soriano-portfolio`). On 2026-10-18, public GET requests returned HTTP 200 for the homepage, archive, FormProof case study, and deployment-specific URL. The remaining project routes, assets, and GitHub Pages migration redirect still need verification. GitHub Pages remains the existing host until the repository change is merged and migration behavior is verified. No automatic deployment is configured or claimed.

After building, a manual deployment to the `main` branch can be run with Wrangler:

```powershell
npm run build
npx wrangler pages deploy dist --project-name dexter-soriano-portfolio --branch main
```

Wrangler authentication is managed outside the repository. Do not put credentials, tokens, or generated local authentication files in source control. Keep the GitHub Pages site available until all Cloudflare routes and assets, plus the post-merge redirect behavior, have been verified.

## Project guidance

- Product scope and acceptance: [`docs/planning/PRD.md`](docs/planning/PRD.md)
- Technical constraints: [`docs/planning/TECHNICAL_REQUIREMENTS.md`](docs/planning/TECHNICAL_REQUIREMENTS.md)
- Navigation and interaction: [`docs/planning/APP_FLOW.md`](docs/planning/APP_FLOW.md)
- Authoritative painted-valley design direction: [`DESIGN.md`](DESIGN.md); historical design checkpoints: [`docs/planning/DESIGN.md`](docs/planning/DESIGN.md)
- Data handling: [`docs/planning/BACKEND_SCHEMA.md`](docs/planning/BACKEND_SCHEMA.md)
- Work status and release actions: [`docs/planning/IMPLEMENTATION_PLAN.md`](docs/planning/IMPLEMENTATION_PLAN.md)
- Actual check results and limits: [`docs/VERIFICATION.md`](docs/VERIFICATION.md)
- Image provenance: [`docs/ASSET_SOURCES.md`](docs/ASSET_SOURCES.md)
- At-home continuation: [`docs/HANDOFF.md`](docs/HANDOFF.md)

Review the open [draft pull request](https://github.com/ToxicityRadius/toxicityradius.github.io/pull/1) before merging the GitHub Pages redirect.

Current preview: the empty photo collection renders six noninteractive “Photo coming soon” frames, per the latest user request. Adding six complete records replaces them with photos and enables the lightbox.

## Working agreement and release checks

Follow [AGENTS.md](AGENTS.md) for the project workflow. Use `npm run verify` for the existing production build and Node tests; this does not perform the required rendered or real-device checks. Current task status lives in [the implementation plan](docs/planning/IMPLEMENTATION_PLAN.md), actual results in [VERIFICATION.md](docs/VERIFICATION.md), and publication requirements in [RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md). Prepare and verify before asking Dexter to approve production publication; the manual deployment command above is a reference, not advance authorization.

Desktop wheel scrolling uses locally hosted Lenis 1.3.27 with James-style .09 interpolation and .9 wheel multiplier. It runs only while scrolling is active and retains native touch, keyboard/anchor destinations, dialog scrolling, reduced motion and shared Pause. The final journey chapter zooms out to show the complete S-shaped path.

The journey path now draws continuously with desktop scroll progress and retracts on reverse scroll. Phone chapter changes animate the fill and a small leading marker for 420ms; keyboard/direct links, Pause and reduced motion switch immediately. It adds no idle path ticker.

Map polish: the desktop camera follows the path itself and widens gently through curves; a directional beacon, proximity halos and short chapter-card arrivals give the travel more depth. All extra movement settles for Pause/reduced motion and at idle.
