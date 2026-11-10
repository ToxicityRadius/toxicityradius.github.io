> Historical reference only. Archived 27 October 2026; local links are rebased for this folder.

# Current handmade design handoff — 24 October 2026

Approved bold reference blend is implemented. Root DESIGN.md is authoritative: Bricolage 600–800 + Outfit400, navy/cream themes, selective static marker accents and existing painted/physical portfolio structure. Build +131 tests pass. Fresh responsive, keyboard, fallback, axe and animation-frame evidence is in docs/VERIFICATION.md and output/playwright/handmade-2026-10-24/.

The previous collapsed-space report now has an actual active-frame capture with visible spaces and equal 103.2px heading heights before/during/after animation. Final scans found zero violations; 42 homepage contrast incomplete nodes per theme are manually adjudicated with explicit boundaries. Next: user visual feedback, then remaining zoom/live-motion/device/performance/accessibility release checks. No release action performed. Preserve all dirty/untracked work. Fresh checkout: npm ci; npm run build; npm test; npm run dev. Run npm run prepare:reviews to restore dev-only review routes after clean build.

---

# Current typography handoff — 24 October 2026

The user's whole-portfolio typography refinement is implemented. Root DESIGN.md records the final shared hierarchy and quieter hero treatment. Production build passes; all 129 tests pass (final CSS size adjustment rebuilt afterward). Fresh in-app browser checks and screenshots are recorded at the top of docs/VERIFICATION.md and output/playwright/typography-2026-10-24/.

Next: review the new visual direction with the user; capture intermediate Anime.js reveal frames to close the original spacing report, then complete the outstanding accessibility, zoom, motion-preference and mobile-performance checks before release. No deploy, commit or push was performed. Preserve existing dirty work. Start with npm ci on a fresh checkout, npm run build, npm test and npm run dev. Review routes require npm run prepare:reviews after a clean production build.

---
# Anime.js text handoff — 23 October 2026

The user requested Anime.js after the reliability pass. Version 4.5.0 is pinned and served locally. `headline-text.js` enhances only `.intro h1` with accessible word splitting, 500ms rise/fade and 45ms stagger, synchronized with the controller's one-second `data-text-phase` cue. Completion/interruption restores the original semantic heading. Static/keyboard/reduced-motion/paused paths are immediate; pointer Replay can repeat the effect. Paragraphs/navigation do not animate.

Build and all 129 tests pass, including lifecycle cleanup, stale replay callbacks, fallback markup and official bundle/license delivery. No fresh browser playback was possible: the tool still reports local browser use disabled. Next: verify first arrival, pointer Replay, Skip mid-reveal, keyboard Replay/Tab, phone, reduced motion, pause, resize, hidden tab and accessible text in the rendered page; save new screenshots and an axe result. Do not infer visual approval from node tests. Local preview remains http://127.0.0.1:4173/. No publishing performed.

---

# Historical reliability implementation handoff — 23 October 2026

The approved reliability/clarity/motion plan is implemented locally. Pending artwork is skippable; keyboard/history/paused previews settle immediately; interrupted pointer cameras retain their rendered position. Hero containers share their actual minimum height, specialty/identity copy is clearer, desktop landmark labels reserve a lower row, cards separate reveal timing from interaction timing, and reduced-motion/paused cards retain resting geometry. The toolbox +/× indicator alone animates on pointer activation. Archive categories persist in URLs; six neutral photo placeholders remain.

Asset authoring verified exact decoded RGBA equality for eight lossless derivatives, saving 38% of the original image payload. Production builds clean dist safely, use an explicit asset list and validate local references. Hero/journey/social metadata share the optimized backdrop. Build and 119 tests pass; final focused confirmation covers the reduced-motion focus correction. No dependencies/backend/artwork were added; source PNGs remain intact. No release actions were performed.

Use `npm ci` on a fresh checkout, `npm run build`, `npm test`, then `npm run dev`; preview http://127.0.0.1:4173/. The server prepares review pages at startup. After rebuilding during a running server, `npm run prepare:reviews` restores those development-only pages. A clean production build deliberately excludes them. `scripts/valley-assets.json` records exact dimensions/byte counts; optional authoring regeneration is `python scripts/optimize-valley.py` using installed Pillow/WebP.

Next action: restore browser-tool access and run the rendered acceptance matrix in VERIFICATION.md, save fresh screenshots/full axe results, and record cold mobile measurements. The tool still reports local browser use disabled despite an enabled Browser switch in the user's screenshot. Existing screenshots precede these changes. No rendered, zoom, live-motion, axe or performance pass is claimed for this implementation. See AUDIT-2026-10-23.md for resolution mapping. Previous handoffs below are historical.

