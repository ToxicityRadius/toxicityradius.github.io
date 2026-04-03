# Implementation Plan: Portfolio UI/UX Revamp

## Overview
Complete visual and UX overhaul of Dexter Soriano's portfolio from a cluttered, inconsistent dark theme with heavy Three.js spheres into a modern, cohesive "Digital Architect" aesthetic — warm dark tones, bold editorial typography, smooth scroll-driven animations, glassmorphism cards, and a refined spatial composition. All existing content (personal info, education, skills, social links, contact info) is preserved exactly.

## Current State Analysis
- **Pain points**: Inconsistent design language, heavy Three.js blob (111 spheres), `<br>` tags for spacing, mixed Tailwind + custom CSS, cluttered hero text, no mobile menu, terminal-style cards that don't scan well, code-editor skill cards that don't communicate proficiency
- **Strengths to keep**: Dark theme direction, GSAP dependency, animated typing subtext, intersection observer patterns, accent color warmth

## Design Direction
```
/* Aesthetic: "Digital Architect" — warm obsidian base, coral accent, 
   bold editorial typography, generous whitespace, scroll-orchestrated reveals */
```

- **Color palette** ("Warm Obsidian"):
  - Background: `#0a0a0b` (warm black) with subtle noise texture
  - Surface: `#141415` card backgrounds
  - Border: `rgba(255,255,255,0.06)` subtle glass edges
  - Text primary: `#f0ece5` (warm cream)
  - Text secondary: `#8a8a8a`
  - Accent: `#e06050` (warm coral-red, evolved from the original `#D95F76`)
  - Accent glow: `rgba(224,96,80,0.15)`
- **Typography**: `Syne` (headings — bold, geometric, distinctive) + `Outfit` (body — clean, modern)
- **Motion**: GSAP ScrollTrigger for staggered section reveals, smooth magnetic cursor, parallax effects
- **Layout**: Full-width sections, asymmetric hero, bento-grid skills, vertical timeline education

## Architecture Changes

| File | Action |
|---|---|
| `index.html` | Full rewrite — semantic HTML5, modern section structure, mobile nav, simplified hero, proper timeline, bento skills grid, redesigned footer |
| `styles.css` | Full rewrite — CSS custom properties, modern layout (grid/flexbox), glassmorphism, scroll animations, responsive breakpoints, no Tailwind dependency |
| `script.js` | Full rewrite — lighter particle canvas (no Three.js), GSAP ScrollTrigger reveals, magnetic cursor, smooth scroll, mobile menu toggle, typing effect |

## Implementation Steps

### Phase 1: HTML Structure

1. **Rewrite document head**
   - Replace CDN dependencies — remove Three.js, OrbitControls, dat.gui, Tailwind CDN, five-server script
   - Add Google Fonts (Syne + Outfit), Font Awesome 6, GSAP + ScrollTrigger CDN
   - Why: Reduces page weight dramatically; Three.js + controls + dat.gui are ~600KB. GSAP is ~30KB
   - Risk: Low

2. **Restructure navigation**
   - Glassmorphism fixed navbar with logo text, nav links (About, Education, Skills, Projects), mobile hamburger button, and "Let's Connect" CTA
   - Add `<div id="mobile-menu">` overlay for responsive
   - Why: Current nav has no mobile menu; the pill-shaped glassmorphism bar is kept but cleaned up
   - Risk: Low

3. **Redesign hero section**
   - Full-viewport hero with lightweight canvas particle background, large `Syne` headline ("Dexter Soriano"), animated subtitle with typing effect (roles), brief tagline ("Dreaming to be a Computer Engineer"), social links row, and profile image with glow ring
   - Remove the scattered grid-positioned labels
   - Why: Current hero has text scattered across a 12x12 grid that's hard to read; a focused centered layout is more impactful
   - Risk: Low

4. **Redesign About Me section**
   - Two-column layout with image on left (with decorative accent shapes), text on right with heading, role subtitle, paragraph, and CTA button
   - Clean semantic markup
   - Why: Current section uses inline styles and empty src attributes
   - Risk: Low

