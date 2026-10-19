# Laptop handoff - 19 October 2026

Continue only the town portfolio on `codex/storybook-town`. The separate AERIS / Inference Observatory work is excluded from this handoff.

Clone directly into its own folder on the laptop (the folder name is local; the repository is shared with the older site):

```powershell
git clone --branch codex/storybook-town https://github.com/ToxicityRadius/toxicityradius.github.io.git town-portfolio
cd town-portfolio
npm ci
npm run build
npm test
npm run dev
```

Open <http://127.0.0.1:4173>. For an existing clean checkout, use `git fetch origin`, `git switch codex/storybook-town`, and `git pull --ff-only` before `npm ci`. Keep any local changes before switching or pulling.

## Saved progress and next steps

- Source, layered pixel-art assets, motion implementations, automated tests, review prototypes under `review/`, and captured evidence under `output/` are included.
- `npm run build` and all 71 tests passed during this handoff. Earlier test counts below and in planning documents describe previous checkpoints.
- Review the combined experience at `/review/experience/` and the prototypes documented under `review/` before choosing the next visual change. Tests passing do not mean the motion has final visual approval.
- Read `docs/VERIFICATION.md`, `docs/MOTION_REVIEW.md`, `docs/JAMES_MOTION_STUDY.md`, and `docs/planning/IMPLEMENTATION_PLAN.md` for decisions, evidence, and remaining review gaps.
- Continue the pending accessibility, keyboard, cross-browser, real-device performance, and deployment/migration checks. No deployment or merge is part of this handoff.
- Node.js and npm are required; dependencies are reproducible through `package-lock.json`. `node_modules/`, `dist/`, ignored local `work/` tooling/captures, browser downloads, and authentication are not transferred. Skills installed in the workstation's Codex home are also machine-local. The optional reverse-engineering environment must be recreated before its activation script can work; see `docs/REVERSE_ENGINEERING_SETUP.md`. Normal development requires only the commands above.

The earlier handoff below preserves the hosting and product context; its test counts and local environment descriptions are historical.

---
# Continue this portfolio work at home

The current implementation and planning documents are on Git branch `codex/storybook-town` in `ToxicityRadius/toxicityradius.github.io`. Draft pull request #1 is open at <https://github.com/ToxicityRadius/toxicityradius.github.io/pull/1>. Use the same Codex task if it appears in your account; this file preserves the essential project state if you need to resume from a fresh chat.

## Get the files

```powershell
gh repo clone ToxicityRadius/toxicityradius.github.io
cd toxicityradius.github.io
git switch codex/storybook-town
```

If you already have the checkout:

```powershell
git fetch origin
git switch codex/storybook-town
git pull --ff-only
```

Requires Node.js for local work. Run `npm run build`, `npm test`, then `npm run dev` and open `http://127.0.0.1:4173`.

## Current product decisions

- Cozy, imaginative pixel-art town as the interactive homepage; dedicated pages for Student Advising Portal, FormProof, and ClaimCheck.
- Intended equally for employers and freelance clients; position Dexter as an AI and web builder offering websites, web apps, and AI integrations.
- Keep day/night themes, with day as the default; allow both scrolling and clicking through the town.
- Student Advising Portal: major contributor/co-creator. FormProof and ClaimCheck: creator.
- Dexter is still a student. SSC President is a past 2025–2026 role. Globe Ambassador Head is current from April 2025–Present.
- Keep the other existing projects in a filterable archive. Use email/social contact and a CV request link; no contact form, backend, or analytics.
- Cloudflare Pages is the selected host. No Figma or Claude dependency.

## Current state

- Cloudflare Pages project: `dexter-soriano-portfolio`.
- Public preview: <https://dexter-soriano-portfolio.pages.dev>.
- Last deployment-specific URL: <https://142fabed.dexter-soriano-portfolio.pages.dev>.
- Limited HTTP checks returned 200 for the homepage, archive, FormProof case study, and deployment URL. See [`VERIFICATION.md`](VERIFICATION.md) for what remains unverified.
- GitHub Pages migration is pending. Do not treat the old URL redirect as active until the repository change is merged and checked.
- Review the open draft pull request before merging; the root redirect files affect the old public address only after merge.
- The project README documents local development and manual Wrangler deployment. Cloudflare CLI authentication must be set up on the home computer separately; never commit credentials or local authentication files.
- Full keyboard testing, automated accessibility scan, performance testing, remaining live routes/assets, and post-merge redirects remain to be checked.

## Key files

- [`planning/PRD.md`](planning/PRD.md): product scope and acceptance criteria.
- [`planning/DESIGN.md`](planning/DESIGN.md): pixel-art design and interactions.
- [`planning/IMPLEMENTATION_PLAN.md`](planning/IMPLEMENTATION_PLAN.md): tasks and migration steps.
- [`ASSET_SOURCES.md`](ASSET_SOURCES.md): artwork, screenshot, font, and library provenance.
- [`VERIFICATION.md`](VERIFICATION.md): completed checks and limits.
- [`../DESIGN.md`](../DESIGN.md): implemented design tokens and behavior.

The old root [`../REVAMP_PLAN.md`](../REVAMP_PLAN.md) describes an earlier direction and is marked superseded. Follow the current documents under `docs/planning/`.