---

# Historical UI refinement handoff — 23 October 2026

The approved remaining UI/UX changes are implemented locally on /. Shared styles/branding, persistent valley shortcuts/headline, compact case summaries with real evidence, project-box spacing, contact email/copy feedback and contrast/keyboard fixes are complete. Preserve the existing artwork, ordering and photo placeholders. The older /review/experience/ remains a prototype.

Build and 103 tests pass. All six page types were checked at four widths; axe confirmation reported zero violations in 12 page/theme combinations plus three desktop previews. Browser and screenshot evidence is in output/playwright/ui-finish/. See VERIFICATION.md for exact limits: no actual zoom, live reduced-motion emulation, throttled performance, cross-engine/real-device or release verification is claimed. No commit/push/deployment. Next: review the screenshots/local page, then complete the remaining release checks. No new dependency or artwork was added.

---

# Connected homepage — 20 October 2026

Photo wall added above the personal desk, with CSS/SVG materials and a separate native lightbox. To activate: receive six real user photos with confirmed captions, save under images/, fill scripts/photo-wall-content.mjs (src,width,height,alt,caption), then rebuild. No filler photos are published; the empty gallery is omitted. Build and 98 Node tests pass; visual review remains pending because photos are absent and browser use is disabled. Review at desktop/tablet/390px/320px, day/night and reduced motion when ready. Existing desk/project content is preserved. No deployment.

Latest UI pass: refined the existing controls, labels, preview typography/paragraphs, sticky close/action areas and contact hierarchy in connected-home.css and scripts/connected-home.mjs. Build and all 84 tests pass. Latest visual verification is pending because local browser use is disabled in Work settings; earlier screenshots show the preceding appearance. Next check: desktop and phone previews, night theme, and keyboard focus without internal valley scrolling. No publishing was performed.

Continue on codex/storybook-town. The main local homepage at http://127.0.0.1:4173/ now contains the existing painted valley plus three brief project overlays, the journey, physical project files, engineering toolbox, personal desk and contact. /review/experience/ remains the older fullscreen FormProof prototype, not the current homepage.

Confirmed decisions: exactly the three existing projects; brief overviews instead of room interiors; guided scroll plus shortcuts; main homepage integration; existing artwork and personal material; engineering focus; no filmmaking or audio. The user rejected a new journey illustration and it is not used. Campus uses a right-hand desktop panel to keep its building visible; other desktop panels open left, with bottom sheets at ≤900px.

Implementation entry: scripts/connected-home.mjs and connected-home.js. Build publishes the exact review entrance/atmosphere sources under /world/ and copies only their required assets. Case studies and archive remain native routes. Use npm run build, npm test, npm run dev. The development server recreates review routes; production builds exclude those review documents.

Completion evidence: build and 84 Node tests pass. Browser checks cover all three previews, native modal focus wrapping, Escape/close, Back/Forward, direct hash/query preservation, pause/theme, toolbox and desktop composition. Layout/panel checks at 1440×900, 1024×768, 768×1024, 390×844, and 320×740 found no horizontal overflow after fixing intrinsic portrait height. Screenshots and verification.json live in output/playwright/connected-home/. Reduced-motion and no-JS behavior have unit/static coverage; full live no-JS, live reduced-motion, other engines, real-device performance and accessibility audit remain pending.

No commit, push, merge or deployment was performed. Existing smoke edits are preserved. Review the local visible result before any release; previous historical records below do not describe the current homepage.

---

# Laptop handoff - 19 October 2026

Continue only the town portfolio on `codex/storybook-town`. The separate AERIS / Inference Observatory work is excluded from this handoff.

Clone directly into its own folder on the laptop (the folder name is local; the repository is shared with the older site):

```powershell
git clone --branch codex/storybook-town https://github.com/ToxicityRadius/toxicityradius.github.io.git town-portfolio
cd town-portfolio
npm ci
npm run build
npm test
npm run dev
```

Open <http://127.0.0.1:4173>. For an existing clean checkout, use `git fetch origin`, `git switch codex/storybook-town`, and `git pull --ff-only` before `npm ci`. Keep any local changes before switching or pulling.

## Saved progress and next steps

