# Free geographic journey and coordinated scroll scenes — 27 October 2026

Replaced the painted journey inset with the authorized full-screen geographic scene. Uses pinned MapLibre GL JS 6.16.0, OpenFreeMap/OpenStreetMap/OpenMapTiles data and NASA GIBS at low zoom; no map account, API token or billing is configured. Verified successful remote tile requests around P. Casal, Arlegui and BGC, then verified actual globe and extruded city rendering in Chromium. Data from those containing tiles includes 97/97/190 building features; positive render heights can be defaults, not measured heights. The OSM headquarters footprint is used for Globe Tower instead of a similarly named bus stop. All public coordinates, provider URLs and credits are recorded in ASSET_SOURCES.md. The generated atlas concept was not integrated.

Desktop over 1100px with a fine pointer uses a 500svh track and sticky full-viewport stage: globe overview, P. Casal, Arlegui, both campuses, Globe Tower and Manila pullback. Native chapter links jump to the corresponding scroll positions; the original five factual milestone records remain. Phone/coarse pointer uses one scene with direct links, previous/next and horizontal touch-swipe selection, retaining native vertical page scroll. Shared pause/reduced motion remove camera travel. Geographic init/load/context failure exposes all five HTML chapters with native anchors and local NASA fallback. No-JavaScript markup coverage is tested; browser JavaScript-disabled mode was not exercised. Remote provider availability remains an external dependency.

Added distinct ScrollTrigger-driven effects to introduction words/sticky notes, work-box arrival, toolbox drawer arrival, photo/desk assembly, heading marks and contact actions. Live text, native details, six noninteractive photo placeholders and project routes remain. Initial word opacity uses navy/theme ink at a bounded readable floor and reaches full opacity by completion. Shared pause/reduced-motion/focus settle effects; previews/hidden document suspend visual updates. This retains the existing native project-box reveal and drawer interactions rather than reproducing James's entire implementation or installing smooth-wheel scrolling.

Final `npm run verify` passed: production build and 148 tests, 0 failures. Eight journey tests cover native/static chapter content, camera bounds/endpoints, phone/reduced motion, desktop jump positions, mobile next/swipe vs vertical movement, shared pause, loading failure recovery and direct-hash alignment. Updated obsolete shared-painted-backdrop expectations to the new geographic boundary. New dependency install reported 0 vulnerabilities. Source/build fingerprint and the executed log are linked below.

In-app Chromium checked 1440×900 desktop night/day, all geographic chapter destinations through choices, full 900px sticky stage/4500px track, keyboard chapter selection and direct chapter URLs. Real building geometry and on-screen provider attribution were visible. Checked 390×844 phone day/night and 320×568 night: no page-width overflow in measured states, links/previous-next functional, and short screens retain vertical scroll through a minimum-height scene. Direct native pointer chapter clicks retained the same stage top coordinate; the Playwright locator's automatic centering caused a separate apparent scroll shift, distinguished through native coordinate input. Horizontal touch behavior is unit-tested, not tested on physical touch hardware. FormProof Enter/open and Escape/return-to-origin passed after page motion changes. Introduction, toolbox and photo section renders were inspected and captured.

Corrections during verification: the local server rejected .mjs modules as octet-stream, so vendor output uses .js ESM extensions (only sibling filenames rewritten; BSD license retained). The server's future .mjs MIME mapping was also corrected. A renderer failure before that fix visibly exposed readable fallback content. Phone checks corrected the BGC description color, heading/compass clearance, control/footer spacing and direct-hash stage alignment. No screenshot is proof of actual Safari, complete accessibility or smooth frame budgets.

Evidence: [checks](../output/playwright/geographic-journey-2026-10-27/checks.json), [candidate](../output/playwright/geographic-journey-2026-10-27/candidate.json), [executed verify log](../output/geographic-verify.log), [data checks](../output/geographic-data-check.json), [Earth overview](../output/playwright/geographic-journey-2026-10-27/earth-overview.jpg), [BGC night](../output/playwright/geographic-journey-2026-10-27/bgc-night.jpg), [Arlegui](../output/playwright/geographic-journey-2026-10-27/arlegui-night.jpg), [P. Casal day](../output/playwright/geographic-journey-2026-10-27/pcasal-day.jpg), [phone night](../output/playwright/geographic-journey-2026-10-27/phone-bgc-night.jpg), [small phone](../output/playwright/geographic-journey-2026-10-27/small-phone-night.jpg), [introduction](../output/playwright/geographic-journey-2026-10-27/scroll-introduction.jpg), [toolbox](../output/playwright/geographic-journey-2026-10-27/scroll-toolbox.jpg), [about](../output/playwright/geographic-journey-2026-10-27/scroll-about.jpg).

Limits: actual iPhone Safari/touch hardware, live OS reduced-motion change, forced network/WebGL loss after successful load, full assistive-technology/contrast/zoom checks, GPU/frame and cold-network performance remain unverified. Provider heights/footprints can be incomplete and these are block extrusions, not Google photogrammetry. Selected specialists were the existing web-development workflow, Impeccable direct-context fallback and the previously read animation guidance; browser/Node checks supplied evidence. No publication, commit, push or merge occurred.

---

# One-line desktop headline — 27 October 2026

Widened the upper-left hero container so “Curious enough to ask.” fits on one desktop line at the existing display size. Narrow breakpoints retain their responsive widths. `npm run verify` passed: build and 143 tests. In-app Chromium at 1440×900 confirmed a single text range rectangle for the first phrase and visually checked the result. [Screenshot](../output/playwright/editorial-entrance-2026-10-27/desktop-one-line.jpg). Actual iPhone Safari remains untested; no publication occurred.

---

# Editorial entrance, CV navigation and unobstructed landmarks — 27 October 2026

Implemented Dexter's confirmed choices: removed the View work/Contact hero buttons and top-left nameplate, moved the existing headline/supporting text to a larger upper-left editorial block, moved its contrast shading left, and lowered all three artwork-relative labels beneath their building fronts. Added Curriculum Vitae to the bottom navbar using the existing CV-request mailto, not a nonexistent download; phone shows CV with the full accessible email-request label. No email was sent. Existing contact CV request remains valid.

Removed obsolete hero-action controller writes and their now-inapplicable test. Updated markup assertions for absence of duplicate controls and presence of the CV email destination. Preview fallback focus now uses Home in the navbar. Section tracking excludes mailto links, avoiding an empty-hash selector error and incorrect current-location state on CV.

`npm run verify` passed: build and 143 tests, 0 failures. An intermediate cleanup left a removed variable reference; the failing controller tests caught it and it was fixed before this final pass. In-app Chromium checked 1440×900 day/night, 390×844 day/night and 320×568 night; no page-width overflow in measured states. Navbar links retain 46px desktop/44px phone heights; 320px uses six controls around 47px wide. Short phones scroll the existing minimum-height scene. Campus Enter opened its preview and Escape closed it/restored Campus focus. Sampled browser error logs were empty. Actual iPhone Safari, full accessibility/performance and email delivery are untested. No publication, commit, push or merge.

Evidence: [checks](../output/playwright/editorial-entrance-2026-10-27/checks.json), [candidate](../output/playwright/editorial-entrance-2026-10-27/candidate.json), [desktop night](../output/playwright/editorial-entrance-2026-10-27/desktop-night.jpg), [desktop day](../output/playwright/editorial-entrance-2026-10-27/desktop-day.jpg), [phone night](../output/playwright/editorial-entrance-2026-10-27/phone-night.jpg), [phone day](../output/playwright/editorial-entrance-2026-10-27/phone-day.jpg), [small phone](../output/playwright/editorial-entrance-2026-10-27/small-phone-night.jpg). This entry supersedes T-23's hero-action behavior, as those actions were explicitly removed.

---

# Synchronized entrance actions — 27 October 2026

View work and Contact were outside the animated intro copy and visible before landmark arrival. The entrance controller now copies the landmark opacity, visibility, pointer-events and inert gate to their shared navigation container each frame. They fade with Campus/Workshop/Library at 3.9–4.3 seconds and activate at arrival. Replay, interruption and static fallback all use the same controller state. No-JavaScript links remain visible.

`npm run verify` passed: production build and 144 tests, 0 failures. Added checks at multiple timeline positions, replay, finish, phone/reduced-motion and saved-return entry, asserting identical landmark/action state and inactive hidden links. Browser rendering remains unverified while local browser access is disabled; these are controller tests, not real-device evidence. No publication occurred.

---

# Repeated theme-click highlight correction — 27 October 2026

Dexter reported a full-screen yellow tint after repeated theme clicks. The previous handler could skip/restart active view-transition snapshots and retained a WAAPI pseudo-element animation; the screenshot does not by itself establish which browser rendering behavior caused the tint. Removed that interruption path: disable the theme button through preparation and transition completion, ignore repeated requests while busy, and re-enable it in finally on success/failure. CSS now owns the circular pseudo-element animation, replacing the WAAPI handle. Temporary reveal attributes and geometry properties are removed after completion. Added user-select:none only to the theme button to prevent repeated-click text selection; page text remains selectable.

`npm run verify` passed: production build and 143 tests, 0 failures. Regression tests now hold a transition open while repeated click calls arrive, verify a single capture/no skip, then finish it and verify cleanup, button unlock and the next opposite-theme toggle. Preparation and capture-failure coverage also pass. These API-double tests establish serialized handler behavior, not proof of the screenshot defect being absent in the actual browser. Browser access remains disabled in Work settings; rendered rapid-click and actual iPhone Safari checks remain open. No publication occurred. This entry supersedes the earlier latest-request-wins/WAAPI implementation details below.

---

# Button-origin day/night reveal — 27 October 2026

Implemented the authorized circular reveal using same-document View Transitions and WAAPI. The circle starts at the measured theme-button center and expands to the farthest viewport corner; the incoming theme sits above the old snapshot without the default crossfade. Both directions use the same origin and geometry. Desktop duration is 450ms, narrow layout 300ms, with the existing strong ease-out. New module ships through the existing build; no dependency added.

Incoming artwork URLs are deduplicated and decoded before capture with a 1200ms bound. The entrance settles before the old snapshot; the update callback applies the theme, allows the artwork observer to run, then bounds actual image decoding to 300ms before the new snapshot. Persistence/accessibility labels remain in the original theme commit function. Rapid requests invalidate stale work and skip the active transition. Keyboard, reduced motion, shared pause and unsupported APIs switch immediately; capture/animation failures retain the intended theme and clear temporary state.

`npm run verify` passed: production build and 142 tests, 0 failures. Six new deterministic tests cover farthest-corner geometry, identical origin in both directions, cleanup, phone duration, immediate fallback cases, rapid requests during preparation and capture failure. These use browser API doubles; they do not prove rendered animation, real image-network behavior or Safari compatibility. CUA inventory reported `Local browser use is disabled in Work settings`; no fresh browser animation/device check could execute. Required follow-up: enable browser use and inspect both directions, cold image loading, active-animation interruption, reduced motion and real iPhone Safari. No publication, commit, push or merge.

