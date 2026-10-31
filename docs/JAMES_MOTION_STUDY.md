# Live reference refresh — 27 October 2026

Source: [James Chugh's public portfolio](https://www.jameschugh.com/), fetched and inspected on 27 October 2026. This refresh supersedes conflicting reference observations below; the older adaptation describes an earlier Dexter implementation, not the current entrance.

## Evidence and method

Used the available in-app Chromium browser for actual navigation, scrolling, landmark selection, project selection and screenshots, plus a separate HTTP fetch for public HTML/CSS/JavaScript inspection. REA MCP operations and the local REA CLI were unavailable; no installation or configuration repair was attempted. This is a browser/source investigation using the reverse-engineer-anything workflow, not a claimed REA capture.

Saved public source: [james-home.html](../output/reference-study-2026-10-27/james-home.html), SHA-256 `f32d06c49b2b99db526d35d3e6f17192dce6ee095c089c6d387650ca92ed1f78`. It differs from the October 19 snapshot. Line references below apply only to this file. Source and screenshots are reference evidence outside production; do not copy the author's artwork, biography, metrics or application code into Dexter's site.

[Runtime observations](../output/reference-study-2026-10-27/runtime-observations.json) retain sampled DOM geometry and computed styles. Samples are sparse observations taken after tool calls, not an animation trace or precise timing measurement. Desktop was 1440×900; narrow layout was 390×844. The narrow browser still reported a fine pointer: this was viewport testing, not touch emulation, iPhone hardware or Safari.

## What creates the visual richness

| System | Current source mechanism | Runtime evidence | Application to Dexter |
| --- | --- | --- | --- |
| Opening composition | Transparent text above the painted scene; desktop scene scrim rather than an opaque card. `fitCopy()` checks headline/supporting-copy rectangles against landmark labels and scales to clear them. Lines 139–145, 176–191, 6165–6188. | [Desktop entrance](../output/reference-study-2026-10-27/desktop-entrance.jpg); initial copy at x72/y108, 231.5px high at 1440×900. | Replace the cream hero panel with a composed text zone and local contrast treatment. Arrange type around Dexter's actual buildings and test collisions; do not reuse James's coordinates. |
| Text choreography | Line masks reveal text upward over 1.3s, nominal delay 1.7s; highlight paints over 1s starting 2.5s, stroke follows at 3.2s; supporting line fades starting 2.9s. Lines 182–191. | Settled composition inspected; exact intermediate text timings are source-derived, not frame-measured. | Sequence headline, emphasis and supporting identity with the existing cloud entrance. Animate a meaningful phrase as a unit, preserving natural spaces and selectable text. |
| Depth and camera | Desktop depth-map WebGL rendering; layer gain grows with depth and scroll. DOM landmarks use the same depth math. Current pointer factors are explicitly zero. Lines 6076–6080, 6289–6320. | Canvas active on desktop. Scroll samples at y456/y776.8 showed copy opacity 0 and translation −315px while the outer camera remained scale 1. | Depth can come from different foreground/background travel. More mouse-following motion is not required. Dexter has existing layered art, but no demonstrated depth map or unseen terrain for a large fly-through. |
| Scroll handoff | Copy exits early; scene shade increases later. Completed long tracks collapse to one viewport with compensated scroll position. Several story scenes hold forward progress. Lines 6045–6051, 6313–6320, 9410–9435. | The hero started at 2340px high. Observed scroll offsets changed when completed tracks folded. | Give text and camera one clear handoff into the next section. Track folding is a distinct behavior with history/focus implications, not a requirement to copy. |
| Landmark focus | Selection reframes the painting, hides hero copy, opens a side sheet and reserves space for the selected building. Lines 6193–6237. | [Landmark selection](../output/reference-study-2026-10-27/desktop-landmark.jpg); settled camera scale 1.32 and left sheet for OYO. | Keep Dexter's native project destinations and focus restoration. Preserve the feeling of entering a place while showing truthful project evidence. |
| Journey | A world camera follows an SVG route with hold/zoom/traverse/overview phases; card and waypoint states synchronize with travel. Current phase constants are .012/.115/.91, different from the older study. Lines 6707–6757. | Map matrix changed from overview scale .1321 to .1622 in the sampled early travel. Phone Start control changed the step indicator to 1/9 and populated the first card. | Later: coordinate Dexter's five factual chapters and route camera, instead of merely revealing a line. Entrance remains the first implementation checkpoint. |
| Physical project selection | CSS 3D box opens its lid; cards rise with stagger; selection lifts a card, turns it, then expands a clipped case-study layer from its bounds. The later `pick()` declaration is the active one. Lines 6861–6872, 8516–8553. | [Case study](../output/reference-study-2026-10-27/desktop-case-study.jpg) reached `cs ed open ready`, URL `/work/eazydiner`, focus `csClose`, root scroll locked. | Later: a coherent extraction sequence for Dexter's three cards, while retaining dedicated reading routes and interruption-safe controls. Do not make visitors wait through long choreography to access content. |
| Mobile adaptation | Mobile canvas hidden; hero is one viewport; composition retains a detailed painting and large text. Journey switches to direct stop navigation and reduces per-frame route updates. Lines 134, 3067, 6707, 6743–6746. | [Phone entrance](../output/reference-study-2026-10-27/phone-entrance.jpg): 844px hero, no page-width overflow, canvas display none. [Phone landmark](../output/reference-study-2026-10-27/phone-landmark.jpg): camera transform none, bounded detail sheet. | Keep visual ambition on iPhone with lighter motion, direct controls and native scrolling. Verify on Dexter's actual iPhone Safari separately. |

## Wider page inventory

The live page also includes scroll-revealed introduction text with movable notes, a horizontal brand/site gallery, a separate app narrative, an unwrap-style toolkit, a process path, a personal object/photo desk, a notes wall, and keyboard-like contact links. These were inventoried in the live DOM and public source; this pass did not exercise every interaction. Their common design pattern is a distinct physical metaphor for each section and a controlled transition between sections. Additional features such as music, counters, a guestbook or booking flow do not follow from studying that pattern.

## Entrance implementation brief

Dexter confirmed: entrance first, then carry the direction through the site; replace the cream panel and rework placement/type choreography; preserve equally ambitious phone visuals with lighter motion. Keep the painted art, actual identity/headline, three projects, native destinations and section order.

1. Compose a large headline directly in a deliberately shaded part of the scene, clear of controls and building labels. Use the existing Bricolage/Outfit families.
2. Reveal headline phrases through masks in coordination with the cloud clearing. Give the existing emphasized phrase a timed paint reveal; bring supporting identity and actions in after the main statement.
3. Coordinate foreground/background camera travel and text staging as one entrance, with a deliberate settled state and transition to the introduction.
4. Keep Skip, Replay, shared Pause, keyboard/direct-link entry and reduced-motion paths deterministic. Text and native actions must remain available without scripts or failed artwork.
5. Use the same composition and identity on phone, with shorter/lighter motion and direct project controls. Check 320px width, short height, day/night, zoom, live motion preference and iPhone Safari before release claims.

## Limits

No fresh real-device, Safari, reduced-motion runtime, frame-rate, CPU/network or comprehensive accessibility results were obtained for James's site. Reduced-motion handling was inspected in source only (lines 1699–1702 and the JavaScript reduce branches). Escape initiated case dismissal and changed the route back to `/`, but final focus restoration after its closing animation was not sampled. The phone journey's first card populated after navigation; a later exact-name Next locator failed, so Next/swipe coverage is unverified. No timing-sensitive claim relies on that failed action. Source timings are nominal CSS/JavaScript values, not measured user-perceived durations.

No portfolio UI source changed during this study. Current task progress belongs in [IMPLEMENTATION_PLAN.md](planning/IMPLEMENTATION_PLAN.md).

---

# Historical James Chugh reference study and entrance proof

Captured 19 October 2026 from <https://www.jameschugh.com/>. Scope: whole-homepage inventory, deep entrance/journey/project-box investigation, then one entrance adaptation for user review. Existing project facts and pixel artwork are preserved. UI Clone remains uninstalled; no deployment is authorized.

## Evidence and confidence

Raw public HTML, recordings, screenshots and runtime samples are in `work/reverse-engineering/james-reference/` (ignored). Source line references below refer to its `home.html`, not the live document after future changes. `runtime.json` records isolated desktop 1440×900, touch phone 390×844, and reduced-motion contexts. `focus/runtime.json` records 52 additional landmark/project samples. These are evidence captures, not a reusable copy of James's site for publication.

All three contexts had no JavaScript page errors. Public-source values below are distinguished from runtime observations and deliberate adaptation choices. No curve-fitting output or cross-artwork pixel score was used to select implementation values.

Captured HTML SHA-256: `41D8A8AD5CD28A402425B653F98BBD95AFEE0491C98BB7325968BB03FEC84A17`.

## Homepage inventory and adaptation decisions

| Reference system | Observed mechanism / source lines | Decision for Dexter |
| --- | --- | --- |
| Valley entrance | Depth-map WebGL, pointer parallax, landmark focus and detail sheets; 6056–6278 | Adapt full-width composition, layered depth, landmark focus and story handoff. Keep independent original pixel assets and native project links. Entrance proof delivered. |
| Introduction | Scroll-linked words and movable notes; 6287–6388 | Adapt a brief student → leader → builder story beat using verified roles; no invented anecdotes. |
| Journey | Large illustrated map, overview/focus/travel/overview, stop cards, pan/zoom and photo dialog; 6396–6761 | Later rebuild: camera follows Dexter's five milestones; phone uses explicit chapter controls. Do not reproduce James's nine-stop biography. |
| Project box | Constructed CSS 3D box, lid, rising cards, extraction, case-study expansion; 6768–6875 and 8467–8571 | Later rebuild around three genuine project records. Keep existing dedicated URLs. The current flat deck is not equivalent and has not been rebuilt in this proof. |
| Brand/web carousel | Horizontal movement and 2.2s auto-advance until interaction; 8597–8605 | Omit autoplay. Dexter already has a project archive; preserve direct navigation instead of inventing a second portfolio. |
| LastLook feature | Product-specific scroll narration; 8783–8791 | No direct equivalent without a verified flagship story. Revisit existing project evidence rather than imply a shipped app or results. |
| Toolkit gift | Tap/click unwrap and tool details; 8655–8707 | Defer. Not needed to establish the entrance/journey/work experience. |
| Process | Scroll path progression; 8729–8741 | Defer until a project has enough verified process evidence. |
| Personal section | Draggable photographs, notes and personal objects; 5728 onward / 8748–8754 | Keep existing verified personal content; no new hobbies, travel, photos or routines invented. |
| Guestbook | Moving notes, modal forms and submission; 8846–9095 | Omit: existing brief excludes a backend and contact form. |
| Contact | Social links, copy feedback and booking service modal; 8772–8777 / 8895–8931 | Preserve email/social/CV request destinations. No booking backend added. |
| Global details | Sound, synthesized music, custom pointer, visitor counter, birds and history; 9108–9298 | Omit sound, counters and custom pointer. Preserve standard pointer, focus and native browser behavior. |

## Entrance specification

**Source:** desktop valley height 260vh (line 99). Its usable scroll interval is total height minus viewport: 160vh. `layoutValley` fits the painting within the viewport (6140–6150). The initial camera eases down from 1.18 toward 1, while depth magnification is separate (6046–6060, 6251–6278).

- Depth gain is `1 + smoothstep(progress) × (.02 + depth × .12)`, centred on normalized scene point `.52,.58`. Full-progress growth is 2–14%, not a dramatic multi-fold zoom.
- Pointer offsets use width/height factors `.005,.0025`, scaled by depth. The depth map and DOM hotspot transforms share the same model.
- Intro copy travels upward by 35% of viewport height, fading over progress approximately .02–.30. Place labels disappear early; scrolling beyond .04 clears landmark focus.
- Landmark selection targets scale 1.32 on desktop and 1.9 on phone and frames the associated information sheet. The source uses exponential settling; it is not a spring extracted from pixels.
- The reference folds completed long tracks and compensates scroll position. Some scenes hold forward progress rather than reversing on every upward scroll. Do not assume ordinary reversible scrub behavior.

**Runtime confirmation:** clean desktop hero started at 2340px high for a 900px viewport. Copy opacity decreased from 1 to .666 at y240 and .070 at y480, then to 0. The separate camera remained approximately scale1 while layer magnification progressed. After completion the hero folded to900px, changing scroll position; this is recorded, not treated as a capture failure. Landmark sampling approached scale1.318 by the final sample, corroborating the1.32 target. The phone hero was844px high with coarse pointer; it had no desktop scroll interval.

**Dexter adaptation implemented:** full-width town camera starts at scale1 rather than the previous .76 postcard. Independent hill/terrain/building/front factors are1.056/1.08/1.08/1.14 using the reference depth model. Focal point is52%/58%; scroll interval is160vh. Copy exits over35vh. Desktop pointer hover approaches a landmark at1.32; native project links remain links. Hover activates only after readiness, ends on scroll, and respects pause.

The uniform camera push to1.12,5vh upward travel, right-side heading placement and dark story veil are **deliberate adaptation choices**, not measured James values. They suit the existing building layout. The veil presents verified student/leadership/builder roles before the journey; it yields immediately when a town link receives keyboard focus. Mobile, reduced motion, missing images and missing JavaScript keep the static town. No WebGL, smooth-scroll dependency or reference artwork was added.

## Journey specification for the later phase

**Source (6396, 6663–6750):** nine stops, map coordinates4720×3900; desktop track956vh. Widths≤1100px use one-viewport direct navigation. Phases are hold0–5%, zoom5–12%, traverse12–91%, then overview exit over7% more. Route length is measured from SVG; each stop receives a sinusoidal pacing adjustment.

The camera follows route position using frame-time exponential interpolation, preserving room for the story card. Desktop focus scale is `clamp(viewportWidth/3000,.44,.6) × userZoom`; tablet .52 and phone .5. The path reveals with stroke offset. Phone route drawing jumps to the requested stop while the camera glides. Stop state updates the story, timeline and spotlight. Pan/zoom, galleries and expandable text are separate controls.

**Runtime confirmation:** overview map matrix scale .1321 transitioned to .3652 near10% of the track, .461 near25%, and .48 near90%, with large translations that follow the world. This confirms camera movement, not just a line reveal. Samples at600ms intervals establish phase behavior; they are not exact settled timing measurements. Full manual pan/zoom, gallery, reverse-track and all phone gestures remain unmeasured.

**Next implementation contract:** retain Dexter's five verified milestones and existing semantic stories. Replace fixed-map presentation with a world camera plus chapter cards; require a readable phone view with explicit previous/next and direct chapter selection. Preserve all story content without scripts. Exact world layout and artwork will be specified against Dexter's map after entrance feedback; do not silently reuse James's geometry or biography.

## Project-box specification for the later phase

**Source (6768–6875, 8467–8534, 8569–8571):** box dimensions660×260×96; cards224×304; resting rotation X57°/Z30°. The lid opens to−72°, then cards rise after800ms with130ms stagger and1.2s transitions. Hover lifts a card70units; pointer tilt is X±2.5°/Z±4.5° and settles during selection.

There are **two `pick(k)` definitions**. The later definition at8467 wins by hoisting. Its active sequence lifts to cardHeight+40, waits520ms, turns toward the viewer at height190, waits1450ms, then expands. Do not use the earlier1500ms WAAPI implementation as the live contract. Expansion clips a case-study overlay from the card bounds, locks scrolling, updates the URL and moves focus. Closing reverses the expansion and restores focus.

**Runtime confirmation:** the first attempt clicked before the box opened and did not expand; that run is not accepted as selection evidence. A corrected capture explicitly entered the box stage and waited for opening. Its card rose from z≈68 on hover to z≈207 after selection, turned toward the viewer, settled at x222/y234/z190, and the case-study state became `cs ed open ready`. Runtime samples and `focus/case-open.png` corroborate the active sequence. Closing and reduced-motion behavior are source-derived and still need runtime testing before that phase ships.

**Next implementation contract:** create a physical project container and three extractable project cards using CSS3D and Dexter's actual previews. No copied metrics. Preserve dedicated project routes, focus return, Escape/dismissal, interrupted selection, direct URLs and touch controls. Desktop physicality must not require precise phone gestures. This work is intentionally not implemented before entrance review.

## Entrance verification and remaining limits

- Build and26focused site/motion tests pass. Added checks cover readiness-gated hover, shared pause, deferred restore after pointer leave, mid-return pause/resume, scroll cancellation and media cleanup.
- Chromium checked desktop1440×900, touch390×844 and320×844,768px layout, reduced motion, JavaScript disabled and failed image loading. No horizontal overflow or JavaScript page errors in those runs; native project destinations remain available.
- Source review identified hidden keyboard links under the veil, stale paused hover focus and hover before asset readiness. All three were repaired. Browser checks verify late-scroll keyboard visibility and pause/leave/keyboard-resume behavior.
- Recording-enabled p95 frame measurements varied≈39–52ms. A separate run without video measured static17.5ms, moving21.4ms and4×CPU moving21.9ms p95. These are headless desktop observations, **not60fps certification** or real-device evidence. SVG/ambient rendering still warrants profiling before production rollout.
- The existing source artwork has enough overscan for the proof's restrained movement. It does not provide hidden terrain or a depth map for a much larger fly-through. Additional artwork would be required before increasing that scope.
- This proof keeps native reversible scrolling and direct project links. It does not reproduce the reference's track folding, landmark detail sheets, pointer depth shader, sound or case-study overlays. These are explicit differences, not claimed parity.

**Review gate:** review the complete entrance recording and local page. Do not rebuild the journey or project box until the user gives feedback on this entrance direction. No push, merge or deployment was performed.