- Source, layered pixel-art assets, motion implementations, automated tests, review prototypes under `review/`, and captured evidence under `output/` are included.
- `npm run build` and all 71 tests passed during this handoff. Earlier test counts below and in planning documents describe previous checkpoints.
- Review the combined experience at `/review/experience/` and the prototypes documented under `review/` before choosing the next visual change. Tests passing do not mean the motion has final visual approval.
- Read `docs/VERIFICATION.md`, `docs/MOTION_REVIEW.md`, `docs/JAMES_MOTION_STUDY.md`, and `docs/planning/IMPLEMENTATION_PLAN.md` for decisions, evidence, and remaining review gaps.
- Continue the pending accessibility, keyboard, cross-browser, real-device performance, and deployment/migration checks. No deployment or merge is part of this handoff.
- Node.js and npm are required; dependencies are reproducible through `package-lock.json`. `node_modules/`, `dist/`, ignored local `work/` tooling/captures, browser downloads, and authentication are not transferred. Skills installed in the workstation's Codex home are also machine-local. The optional reverse-engineering environment must be recreated before its activation script can work; see `docs/REVERSE_ENGINEERING_SETUP.md`. Normal development requires only the commands above.

The earlier handoff below preserves the hosting and product context; its test counts and local environment descriptions are historical.

---
# Continue this portfolio work at home

The current implementation and planning documents are on Git branch `codex/storybook-town` in `ToxicityRadius/toxicityradius.github.io`. Draft pull request #1 is open at <https://github.com/ToxicityRadius/toxicityradius.github.io/pull/1>. Use the same Codex task if it appears in your account; this file preserves the essential project state if you need to resume from a fresh chat.

## Get the files

```powershell
gh repo clone ToxicityRadius/toxicityradius.github.io
cd toxicityradius.github.io
git switch codex/storybook-town
```

If you already have the checkout:

```powershell
git fetch origin
git switch codex/storybook-town
git pull --ff-only
```

Requires Node.js for local work. Run `npm run build`, `npm test`, then `npm run dev` and open `http://127.0.0.1:4173`.

## Current product decisions

- Cozy, imaginative pixel-art town as the interactive homepage; dedicated pages for Student Advising Portal, FormProof, and ClaimCheck.
- Intended equally for employers and freelance clients; position Dexter as an AI and web builder offering websites, web apps, and AI integrations.
- Keep day/night themes, with day as the default; allow both scrolling and clicking through the town.
- Student Advising Portal: major contributor/co-creator. FormProof and ClaimCheck: creator.
- Dexter is still a student. SSC President is a past 2025–2026 role. Globe Ambassador Head is current from April 2025–Present.
- Keep the other existing projects in a filterable archive. Use email/social contact and a CV request link; no contact form, backend, or analytics.
- Cloudflare Pages is the selected host. No Figma or Claude dependency.

## Current state

- Cloudflare Pages project: `dexter-soriano-portfolio`.
- Public preview: <https://dexter-soriano-portfolio.pages.dev>.
- Last deployment-specific URL: <https://142fabed.dexter-soriano-portfolio.pages.dev>.
- Limited HTTP checks returned 200 for the homepage, archive, FormProof case study, and deployment URL. See [`VERIFICATION.md`](../VERIFICATION.md) for what remains unverified.
- GitHub Pages migration is pending. Do not treat the old URL redirect as active until the repository change is merged and checked.
- Review the open draft pull request before merging; the root redirect files affect the old public address only after merge.
- The project README documents local development and manual Wrangler deployment. Cloudflare CLI authentication must be set up on the home computer separately; never commit credentials or local authentication files.
- Full keyboard testing, automated accessibility scan, performance testing, remaining live routes/assets, and post-merge redirects remain to be checked.

## Key files

- [`planning/PRD.md`](../planning/PRD.md): product scope and acceptance criteria.
- [`planning/DESIGN.md`](../planning/DESIGN.md): pixel-art design and interactions.
- [`planning/IMPLEMENTATION_PLAN.md`](../planning/IMPLEMENTATION_PLAN.md): tasks and migration steps.
- [`ASSET_SOURCES.md`](../ASSET_SOURCES.md): artwork, screenshot, font, and library provenance.
- [`VERIFICATION.md`](../VERIFICATION.md): completed checks and limits.
- [`../DESIGN.md`](../../DESIGN.md): implemented design tokens and behavior.

The old root [`../REVAMP_PLAN.md`](../../REVAMP_PLAN.md) describes an earlier direction and is marked superseded. Follow the current documents under `docs/planning/`.


Photo-wall preview update: user requested visible placeholders before supplying photos. Empty content now renders six clearly labeled, noninteractive paper frames above the desk. Six complete photo records replace them and enable the lightbox. Build and 98 tests pass; browser visual verification remains unavailable.
