# Design brief

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-18  
Scope: Pixel-art town portfolio redesign

## Intent

**Audience/task:** employers and freelance clients equally; understand Dexter’s work and reach him.  
**Impression:** cozy, imaginative pixel-art town with clear professional credibility.  
**Priority:** make the town an intuitive map to real work, not an obstacle to it.

The direction is confirmed: crisp-edged pixel art, a limited warm palette, and a consistent pixel scale. Use generated raster artwork as the source for the town assets; render responsively without blurring or uneven pixel scaling. Do not use painted or gouache storybook texture. Keep landmarks readable at phone sizes. Campus, workshop, and library respectively introduce the Student Advising Portal, FormProof, and ClaimCheck.

## Visual and interaction rules

- Day theme is the default; offer a clear day/night toggle and keep text readable in both.
- Build the town from scrollable sections with clickable, labeled landmarks. Maintain an ordinary reading order and direct case-study links.
- Use pixel-art scenes as framing for concise copy, project role, evidence, and next actions. Keep the existing project archive and contact links easy to find.
- Use Outfit for readable HTML body text and an appropriate display face for headings. Keep all essential text as HTML rather than pixel lettering baked into artwork.
- Provide responsive reflow, visible keyboard focus, text alternatives for meaningful images, and controls that do not depend on hover.
- Animation may support discovery and transitions but must not gate content. Respect reduced-motion preferences and provide a static fallback.
- Avoid implying FormProof certifies conformance. Present ClaimCheck’s demo as illustrative; do not depict unverified private functionality.

## Art-direction workflow

Use Impeccable for art direction, Taste for composition, and Emil for interaction refinement. These are design workflow references, not evidence that the resulting experience is accessible or implemented. Record consequential design choices here; verify the rendered site against the implementation plan.

Accessibility target: design and review toward WCAG 2.2 AA; this target is not a conformance claim. Check keyboard navigation, focus, contrast, reflow/zoom, image alternatives, and reduced motion on the actual build.
