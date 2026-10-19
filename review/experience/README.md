# Valley → Workshop review

Open `/review/experience/` after `npm run build` and `npm run dev`. This is a local, noindex prototype; production builds exclude all review routes. The isolated entrance and workshop remain available at `/review/animatic/` and `/review/exhibits/`.

## Experience

The approved cloud entrance reaches a living valley. Workshop opens with a 600ms desktop camera approach and a 200ms overlapping interior blend; touch/coarse-pointer devices use 320ms / 120ms. Keyboard, reduced motion, pause, and undecoded artwork use a 120ms fade with no camera travel. Artwork decoding starts eagerly but never blocks navigation.

Back to valley reverses the approach. Escape, Back/Forward, repeated input, resize, visibility changes, and preference changes settle or retarget the current transition. A revision counter rejects stale completions, and a pending history traversal serializes a rapid close/reopen. Direct `#project-formproof` entry skips the introduction.

Workshop stages and interior scroll position survive leaving and re-entering during the current visit. Replay explicitly resets to Finding. The persistent static-state-01 identity and moving progress underline indicate inspection of the same retained record; no approval, diff, or check logs have been invented. The report's existing evidence gaps remain visible.

## Atmosphere and motion

- River reflections: 6s alternating, ±4px, low-opacity strokes clipped to the river.
- Chimney smoke: 8s, 16px rise, peak opacity .16, reset while invisible.
- Fine-pointer depth: backdrop and labels ±4×2px; foreground total ±8×4px. Independent wrappers preserve the original entrance transforms.
- Pause scene motion remains usable during travel and settles the requested destination. Ambient motion runs only in an arrived, visible, unpaused valley, and stops in hidden tabs, offscreen, inside the workshop, or under reduced motion.
- No new dependency, sound, cursor replacement, scroll interception, opening-door art, or automatic project-stage playback was added.

## Shared interfaces

`renderWorkshopExhibit()` provides the shared interior markup. `initWorkshopStages(exhibit, document)` provides stage controls, `reset()`, `getStage()` and underline `refresh()` without owning navigation. The isolated workshop keeps its previous reset-on-entry behavior; the combined controller preserves the current stage.

The entrance module exports `finishEntrance()` and publishes its lifecycle through `.stage[data-entrance]`. The combined renderer consumes the existing entrance HTML as the single source of the reviewed scene and cloud layout, rejecting incomplete fragments rather than generating a partial route. Local preview preparation composes the two scenes; the production build is unchanged.

## Verification — 2026-10-19

- Full Node suite: 71 tests passed. Production build passed and excludes `/review/experience/`.
- Browser checks: 1440×1000, 1920×1080, 768×1024 touch, 390×844 touch, and 844×390 touch. Verified entry timing, four stages, stage/scroll resume, Replay, focus, Back/Forward, query preservation, pointer/label alignment, pause, keyboard entry, reduced motion, and no horizontal overflow. No browser page errors observed.
- Additional browser scenarios: direct hash, rapid close/reopen, Escape/resize during approach, failed and stalled interior artwork, unavailable storage/canvas, sequential no-script content, and Pause during approach.
- Screenshots and normal recordings: `output/playwright/experience/`. `verification.json` records assertions. `slow-transitions.webm`, slowed screenshots and `motion-filmstrip.png` support visual checks at 4× slower playback.
- `motion-performance.json` records a warm local 390×844 sample under 4× CPU throttling. This is a bounded synthetic sample, not real-device FPS or cold-load performance evidence. Ambient effects were confirmed paused inside the workshop.
- Design source lint: zero failures; existing Outfit font retained. Windows standalone design-inspector browser startup previously failed; Playwright supplied screenshot and geometry checks instead.

The controller and atmosphere received independent read-only review. Physical-device testing, other browser engines, a full accessibility audit, and deployment remain outstanding. Production homepage integration, Campus/Library interiors, biography travel and the project box are later milestones.

The final warm ambient sample measured zero layouts, long tasks and layout shifts over 3.5 seconds under 4× CPU throttling. The preceding broader sample, which included entry, observed one 54ms long task; these are different measurement windows. `performance-trace.json` retains the post-arrival ambient/entry trace for DevTools inspection. Neither sample establishes physical-device frame rate.