Research basis: [MDN lifecycle/custom animation](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), [Chrome circle demo](https://view-transitions.chrome.dev/circle/spa/), [Safari 18 same-document support](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/). Implementation is local vanilla JavaScript, not copied demo source. Candidate source/build hashes: output/theme-reveal-2026-10-27/candidate.json.

---

# Hero text-art consistency correction — 27 October 2026

Dexter flagged the different day/night hero marks and confirmed the coral stroke should be a strikethrough. The hero now shares the full yellow backing and original coral strikethrough in both themes. Other section-specific night readability corrections remain. `npm run verify` passed with 136 tests and 0 failures. Source inspection confirms the shared pseudo-element geometry (stroke top 43%, height .2em) with no night hero override. A fresh rendered check could not run because local browser use is disabled in Work settings; earlier underline screenshots do not represent this correction. No publication occurred.

---

# Stable landmark overlays and night text readability — 27 October 2026

Fixed competing transform ownership: pointer atmosphere previously overwrote the entrance controller's landmark transform on the first mouse movement. The controller now owns building-label camera transforms; pointer effects move only the decorative foreground. Removed the label transform transition so it follows camera updates directly. Regression assertions cover pointer movement, reset and cleanup without changing landmark transforms.

Night filled heading marks now back the full dark letterforms. The hero coral strike becomes an underline in night mode; introduction, toolbox and contact strokes sit below the letters; outline circles have more clearance. All eight distinct motifs and day treatments are retained.

`npm run verify` passed: production build and 136 tests, 0 failures. In-app Chromium at 1440×900: label rectangles were exactly identical before/after first pointer movement in night, after switching to day, and after a saved-night reload. Decorative foreground translation changed in each check, confirming pointer handling ran. Visually reviewed all eight night heading treatments; 390×844 hero/contact checks showed readable marks and no horizontal page overflow. This is targeted visual verification, not a full contrast/accessibility audit or actual iPhone Safari test.

Evidence: [recorded checks](../output/playwright/overlay-readability-2026-10-27/checks.json), [candidate fingerprint](../output/playwright/overlay-readability-2026-10-27/candidate.json), [night hero](../output/playwright/overlay-readability-2026-10-27/night-hero.jpg), [introduction/journey](../output/playwright/overlay-readability-2026-10-27/night-intro-journey.jpg), [work](../output/playwright/overlay-readability-2026-10-27/night-work.jpg), [toolbox](../output/playwright/overlay-readability-2026-10-27/night-toolbox.jpg), [about](../output/playwright/overlay-readability-2026-10-27/night-about.jpg), [services](../output/playwright/overlay-readability-2026-10-27/night-services.jpg), [contact](../output/playwright/overlay-readability-2026-10-27/night-contact.jpg), [phone hero](../output/playwright/overlay-readability-2026-10-27/phone-night-hero.jpg), [phone contact](../output/playwright/overlay-readability-2026-10-27/phone-night-contact.jpg). No publication, commit, push or merge. T-17's broader choreography remains separate.

---

# Generated night valley and intro foreground — 27 October 2026

Integrated the authorized night background and generated matching transparent tree/shrubs/stone-wall foreground using the built-in image tool. Sources, full prompts and checksums are in ASSET_SOURCES.md and output/artwork/. Foreground PNG is 1672×941 RGBA with center alpha 0; background is 1671×941. Lossless WebP encoding retained decoded RGBA pixels/dimensions exactly. Night background/foreground total 2,701,726 encoded bytes. Existing day images and cloud derivatives retained their prior bytes; generated PNGs remain intact.

New `theme-artwork.js` selects initial saved-theme sources before stage image decoding, swaps entrance and journey images on root theme changes, settles interrupted playback, and recovers failed night images to day without looping. Published both optimized night files through the existing manifest/build. Removed night world's old brightness/saturation filter, softened night text shading and cooled the shared entrance clouds. Existing motion geometry and phone/reduced-motion fallback behavior remain.

`npm run verify` passed: build and 136 tests, 0 failures. New tests cover saved-night selection without canceling initial entrance, live theme swaps/callback, night-image error fallback/cleanup, foreground RGBA metadata and actual built night references. Updated a source-attribute counting assertion to distinguish `src` from `data-day-src`; preserved the existing journey image/dimension contract. Initial failures were corrected before this final pass. [Executed verification log](../output/artwork/night-verify.log).

In-app Chromium checks: 1920×990 desktop night scene, 35% paused intro with night tree/wall visibly framing the scene, theme switch during that intro returning all three images to day and settling phase, saved-night reload selecting complete night sources, Workshop Enter/open and Escape/focus return, night journey map, and 390×844 static phone night view. No page-width overflow in recorded final desktop/phone states. Both building placement and foreground framing were visually checked against the actual art; this is not a pixel-registration guarantee. The phone retains the existing hidden foreground/static entrance behavior.

Evidence: [checks](../output/playwright/night-art-2026-10-27/checks.json), [candidate build manifest](../output/playwright/night-art-2026-10-27/candidate.json), [settled night](../output/playwright/night-art-2026-10-27/desktop-night.jpg), [35% intro/tree/wall](../output/playwright/night-art-2026-10-27/night-intro-tree.jpg), [night project preview](../output/playwright/night-art-2026-10-27/night-preview.jpg), [journey](../output/playwright/night-art-2026-10-27/night-journey.jpg), [phone](../output/playwright/night-art-2026-10-27/phone-night.jpg). Intro frame was selected through the existing local debug slider; normal user-facing URL was restored afterward. The saved build has 53 files. A cached daytime source and the night source can both be observed during authoring; cold-load/network/GPU performance has not been measured by this pass.

Limits: actual iPhone Safari, forced browser network failure, fresh no-JavaScript/live reduced-motion/zoom checks and full accessibility/contrast/performance remain unverified here. Error fallback has deterministic test coverage, not a browser-intercept test. No dependency install, publication, commit, push or merge. T-17's broader choreography work remains separate.

---

# Hero action glass — 27 October 2026

Applied the approved glass treatment to View work and Contact. Primary uses 30% white tint and brighter inset rim; secondary uses 12%; both use white text and the existing 16px desktop/8px phone blur. Added visible white focus and solid dark fallback for unsupported filtering/reduced transparency. Native anchor behavior and entrance interruption are unchanged. Root DESIGN.md owns this styling.

`npm run verify` passed: build and all 132 tests. In-app Chromium reviewed desktop day/night, phone night at 390×844 and small phone day at 320×568. Enter on View work navigated to `#work`; Enter on Contact navigated to `#contact`. Checked phone states had no page-width overflow, both 320px buttons retained 44px height, and computed phone blur was 8px. Evidence: [button detail](../output/playwright/hero-actions-2026-10-27/actions.jpg), [desktop day](../output/playwright/hero-actions-2026-10-27/desktop-day.jpg), [desktop night](../output/playwright/hero-actions-2026-10-27/desktop-night.jpg), [phone night](../output/playwright/hero-actions-2026-10-27/phone-night.jpg), [small phone](../output/playwright/hero-actions-2026-10-27/small-phone-day.jpg), [checks](../output/playwright/hero-actions-2026-10-27/checks.json), [candidate](../output/playwright/hero-actions-2026-10-27/candidate.json). Actual iPhone Safari, forced transparency fallback and full contrast/performance checks remain untested. No release, commit, push or merge.

---

# James-style glass and entrance details — 27 October 2026

Dexter clarified that glass should match James's actual material, then flagged the high/left scroll cue and repeated hero name. Reopened the live reference in Chromium and sampled settled computed styles in both themes. [Reference samples](../output/playwright/james-glass-2026-10-27/reference-styles.json): day label rgba(18,26,34,.36)/white/12px blur; night label rgba(30,30,30,.38); day navigation white 62%→42% gradient/24px blur; night navigation charcoal ~82%; small controls neutral white ~34%/charcoal ~38% with 16px blur. The reference's reading sheet was opaque; Dexter's denser reading preview remains a deliberate adaptation. These observations supersede the earlier generic cream/navy glass approximation. No third-party artwork or application code was copied.

Implemented the distinct materials, capsule labels with inner rim and short stems, brighter glass controls, translucent active states and navigation gradient. Phone uses 8px label/control blur and 12px navigation blur. Centered the desktop scroll cue 110px above the stage bottom, removing the 190px/left placement. Removed the repeated name from the hero supporting line; it now reads “Computer Engineering student · T.I.P. Manila”, retaining the header nameplate. Hero text background remains transparent.

Build and all 132 tests passed (`npm run verify`). In-app Chromium desktop day/night and phone day/night checks passed with no page-width overflow in the captured 1440×900, 390×844 and 320×568 states. Computed desktop cue center matches navigation center and leaves a 34px vertical gap. Keyboard opening of Campus and Escape dismissal restored focus to Campus. Phone correctly hides the scroll cue and reports 8px label/12px navigation blur. Evidence: [checks](../output/playwright/james-glass-2026-10-27/checks.json), [day](../output/playwright/james-glass-2026-10-27/desktop-day.jpg), [night](../output/playwright/james-glass-2026-10-27/desktop-night.jpg), [preview](../output/playwright/james-glass-2026-10-27/preview-night.jpg), [phone day](../output/playwright/james-glass-2026-10-27/phone-day.jpg), [phone night](../output/playwright/james-glass-2026-10-27/phone-night.jpg), [small phone](../output/playwright/james-glass-2026-10-27/small-phone.jpg), [candidate fingerprint](../output/playwright/james-glass-2026-10-27/candidate.json).

Actual iPhone Safari, GPU/performance measurements, forced no-filter/reduced-transparency rendering and full accessibility remain untested. This is not a production readiness claim. No publish, commit, push or merge occurred.

---

# Frosted glass overlays — 27 October 2026

Applied Dexter's approved glass direction to the nameplate, scene controls, landmark labels, scroll cue, bottom navigation and project preview. Hero text remains directly on the art with transparent background; physical wood/paper sections and case-study reading pages are unchanged. Shared theme tokens provide cream/navy tint, theme-specific ink, a thin edge and soft offset shadow. Desktop blur is 16px, phone blur 8px with a denser tint. Reading preview is ~94% opaque on desktop and ~96% on phone. Solid fallback declarations precede feature-detected backdrop filters; a reduced-transparency media rule removes filtering. Unsupported filters/reduced-transparency rendering were source-reviewed, not forced in the live browser.

`npm run verify` passed: build and 132 tests. In-app Chromium visual inspection covered desktop day/night, day/night project previews, 390×844 phone day/night and night preview, plus 320×568 day. Computed styles confirmed 16px/8px blur, transparent hero background and denser reading panel. Initial inspection found the generic glass selector overriding the denser preview background; corrected its specificity, rebuilt/retested, and replaced affected preview captures. No horizontal page overflow on checked phone states; desktop preview opening, Escape dismissal and focus return to Workshop were exercised. No new runtime dependency or JavaScript behavior was added.

Evidence: [final checks](../output/playwright/glass-2026-10-27/checks.json), [desktop day](../output/playwright/glass-2026-10-27/desktop-day.jpg), [desktop night](../output/playwright/glass-2026-10-27/desktop-night.jpg), [day preview](../output/playwright/glass-2026-10-27/preview-day.jpg), [night preview](../output/playwright/glass-2026-10-27/preview-night.jpg), [phone day](../output/playwright/glass-2026-10-27/phone-day.jpg), [phone night](../output/playwright/glass-2026-10-27/phone-night.jpg), [phone night preview](../output/playwright/glass-2026-10-27/phone-preview-night.jpg), [small phone](../output/playwright/glass-2026-10-27/small-phone-day.jpg). [Candidate fingerprint](../output/playwright/glass-2026-10-27/candidate.json) identifies source and published-build CSS in this dirty working tree. Earlier small-surface captures remain applicable: the confirmation change only corrected preview opacity specificity and reduced-transparency override specificity.

Limits: actual iPhone Safari, blur GPU/load performance, live reduced-transparency behavior and full accessibility/contrast evaluation remain unverified. No production publication, commit, push or merge. T-17's broader entrance choreography remains separate.

---

# Entrance panel and landmark correction — 27 October 2026

Removed the rejected cream hero panel at every breakpoint: no intro background, border, padding, radius or shadow. Cream live text now sits directly in the painting with soft scene shading, and keeps the supplied yellow/coral accent. Restored desktop landmark labels to artwork coordinates corrected for cover cropping; their containing navigation follows the entrance world's transform. Removed the forced desktop bottom-row placement. At widths ≤1000px, retained readable direct links because the cover crop hides some buildings; suppressed the redundant cue there to avoid overlap. The workshop label uses its doorway/lower facade to clear hero actions on short desktop windows. No new artwork or dependency.

`npm run verify` passed with 132 tests. The added regression test covers label/world transform synchronization across progress changes; existing static-context coverage now checks no label transform on phone/reduced-motion/failed-artwork paths. In-app Chromium checks at 1920×990, 1280×600, 768×900, 390×844 and 320×568 found transparent intro background, no page-width overflow, all three links within the stage, and no link overlap with hero text/actions. Used separate settled captures after resizing; early rapid-resize samples were superseded. All three links opened the correct named project via Enter; Escape dismissed each. Night-theme heading/supporting-copy colors were cream with transparent intro background.

Evidence: [bounds](../output/playwright/entrance-correction-2026-10-27/bounds.json), [project flows](../output/playwright/entrance-correction-2026-10-27/flows.json), [desktop](../output/playwright/entrance-correction-2026-10-27/desktop.jpg), [short desktop](../output/playwright/entrance-correction-2026-10-27/short-desktop.jpg), [tablet](../output/playwright/entrance-correction-2026-10-27/tablet.jpg), [phone](../output/playwright/entrance-correction-2026-10-27/phone.jpg), [small phone](../output/playwright/entrance-correction-2026-10-27/small-phone.jpg), [night](../output/playwright/entrance-correction-2026-10-27/night.jpg). This is targeted layout and interaction evidence; full contrast/performance/reduced-motion live switching and actual iPhone Safari remain outside this pass. No glassmorphism implementation, publication, commit, push or merge occurred. T-17's broader choreography remains active.

---

# Varied playful homepage headings — 27 October 2026

Extended the supplied lettering direction across eight main homepage headings with distinct motifs: hero brush/strike, introduction double underline, journey circle, work brackets, toolbox loop, about oval, services brush underline/rays, and contact sweeping arrow underline. Retained yellow/blue/peach fills and coral linework, selectable live text, existing motion and native controls. Added emphasis spans to the journey and services headings without changing their text. [Candidate source/built CSS fingerprints](../output/playwright/playful-headings-2026-10-27/candidate.json) identify the tested changes in the uncommitted working tree. Scope and visual specification are in root DESIGN.md; T-18 owns task status. T-17's broader entrance composition/choreography is separate.

Build and all 131 Node tests passed after the implementation and tablet correction. In-app Chromium inspected desktop/narrow layouts and day/night colors. Bounds at 320, 390, 768 and 1440px showed all eight text marks in the viewport and no page-level horizontal overflow after clipping the project-box lid's decorative horizontal overhang to its own section. The tablet overhang was observed at 790px document width on a 768px viewport before correction. The services swash sits below the lettering so it does not cover white night-theme text. Filled marks retain navy ink; unfilled circle/underline text follows theme ink.

Evidence: [bounds](../output/playwright/playful-headings-2026-10-27/bounds.json), [desktop introduction/journey](../output/playwright/playful-headings-2026-10-27/desktop-introduction.jpg), [toolbox](../output/playwright/playful-headings-2026-10-27/desktop-toolbox.jpg), [work](../output/playwright/playful-headings-2026-10-27/desktop-work.jpg), [phone introduction](../output/playwright/playful-headings-2026-10-27/phone-introduction.jpg), [phone night about](../output/playwright/playful-headings-2026-10-27/phone-night-about.jpg), [night services/contact](../output/playwright/playful-headings-2026-10-27/desktop-night-services-contact.jpg). Screenshots and bounds are targeted UI evidence, not full accessibility or real-device coverage. iPhone Safari remains untested. No publication, commit, merge or push.

---

# Entrance lettering detail — 27 October 2026

Implemented Dexter's supplied crop as the reference for the hero lettering: original yellow brush-swash geometry behind “Ready to build.” and a thin coral stroke across it, replacing the rounded yellow marker for this phrase only. Text remains selectable HTML with navy ink on yellow. No image-generation service or third-party artwork was used. The confirmed broader entrance composition and choreography remain T-17 work; this is a scoped text-art change.

`npm run verify` passed: build and 131 tests, no failures. In-app Chromium visual inspection covered desktop and 320×568 narrow layout; the latter had no page-width overflow and the phrase fit on one line. Evidence: [desktop](../output/playwright/lettering-2026-10-27/desktop.jpg), [text detail](../output/playwright/lettering-2026-10-27/text-detail.jpg), [phone](../output/playwright/lettering-2026-10-27/phone.jpg). This does not establish iPhone Safari, full accessibility or future entrance-motion behavior. Impeccable context launcher did not run; used existing PRODUCT.md/DESIGN.md and the craft-floor guidance directly, without downloading an engine. No production release occurred.

---

# James reference refresh — 27 October 2026

Bounded reference study completed against `https://www.jameschugh.com/` on 27 October 2026, using in-app Chromium and a separate public-source HTTP fetch. [Study and source-line provenance](JAMES_MOTION_STUDY.md); [raw source, screenshots and sampled computed styles](../output/reference-study-2026-10-27/). Captured source SHA-256: `f32d06c49b2b99db526d35d3e6f17192dce6ee095c089c6d387650ca92ed1f78`.

Observed desktop 1440×900 entrance/scroll, landmark focus at scale 1.32, journey camera movement and selected-card expansion into the EazyDiner case study with URL/focus/scroll-lock updates. At 390×844, observed one-viewport hero, hidden WebGL canvas, no page-width overflow, landmark sheet and first direct journey stop. Narrow viewport retained fine pointer; it was not touch or Safari verification. Exact animation timings and unexercised systems remain source-derived. Phone Next locator failed; final Escape focus restoration, live reduced motion, performance and real devices were not verified. No REA MCP/CLI execution is claimed.

Only reference evidence and project records changed. No portfolio HTML/CSS/JavaScript, production artifact, commit, push, merge or deployment changed in this study. Updated root DESIGN.md with Dexter's confirmed entrance-first direction; T-16/T-17 in the single task table distinguish completed investigation from pending implementation. Earlier `npm run verify` in this chat passed all 131 tests; it does not verify the future entrance or James's site.

---

# Shared workflow adoption - 27 October 2026

Checked at 2026-10-27 08:11 Asia/Manila. This entry verifies the workflow installation and existing build/test command, not release readiness or new rendered behavior. No UI source, approved visual tokens or artwork were changed by this task; package.json gained only the verify script. Original docs and unrelated uncommitted work were preserved. Long old handoffs/prompts/plan/design records are retained under docs/history/ with local links rebased.

| Check | Observed result and practical limit |
| --- | --- |
| Production build and Node suite | `npm run verify` completed successfully on Node v24.22.1: production build succeeded; 131 tests passed, 0 failed, 0 skipped. These are actual current results; browser/device/public-deployment checks were not executed here. |
| Candidate identity | Base HEAD `a8779caa288a2ed8129bd80817e5bb322cbc2c2b` plus uncommitted work. Production artifact fingerprint `31e8bad1be38322d9bdb96752f5a1bfa8f4d7c59f3fa0f9d78b88700f41c6ba7`; 50 files, 4951050 bytes. Exact file hashes: [build manifest](../output/workflow-2026-10-27/build-manifest.json). This does not assert that the same artifact is deployed. |
| Instructions and links | Installed skill passed the bundled skill validator. The installation's 75 local Markdown links resolved, including archived links. Global instructions now route substantial web work to the shared skill; only fresh-session use can establish automatic skill discovery. |
| Recovery guards | Exact-file backups, SHA-256 preflight and rollback-readiness check passed. Isolated guard checks passed update, creation, rollback and refusal to overwrite a later user edit. No live production rollback was performed. |
| Setup readiness | Existing redacted configuration doctor ran successfully. It reports local configuration/executable readiness, not connector authentication. The shell process and MCP server can inherit different key availability; no credential was read or copied. |
| Advisory review | One live Jev review of the installed workflow returned likely-satisfied judgments for proportional scope, decision authority, publishing approval and evidence/fallback handling. These are semantic opinions, not behavioral tests or project certification. |

Observed-result summary: [checks.json](../output/workflow-2026-10-27/checks.json). Required next-candidate procedures are in [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md); current task status is only in [IMPLEMENTATION_PLAN.md](planning/IMPLEMENTATION_PLAN.md). Prior 24 October browser evidence below remains historical unless its applicability is explicitly established. Real-phone, actual zoom/live preference, supported-engine, assistive-technology, performance and production/migration acceptance remain unverified by this task. No commit, push, merge, deployment, account-setting change or memory write occurred.

---

# Bold handmade design implementation — 24 October 2026

Implemented the approved reference blend across all six public page types: official self-hosted Bricolage variable WOFF2 (600–800), Outfit reading text, navy/cream day/night tokens, capsule actions/navigation and six static marker accents. Preserved artwork, section order, journey, box, toolbox, desk, three projects, six placeholders and all factual evidence limits. No runtime dependency added. Font provenance/checksum/license are in docs/ASSET_SOURCES.md. Historical Fraunces files remain locally but are omitted from production.

**Production build and all 131 tests pass.** Added font-byte/preload/license checks and named navigation/filter semantics coverage; the headline lifecycle fixture now contains the actual marker markup. The final clean build validates HTML/CSS/module/image references and removes the temporary accessibility harness and axe bundle from dist.

Evidence folder: output/playwright/handmade-2026-10-24/. A combined desktop/phone review was followed by batch corrections and confirmation. Corrections: calmer hero size to avoid an orphaned ask.; organically rounded marker edges; dark focus rings on permanent cream controls; case contents changed from nested aside to named navigation; filters given a group role.

| Check | Result and limits |
| --- | --- |
| Responsive bounds | All six page types at 320, 390, 768 and 1440px: 24 combinations with no page-level horizontal overflow. Details in responsive-bounds.json. |
| Short screens | 320×568, 375×667 and 1280×600: no page overflow; following section starts at actual stage bottom; phone copy/shortcuts end before landmarks. Recorded in short-screen-bounds.json. |
| Animation frame | headline-active.png captures the actual split-word reveal with visible spaces and the marker intact. Heading height was 103.2px before, during and after reveal at 1440px. Restored HTML preserves the br and marker span. No extra animation added. |
| Keyboard previews | Enter opens each of the three landmark previews; Escape closes and restores focus to its originating landmark. All captured without horizontal overflow; keyboard-previews.json. |
| Day/night | Visual hero checks and night focus token confirmation: navy outline on cream capsules. Contrast pairs saved separately; reading text minimum 4.91:1 among checked surfaces, navy on cream 14.44:1. |
| Axe 4.10.3 | Final day/night home, archive, all three case studies, 404, and all three previews: zero violations. Archive incomplete role issue and case-study landmark violation were corrected. Full affected-node details retained in JSON. This is not WCAG certification. |
| No JavaScript | Sandboxed homepage preserves native shortcuts, three projects and five chapters. Sandboxed archive shows all 11 records and hides filters; no script camera created. |
| Failed fonts | Test-only harness deliberately breaks both font URLs: FontFace status error for both; fallback heading remains readable and no horizontal overflow at 390px. Production references remain valid. |

### Manual adjudication of homepage axe incomplete results

Each theme retains 42 color-contrast incomplete nodes. They are grouped by the same causes: scene icon/headline/supporting copy over image-backed ancestors; five short SVG waypoint numerals; journey caption over art; six drawer text nodes over wood gradients; photo heading/copy and twelve placeholder nodes over gradients; portrait/notebook/pinned-note text associated with pseudo-elements or overlapping paper geometry. These are requests for manual assessment, not automatic passes.

Checked actual surfaces and text tokens: cream-backed hero/control text 14.44:1; slate/cream 5.97:1; drawer darkest wood endpoint 6.35:1; waypoint numeral/background 9.37:1, active 7.33:1; photo-wall muted day 4.91:1 and night 7.83:1; navy/blue 11.74:1, navy/peach 10.16:1 and navy/mustard 11.83:1. Visual inspection of desktop/phone paper compositions found no text-on-text overlap in the reviewed views; desktop-desk.png records notebook and pinned notes. These groups are accepted for the reviewed settled states. Partially transparent animation frames, every scroll position and assistive-technology behavior remain outside that evidence.

### Remaining verification limits

Live OS reduced-motion switching, actual 200% browser zoom, real devices, cross-engine behavior, screen-reader testing and throttled CPU/network performance remain pending because the available browser capabilities expose viewport/visibility only. Existing reduced-motion and interruption unit tests still pass; they do not substitute for those live checks. No claim is made that the full previous release checklist is complete. No deployment, migration, commit or push performed.

---

# Whole-portfolio typography refinement — 24 October 2026

Implemented the user's expanded scope across the hero and whole portfolio: shared type tokens, calmer Fraunces heading sizes/tracking, Outfit reading text with consistent leading, constrained case prose, and aligned preview/card/drawer/archive titles. Hero supporting copy now shares one paper surface; the phone identity indent is removed. Journey weights match the installed Outfit 400 font. The desktop scroll cue was separated from the campus label. Existing facts, native destinations, artwork and animation lifecycle remain intact.

Build passes. All 129 existing tests pass after the stylesheet corrections; the final headline-size adjustment was subsequently rebuilt successfully. No tests were added to mirror static CSS.

Browser access was successfully rechecked in the in-app browser. A combined desktop/phone visual pass covered the homepage, FormProof preview, case study and archive, plus homepage day/night and short screens at 320×568 and 1280×600. Batch corrections were followed by confirmation captures. DOM width checks found no page-level horizontal overflow on all six public page types at 320, 390, 768 and 1440px (24 combinations). This is a targeted typography check, not proof that every scrolled control or interaction has been audited.

Evidence: output/playwright/typography-2026-10-24/ contains desktop.png, phone.png, case-study.png, headline-replay.png and responsive-bounds.json. At 1440px the final hero headline is 43.2px and occupies two lines. At 390px the identity padding is 0px. Replay was activated and the final semantic headline retained normal spaces; an intermediate split-word animation frame was not captured, so the previously reported first-reveal spacing issue still needs frame-level confirmation.

The optional Impeccable engine scan was unavailable (engine absent and cache unwritable). No new axe, actual 200% zoom, live OS reduced-motion, disabled-JavaScript, network/CPU-throttled performance or real-device result is claimed in this pass. Earlier reliability acceptance items remain pending where not explicitly verified here. Local implementation and screenshots do not establish release readiness. No deployment performed.

---
# Anime.js headline refinement — 23 October 2026

Spacing correction: the user supplied a screenshot showing collapsed word gaps during reveal and a jump when plain text returned. The headline's table display was replaced with normal block flow and fit-content sizing, retaining ordinary whitespace and the same paper treatment. Build and all 129 tests pass. Browser access still reports disabled, so the spacing remedy remains pending fresh rendered confirmation; no new browser result is claimed.

The user's requested Anime.js text enhancement is implemented on the main headline only. Anime.js 4.5.0 is pinned in package.json/lockfile and its official 118,678-byte minified ESM bundle plus MIT license are copied locally. Reading pages do not load the enhancement; no runtime CDN is used. This is an explicit new dependency authorized after the earlier reliability scope.

The entrance exposes a discrete waiting/reveal/settled cue. The text module reveals seven words with 500ms opacity/0.6em upward movement and 45ms stagger at the one-second cloud cue. It restores the semantic heading after completion/interruption. Keyboard/direct/static phone/reduced-motion/paused states, skip, resize and document hiding settle without a text animation. Repeated rendering does not restart the effect; pointer replay creates a fresh reveal with stale completion callbacks ignored.

Build and **129 tests pass**. New coverage includes the entrance cue, eight text lifecycle tests, semantic no-JS heading markup, homepage-only loading, production bundle equality with the installed official package and retained license. An independent import of the production ESM bundle confirmed all four used exports. The node lifecycle fixtures exercise behavior, not rendered Anime.js DOM layout or perceived smoothness. Browser access was rechecked and still reports disabled, so fresh playback, screenshots, split-text accessibility scan and performance remain pending. Earlier captures do not show this effect. No deployment performed.

---

# Historical reliability, clarity and motion implementation — 23 October 2026

Current local implementation supersedes the earlier screenshot/build records below. No commit, push, deployment or migration was performed. The existing 104-test baseline grew to 119 passing tests; the production build passes and validates generated local references. Subsequent reduced-motion focus-rule correction was checked in final confirmation. Historical browser captures do not verify the changed layout or motion.

| Check | Current result | Evidence / limits |
| --- | --- | --- |
| Entrance loading | Unit pass | Pending decode permits Skip, wheel, touch, scroll and navigation-key settlement; controls/destinations become reachable, loading cover is removed and late completion does not restart playback. Static phone/reduced/failure branches retain coverage. |
| Preview motion/history | Unit pass | Keyboard/direct/history and paused entry/exit are immediate; reduced-motion pointer fade remains. Camera transform is captured before cancellation. Rapid Back/Forward and Escape interruption preserve final state, scroll/focus and URL. |
| Cards/toolbox/archive | Unit + source pass | Initial-only reveal delays, immediate focus reveal and gated spatial hover/focus; pointer-only 140ms icon transition with immediate keyboard/reduced/paused/programmatic changes; URL categories restore selected state/counts/history without moving focus. Server filter controls are hidden with explicit CSS. |
| Public and review HTTP routes | Passed | Local dev server returned 200 for /, archive, three case studies, /404.html and four review routes. This is HTTP/source evidence, not browser interaction evidence. Review preparation is separate and final production rebuild removes those routes. |
| Pixel/geometry preservation | Passed | Independently decoded all eight optimized images and original PNGs with Pillow: exact RGBA byte equality and equal dimensions, including transparency. Manifest: scripts/valley-assets.json. |
| Image footprint | 37.99% lower | Referenced source image files: 6,324,759 bytes → 3,922,134 bytes. This is file payload, not measured loading/network speed. |
| Clean production output | Passed | 47 files; approximately 4.69 MB compared with 73 files / 29,383,002 bytes before this pass. Review output and a stale sentinel were removed by rebuilding. HTML/CSS/module references and canvas asset manifest validate. |
| Content and static fallbacks | Source/test pass | Specialty and separate identity, early case project names, six neutral noninteractive placeholders, native destinations, shared minimum hero height and hidden no-JS filter controls are present in generated output. Short-screen section boundaries still need rendered confirmation. |
| Browser availability | Blocked by environment | Rechecked during implementation: browser inventory empty; tool reports “Local browser use is disabled in Work settings.” User screenshot shows the Browser toggle enabled; retry still returned the same error. This discrepancy is unresolved. |
| Fresh visual/accessibility/performance | Not run | Four-width/six-route visual matrix; short heights; actual 200% zoom; live reduced motion; full native modal/filter flows; no-JS/failed-image browser fixtures; axe rerun with full incomplete-node details; cold 4× CPU/mobile-network baseline/comparison and warm scroll sample remain pending. |

Final confirmation results are recorded with the implementation handoff. Earlier axe summaries contain incomplete results without node details; they remain manual-review work and must not be treated as resolved by passing unit tests. Real-device, cross-engine, assistive-technology and production checks also remain open. The six placeholders are the approved content state; real photos are not a blocker for this version.

---

# Historical UI/UX refinement — 23 October 2026

Current local route: /. Preserves the painted valley, section order, three featured projects, journey, physical box, desk and six photo placeholders. No deployment, migration, commit or push was performed. Existing unrelated worktree changes were preserved.

| Check | Result | Evidence and limits |
| --- | --- | --- |
| Build and automated tests | Passed: 103/103 | Five public pages plus 404. Added shortcut/native-action, case-summary/contact and shared clipboard success/failure checks. |
| Responsive route matrix | Passed | All six page types at 320, 390, 768 and 1440 CSS px: no horizontal page overflow or broken loaded images. Screenshots cover desktop home/work/case study and phone home/preview/archive/contact/night About. |
| Project previews | Passed for tested flows | All three opened as desktop panels and phone sheets, with one visible project and heading focus; Escape restores the trigger. Back/Forward restores the preview. Direct query/hash close preserves the query. Six native Tab steps cycle screenshot → case study → close twice. Existing race/focus unit checks pass. |
| Archive and contact | Passed | Filters return 8 Data science, 2 Web apps, 1 Websites, 11 All; visible counts agree. Browser Copy email succeeds. Clipboard rejection feedback is unit tested. Email remains selectable and mailto/social/CV destinations remain explicit. |
| Accessibility scan | Zero reported violations in tested states | Existing installed axe-core 4.13.0, WCAG 2 A/AA, 2.1 AA and best-practice tags. Six routes × day/night at 375px iframe content width, plus three desktop project previews. Corrected journey-number contrast, warm contact/paper text contrast and keyboard access to the horizontal photo strip. Incomplete contrast items still need human review; this is not WCAG certification. |
| Keyboard | Targeted pass | Homepage Tab walk and native modal cycle checked. Focus rings are visible. The large gallery region can extend beyond one viewport; the bottom navigation does not cover the tested actionable links. This does not establish assistive-technology or cross-engine coverage. |
| Script-disabled fallback | Passed in sandboxed iframe | Scripts blocked using iframe sandbox; no approach-camera enhancement created. Five chapters, three project cards and both visible native shortcuts remain; no horizontal overflow at 375px. This is not a browser-wide JS-disabled context. |
| Failed valley image | Passed for recovery | Deliberately missing backplate in a temporary srcdoc fixture settles to arrived; project cards, chapters and shortcuts remain accessible; no overflow. Expected image failures recorded. |
| Reduced motion | Unit/static coverage retained | Live OS preference emulation is not exposed by the available browser controls. |
| Performance and zoom | Not run to requested conditions | Available browser capabilities expose viewport/visibility, not CPU/network throttling or preference emulation. Ctrl+plus did not change viewport/devicePixelRatio, so actual 200% zoom is unverified. No throttled performance result is claimed. |

Evidence: output/playwright/ui-finish/verification.json, accessibility-before.json, accessibility-confirmation.json, fallback-checks.json, modal-keyboard.json and JPG screenshots. The axe harness used an existing installed scanner, with no dependency changes. Its temporary dist/__verify__/ files were removed before the final build; the local harness source is retained in ignored work/ for reproducibility.

Remaining before release: actual 200% zoom, live reduced-motion preference, throttled mobile performance, real-device/cross-browser and assistive-technology checks; six real photographs with confirmed captions; deployment and migration verification. Earlier records below are historical.

---

# Connected homepage verification — 20 October 2026

## Hanging-photo wall implementation

Implemented a gated six-photo renderer, desktop CSS/SVG hanging wall, mobile snap strip, night palette and independent native lightbox. Build passes and all 98 Node tests pass, including 4 photo-wall rendering checks and 10 lightbox interaction checks (native fallback, modifier clicks, captions, focus/scroll restoration, backdrop, keyboard trapping and motion bypass/cancellation). Default content is empty, so no unfinished wall appears on the public homepage. Actual photo assets, visual responsive/day/night verification, real keyboard/browser checks and screenshots remain pending. Local browser inventory again reported browser use disabled in Work settings. Unit DOM doubles do not verify rendering or native browser behavior. No deployment performed.

## Latest UI refinement

The latest pass refines scene controls, landmark labels, section hierarchy, contact actions, and the shared project preview. It also changes the valley stage from a scroll container to overflow:clip after internal focus scrolling was observed in the preceding browser review. Production build and all 84 Node tests pass after these changes. The latest appearance and clipping fix have **not** been visually verified: local browser control reported that browser use is disabled in Work settings. The browser results below describe the preceding connected-home implementation, before this refinement. Recheck desktop/phone layout, sticky preview controls, dark theme and stage scroll position when browser access is available.

Current local route: /. The older /review/experience/ remains a separate prototype. Current implementation preserves the existing painted artwork and uses brief overview dialogs for the same three projects; no generated replacement map is used.

| Check | Result | Boundary |
| --- | --- | --- |
| Production build | Passed | Five pages plus 404; shared canonical entrance/atmosphere modules published under /world/. Review documents remain excluded. |
| Node suite | 84/84 passed | Includes modal history races, Forward ownership, focus/scroll restoration, modified clicks, unsupported-dialog fallback, keyboard/reduced-motion branches, Tab wrap, journey progress/pause, project box, content and local links/assets. DOM/media doubles are not a full browser audit. |
| Desktop project previews | Passed | Each building opens exactly one matching overview with heading focus and native case-study link; close restores its activation trigger. Campus panel uses opposite side. |
| History and direct entry | Passed | Browser Back/Forward restores FormProof; direct ClaimCheck hash opens immediately; closing preserves the existing query string. A card restores its activation viewport, including the browser’s pre-click auto-scroll. |
| Responsive panel/layout checks | Passed | 1440×900, 1024×768, 768×1024, 390×844, 320×740. Dialog fits and no horizontal page overflow in tested states. Portrait height was corrected to prevent rotated-image overflow. Viewport emulation is not real-device testing. |
| Keyboard | Passed for modal path | Heading focus, six Tab steps within visible controls, Escape and focus return. Explicit wrapping added after native browser-chrome focus was observed. Full-site keyboard audit remains outstanding. |
| Pause/theme/toolbox | Passed | Ambient overlay pauses; day/night changes the world treatment; toolbox exposes matching real technologies through native details. |
| Browser runtime | No console errors/warnings observed | Current in-app Chromium scenarios only; no cross-engine claim. |
| Visual review | Reviewed | Existing valley, desktop overlay, journey, project box, toolbox, personal desk and phone panel. Captures in output/playwright/connected-home/. |

The no-JS loading-cover problem is fixed in server-rendered markup. No-JS/native links and reduced-motion branches are covered by static/unit checks; dedicated live JS-disabled and reduced-motion browser contexts were not run in this pass. No measured performance trace, complete WCAG audit, assistive-technology check, real-device check, publishing or migration verification is claimed.

Historical records follow.

---

# Verification record

Project: Dexter Soriano portfolio  
Record date: 2026-10-19
Source state: branch `codex/storybook-town`; draft pull request #1 open
Scope: local build, automated checks, representative browser/visual review, and limited public deployment smoke checks

This record separates checks that passed from checks that remain unrun. It does not establish complete WCAG conformance or production deployment success.

## Reference motion gap: fly-in, journey map, project box - 2026-10-19

The user identified that the preceding build did not deliver the reference's main interactions. Its ambient town loops and shallow scroll depth were not equivalent to a pinned fly-in, a journey drawing itself as chapters progress, or projects opening from a box. The supplied prompt image is reference material, not authorization to commit, push, republish, or deploy. T-8 addresses this gap while retaining the approved pixel-art identity and verified personal facts.

The new implementation adds a desktop scroll-pinned town entrance with camera/layer choreography, a five-stop SVG journey route and traveler coordinated with real chapters, and a selectable three-project box with pointer and keyboard controls. Mobile and reduced-motion visitors retain direct chapter selection and project buttons rather than desktop scroll choreography. All five chapters and all three project articles and screenshots exist in the generated HTML before enhancement.

| Check | Result | Evidence / limits |
|---|---|---|
| Build and automated checks | Passed | `npm run build` and `npm test`: 24 Node tests passed. Coverage includes static routes/assets, verified chapter facts and native destinations, project selector/panel mapping, default-visible project evidence, hero readiness/pin lifecycle/pause/cleanup, journey selection, and project keyboard boundaries. Mocked runtime tests do not establish rendered visual quality or browser performance. |
| Desktop entrance and pause | Passed | Playwright/Chromium at 1440px: artwork-ready gate created exactly one pin. At scroll 650, camera scale changed from 0.76 to 0.9457, entrance remained at top 0, and copy opacity reached 0. Playback control remained at y=20. Pausing while scrolling 600→900 preserved the camera transform; native pin release still reached the journey while paused. |
| Journey route and project controls | Passed after integration fix | Hero refresh ordering initially offset journey progress; assigning hero refresh priority and refreshing after setup corrected it. First chapter center showed dash offset 855.693 and current 2022–2023; fourth chapter showed 213.847 and current 2025–2026. Map remained sticky at top 44px. Selecting project index 1 showed “2 of 3,” FormProof active and the other articles inert; inactive preview transform settled to none after 380ms. End selected ClaimCheck by keyboard. |
| Reduced motion and responsive lifecycle | Passed | Live reduced motion removed the pin and flight-ready marker and returned the playback control to the scene. Returning to desktop restored exactly one pin after 300ms without errors. Phone chapter selection updated aria-current=step; next-project control reached “2 of 3” with its evidence image loaded. |
| Responsive visual review | Passed for tested widths | Manual Playwright review at 1440, 768, 390, and 320px found no horizontal overflow. After headline refinement, visible headings stayed within two lines at all four widths. This is not a full accessibility audit. |
| Script-disabled fallback | Passed | Fresh JavaScript-disabled Chromium context at 390px: no pins, five story chapters, three visible non-inert project articles, hidden enhancement controls, and no horizontal overflow. |
| Throttled mobile performance | Passed for measured scenario | Chromium mobile, CDP 4x CPU throttle, ten-second warm steady-state sample: two layouts totaling 0.403ms, no long tasks, and no layout-shift entries. No runtime errors observed in the tested scenarios. Not a cold-network or real-device benchmark. |
| Taste gates | Partial | Focused Taste lint across four motion CSS files returned 0 FAIL and 0 WARN. Automated inspector could not launch Chrome (Crashpad exit 4294930433); its measurements did not run. Manual Playwright review above is separate evidence, not an inspector pass. |
| Motion recording | Captured | `work/review/portfolio-motion.webm`: 8.44 seconds, 1280 x 800, approximately 2.12MB. Local `/review/motion/` player loaded the recording; duration and dimensions were verified from metadata. |
| Release | Not performed | No push, deployment, or migration verification for T-8. |

T-8 is implemented with targeted local automated and rendered checks passed. Earlier T-6/T-7 results below describe historical builds. Remaining limits include real-device testing, other browser engines, cold-network loading, full-site keyboard/screen-reader/zoom review, automated accessibility scanning, hidden-tab behavior for this revision, and production verification. T-4 and T-5 remain open independently.

## Full portfolio experience and independent layers - 2026-10-19

The user requested the full experience inspired by the James Chugh reference while explicitly keeping pixel art. The homepage now connects a town entrance, five dated personal milestones, three actual project evidence screenshots with captions, portrait/about, services, and contact. Floating navigation uses ordinary anchors to home, journey, work, about, and contact. Personal facts were checked against the original repository `HEAD:index.html` and existing local portfolio: 2022-2023 research, 2023-2024 mentee roles, 2024-2025 Vice-Mayor, 2025-2026 SSC President as a past role, and Globe leadership from April 2025 to present. No invented hobbies were added.

The town now uses independently generated terrain without architecture, hills, three transparent building assets, and transparent foreground, with a solid SVG sky and code-drawn clouds. It no longer uses the flattened master in the scene. All layers share the 1672 x 941 composition. Eight generated PNG layer/sprite assets were losslessly encoded to WebP; every visible RGBA pixel was compared exactly. The eight active hero WebP files total 2,941,636 bytes; this is file payload, not a measured cold-network transfer. The earlier approved master remains a historical art checkpoint.

| Check | Result | Evidence / limits |
|---|---|---|
| Build and automated tests | Passed | Final `npm run build` and `npm test`: 19 Node tests passed, including all eight active scene asset checks, journey/evidence content, active-section selection, and responsive GSAP cleanup regression coverage. |
| Layered desktop depth | Passed | Chromium 1440px: all five depth transforms changed between scroll positions 0 and 650. This establishes independent layer movement, not cross-browser or real-device performance. |
| Shared pause | Passed | Explicit pause followed by scrolling 150px froze all five depth transforms and all six ambient tracks; resume updated transforms again. |
| Live reduced motion | Passed | All five depth transforms returned to identity and running=false. |
| Responsive cleanup | Passed after fix | Desktop-to-mobile GSAP cleanup exposed a null ScrollTrigger; cleanup is now null-safe with regression coverage. Chromium resize sequence 390, 1440, 320, 1024, 390px produced no errors or horizontal overflow. All five floating links were 48px tall and at least 48.48px wide. |
| Throttled layered-scene performance | Passed for measured scenario | Chromium 390 x 844, CDP 4x CPU throttling, 10-second warm steady-state sample: layoutCount=0, layoutDuration=0ms, no long tasks, and no layout-shift entries. This is not cold-network or real-device performance evidence. |
| Evidence image geometry | Verified metadata | Declared dimensions match verified source metadata: advising 1440 x 1050, FormProof 1280 x 720, ClaimCheck 1265 x 712, portrait 1676 x 2048. All three evidence images and the portrait were scrolled into view individually and loaded successfully; declared and intrinsic dimensions matched. |
| Floating navigation active location | Passed after fix | Selection now uses the last incoming intersecting section. At 390px, native clicks to Work, About, and Contact each produced the matching `aria-current` state after one second. Regression coverage passed. |
| Expanded-home script-disabled fallback | Passed | Fresh JavaScript-disabled Chromium context at 390 x 844 after network idle: five journey stops, three work chapters, three landmark links, five floating links, hidden playback button, and no overflow. Every h1/h2/h3 had computed opacity 1. Native Work anchor set the URL hash to `#work`. |

T-7 is implemented with targeted local checks passed. Responsive cleanup and reduced-motion retests produced no errors. Full-scroll image loading, floating navigation, and expanded-home script-disabled checks passed. Remaining limits are full-site accessibility/keyboard review, hidden-tab browser behavior, other browser engines, cold-network and real-device performance, and production deployment verification. The T-6 checks below belong to the preceding composition and must not be treated as verification of all new T-7 behavior. No new deployment was performed.

## Approved town rebuild - 2026-10-19

The user approved the assembled quiet countryside static composition, with greenery, warm stone, restrained detail, and complete-town mobile presentation with large project links below. The approved master is 1672 x 941. This section records local T-6 checks; the October 18 evidence below describes the previous build. No new deployment was performed.

| Check | Result | Evidence / limits |
|---|---|---|
| Build and automated tests | Passed | `npm run build` and `npm test`; 12 Node tests passed, including generated scene/route checks and playback state tests. |
| Desktop artwork | Reviewed | Chromium 1440 x 1000 day and night; traveler visibly grounded on the path. The FormProof sign was positioned to clear the route midpoint. Other browser engines were not reviewed. |
| Pause and theme | Passed | Six CSS animation tracks remained frozen after two animation frames plus 350ms; a theme change while paused left them frozen after 300ms. Resume restarted playback. |
| Town keyboard interaction | Passed | Chromium 1440 x 1000: focused playback button matched `:focus-visible`; Space set data-paused=true. The next three Tab stops were campus, FormProof, and ClaimCheck links in that order. Enter on ClaimCheck reached `/projects/claimcheck/` with heading “Bring the evidence back into the conversation.” Full-site keyboard walkthrough remains unrun. |
| Live reduced motion | Passed | Changing the preference suppressed effects and the playback control and set running=false. Restoring normal motion preserved an explicit user pause. |
| Offscreen suspension | Passed | Scrolling to contact set running=false; returning to the town resumed playback when not explicitly paused. Hidden-tab suspension has not been browser-tested. |
| Script-disabled fallback | Passed | Separate JavaScript-disabled Chromium context at 390 x 844 showed the SVG and three landmark links, hid effects/control, had no horizontal overflow, and reached FormProof through its link. |
| Theme storage failures | Passed | A throwing storage getter did not prevent switching to night. An invalid stored theme defaulted to day. |
| Responsive geometry | Passed for tested widths | 320, 390, 1024, and 1440px had no horizontal overflow; scene kept its natural 1.7768 aspect ratio. Every landmark target was at least 48px tall; the first wrapped to 60.5px at 320px. |
| Town asset payload | Measured | Master 1,514,698 bytes + traveler 548,835 bytes + smoke 207,133 bytes = 2,270,666 bytes uncompressed file payload. This is not a cold-network loading measurement. |
| Throttled mobile performance | Passed for measured scenario | Chromium 390 x 844, CDP 4x CPU throttling, 10-second steady-state sample after the mobile fix: layoutCount=0, layoutDuration=0ms, no long tasks, no layout-shift entries, no horizontal overflow. Water remained visible/running; all three smoke tracks and traveler/frame tracks were hidden/paused. CPU throttling was restored to 1x. Initial ongoing SVG layout was resolved by opacity-only mobile water and pausing hidden sprites. This is a warm local sample, not a cold-network or real-device benchmark. |

T-6 is implemented with targeted local verification passed. Remaining review limits: full keyboard walkthrough, hidden-tab browser behavior, and broader accessibility review. Local results do not establish deployment or migration success.

## Previous build and automated checks - 2026-10-18

| Check | Result | Evidence / limits |
|---|---|---|
| `npm run build` | Passed | Static build generates five routes (home, three case studies, archive) plus `404.html` in `dist/`. |
| `npm test` | Passed | Eight Node tests passed. |
| `npm run dev` | Passed | Local preview served at `127.0.0.1:4173`. |

## Previous browser and visual review - 2026-10-18

Browser checks were performed at a 390 × 844 mobile viewport (document width 375 px including the tested scrollbar behavior) and a 1440 × 900 desktop viewport (document width 1424 px).

| Area | Observed result | Limit |
|---|---|---|
| Homepage and theme | Day and night themes displayed. Theme choice persisted across navigation and reload. | Blocked/unavailable storage and invalid stored-value cases were not tested. |
| Case studies | FormProof was reached from its landmark and survived direct route refresh; Student Advising Portal route opened. | This does not cover every possible browser or external repository destination. |
| Archive | “Web apps” filter showed two entries; “All” showed all eleven archive entries. | Other filters and assistive-technology announcement behavior were not fully reviewed. |
| Responsive layout | No horizontal overflow in the tested mobile cases. | This is limited to the listed viewports and reviewed content. No mobile throttling or performance testing was run. |
| Runtime | No JavaScript errors were observed during the recorded browser interactions. | Does not establish absence of errors in all states or browsers. |
| Visual review | Homepage desktop day/night and mobile night, plus case-study and archive views at mobile and desktop sizes, were independently reviewed with no material defect found. | One archive-mobile capture showed the skip link focused; that was a capture-state artifact, not a layout finding. Review captures are in ignored work/review folders and are not committed evidence. |
| Reduced motion | Reduced-motion implementation was inspected statically. | Browser emulation was not run. Script-disabled behavior was not browser-tested. |

## Public deployment smoke check

On 2026-10-18, PowerShell `Invoke-WebRequest` returned HTTP 200 for the Cloudflare Pages homepage, project archive, FormProof case-study route, and deployment-specific URL `https://142fabed.dexter-soriano-portfolio.pages.dev/`. The response bodies were received (7,471–12,974 bytes). This confirms those URLs served HTML at check time; it does not verify visual rendering, all assets, every route, deployment configuration readback, or GitHub Pages redirects.

## Earlier review gaps and remaining release checks

- Full keyboard-only walkthrough of every navigation path and control.
- Complete storage/reload/navigation matrix beyond the locally tested failure cases.
- Full cross-browser reduced-motion and script-disabled coverage beyond the local Chromium checks above.
- Cold mobile network measurement and real-device performance testing.
- Automated axe accessibility scan.
- Full zoom/reflow, contrast, and screen-reader review.
- Cloudflare project/deployment readback, all remaining public routes and asset checks, and post-merge redirect verification.

The implementation targets accessible behavior, but these checks are incomplete. No claim of complete WCAG conformance is made.

## Deployment and migration status

Cloudflare Pages access was confirmed and project `dexter-soriano-portfolio` was created. A production deployment completed at `https://142fabed.dexter-soriano-portfolio.pages.dev/`, and the public project URL is `https://dexter-soriano-portfolio.pages.dev/`. Limited GET checks passed for the homepage, archive, FormProof case study, and deployment-specific URL. Draft pull request #1 for branch `codex/storybook-town` is open. The existing GitHub Pages site remains the active host until the repository change is merged and migration behavior is verified. The planned root `index.html` and `404.html` redirects to Cloudflare must be checked after merge.

Do not mark the migration complete until the remaining deployed pages and assets, generated canonical/social metadata, project routes, archive, and redirects have been checked against the public deployment.

## Laptop handoff checkpoint - 2026-10-19

Local build passed and all 71 Node tests passed. This handoff saves source, review prototypes, and captured output on the town branch. No new browser review, production deployment, merge, or migration verification was performed. See HANDOFF.md for laptop setup and machine-local exclusions.


Photo-wall preview update: user requested visible placeholders before supplying photos. Empty content now renders six clearly labeled, noninteractive paper frames above the desk. Six complete photo records replace them and enable the lightbox. Build and 98 tests pass; browser visual verification remains unavailable.


## 28 October 2026 — Optimized fictional custom journey map

Final scope follows Dexter's clarification: a custom map/path like James's, without real locations. Replaced Earth/WebGL with two original 3,305-byte fictional SVG map backgrounds, one selected by theme, plus a small inline route and five narrative stops. The abandoned real-map assets were removed. MapLibre's runtime, CSS and workers are absent from dist; its dependency and 25 packages were removed. No provider requests, geolocation, panel blur or continuous render loop. The map controller is about 2.8 KB; desktop/phone transform scales are capped at 1.8/1.4.

Candidate: output/maps-candidate-2026-10-28.json contains SHA-256/size of all changed journey source/build/map assets. npm run verify passed: production reference validation and all 151 Node tests, including path endpoints/bounds, image failure, disposal, theme source selection, transform limits, no engine/worker/fetch, per-map asset budget, no panel blur, chapter controls, pause/reduced motion and HTML fallback. Log: output/maps-verify.log.

Chromium/IAB: inspected 1440×900 desktop and 390×844 narrow viewports (content widths exclude scrollbar), day/night. Confirmed visible winding route/active stop, readable cards and five choices, phone Next moving 4/5 to 5/5, theme-specific local map, no horizontal document overflow, zero journey canvases and computed backdrop-filter none. Screenshots: output/playwright/maps-2026-10-28/{desktop-day,desktop-night,phone-day,phone-night}.png. Direct chapter loading was checked in a fresh tab; repeated desktop-to-phone reload/restoration is not established by this evidence.

Routing: web-development-workflow, Ponytail and written Impeccable guidance. Impeccable engine context/detector unavailable because the engine is not installed; no installation attempted. Independent read-only subagent reviewed final fictional-map screenshots/source and returned ship at this local surface scope, with no remaining material findings. Existing DESIGN.md was updated with the explicit map decision; broader design-schema drift was not repaired.

Limits: structural performance savings are verified; no before/after FPS or real iPhone Safari measurement was made. Browser-offline/image failure, reduced motion and pause branches were checked by Node fixtures, not a complete real-device accessibility/performance audit. R-DEVICE/R-PERF and other release checks remain open. Nothing was published or pushed.


## 28 October 2026 — S-shaped story path and page smooth scrolling

Scope: implement Dexter's accepted park/town/crossroads/bridge/open-road path, final zoom-out, and follow-up request for James-style scrolling throughout the page. Kept original fictional SVG geography (day 3,905 bytes; night 3,935), five factual chapters and native controls. The fourth pin is centered on the bridge deck; a dotted extension continues beyond the fifth. Final overview fits beside the desktop card or above the phone card. Markers and route strokes retain readable screen sizes during zoom. No live map engine, real locations, panel blur or provider requests.

Lenis 1.3.27 is pinned and served locally (33,274-byte module plus 513-byte stylesheet). Reference settings .09 lerp and .9 wheel multiplier came from saved James source lines 6040–6044. Official README at https://github.com/darkroomengineering/lenis and installed source confirmed native-scroll/ScrollTrigger integration, event scheduling and reset behavior. Added controller uses active-time RAF only during movement; avoids an idle timestamp gap, preserves native anchor/keyboard destinations, and removes smoothing for fine-pointer widths below 860px, reduced motion, shared Pause, hidden pages, dialogs or library failure. Touch retains native scrolling.

Passed: npm run verify, production asset validation and all 156 tests. New tests cover no idle frames/post-idle jumps, phone/reduced/failed-load fallbacks, live pause/dialog/visibility/preference changes, native click/keyboard interruption, all final camera modes and four-pixel overview strokes. Existing journey controls, swipe, content and image-failure checks remain passing. Log: output/maps-verify.log. Candidate fingerprints: output/route-smooth-candidate-2026-10-28.json.

Rendered Chromium/IAB checks: 1440×900 desktop and 390×844 phone viewports, both themes, bridge close view and final overview. No horizontal document overflow; zero journey canvases. Real wheel input yielded lenis-scrolling/lenis-smooth, then settled to lenis; mode was active on desktop and native on phone. Project preview and Pause switched smoothing to native; after preview close and Resume it returned active. Phone final overview kept all five pins above the readable card. Screenshots: output/playwright/route-smooth-2026-10-28/{desktop-bridge,desktop-overview-day,desktop-overview-night,phone-overview-day,phone-overview-night}.png. Scroll direction/check data were observed through UI and read-only DOM; screenshots alone do not establish temporal smoothness.

Independent focused source/screenshot review returned ship with no material findings at the changed-surface scope. Existing written Impeccable guidance and Animate were used; the Impeccable engine remains unavailable as recorded above. No schema/setup repair or production push/publication occurred. Actual phone/Safari FPS, before/after frame timing and the full release accessibility/device matrix remain unmeasured/open; fixture passes do not replace them.


## 28 October 2026 — Continuous path progress animation

Implemented Dexter's request to animate the route and current scroll progress. The traveled path now draws to the exact position within the active cubic, rather than snapping to a chapter endpoint. A small leading marker follows that position, maintains screen size and hides at exact milestone centers. Reverse scrolling retracts the fill. Original map SVGs, open dotted continuation, chapter copy, camera bounds and Lenis behavior remain unchanged.

Desktop scrubbing uses only the existing scheduled scroll frame. Phone taps/swipes use one bounded 420ms tween, replaced when another chapter is selected; completion, settling, hidden/preview state and disposal cancel pending RAF. Shared Pause/reduced motion, keyboard clicks and direct links apply progress immediately. The geometry uses de Casteljau splitting, without per-frame path-length reads, map data or additional libraries.

Passed npm run verify: production reference validation and all 158 tests. Tests cover finite route coordinates/endpoints, continuity around milestones, partial progress between stops, exact controller forwarding, paused/reduced tween suppression, mid-animation replacement, settling, zero pending frames at completion/disposal, and existing map/Lenis contracts. Log: output/path-progress-verify.log. Candidate SHA-256 fingerprints: output/path-progress-candidate-2026-10-28.json.

Chromium/IAB: desktop 1440×900, phone 390×844, day/night. Actual wheel input changed the traveled SVG path while the chapter remained 2023–2024; upward wheel changed it back. The leading marker was visible between stops. On phone, Next produced an intermediate partial cubic followed by the exact second-stop endpoint, with counter 2/5. Confirmed full phone stage alignment, readable copy, no horizontal overflow and no console warnings/errors. Captures: output/playwright/path-progress-2026-10-28/{desktop-progress-day,desktop-progress-night,phone-progress-day,phone-progress-night}.png. Screenshots show sampled states, not FPS or a timing trace.

Independent focused source/screenshot review returned ship with no material regressions. Written Animate/Impeccable guidance remains applicable; unavailable engine status is unchanged. Actual-device FPS, full Safari/accessibility matrix and production verification remain open. No push, merge or publication occurred.


## 28 October 2026 — Map depth and scroll choreography polish

Implemented Dexter's request for more animated, pleasing map/scrolling. Desktop camera now follows the exact cubic path, with .55 midpoint zoom relief and unchanged stop/final framing. Beacon orientation uses the tangent returned by the existing cubic calculation. Added a low-opacity route ribbon, scroll-linked dotted phase and proximity-scaled/fading halos, with no idle pulse. Chapter changes get a bounded native 280ms opacity/translate arrival, interrupted/canceled by direct/keyboard navigation, Pause/reduced motion, hidden/preview/fallback/disposal. Phone retains native page scrolling and the prior bounded chapter camera/path transitions.

Original fictional SVG backgrounds gained roof-edge lines, static offset building shadows and tree-map symbols. Assets are 5,735 bytes by day and 5,764 by night. No new dependency, scheduler, blur/filter or real geographic content. Existing desktop/phone camera bounds, readable fixed-screen route/pins, final overview, factual chapters and Lenis settings remain.

Passed npm run verify and all 160 tests. New checks cover camera/route agreement, bend pullback, finite tangents, directional cursor, quiet halo state and bounded card arrivals canceled for keyboard, pause and hidden state. Prior geometry/progress, interruption/disposal, no-idle scrolling and asset-budget checks remain passing. Log: output/map-polish-verify.log. SHA-256 candidate: output/map-polish-candidate-2026-10-28.json.

Chromium/IAB checks at 1440×900 desktop and 390×844 phone, both themes: actual wheel input showed curve-following camera and directional beacon; arrival halo opacity reached about .28 at a stop. Pause set all five halo inline opacities to zero; Resume restored normal motion. No phone horizontal overflow; native phone scroll mode retained. No console warnings/errors. Captures: output/playwright/map-polish-2026-10-28/{desktop-day,desktop-night,phone-day,phone-night}.png. Independent focused source/screenshot review returned ship with no material regressions. Native animation timing was not measured through browser inspection because getAnimations is unavailable in its read-only DOM bridge; source/fixture checks establish duration and cancellation only.

Limits: screenshots are sampled states, not an animation trace or actual-device FPS measurement. Real iPhone Safari, full accessibility/device/performance release checks remain open. Nothing was pushed, merged or published.


## 29 October 2026 — Paper-airplane progress tip

Replaced the circular directional cursor with original inline folded-paper SVG geometry. Nose at (0,0) anchors to the exact drawn route endpoint. Reuses fixed-screen sizing, tangent orientation and existing progress/tween updates; inner banking is bounded to ±10 degrees with a 160ms transform transition. Quiet/Pause/reduced motion sets a flat bank without transition. Original hiding at exact stop centers remains, preserving numbered pins. No new asset request, library, filter or RAF.

Passed npm run verify: production reference validation and all 160 tests, including airplane nose anchoring, bank transform and immediate quiet state alongside existing path/animation cleanup checks. Log: output/paper-plane-verify.log. Candidate fingerprints: output/paper-plane-candidate-2026-10-29.json.

Chromium/IAB: desktop day/night at 1440×900 and a 390×844 phone-flight sample. Plane visible at the leading edge with folded wing/crease; night computed body fill rgb(241,247,255), outline rgb(168,202,255). Phone capture uses a real pointer click at the rendered Next-button center to avoid the automation locator's automatic page centering. Captures: output/playwright/paper-plane-2026-10-29/{desktop-day,desktop-night,phone-flight-night}.png. The phone image deliberately samples the bounded flight/card arrival rather than a settled state. Local preview server restarted after the previous session stopped. Actual-device FPS/full release gates remain open; nothing published or pushed.
Independent focused source/screenshot review returned ship with no material issues; this covers the airplane change only.


## 29 October 2026 — Compact opening and scroll zoom

User supplied a James portfolio screenshot and requested a minimized map that zooms when scrolling continues. Implemented centered compact overview under a centered cover heading, native Explore the journey link, hidden travel cards/choices/orientation until entry, and blend into first stop by progress .18 (hold through .04). Existing S-route, paper airplane and chapter facts remain. Phone/reduced motion use explicit link entry; direct chapter links skip overview. Keyboard Explore activation focuses the first visible chapter choice without another scroll. Reverse desktop progress restores cover/miniature. Map-image fallback removes entry flags and heading inline opacity.

Passed npm run verify: build/production-reference checks and all 163 tests. Added compact camera center/scale assertions, entry progression, native phone start, reduced-motion immediate entry and reverse overview restoration. Log output/overview-entry-verify.log.

Before browser access failed, a 1440×900 desktop initial overview was inspected in Chromium/IAB: centered heading and full small route, all five pins, Explore link below; cards/choices hidden. DOM showed cover/intro active and map transform scale .289286, stage top14.8px. That screenshot was shown by the tool but not saved locally. Subsequent live checks were blocked by 'Local browser use is disabled in Work settings'; retry during the user's settings question returned the same error. Forward/reverse animated rendering, night and phone remain NOT RUN on this candidate. Source-only independent review found lost keyboard focus on Explore; corrected by focusing the first chapter choice after keyboard activation. Source review is not visual approval. No production action occurred.


## 29 October 2026 — Matching exit preview after chapter five

User requested the same preview appearance when scrolling out after stop five. Added a smooth exit factor over progress .94–1, reusing the opening intro/cover renderer: identical centered compact map size/position, centered heading and Explore link; chapter panel/date choices/orientation clear away. Chapter five remains in its readable final overview at .94. Reverse scrolling restores it. Completed blue route is retained as journey history. No new assets, dependency or ticker. Phone chapter-five selection remains unchanged; this is the desktop scroll exit.

Passed npm run verify: build/production reference checks and all 165 tests. New assertions compare entry/exit camera center, zoom and compact factor, ensure chapter five remains before exit, and exercise end cover/reverse chapter restoration. Log output/overview-exit-verify.log. Live browser retry still returned 'Local browser use is disabled in Work settings'; visual end/reverse checks are Not run, not a claimed visual pass. No publication/push.


## 29 October 2026 — Earlier entrance destinations

Campus/Workshop/Library fade moved from 3.9–4.3s to 2.4–2.7s. Activation now follows the completed destination fade instead of waiting for the full 4.5s entrance. Camera/cloud sequence stays unchanged. Replay resets the gate; static/skip/phone/reduced behavior stays immediate. npm run verify passed: production build and all 165 tests, including earlier opacity beats and inert state before/during/after the fade and replay reset. Log: output/entrance-buttons-verify.log. Live rendered timing was not checked; browser access was unavailable in the preceding checks. Local only, no publication.


## 29 October 2026 — Torn paper and fuller town preview

User reported absent ripped-paper patterns and supplied a plain nighttime preview screenshot. Added original decorative paper-edge seams at entrance→intro, journey→work and work→toolbox, using zero-height wrappers and static repeating SVG masks with a fine offset edge shadow. Receiving theme paper/surface colors own fills; no sticky geometry/content masking/filter/ticker. Added original fictional town blocks and thin lanes to existing local maps; increased night building, park, road and river contrast. Compact desktop/final overview now has five narrative label chips and distinct pin accent colors. Labels hide during travel and on phone to avoid crowding. Map SVGs: day8,794bytes/night8,823bytes; no runtime traffic or added dependency.

Passed npm run verify and all 166 tests. New checks establish three aria-hidden seams in generated HTML, zero-height/pointer-transparent CSS, five narrative labels and overview-only flag, district paths and map asset budget. Log output/paper-town-verify.log. Browser retry returned 'Local browser use is disabled in Work settings'; all new rendered day/night, phone seam/label and scrolling checks are Not run. No screenshot or visual approval is claimed. No publication/push.


## 29 October 2026 — Soft frayed paper correction

User rejected the initial angular torn seam. Retrieved and inspected James's actual public tear.png (2400×150, 11,684 bytes) as reference-only: shallow broad asymmetric contour with small fibers, no frequent triangular teeth. Production now uses an original local 2400×150 SVG silhouette with independently chosen contour anchors and tiny deterministic irregularities sampled every2px. Desktop tile width2400px instead of450px; phone1800px. Soft static day edge shadow/fine fiber rim, theme-colored fill and no night filter. Existing three zero-height, aria-hidden, pointer-transparent seam positions preserved. Reference PNG stays outside dist.

Passed npm run verify: production CSS asset-reference validation and all166 tests. Log output/soft-paper-verify.log. Asset images/paper/torn-edge.svg (11630bytes) copied explicitly by existing build. Live page render remains unverified because browser access was disabled in the preceding checks. Source/reference inspection establishes the correction's geometry, not a rendered fidelity pass. Nothing published/pushed.


## 29 October 2026 — Blended linework map

User supplied screenshot and requested the map blend into the background, preferably just lines. Removed background rectangle, building/park/tree fills, solid river and colored road backing from both map assets. Retained thin original streets and river-bank outlines with low-opacity theme ink; image now transparent, 1,351bytes per theme. Static radial mask fades linework edges. Journey geography/fallback and gradient endpoints now use page var(--paper) in both themes. Route, stop labels/pins, paper airplane, controls and camera/progress behavior preserved.

Passed npm run verify and all167 tests. Added assertions that generated map SVGs contain no rect/circle or non-none fill and use subdued paths; existing all5 labels, asset budget and motion tests pass. Log output/map-linework-verify.log. Browser retry again returned 'Local browser use is disabled in Work settings'; new rendered theme/phone blend checks are Not run. No visual pass, new screenshot, publication or push claimed.


## 29 October 2026 — Preview-only outer backdrop clarification

Dexter clarified to keep the prior detailed artwork and change only the background outside that map, only in the preview. Restored original fictional buildings, blocks/streets, parks/trees, solid river/road and bridge shapes from the earlier authoring recipe. Removed only the canvas-sized SVG background rectangle so preview surroundings can show page paper. CSS supplies the original solid day/night land background during zoomed travel, removes it when the renderer flags compact preview, and scopes outer page-paper color to entry/exit intro state. Removed the radial image mask. No path, label, airplane, camera, timing or scrolling behavior changes.

Passed npm run verify and all167 tests. Assertions now require filled rect/circle map details, prohibit only the canvas-sized background, check preview-only transparent CSS plus full travel background, and verify renderer preview true at entry/false during travel. Assets day8,768bytes/night8,797bytes. Log output/map-preview-blend-verify.log. Live rendered verification remains pending under the previously reported browser access restriction. No publication/push. Earlier linework result is superseded by this clarification.


## 29 October 2026 — Expanded preview surroundings

Extended the outer preview design with a separate lightweight SVG street/plot outline field. A CSS pseudo-element scoped to data-journey-intro spans beyond the compact central map, with a static radial mask protecting the center and fading the outskirts. Day/night opacity .36/.28; phone .25 with wider side cropping. No filled external terrain, central-map modifications, animation/camera change, filter or ticker. The layer disappears outside compact entry/exit state.

Passed npm run verify and all168 tests, including preview-only selector, production asset reference, unfilled linework and <3KB surround asset budget. Log output/preview-surround-verify.log. Rendered appearance is Not run under the previously reported browser access restriction; contrast/composition still needs live review. Nothing published or pushed.


## 29 October 2026 — Continuous town preview

Implemented Dexter's selected direction: one continuous fictional town fading outward, soft thin streets/small muted blocks, and approximately 25% larger compact framing with clearer labels. Replaced the separate oversized outer street field with two local preview SVGs sharing route coordinates. Both embed unchanged central map geometry, extend streets/buildings at matching scale, and fade through a static SVG mask. Travel still uses the prior story-map assets. Overview label chips are 176px with 15px text; phone labels remain hidden under the existing rule.

Passed npm run verify: production build and all 168 tests. Checks cover preview-only switching, identical central geometry, day/night dimensions, under-30KB per-asset budget and exclusion of the obsolete surround from production. Log: output/continuous-town-verify.log. Fingerprint: output/continuous-town-candidate-2026-10-29.json. Independent source review found no material issues. Browser retry explicitly returned “Local browser use is disabled in Work settings.” Desktop/phone rendering, label balance, transition appearance and frame timing remain unverified. No visual approval or publication claimed.


## 29 October 2026 — Preview rollback

Dexter requested reverting the latest continuous-town preview. Restored prior compact fit limits (580×420 desktop), 160px label chips and existing 14px text. Removed the added preview image from the renderer and production asset list; restored the separate faint preview-surround backdrop. Original central story-map assets, route and actual travel behavior remain intact. npm run verify passed: build and 168 tests, log output/preview-rollback-verify.log. Rendered verification remains unavailable under the reported browser restriction. Nothing published.


## 29 October 2026 — Remove outer backdrop

Dexter clarified that the restored preview should have no outer backdrop. Removed the preview-surround pseudo-element and its production asset copy, leaving central map size/artwork and journey behavior unchanged. Removed the obsolete backdrop-presence test. npm run verify passed: build and 167 tests; output/no-outer-backdrop-verify.log. Browser rendering remains unverified under the existing access restriction. Nothing published.


## 29 October 2026 — Introduction signs

Updated the two introduction principles with numbered headings, original inline target/people SVGs, paper tape, subtle borders/depth and clearer type hierarchy. Existing ScrollTrigger now drives staggered cubic settle, opposing card rotation and icon counter-rotation. Hover is fine-pointer/no-reduced-motion/shared-Pause gated; no extra ticker or dependency. Cards remain noninteractive; Follow the path retains a keyboard outline.

npm run verify passed: production build and all 167 tests; output/intro-signs-verify.log. Browser access worked in this turn after restarting the local preview. Inspected default desktop day/night and 390×844 phone day; phone measured no horizontal overflow and 33px icons. Corrected a global SVG selector shrinking custom icons. Scroll-back measured distinct intermediate card transforms/opacities, then shared Pause measured both signs fully opaque at resting angles with zero translation. Screenshots: output/playwright/intro-signs-2026-10-29/. Actual phone hardware, OS reduced-motion switching and frame-budget measurements remain untested. Nothing published.


## 29 October 2026 — Introduction typography and prompt removal

Split introduction into an eyebrow, existing two-line heading, identity lead and supporting purpose paragraph. Increased headline/lead/body to 64/24/20px maximum desktop and 44/22/18px phone; sign title/body to 24/17px desktop and 22/17px phone. Retained existing sign artwork and motion. Removed Follow the path link, journey footer (Continue to work and scroll hint), and runtime hint assignment to avoid a missing-element error. Explore the journey and chapter controls remain.

npm run verify passed: build and 167 tests; output/introduction-text-verify.log. In-app browser failed with an unavailable browser-user capability; used the existing local portfolio tab in Opera. Desktop screenshot inspected; DOM measured 64/24/20px and absence of all three prompts. Phone override 390×844 (376px content width) showed 44px heading, single-column layout and no horizontal overflow; screenshot inspected. Reset viewport afterward. Evidence: output/playwright/introduction-text-2026-10-29/. Actual phone hardware and full accessibility/performance checks remain untested. Nothing published.


## 29 October 2026 — Reference-led narrative introduction

Adapted the supplied reference composition: small How I build heading, large original narrative with blue/peach emphasis and a coral circle around how things work, plus two smaller yellow/peach taped notes in the right column. Preserved factual claims and original icons/principles. Existing note scroll/hover behavior and shared Pause/reduced-motion handling remain; the old small-body word animation finds no target and does not modify narrative markup. Phone uses 32px story text, inline per-line blue highlights and vertically stacked notes. Removed navigation prompts remain absent.

npm run verify passed: production build and 167 tests, output/reference-introduction-verify.log. Opera desktop rendering inspected; corrected inherited strike-line decoration. Phone override inspected narrative and both stacked notes; measured no horizontal overflow and inline blue highlight behavior. Viewport restored. Evidence output/playwright/story-introduction-2026-10-29/desktop-day.png, phone-day.png and phone-notes.png. Current night palette uses theme-specific muted note surfaces but was not rendered in this turn. Actual devices/full accessibility and performance remain unverified. Nothing published.


## 29 October 2026 — Approved process paragraph and movable notes

Replaced the repetitive biography paragraph with Dexter’s approved 50-word process narrative, preserving phrase emphasis. Added per-note move grips, instructions and independent offset wrappers. Pointer capture follows desktop drag directly and clamps visual note bounds to the section with 12px inset. Touch starts only on the grip; native text-area scrolling remains available. Arrows move 10px (Shift 30px), Home resets; Escape, pointer cancellation or app blur cancel. Resize reclamps. No storage, extra dependency or perpetual animation.

npm run verify passed: build and 172 tests. Five new behavioral tests cover extreme boundaries, cancellation/capture cleanup, keyboard reset/steps, touch grip gating and resize/app-blur handling. Integration initially exposed the connected-preview fixture stripping imports; initialized the isolated note module through its own homepage module tag instead. Opera checks verified live mouse drag, section edge containment, Shift+arrow movement, Home reset for both notes, and phone layout with no overflow. Corrected a global button rule overriding touch-action; computed grip is now none while note text is auto. Saved screenshots under output/playwright/movable-notes-2026-10-29/. Viewport restored. Actual phone touch gestures, full accessibility and frame timing remain unverified. Nothing published.


## 29 October 2026 — Floating note hint and tactile motion

Removed both visible Drag to move reminders and the bottom handle rows; kept accessible 64×44 tape grips and shared screen-reader instructions. Added a single noninteractive floating hint with coral arrow. Section flag dismisses it after actual displacement, including keyboard movement, and Home does not restore it. Notes get one-time IntersectionObserver-triggered WAAPI flutter (650ms), fine-pointer hover/pickup transforms and release transitions. Reduced motion/shared Pause suppress arrival; drag/hidden/preference changes cancel it. No new ticker or dependency.

Passed npm run verify: build and 174 tests; output/note-motion-hint-verify.log. Added behavior tests for hint lifetime and visibility-triggered arrival/reduced-motion cancellation. Opera checked visible hint, mouse drag dismissal (opacity 0, old reminder absent), keyboard dismissal, phone no-overflow and touch-action none on tape grip. Corrected arrow sizing against global SVG rules and pointer-origin focus styling. Screenshots under output/playwright/note-motion-hint-2026-10-29/. Viewport restored. Real touch hardware, frame timing and current night rendering remain untested. Nothing published.


## 29 October 2026 — Gentle floating notes

Added independent inner wrappers for transform-only floating: 4.8s and 5.8s loops with different phases, 6px maximum vertical drift, 2px horizontal drift and less than one degree rotation. Outer wrappers retain drag offsets. CSS pauses on hover, keyboard focus, drag, shared Pause and observer-reported offscreen state; document visibility/preference handlers pause hidden or quiet scenes. Reduced motion disables the animation entirely. Pointer-origin focus no longer prevents resuming after pointer leaves a dropped note.

npm run verify passed: build and 175 tests; output/floating-notes-verify.log. New test covers visibility/hidden/reduced-motion pause flags and observer cleanup; adjusted the test event fixture to support multiple listeners per type. Opera measured offscreen notes paused, both visible notes running with changing transform matrices, and keyboard focus pausing only the focused note. Screenshot output/playwright/floating-notes-2026-10-29/floating-notes.png. Hardware touch and frame timing remain unverified. No publication.


## 29 October 2026 — Tape-only note grips

Removed the dotted grip glyphs and widened the original tape to 80×25px with translucency and subtle irregular edges. Retained the invisible 80×44px drag button, accessible labels, touch behavior and keyboard controls. npm run verify passed: build and 175 tests, output/note-tape-verify.log. Local desktop rendering checked; no real-device check or publication.


## 29 October 2026 — Compact flying notes

Removed note icons, numbers and the two small kicker labels. Reduced note wrapper width to 220px desktop/230px phone and reduced padding/type; desktop rendered notes are approximately 173/146px high. Added independent flight wrapper so idle float, direct drag position, scroll reveal and flight transforms do not overwrite one another. Pointer deltas smooth into bounded pitch/yaw/bank with lift/scale and a CSS flutter only during dragging. Release clears flight and lands through a 280ms transition. Increased drag boundary reserve to 32px to allow banked corners. Reduced motion/shared Pause suppress flight transforms; direct dragging remains.

npm run verify passed: build and 176 tests; output/flying-notes-verify.log. New behavioral test covers directional bank limit, scale, landing cleanup and reduced-motion bypass. Opera confirmed all removed elements absent, smaller rendered sizes, live drag offset (-200,+70), cleared drag state/flight transform on release, and note inside section boundaries. Screenshots under output/playwright/flying-notes-2026-10-29/. Actual touch hardware, detailed frame timing and night rendering remain untested. Nothing published.
Phone follow-up: 390x844 browser override confirmed 230px note width, no horizontal overflow and touch-action none on tape grips; phone.png inspected. Viewport restored.


## 29 October 2026 — Fluid note drag

Replaced pointer-event-by-event tilt retargeting with one render per animation frame and 75ms time-based velocity/lift damping. Bank relaxes while the pointer rests, then scheduling stops. Pickup lift ramps gradually, flight angles are gentler, flutter slows to 1.6s with lower amplitude, and release settles over 340ms. Direct pointer position is retained; final pointer target is flushed before release, and pending frames cancel on release/cancel/hidden/disposal. Reduced motion retains direct movement.

npm run verify passed: build and 177 tests, output/fluid-notes-verify.log. Added frame-queue test proving sample coalescing, decreasing bank, settling to no queued frames and final-position flush/release cleanup. Opera native drag confirmed final offset (-160,+70), flight transform none and no residual dragging state. Screenshot output/playwright/fluid-notes-2026-10-29/drag-result.png. Real-device subjective feel and frame-budget profiling remain unverified. Nothing published.