5. **Redesign Education section as vertical timeline**
   - Clean vertical timeline with alternating left/right cards (desktop) / stacked cards (mobile)
   - Each card: date badge, institution, degree/level, bullet list of achievements
   - Glassmorphism card style
   - Why: Terminal-style cards are fun but hard to scan; a proper timeline communicates progression better
   - Risk: Low

6. **Redesign Skills section as bento grid**
   - Section header + bento-style grid of skill cards
   - Each card: language icon (Font Awesome or simple SVG), name, small code snippet or proficiency indicator
   - Cards have glassmorphism + hover tilt effect
   - Why: Code-editor cards are visually heavy and don't communicate skill level; bento grid is modern and scannable
   - Risk: Low

7. **Redesign footer**
   - Clean 3-column footer (branding + bio, contact info, social links), horizontal rule, copyright line
   - Proper semantic markup, no inline color overrides
   - Risk: Low

### Phase 2: Styles

8. **Write CSS custom properties and base reset**
   - Define `:root` variables for all colors, fonts, spacing, border-radius
   - Modern reset (box-sizing, margin removal, smooth scroll)
   - Set body background with subtle noise/gradient
   - Why: CSS variables enable consistent theming and easy future changes
   - Risk: Low

9. **Style navigation**
   - Fixed glassmorphism bar (`backdrop-filter: blur(16px)`), transitions on scroll (becomes more opaque)
   - Nav link hover underline animation, mobile menu slide-in panel, hamburger animation
   - Risk: Low

10. **Style hero section**
    - Full viewport height, centered flex layout
    - Large headline with gradient text or accent color, animated underline on subtitle
    - Social link pills with hover glow, profile image with double-ring glow effect
    - Particle canvas positioned absolute behind content
    - Risk: Low

11. **Style About Me section**
    - Two-column grid with gap
    - Image with decorative corner accents (CSS pseudo-elements)
    - Text side with proper vertical rhythm, CTA button with fill animation on hover
    - Risk: Low

12. **Style Education timeline**
    - Vertical line (CSS pseudo-element), timeline nodes (small circles on the line)
    - Glassmorphism cards with left border accent, date badges
    - Staggered animation-ready classes
    - Responsive: single-column on mobile
    - Risk: Low

13. **Style Skills bento grid**
    - CSS Grid with mixed column spans (2-col, 1-col cards)
    - Glassmorphism card backgrounds, icon styling
    - Hover scale/glow effect, code snippet in monospace with syntax color
    - Risk: Low

14. **Style footer**
    - Dark surface background, grid layout
    - Link hover colors, social icon hover transitions
    - Subtle top border
    - Risk: Low

15. **Add responsive breakpoints**
    - Mobile-first, breakpoints at 640px, 768px, 1024px, 1280px
    - Ensure nav collapses, hero stacks, timeline goes single-column, bento grid reflows
    - Risk: Medium — must test multiple breakpoints

### Phase 3: JavaScript

16. **Lightweight particle canvas**
    - Replace 111-sphere Three.js scene with a 2D canvas particle system (~80 floating dots, connected by faint lines when close)
    - Subtle parallax on mouse move
    - Much lighter on performance
    - Why: Three.js was ~600KB of dependencies for a background decoration; a 2D canvas achieves similar ambient effect at a fraction of the cost
    - Risk: Medium — must look good and perform well

17. **GSAP ScrollTrigger section reveals**
    - Each section fades up + slides up on scroll into view
    - Staggered children (timeline cards, skill cards)
    - Hero elements cascade in on page load
    - Why: Scroll-driven animations are the modern standard for impressive portfolios
    - Risk: Low

18. **Mobile menu toggle**
    - Hamburger click toggles mobile menu panel with slide animation
    - Body scroll lock, close on link click or overlay click
    - Risk: Low

19. **Typing effect**
    - Preserve the existing typing/deleting subtext effect with the same phrases
    - Phrases: "Data Scientist", "Frontend Developer", "Problem Solver", "Team Player", "Lifelong Learner"
    - Risk: Low

20. **Smooth scroll + active nav highlighting**
    - Smooth scroll to sections on nav click
    - Update active nav link based on scroll position using IntersectionObserver
    - Risk: Low

