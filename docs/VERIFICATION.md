# Verification record

Project: Dexter Soriano portfolio  
Record date: 2026-10-18  
Source state: branch `codex/storybook-town`; draft pull request #1 open
Scope: local build, automated checks, representative browser/visual review, and limited public deployment smoke checks

This record separates checks that passed from checks that remain unrun. It does not establish complete WCAG conformance or production deployment success.

## Build and automated checks

| Check | Result | Evidence / limits |
|---|---|---|
| `npm run build` | Passed | Static build generates five routes (home, three case studies, archive) plus `404.html` in `dist/`. |
| `npm test` | Passed | Eight Node tests passed. |
| `npm run dev` | Passed | Local preview served at `127.0.0.1:4173`. |

## Browser and visual review

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

## Not run

- Full keyboard-only walkthrough of every navigation path and control.
- Browser tests for unavailable or invalid local storage.
- Browser-emulated reduced motion and script-disabled navigation.
- Mobile network/CPU throttling or performance measurement.
- Automated axe accessibility scan.
- Full zoom/reflow, contrast, and screen-reader review.
- Cloudflare project/deployment readback, all remaining public routes and asset checks, and post-merge redirect verification.

The implementation targets accessible behavior, but these checks are incomplete. No claim of complete WCAG conformance is made.

## Deployment and migration status

Cloudflare Pages access was confirmed and project `dexter-soriano-portfolio` was created. A production deployment completed at `https://142fabed.dexter-soriano-portfolio.pages.dev/`, and the public project URL is `https://dexter-soriano-portfolio.pages.dev/`. Limited GET checks passed for the homepage, archive, FormProof case study, and deployment-specific URL. Draft pull request #1 for branch `codex/storybook-town` is open. The existing GitHub Pages site remains the active host until the repository change is merged and migration behavior is verified. The planned root `index.html` and `404.html` redirects to Cloudflare must be checked after merge.

Do not mark the migration complete until the remaining deployed pages and assets, generated canonical/social metadata, project routes, archive, and redirects have been checked against the public deployment.
