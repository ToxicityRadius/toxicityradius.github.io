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

