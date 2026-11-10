# Motion review — 2026-10-19

The user's attached prompt sheet is reference material, not deployment authorization. The pinned direction remains Dexter's pixel-art town. James Chugh's site is an interaction reference, not a source of copied artwork, personal claims, metrics, or code.

On this page, Dexter's progression from student to student leader to AI/web builder becomes a journey through the campus, workshop, and library. The live interactions are the drawn chapter route and selectable project files. Desktop enters the town through a short native-scroll pin; phone layouts use explicit controls.

No new direction was dealt: this is a motion correction within the already approved world. No generic redesign, audio, booking backend, guestbook, or publishing was added.

## ROUND 1

Seen in one second: a pixel town with a small amount of ambient movement.

Idea (one sentence): verified projects inhabit three places in Dexter's town.

Live thing: landmark links and a theme toggle; the rest was mostly static.

Layout words by section: hero=scene / journey=alternating timeline / work=split chapters / about=portrait split / contact=direct links.

Scores: design 7 · usability 7.5 · creativity 6 · content 8 → overall 7.0 (internal judgment, not an external award score).

Caps applied: the motion brief was not fulfilled; subtle parallax was not the requested focal sequence.

Top three problems (most visible first), each with the capture and fix:

1. Desktop entrance captures showed little perceptible camera movement. Replace 1–4% layer drift with a bounded distant-to-close fly-in and deliberate text exit.
2. Journey capture showed five static timeline entries. Replace with one sticky drawn route whose traveler and active dates correspond to the actual chapters.
3. Work capture showed three static split sections. Make the existing evidence previews a selectable fan with explicit phone controls and a complete no-script reading layout.

## ROUND 2

Seen in one second: a readable personal introduction above the pixel world; scrolling enters the town.

Idea (one sentence): the world introduces the work, the chapter route explains how Dexter got there, and project files open to actual evidence.

Live thing: scroll-drawn route plus mouse, touch, and keyboard project selection.

Layout words by section: hero=pinned scene / journey=sticky map and chapters / work=selectable evidence fan / about=portrait split / contact=direct invitation.

Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6 (internal visual review, not an independent score).

Caps applied: this is a known interaction approach inspired by the supplied reference, not an originality claim. Automated rendered inspection is unavailable, so these are manual judgments.

Top three problems found and fixed:

1. The late entrance pin shifted downstream chapter positions. Global refresh with entrance refresh priority now measures the pin before the journey.
2. Phone headings wrapped over two lines. Shortened section titles and a 320px headline adjustment removed the observed wrapping failures.
3. Two inactive project previews overlapped at the same position. Distance-based offsets now expose separate file edges rather than one duplicated silhouette.

## Verification and limits

- Build and all 24 Node tests passed.
- Taste source lint on the four changed motion/layout stylesheets: zero failures and zero warnings.
- Taste's rendered inspector crashed while launching Chrome (Crashpad error). It did not produce a passing report. Playwright Chromium supplied the actual viewport, state, and motion checks instead.
- Tested desktop, tablet, and phone layouts at 1440, 768, 390, and 320px; no observed horizontal overflow. Phone chapter/project controls, native no-script content, keyboard project selection, reduced motion, pause, and pin release were checked.
- An 8.44-second local recording demonstrates the entrance, journey, and project selection: `work/review/portfolio-motion.webm`. The local review player is `/review/motion/`; this is an ephemeral review artifact, not a published portfolio route.
- The final 4× CPU mobile sample recorded no long tasks or layout shifts, and two layout operations totaling approximately 0.403ms over ten seconds. This is a warm local sample, not real-device or cold-network performance evidence.

Remaining visual limits: generated alpha edges have slight fringing; the journey uses geometric map artwork rather than unavailable milestone photographs; project evidence images are genuine UI records with their original scope captions. Real-device testing, other browser engines, and a full accessibility audit remain unrun. No commit, push, merge, or deployment was performed.
