# Product requirements

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-18  
Scope: Pixel-art town portfolio redesign

## Product and audience

A cozy, imaginative pixel-art town that helps employers and freelance clients understand Dexter’s work and contact him. Dexter is an AI and web builder offering websites, web apps, and AI integration. Both audiences are equally important.

The current repository is a vanilla HTML/CSS/JS portfolio using GSAP; the current `index.html` confirms the existing portfolio and GitHub Pages metadata. The town concept, revised positioning, and hosting destination below are confirmed product decisions, not implemented behavior.

## Outcome and scope

Visitors should quickly find relevant work, understand Dexter’s role and capabilities, and reach him or request a CV. The release replaces the current visual direction while preserving a route to the existing project archive.

- **In scope:** town homepage with scroll and clickable landmarks; three featured case studies; existing-project archive; about, services, leadership, contact, social links, and Request CV; local theme preference; day theme by default and a night toggle.
- **Featured work:** Student Advising Portal (major contributor/co-creator); FormProof (creator; accessibility repair CLI and evidence workflow, not conformance certification); ClaimCheck (creator; checks source support, with an illustrative public demo; private features must be verified before description or exposure).
- **Landmarks:** campus, workshop, and library.
- **Excluded:** backend, contact form, analytics, and claims of deployed functionality or accessibility conformance without evidence.
- **Hosting direction:** Cloudflare Pages using a `pages.dev` address at no cost is planned; the address is not created yet. Retain the GitHub Pages site until the replacement is verified.

## Requirements and acceptance

| ID | Requirement | Acceptance condition |
|---|---|---|
| R-1 | Explore the pixel-art town | A visitor can scroll through the town and activate landmarks using mouse, touch, and keyboard; landmark actions lead to their content or case study. |
| R-2 | Understand Dexter’s value | The first view identifies Dexter and his AI/web-building focus; services include websites, web apps, and AI integration. |
| R-3 | Review featured work | Each of the three case studies states Dexter’s accurate role, purpose, evidence, and links where available. ClaimCheck’s public demo is clearly illustrative; private features are omitted until verified. |
| R-4 | Find older work and experience | The existing project archive remains reachable. Leadership is presented as SSC President, past 2025–2026, and Globe Ambassador, Head Present. |
| R-5 | Contact or request a CV | Email, social links, and Request CV are available as direct links; no form is required. |
| R-6 | Choose the visual theme | Day is the initial theme; a visitor can switch to night, and the preference is stored locally and restored on return. |
| R-7 | Use the site across devices | Core content and navigation remain usable at mobile and desktop widths, with keyboard access and reduced-motion support. |

## Open questions

| Question | Next action | Dependent work |
|---|---|---|
| Which project archive entries and case-study evidence are publication-ready? | Inspect current portfolio content and source artifacts before writing final case studies. | Content and case-study implementation |
| What ClaimCheck capabilities are safe to describe beyond the illustrative demo? | Verify against the actual project and public/private access boundaries. | ClaimCheck case study |
| What will the final `pages.dev` address be? | Create and verify the Cloudflare Pages project during deployment setup. | Canonical/OG metadata and release |

Release acceptance requires R-1 through R-7 to be checked on the intended release build. Results belong in `IMPLEMENTATION_PLAN.md`.
