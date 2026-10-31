# Geographic journey flow — 27 October 2026

The journey is now a sticky full-screen geographic scene on fine-pointer desktop (over 1100px), with five viewport heights of page travel. Scroll follows a blue winding route across an invented flat street map with five narrative stops (no real locations) while one factual chapter is visible. Native chapter links can jump directly to a stop; direct chapter hashes align its stage. Phone/coarse-pointer/reduced-motion use the full-screen chapter scene with links and previous/next controls; horizontal touch swipes select chapters, while vertical page scrolling remains native. Reduced motion/shared pause use stationary cameras. Local map-image failure restores all five visible HTML chapters and native anchors. Continue to work exits through the normal #work anchor. No special scroll-height collapse is applied on revisits.

Theme changes recolor live geography and retain the existing entrance day/night artwork swap. Hero action shortcuts/nameplate were removed by explicit request; bottom navbar owns Work, Contact and the CV email request. This supersedes those historical details below.

# Current visitor flow — 23 October 2026

Main route: painted valley → introduction → five-chapter journey → three project files → toolbox → personal desk/photo placeholders → services/contact. View work and Contact shortcuts settle pending entrance playback and follow native anchors. Campus, workshop and library open matching brief project previews; dedicated case studies remain native fallbacks. Preserve preview history, focus and scroll restoration. Keyboard/direct/history and paused previews settle immediately; pointer travel continues from its rendered position when interrupted.

The existing theme control swaps the day/night backdrop and foreground together, also updating the journey art. Saved night preference selects night sources before entrance decoding. Changing themes during entrance settles playback; Replay uses the selected theme's artwork. A failed night image returns to its day counterpart without an error loop.

Case studies identify project name and role at the top before the story and labeled evidence. The archive restores `category` query state on load/Back/Forward, keeps counts and selected controls aligned, and shows all entries with filters hidden without JavaScript. Contact offers direct email, selectable address, copy status and secondary destinations. Six photo placeholders remain noninteractive until six complete confirmed records exist.

Follow [root DESIGN.md](../../DESIGN.md) and ../VERIFICATION.md. Everything below is a **superseded historical flow checkpoint** and is retained only for context.

# Historical app flow — superseded

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-18  
Scope: Pixel-art town portfolio redesign

## Visitors and destinations

| Visitor goal | Entry | Destination |
|---|---|---|
| Understand Dexter | Homepage | Intro, about, services, and experience |
| Explore work | Town scroll or landmark click | Featured case study or existing project archive |
| Contact/request CV | Homepage or contact area | Email link, social profile, or CV request email |
| Change appearance | Theme control | Day/night theme |

Primary map: **Town/home → campus (Student Advising Portal) / workshop (FormProof) / library (ClaimCheck) → case study → project links or town/home.** The archive and contact/experience areas remain reachable from the homepage navigation and scroll flow.

## Main interactions

**F-1: Explore a landmark.** Visitor scrolls through the town or activates a landmark. The site reveals or navigates to its associated content. Case-study links open a dedicated case-study view/page. Direct links and browser back/forward should work. Requirements: R-1, R-3.

**F-2: Contact Dexter.** Visitor activates email, social, or Request CV. The browser opens the corresponding external destination or email client. No in-site submission or success state is implied. Requirement: R-5.

**F-3: Change theme.** Day is shown on first visit. Visitor activates the theme control; the site switches to night and stores the preference locally. A later visit restores a valid saved choice; missing/invalid storage falls back to day. Requirement: R-6.

## States and recovery

| Condition | Behavior |
|---|---|
| JavaScript or animation unavailable | Content, navigation, and direct links remain available. |
| Local storage unavailable or invalid | Use day theme for the current visit; the rest of the site remains usable. |
| Narrow viewport, keyboard, or touch | Controls remain visible and operable without hover; focus is visible. |
| External email/social/project unavailable | Keep the destination link explicit; the portfolio does not claim that an external action succeeded. |

Do not make the town a single canvas-only interaction. Provide semantic links or buttons for each landmark, and preserve content access for keyboard and assistive-technology users. Visual treatment and motion are defined in `DESIGN.md`.


28 October route/scrolling update: the five stops climb along an S-shaped fictional path. The fourth crosses a bridge, and the fifth reveals all five stops with an open dotted continuation. Desktop wheel motion uses Lenis while moving; touch, keyboard/anchor destinations, pause/reduced motion and dialogs retain native behavior. Opening a dialog removes smoothing; closing it restores it only if preferences still allow.

Path progress update: the solid blue fill follows exact desktop scroll position in both directions. Phone chapter clicks/swipes animate from the current drawn position; a new chapter replaces the pending tween. Pause/reduced motion and keyboard/direct navigation settle immediately. The leading marker hides at stop centers. Hidden pages and open previews settle and cancel path animation.

Map motion polish: camera follows the drawn route on desktop, easing wider through bends. Stops respond to proximity and the beacon points along travel. A changed chapter settles in with a brief fade/lift; keyboard/direct links, Pause and reduced motion show it immediately. Hidden pages, previews and interruption cancel the bounded card effect. Phone keeps native scrolling and existing chapter camera transitions.
