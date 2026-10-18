# App flow

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
