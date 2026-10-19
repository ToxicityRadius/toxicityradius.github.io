# Design brief

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-19
Scope: Pixel-art town portfolio redesign

## Intent

**Audience/task:** employers and freelance clients equally; understand Dexter’s work and reach him.  
**Impression:** cozy, imaginative pixel-art town with clear professional credibility.  
**Priority:** make the town an intuitive map to real work, not an obstacle to it.

The assembled quiet countryside direction was approved on 2026-10-19: greenery, warm stone, restrained detail, and the complete town on phones with large project links below. The user then requested a full James Chugh-inspired experience while keeping pixel art: entrance, sourced personal journey, real project evidence, about, services, and contact. Independent generated terrain, hills, transparent buildings, and foreground now share the 1672 x 941 composition, with an SVG sky. The approved static master is an art checkpoint; the rendered scene is genuinely layered. Night reuses that geometry. The direction is confirmed: crisp-edged pixel art, a limited warm palette, and a consistent pixel scale. Use generated raster artwork as the source for the town assets; render responsively without blurring or uneven pixel scaling. Do not use painted or gouache storybook texture. Keep landmarks readable at phone sizes. Campus, workshop, and library respectively introduce the Student Advising Portal, FormProof, and ClaimCheck.

## Visual and interaction rules

- Signature motion now means an actual desktop pinned town fly-in, a journey route/traveler coordinated with five factual chapters, and selectable project panels. Ambient loops and shallow depth alone do not meet the reference intent. Phones use native chapter links and project buttons; reduced motion removes scroll choreography. Preserve every chapter and project article in the static HTML.
- Day theme is the default; offer a clear day/night toggle and keep text readable in both.
- Build the town from scrollable sections with clickable, labeled landmarks. Maintain an ordinary reading order and direct case-study links.
- Use pixel-art scenes as framing for concise copy, project role, evidence, and next actions. Keep the existing project archive and contact links easy to find.
- Use Outfit for readable HTML body text and an appropriate display face for headings. Keep all essential text as HTML rather than pixel lettering baked into artwork.
- Provide responsive reflow, visible keyboard focus, text alternatives for meaningful images, and controls that do not depend on hover.
- Water, workshop smoke, a traveler, and night lighting support the town atmosphere. One playback control pauses all ambient loops and freezes the five scroll-depth layers; offscreen and hidden-document suspension preserves the user’s pause choice. Live reduced-motion changes show a complete static fallback. Omit smoke and traveler on phones. Animation must not gate content.
- Avoid implying FormProof certifies conformance. Present ClaimCheck’s demo as illustrative; do not depict unverified private functionality.

## Art-direction workflow

Use Impeccable for art direction, Taste for composition, and Emil for interaction refinement. These are design workflow references, not evidence that the resulting experience is accessible or implemented. Record consequential design choices here; verify the rendered site against the implementation plan.

Accessibility target: design and review toward WCAG 2.2 AA; this target is not a conformance claim. Check keyboard navigation, focus, contrast, reflow/zoom, image alternatives, and reduced motion on the actual build.
