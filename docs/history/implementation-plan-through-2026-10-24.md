> Historical reference only. Archived 27 October 2026; local links are rebased for this folder.

# T-13 Approved handmade reference blend — 24 October 2026

Implemented portfolio-wide Bricolage/Outfit typography, navy/cream tokens, accessible marker fills, capsule controls and named reading/filter semantics. Font production copying/preloading/license and provenance updated; original Fraunces preserved. Shared font and local component overrides reconciled. Existing artwork, physical sections and behavior preserved. Build +131 tests pass. Browser confirmation, active Anime frame, fallback checks and complete axe node reports are documented in docs/VERIFICATION.md. No deployment. Earlier visual specifications below are historical where they conflict with root DESIGN.md.

---

# T-12 Anime.js headline reveal — 23 October 2026

Implemented the user's explicit Anime.js request as a main-headline word reveal, synchronized with first desktop entrance/pointer Replay. Pinned Anime.js 4.5.0 locally with license; preserve semantic heading, br, immediate static/keyboard/reduced/paused paths and restore original DOM on completion/interruption. No animated reading prose or new effects elsewhere.

Build and 129 tests pass. Browser access still reports disabled; live visual/accessibility/performance confirmation remains open. T-11 implementation below is retained, including its unfinished browser acceptance. New dependency is explicitly authorized by the later Anime.js request. No release actions.

---

# Historical T-11 reliability, clarity and motion — 23 October 2026

Implemented locally: pending-load Skip/interruption and no restart; shared hero flow height and specialty/identity; instant keyboard/history/paused previews and camera continuity; reduced-motion/paused card geometry and reveal-only stagger; pointer-only toolbox indicator; archive query/history state and no-JS controls; early case identity and neutral placeholders; verified lossless images, clean allowlisted build, font priorities and separate review preparation; current guidance/provenance reconciled.

Build and 119 tests pass. Exact pixel/dimension checks and public/review HTTP smoke checks pass. Production images total 3,922,134 bytes (38% smaller); clean production has 47 files / approximately 4.69 MB. Verification is **partial**, because browser access still reports disabled even after the user showed an enabled Browser switch. Fresh short-height/four-width visuals, modal/keyboard/theme checks, actual 200% zoom, live reduced motion, detailed axe adjudication and cold throttled performance remain pending. Do not promote historical results into current proof. T-5 deployment/migration remains separate; real photos remain optional future content.

Root ../../DESIGN.md defines the current painted-valley and motion policy. See ../VERIFICATION.md and ../HANDOFF.md for next checks. Everything below is historical context.

---

# Historical UI/UX completion — 23 October 2026

T-10 implemented locally: clarify arrival with native work/contact shortcuts; keep the settled headline visible; unify shared tokens, branding, typography and controls; replace case-study pixel banners with compact summaries and recorded screenshots; refine project-box spacing, archive states, selectable email/shared copy feedback and both-theme contrast. Keep existing sections, interactions, project facts and six noninteractive photo placeholders.

Build and 103 tests pass. Four-width route matrix, targeted preview/history/keyboard/contact/filter checks, sandboxed no-JS and failed-image recovery checks passed. Axe reported zero violations in the 12 page/theme and three desktop preview states tested. Exact evidence/limits: ../VERIFICATION.md. Remaining T-4: actual 200% zoom, live reduced-motion preference, throttled mobile performance and real-device/cross-engine/assistive-technology checks. T-5 deployment/migration remains separate; no release action performed.

---

# Current homepage update — 20 October 2026

T-9 implemented: integrate the existing painted valley into the main homepage with three brief project overlays, shared history/focus behavior, continuous journey route, physical project box, engineering toolbox, existing-material personal desk and contact. Exactly three featured projects. No new map art or filmmaking. Build and 84 tests passed; targeted browser checks and remaining limits are in ../VERIFICATION.md. No release performed. Previous task descriptions below are historical checkpoints.

---

# Implementation and verification

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-19
Scope: Pixel-art town portfolio redesign

## Objective and dependencies

Deliver the static town portfolio and case-study experience defined by R-1–R-7. The site is implemented on branch `codex/storybook-town`; draft pull request #1 is open for review. Cloudflare Pages project `dexter-soriano-portfolio` has a completed production deployment, and limited public GET checks passed for the homepage, archive, FormProof page, and deployment URL. The existing GitHub Pages site remains available until the pull request is merged. After merge, the root index and 404 are intended to redirect visitors to Cloudflare; verify that transition before considering the migration complete.

## Work order

