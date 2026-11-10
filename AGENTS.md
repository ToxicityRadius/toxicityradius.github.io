# Portfolio working agreement

Prioritize maximum polish and reliability. Prepare a concrete verified candidate and ask Dexter before production publication or any merge/push that triggers production. Current task scope comes from Dexter's request and the task record; this file does not authorize production publication.

## Read the owning records

- [DESIGN.md](DESIGN.md) is the visual authority. Do not substitute historical planning prompts or a skill's default aesthetic.
- [PRD](docs/planning/PRD.md), [technical requirements](docs/planning/TECHNICAL_REQUIREMENTS.md), [flow](docs/planning/APP_FLOW.md) and [data handling](docs/planning/BACKEND_SCHEMA.md) own their respective decisions.
- [IMPLEMENTATION_PLAN.md](docs/planning/IMPLEMENTATION_PLAN.md) holds the only current task-status table and next actions.
- [VERIFICATION.md](docs/VERIFICATION.md) records executed checks and limits; [RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) names the required release checks and procedures.
- [HANDOFF.md](docs/HANDOFF.md) is a continuation pointer. Files under docs/history/ explain previous checkpoints and do not guide current implementation.

## Work within the approved scope

Inspect Git status and preserve all unrelated modified and untracked files. Keep vanilla HTML/CSS/JavaScript and the existing build. Preserve the painted artwork, current section order, three featured projects, archive, existing interactions and six noninteractive photo placeholders. Do not add a backend, contact form, analytics, artwork or motion without an actual task requiring it.

Use one primary design workflow compatible with DESIGN.md; use a motion specialist for a specific interaction. Historical pixel-art/Taste prompts do not authorize replacing the current design. Keep project claims, contributor roles and demo limitations truthful.

## Verification and release

Use `npm run verify` for the existing production build and Node tests. `npm run dev` serves the main homepage at `/`; `/review/experience/` is historical. Development startup prepares review routes; after a separate build, `npm run prepare:reviews` restores development reviews. These commands and their limits are explained in README.md.

Required rendered/device checks are in the release checklist. A build or passing Node suite does not establish visual, accessibility, real-phone or production success. Record evidence against the actual candidate/fingerprint. When browser tooling lacks a capability, use the checklist's concrete alternative and owner.

No automatic deployment is established by these instructions. Inspect actual hosting and branch behavior before release operations; retain the existing public site until migration is verified. Ask to publish only when the review packet is ready.
