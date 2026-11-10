# Portfolio release checklist

Policy confirmed by Dexter on 27 October 2026: maximum polish and reliability; prepare and verify, then ask before production publication.

Candidate: identify the actual working tree and production build before checks. HEAD alone is insufficient because the checkout has uncommitted work.
Preview: connected homepage `/` on the local preview; a hosted preview is selected during release preparation.
Target: existing Cloudflare Pages project, subject to live readback before release.
Approval: Not requested. This file does not authorize deployment, push, merge or hosting migration.

Current task progress belongs only in [IMPLEMENTATION_PLAN.md](planning/IMPLEMENTATION_PLAN.md). Actual results belong in [VERIFICATION.md](VERIFICATION.md).

## Required checks before requesting publication

All rows below are required for the next substantial portfolio release unless Dexter explicitly accepts a documented exception with its impact. A real release is not part of workflow installation. Historical 24 October screenshots and checks are useful leads, not current-candidate passes.

| ID | Procedure and expected result | Execution method / owner | Evidence to record |
| --- | --- | --- | --- |
| R-BUILD | `npm run verify`: clean production build and relevant Node suite pass; production excludes review/test harnesses | Agent, using existing build and test commands | Log, runtime, source/build fingerprint and result |
| R-FLOW | From `/`, use View work and Contact, open/close each landmark preview, follow each case study and return; archive filter and Back/Forward retain correct state; test unknown route | Agent, actual browser on the production artifact | Named routes/actions and observed outcomes; include failed image/load recovery where affected |
| R-VISUAL | Review home, archive, three case studies and 404 at representative 320/390, 768 and 1440px widths; include short phone height, day/night and preview open states | Agent, screenshot and overflow inspection against root DESIGN.md; widths are test conditions, not universal breakpoints | Viewport/state/build screenshots and remaining differences |
| R-ACCESS | Walk actual keyboard order, menus/previews, Escape/focus return and contact/filter controls; check actual 200% zoom and narrow reflow; test live reduced-motion change, pause/replay and accessible names; inspect current contrast and automated-scan incomplete nodes | Agent for supported browser/axe checks; capable browser automation for motion preference; Dexter can check Ctrl+plus zoom and Windows motion setting manually when tooling lacks control. Record actual zoom/preference, not a viewport substitute | Steps, expected/observed behavior, screenshot/scan report; smoke-test main navigation and a case study with NVDA on Windows or equivalent available screen reader |
| R-DEVICE | Complete home -> project -> case study -> contact on Dexter's real phone; check touch targets, short-height layout and native scrolling; repeat critical journey in Chromium and Firefox, adding Safari when available/relevant | Agent for available engines; Dexter for real phone. Record exact device/browser; unavailable required coverage remains Blocked | Device/browser and journey result; do not claim a viewport is a real-device test |
| R-PERF | Measure cold mobile load and entrance/scroll interactions; verify essential content stays available and no prolonged freeze occurs; compare to a recorded baseline | Agent using a browser with CPU/network controls or Lighthouse/DevTools. Dexter can run DevTools Performance/Lighthouse when current tools cannot. Record device/CPU/network/cache conditions; synthetic results are not field percentiles | LCP/CLS, interaction/long-task observations, conditions and report. Use web.dev good thresholds as goals, not unmeasured claims; investigate material regressions |
| R-CONTENT | Confirm project roles, evidence captions, ClaimCheck sample limitations, contact/CV links, archive destinations, case-study direct URL/refresh, title/canonical/social card and 404 behavior; six placeholders remain honest and noninteractive | Agent, source and rendered review; ask Dexter only for missing facts/assets | Checked URLs/claims and actual findings; real photos are optional and not a release blocker while approved placeholders remain |
| R-USER | A representative visitor can explain what Dexter builds, identify one project's actual contribution and find contact without coaching | Dexter recruits one visitor; agent supplies the short task and records interpretation/hesitation | Observed actions and improvement decision. No analytics or invented conversion target |
| R-RECOVERY | Read actual Cloudflare project/production branch/current deploy; identify a known prior deployable artifact and recovery procedure. Confirm whether a push/merge deploys. Keep old host available until migration is verified | Agent with available authenticated host/Git tools; otherwise concrete dashboard checks for Dexter | Actual deployment IDs/artifact source, branch behavior, recovery action/trigger and limitations. Database rollback N/A: static site |

## Recording results and exceptions

Use Not run, Passed, Failed, Blocked, or N/A with a reason in VERIFICATION.md. For a tool limitation, record the exact missing capability, the alternative above, owner, and required observation. Do not repeatedly retry an unchanged unavailable capability. Automated scans and Node tests do not establish WCAG conformance or live motion behavior.

## Review packet and approval

Before asking to publish, provide the candidate fingerprint, local/hosted preview and key screenshots, results of required checks, unresolved issues and their impact, exact target/action, and the prior artifact/recovery procedure. Approval applies to that candidate; material changes need updated checks and approval. A deployment-triggering merge or push is a production action.

## After an approved release

Record actual deployment identity and artifact match. Smoke-test public `/`, archive, all three case studies, assets, contact destinations and metadata; check the intended not-found behavior. Verify the old GitHub Pages redirect separately after its approved migration action. Local HTTP 200 and old deployment records do not establish these public results.
