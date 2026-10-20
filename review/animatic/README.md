# Automatic valley entrance review

This review route implements the approved 4.5-second entrance. It does not replace
the homepage or change production routing.

## Reviewing

- Open `/review/animatic/`. The first eligible desktop visit in a tab session plays
  automatically after the artwork decodes and the opening has painted.
- Refreshes and returns show arrival. Use **Replay intro** to watch again.
- **Skip intro** immediately reaches arrival without changing keyboard focus.
- Wheel/touch scrolling, navigation keys, or a scroll event settle the intro and
  allow native scrolling. The scene occupies one viewport, without a scroll pin.
- Add `?debug=1` for the study's Play/Pause and scrubber controls.
- The session key is `portfolio:valley-entrance:v1`. If storage is unavailable,
  the page instance still runs normally without throwing.

Phones and reduced-motion visitors receive a static scene and direct project
links. Preference changes settle the scene instead of unexpectedly starting it.
Hidden-tab time is excluded from the intro clock. Decode or canvas failures
remove the loading screen and leave static project access.

## Choreography

| Seconds | Beat |
| --- | --- |
| 0–0.25 | Opening cloud hold |
| 0.25–1.7 | Staggered outward cloud parting |
| 0.8–3.9 | Camera approach to the existing arrival framing |
| 1.0–1.3 | Name/role fade in |
| 1.3–2.7 | Fully visible name/role hold |
| 2.7–3.1 | Name/role fade out |
| 3.9–4.3 | Project-label fade in |
| 4.5 | Fully settled; destination interactions enabled |

All motion comes from normalized `frameAt(progress)` and `DURATION_MS=4500`.
The existing canvas continues to draw 24 cloud instances at their 0.85 individual
scale. Its backing buffer is reassigned only when its pixel dimensions change.
No new art, dependencies, project URLs, or ambient loops were added.

## Verification — 2026-10-19

- `npm run build` and `npm test`: production build and all 43 tests pass.
- `node work/review/verify-automatic-intro.cjs`: cold-cache first visits at
  1440×900 and 1920×1080; native Skip focus, refresh, return, Replay, wheel
  interruption, resize, debug gating, reduced motion, 390×844 phone, blocked
  storage, aborted artwork, and unavailable canvas pass.
- Hidden-tab timing is covered by unit tests and a browser test that simulates
  the visibility event. Actual operating-system background behavior was not profiled.
- Rendered-canvas samples contain no early blank cloud frames and no clouds
  reappearing after clearing. The sampled active durations are approximately
  4.5 seconds. Sampling cannot rule out every hardware-specific display glitch.
- Source and exported recordings were visually checked for readable introduction,
  cloud movement, and scene-edge coverage. Independent correctness and visual
  subagent reviews found no blocking issue; the opening cloud gap and review-label
  contrast findings were corrected before the final recordings.

Evidence is in `work/review/automatic-entrance/`: `verification.json`, desktop
opening/name/arrival screenshots, `390x844-phone.png`, full cold-load WebM
recordings, and trimmed H.264 `1440x900-entrance.mp4` / `1920x1080-entrance.mp4`.
The trimmed clips remove most of the deliberately throttled loading interval.

Homepage integration and deployment await visual approval of this review.

## Cloud atmosphere refinement

Cloud sprites now retain varied static alpha: twenty instances at 0.86–0.98 and four wisps at 0.74–0.80. This multiplies their existing painted transparency without changing timing, paths, scale or adding blur. Before/after frames are in output/playwright/fullscreen-workshop/; the baseline recreates the former alpha of 1 through module interception. Cloud renderer tests cover opacity stability and substantial cloud structure.


## Combined route integration

`/review/experience/` consumes this entrance's scene markup and imports its controller. `finishEntrance()` settles the entrance without replay; `.stage[data-entrance]` publishes loading, intro and arrived states. The isolated entrance's choreography, cloud alpha and session behavior remain unchanged. Combined-route atmosphere and camera travel use separate wrappers, and are documented in `../experience/README.md`.
