# Riverline spatial prototype

Open /review/riverline/ after starting the local preview with npm run dev. The source for this route is isolated under this directory; it does not replace the portfolio homepage. A production build deliberately omits review routes.

## What this tests

A compact waterfront site made from deliberate Three.js primitives: a continuous promenade, water edge, central terrace, and three project masses with different proportions and facade cues. The desktop camera travels from an elevated overview through an oblique approach to a slightly elevated landing. Three named camera controls allow the compositions to be compared.

HTML project links are available independently of the scene. Skip, reduced-motion, small-screen behavior, and a WebGL failure message preserve basic navigation. There is no free-roaming camera or detailed environment in this milestone.

## Reference principles

These built projects were consulted for design principles, not copied as geometry or used as source imagery:

- Kalvebod Waves — continuous public circulation linked to waterside destinations: https://jdsa.eu/kalvebod-making-waves/
- Chicago Riverwalk — a connected route that accommodates distinct spaces: https://www.r-barc.com/work/chicago-riverwalk
- Floating Office Rotterdam — disciplined structural rhythm and coherent massing: https://www.powerhouse-company.com/floating-office-rotterdam

The Riverline name and final architectural identity remain unapproved. The graybox tests whether the site, camera route, and project navigation make sense; it does not establish the final visual style or production performance.

Three.js is a local development dependency. scripts/serve.mjs copies its ES modules into the generated preview route so the browser does not depend on a third-party CDN.
