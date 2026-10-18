# Design and implementation prompts

These prompts carry the project decisions into the named design workflows. They are guidance for future work, not evidence that any workflow ran or that the portfolio is implemented.

## Impeccable — art direction

Art-direct a cozy, imaginative pixel-art town portfolio for Dexter Soriano, an AI and web builder seeking both employment and freelance clients. Use crisp pixel edges, a limited warm palette, and a consistent pixel scale. The town is the homepage’s navigation: campus for the Student Advising Portal, workshop for FormProof, and library for ClaimCheck. Use generated raster artwork as source assets and plan responsive rendering that preserves crisp pixels. Do not use painted or gouache storybook texture. Keep professional credibility, legibility, and project evidence ahead of decoration. Use Outfit for readable HTML body text and an appropriate display face for headings; do not bake essential copy into artwork or use pixel body text. Include a day theme by default and a night toggle. Provide responsive, keyboard-usable landmarks and a reduced-motion path. FormProof is an accessibility repair CLI/evidence workflow, not a conformance certification. ClaimCheck’s public demo is illustrative; omit private capabilities unless verified. Preserve access to the existing project archive and clear email/social/CV actions.

## Taste — composition

Compose the town as a readable, scrollable pixel-art map with three distinct landmarks: campus, workshop, and library. Use crisp edges, a consistent pixel scale, and a limited warm palette; avoid painted/gouache texture, blurry scaling, and uneven pixel sizes. Use generated raster art for the scene, with semantic HTML text in Outfit and an appropriate display face. Make the next action obvious at desktop and mobile sizes; avoid tiny hotspots, hover-only labels, and a scene that hides the reading order. Balance the art with concise project labels and clear paths to case studies, archive, and contact. Day is the default; ensure a parallel night palette preserves hierarchy and contrast. Provide static, semantic content when animation is reduced or unavailable.

## Emil — interaction refinement

Refine motion and interaction for the pixel-art town portfolio: use restrained, purposeful transitions for landmark discovery, scroll, and day/night changes. Preserve crisp pixel edges and consistent pixel scale during responsive rendering and motion. Keep controls responsive, focus visible, and navigation operable by keyboard, touch, and pointer. Respect `prefers-reduced-motion`; essential content must never depend on animation. Do not add interaction that changes the meaning of project claims or suggests external email/link success. Keep the existing project archive reachable.

## Coding-agent handoff

Read the six planning files in this directory and inspect the current repository before editing. Begin with T-1 in `IMPLEMENTATION_PLAN.md`: verify existing project/archive content, assets, hosting configuration, and public/private boundaries for ClaimCheck. Then implement the smallest complete scope consistent with the requirements. Preserve the vanilla HTML/CSS/JS and GSAP approach unless inspection shows a concrete need to change it. No backend, form, or analytics. Do not remove the current GitHub Pages site until Cloudflare Pages is deployed and verified. Report only checks actually performed and mark unrun checks Not run.