| Task | Goal | Status | Dependencies / completion evidence |
|---|---|---|---|
| T-1 | Inventory existing pages, assets, project archive, and deployment config; verify case-study facts and ClaimCheck public boundary. | Verified | Source and content review completed; see `../VERIFICATION.md`. |
| T-2 | Implement responsive town homepage, landmarks, navigation, and day/night preference. | Implemented | Built static site; representative browser checks recorded in `../VERIFICATION.md`. |
| T-3 | Create three case studies with accurate roles, evidence, and project links. | Implemented | Three case-study routes and labeled screenshots included; see `../VERIFICATION.md`. |
| T-4 | Review accessibility, responsive behavior, direct links, and reduced motion on the built site. | Active | Responsive/theme/routes, storage failure cases, reduced motion, no-script navigation, and 4x CPU mobile steady state reviewed; full keyboard walk, automated axe, and broader accessibility review remain unrun. |
| T-5 | Deploy to Cloudflare Pages and verify the new deployment and metadata; retain current GitHub Pages until this passes. | Partial | Production deployment completed and limited HTTP checks passed; remaining routes/assets, metadata, deployment readback, and redirect migration need verification. |
| T-6 | Replace town art with the approved quiet countryside master and coordinate scene layers, responsive links, ambient motion, and playback controls. | Implemented; targeted verification passed | Static composition approved 2026-10-19; build and 12 tests passed; local Chromium responsive, playback, town keyboard navigation, reduced-motion, no-script, storage, and 4x CPU mobile steady-state checks passed. Full accessibility remains T-4; deployment remains T-5. |
| T-7 | Extend the whole portfolio experience with sourced personal journey, project evidence, ordinary floating navigation, and genuinely independent pixel-art depth layers. | Implemented; targeted verification passed | Final build and 19 tests passed; desktop independent depth, shared pause, live reduced motion, responsive cleanup, 4x CPU mobile steady state, active floating navigation, full-scroll image loading, and expanded-home no-script checks passed. Full-site accessibility remains T-4; T-5 unchanged. |
| T-8 | Close the reference interaction gap with a desktop pinned town fly-in, a scroll-drawn journey map/traveler, and a selectable project box; retain direct mobile and reduced-motion controls. | Implemented; targeted verification passed | Build and 24 tests passed; local Chromium pin/release, pause, journey progress, project pointer/keyboard controls, live reduced motion, responsive cleanup, no-script fallback, and 4x CPU mobile sample passed. Four focused CSS files passed Taste lint; inspector launcher failed, so visual checks used Playwright at four widths. T-4/T-5 remain separate. |

Task statuses above reflect the current work; verification results and remaining limits are recorded below and in `../VERIFICATION.md`.

## Verification records

Detailed check results, environments, and limitations are recorded in `../VERIFICATION.md`. Deployment and migration checks remain pending; do not treat local browser results as production verification.

| Check | Scenario and expected result | Status | Evidence |
|---|---|---|---|
| V-1 | Representative route and landmark navigation by pointer; reach the correct content. | Pointer routes and targeted town keyboard navigation Passed; full-site keyboard/touch walk Not run | See `../VERIFICATION.md` |
| V-2 | Mobile and desktop layout, overflow, focus, contrast, alternatives, and responsive behavior. | Partial; visual review and tested-width overflow passed; full accessibility checks Not run | See `../VERIFICATION.md` |
| V-3 | Reduced motion and content without scripts remain available. | Local Chromium live reduced-motion and script-disabled landmark navigation Passed; other browser engines Not run | See `../VERIFICATION.md` |
| V-4 | Switch theme, reload, and test unavailable/invalid local storage. | Prior theme persistence Passed; local throwing-storage getter and invalid stored-value checks Passed | See `../VERIFICATION.md` |
| V-5 | Confirm case-study roles, evidence, archive links, contact destinations, and ClaimCheck boundaries. | Content review and tested routes Passed for reviewed items | See `../VERIFICATION.md` |
| V-6 | Verify Cloudflare deployment, public URL, metadata, smoke-test routes, and migration. | Partial; homepage, archive, FormProof, and deployment URL returned HTTP 200; readback and remaining checks Not run | See `../VERIFICATION.md` |

## Release and recovery

Release candidate/environment: Cloudflare Pages project `dexter-soriano-portfolio`; public URL `https://dexter-soriano-portfolio.pages.dev/`; deployed revision-specific URL `https://142fabed.dexter-soriano-portfolio.pages.dev/`. The limited checks are recorded in `../VERIFICATION.md`. Keep GitHub Pages available until the pull request is merged and V-6 passes on the intended Cloudflare deployment. If the new deployment fails, use the existing GitHub Pages site while resolving the issue; record the actual recovery action and evidence before declaring migration complete. The post-merge root redirect is also part of migration verification.

## Agent handoff

T-6 and T-7 checks describe previous compositions, not reference-level motion acceptance. T-8 implements the missing pinned fly-in, journey route/traveler, and project box; build, 24 tests, and targeted local browser checks passed. Exact measurements, inspector launcher failure, and remaining limits are recorded in the latest verification section. Continue remaining T-4 accessibility, full keyboard, and hidden-tab browser checks, then T-5 deployment/migration checks. Follow `PRD.md`, `TECHNICAL_REQUIREMENTS.md`, `APP_FLOW.md`, `DESIGN.md`, and `BACKEND_SCHEMA.md`; use `../VERIFICATION.md` and `../HANDOFF.md` for evidence and limits. Do not claim complete WCAG conformance or full migration success before evidence exists.
