# Fullscreen workshop review

Review route: `/review/exhibits/`. This prototype remains excluded from the production build. Starting the local preview prepares this route.

The workshop fills the browser viewport, using one painted porch/valley/bench background. Back to valley and the case-study link stay visible in the top toolbar. A compact introduction sits above one stable document surface. Mobile and short landscape screens scroll vertically; stage navigation brings a cropped artifact heading back below the toolbar.

The document has four user-controlled stages: Finding → Review → Change → Verification. Next, Previous and Replay never autoplay. The same historical static-state-01 run appears throughout. The retained screenshot records one rule, one affected node, and VERIFIED_FIXED. It does not expose the rule identity, approval record, source diff or individual check logs. Those stages disclose the gaps instead of inventing a patch or approval. The original report remains available in a disclosure and through native image links. Facts and project attribution still come from `scripts/portfolio-content.mjs`.

Entry/exit use 240ms opacity and shallow translation. Artifact transitions use 200ms opacity/translation on the content only; the paper surface stays still. Closing settles stage transitions, reopening resets to Finding, and rapid input retargets CSS transitions without timers. Reduced motion removes translation and uses 120ms opacity. Hash navigation, Escape, focus restoration, skip navigation, an inert background, and sequential no-script articles are retained.

The entrance choreography is unchanged. Twenty cloud instances retain 86–98% opacity; four selected wisps use 74–80%, multiplied by each painted sprite's existing alpha. No new drift, opacity loops, blur or dependencies were added.

## Verification

2026-10-19: production build and 56 tests passed. Playwright browser checks at 1440×1000, 390×844 and 844×390 cover four stages, Previous/Next/Replay, keyboard entry, focus, Back/Forward, rapid input and close/reopen, reduced-motion transforms and computed 120ms timing, report loading, no horizontal overflow, no-script access, and failed-art fallback. No browser page errors were recorded.

Evidence: `output/playwright/fullscreen-workshop/verification.json`, stage screenshots, desktop/phone/landscape WebM recordings, before/after cloud comparisons, and a 4× slowed transition recording/filmstrip. The cloud baseline is recreated by intercepting only the alpha assignment to restore its previous value of 1. Rendered screenshots and recorded motion frames were visually inspected. Browser checks run from `work/review/verify-fullscreen-workshop.cjs` and `work/review/inspect-workshop-motion.cjs` using existing local Playwright tooling.

Design lint has zero failures and one warning for the existing Outfit typeface, retained to match the portfolio. The standalone design inspector could not launch its browser in this Windows environment; layout verification used Playwright screenshots and geometry checks instead. Physical-device performance and a full accessibility audit remain unchecked. No deployment was performed.

## Artwork provenance

`images/workshop-setting-source.png` is an original generated background; `images/workshop-setting.webp` is its delivery version. HTML papers and controls are separate. The source remains intact; CSS frames the tabletop.

Generation brief: Create an original painted environmental background, not a website mockup: a quiet open-air wooden repair bench on a shaded timber-workshop porch overlooking a sunlit countryside river valley. Broad honey-colored weathered timber tabletop, empty and uninterrupted for HTML documents. Simple warm-stone porch edge, soft-blue mountains, olive and cypress trees, a glimpse of river, wooden post at far right. Warm upper-left light, pale blue shadows, restrained painterly texture and simplified foliage. No papers, tools, books, mugs, people, screens, typography, logos, or interface elements. Landscape composition; cream, aged honey timber, warm stone, olive, muted river blue.


## Combined route integration

The combined `/review/experience/` prototype reuses `renderWorkshopExhibit()` and `initWorkshopStages()`. Its persistent record identity and moving underline track the same historical run. Combined-route entry preserves stage and scroll within the visit; this isolated workshop still resets on entry. See `../experience/README.md` for current combined navigation, browser checks and motion evidence.
