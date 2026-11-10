import {readFile, mkdir, cp, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {renderWorkshopExhibit} from './review-workshop.mjs';

export function renderExperienceReview(entrance) {
  // The isolated entrance remains the source of its reviewed artwork and cloud layout.
  const start = entrance.indexOf('<section class="track">');
  const end = entrance.indexOf('<section id="after">');
  const footerStart = entrance.indexOf('<footer hidden>');
  const footerEnd = entrance.indexOf('</footer>', footerStart);
  if (start < 0 || end < start || footerStart < 0 || footerEnd < footerStart) throw new Error('Entrance review markup is incomplete');
  const valley = entrance.slice(start, end).replace('class="workshop" href=', 'class="workshop" id="workshop-trigger" aria-expanded="false" aria-controls="workshop-exhibit" href=');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>A little world of work — Dexter Soriano</title><meta name="description" content="Enter the workshop from Dexter's painted valley and inspect FormProof's recorded evidence."><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/review/animatic/style.css"><link rel="stylesheet" href="/review/exhibits/style.css"><link rel="stylesheet" href="/review/experience/style.css"><link rel="stylesheet" href="/review/experience/atmosphere.css"></head>
<body>
<a class="skip-link" href="#workshop-title">Skip to the workshop</a>
<main class="exhibit-shell experience-shell" data-open="false" data-scene="entrance" data-motion-paused="false">
<header class="experience-header"><a class="experience-name" href="/">Dexter Soriano</a><div><button id="scene-motion" type="button" aria-pressed="false" hidden>Pause scene motion</button><button id="intro-control" type="button" disabled>Preparing entrance…</button></div></header>
<section class="valley-pane" aria-label="Explore the valley">
${valley}
<section class="experience-after" aria-labelledby="explore-title"><h2 id="explore-title">Choose a place. Look inside.</h2><p>Visit the workshop, or take a direct route to a case study.</p><nav aria-label="Project case studies"><a href="/projects/student-advising-portal/">Campus · Student Advising Portal</a><a href="/projects/formproof/">Workshop · FormProof</a><a href="/projects/claimcheck/">Library · ClaimCheck</a></nav><a href="/">Continue to the full portfolio →</a></section>
</section>
${renderWorkshopExhibit()}
<p class="scene-status" role="status" aria-live="polite" aria-atomic="true"></p>
</main>
${entrance.slice(footerStart, footerEnd + '</footer>'.length)}
<script type="module" src="/review/experience/controller.js"></script>
</body></html>`;
}

export async function prepareExperienceReview(root) {
  const output = path.join(root, 'review/experience');
  await mkdir(output, {recursive:true});
  await cp('review/experience', output, {recursive:true});
  const entrance = await readFile('review/animatic/index.html', 'utf8');
  await writeFile(path.join(output, 'index.html'), renderExperienceReview(entrance));
}