21. **Magnetic cursor effect (desktop only)**
    - Custom dot + circle follower cursor (simplified from current)
    - Only on screens > 1024px
    - Hide default cursor
    - Risk: Low

## Content Preservation Checklist
- [ ] Name: "Dexter Soriano"
- [ ] Photo URL: `https://github.com/ToxicityRadius/toxicityradius.github.io/blob/main/484045153_498465746651199_6569911079363595658_n.jpg?raw=true`
- [ ] Roles: Data Scientist, Frontend Developer, Problem Solver, Team Player, Lifelong Learner
- [ ] Dream: "Dreaming to be a Computer Engineer"
- [ ] About: "Current Student Council Officer", "Standing at the forefront as an agent of change"
- [ ] Social links: Facebook, Instagram, GitHub, LinkedIn (exact URLs)
- [ ] Education 1: TIP Manila BS CpE (2023-Present), 5 org roles
- [ ] Education 2: TIP Manila SHS (2021-2023), Honors, Best in Research, grade averages
- [ ] Education 3: Divine Light Academy JHS (2017-2021), High Honors
- [ ] Skills: HTML, CSS, JavaScript, Python (with code snippets)
- [ ] Footer bio paragraph (intact)
- [ ] Contact: Phone +63 906 347 2264, Email mdasoriano01@tip.edu.ph, Address Suntrust Parkview Manila
- [ ] Copyright: "© Copyright 2025 Dexter Soriano. All rights reserved."

## Risks & Mitigations
- **Risk**: Particle canvas performance on low-end mobile
  - Mitigation: Reduce particle count on mobile (`matchMedia`), use `requestAnimationFrame` with delta time, pause when not in viewport
- **Risk**: GSAP ScrollTrigger bundle size
  - Mitigation: Use CDN (already cached by many sites), it's only ~30KB minified
- **Risk**: Font loading flash (FOUT)
  - Mitigation: Use `font-display: swap` in Google Fonts URL, provide fallback stack
- **Risk**: Mobile menu accessibility
  - Mitigation: Proper `aria-expanded`, focus trap, escape key handler

## Dependency Changes
| Removed | Added |
|---|---|
| Three.js (~600KB) | GSAP ScrollTrigger plugin (~30KB) |
| OrbitControls | — |
| dat.gui | — |
| Tailwind CDN (~300KB) | — |
| Font Awesome 5 | Font Awesome 6 |
| Roboto + Comfortaa fonts | Syne + Outfit fonts |

**Net reduction**: ~870KB of JS/CSS removed, ~30KB added. Massive performance win.

## Success Criteria
- [ ] All original content present and accurate
- [ ] Page loads in < 2 seconds on 3G throttle (Lighthouse)
- [ ] Smooth 60fps scroll animations on mid-range devices
- [ ] Fully responsive from 320px to 2560px
- [ ] Accessible: proper heading hierarchy, focus states, reduced-motion support, semantic landmarks
- [ ] Score 90+ on Lighthouse Performance, Accessibility, SEO
- [ ] "Wow factor": scroll-driven reveals, particle background, magnetic cursor, glassmorphism cards create a modern, polished impression

## Design System Reference

### Color Tokens
```css
--bg-primary: #0a0a0b;
--bg-secondary: #141415;
--border-subtle: rgba(255, 255, 255, 0.06);
--text-primary: #f0ece5;
--text-secondary: #8a8a8a;
--accent-primary: #e06050;
--accent-glow: rgba(224, 96, 80, 0.15);
```

### Typography Styles
- **Display/Heading**: Syne, weight 700-900, letter-spacing -0.02em
- **Body**: Outfit, weight 400-600, line-height 1.6
- **Monospace**: JetBrains Mono, weight 400, for code snippets

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 2rem (32px)
- xl: 4rem (64px)
- xxl: 6rem (96px)

### Glassmorphism
```css
background: rgba(20, 20, 21, 0.7);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 12px;
```

### Animations (GSAP defaults)
- Duration: 0.6s - 1.2s
- Easing: power2.out (scroll reveals), power3.out (interactions)
- Stagger: 0.1s between children
