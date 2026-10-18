# Dexter Soriano portfolio

A static portfolio presented as a cozy pixel-art town, with dedicated case studies and a browsable project archive. The site is built with vanilla HTML, CSS, and JavaScript using a small Node.js static-site generator; GSAP is vendored for motion. It has no application backend, contact form, or analytics.

## Local development

Requires Node.js. From the repository root:

```powershell
npm run build
npm run dev
```

Open `http://127.0.0.1:4173`. The build writes the homepage, three case studies, project archive, 404 page, and assets into `dist/`.

Run the automated checks with:

```powershell
npm test
```

## Deployment

The site is deployed on Cloudflare Pages at <https://dexter-soriano-portfolio.pages.dev> (project `dexter-soriano-portfolio`). On 2026-10-18, public GET requests returned HTTP 200 for the homepage, archive, FormProof case study, and deployment-specific URL. The remaining project routes, assets, and GitHub Pages migration redirect still need verification. GitHub Pages remains the existing host until the repository change is merged and migration behavior is verified. No automatic deployment is configured or claimed.

After building, a manual deployment to the `main` branch can be run with Wrangler:

```powershell
npm run build
npx wrangler pages deploy dist --project-name dexter-soriano-portfolio --branch main
```

Wrangler authentication is managed outside the repository. Do not put credentials, tokens, or generated local authentication files in source control. Keep the GitHub Pages site available until all Cloudflare routes and assets, plus the post-merge redirect behavior, have been verified.

## Project guidance

- Product scope and acceptance: [`docs/planning/PRD.md`](docs/planning/PRD.md)
- Technical constraints: [`docs/planning/TECHNICAL_REQUIREMENTS.md`](docs/planning/TECHNICAL_REQUIREMENTS.md)
- Navigation and interaction: [`docs/planning/APP_FLOW.md`](docs/planning/APP_FLOW.md)
- Pixel-art and accessibility design direction: [`docs/planning/DESIGN.md`](docs/planning/DESIGN.md)
- Data handling: [`docs/planning/BACKEND_SCHEMA.md`](docs/planning/BACKEND_SCHEMA.md)
- Work status and release actions: [`docs/planning/IMPLEMENTATION_PLAN.md`](docs/planning/IMPLEMENTATION_PLAN.md)
- Actual check results and limits: [`docs/VERIFICATION.md`](docs/VERIFICATION.md)
- Image provenance: [`docs/ASSET_SOURCES.md`](docs/ASSET_SOURCES.md)
- At-home continuation: [`docs/HANDOFF.md`](docs/HANDOFF.md)
