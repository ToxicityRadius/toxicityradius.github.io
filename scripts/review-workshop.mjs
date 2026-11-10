import {mkdir,cp,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {projects,evidence} from './portfolio-content.mjs';

const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

export function renderWorkshopExhibit(){
 const project=projects.find(item=>item.slug==='formproof'),report=evidence.formproof;
 return ` <section class="project-exhibit" id="workshop-exhibit" role="region" aria-labelledby="workshop-title">
  <img class="bench-art" src="/review/exhibits/images/workshop-setting.webp" alt="" width="1672" height="941">
  <span id="project-formproof" aria-hidden="true"></span>
  <div class="exhibit-topline"><button class="close-exhibit" id="close-workshop" type="button" hidden>Back to valley ${arrow}</button><a class="case-link" href="/projects/formproof/">Read the case study ${arrow}</a></div>
  <div class="scene-content">
   <div class="project-introduction"><div class="project-name"><h2 id="workshop-title" tabindex="-1">${escape(project.name)}</h2><span>${escape(project.role)} · ${escape(project.type)}</span></div><p class="project-premise">${escape(project.headline)}</p><p class="project-description">${escape(project.intro)}</p></div>
   <div class="repair-trail" id="repair-trail">
    <p class="record-identity">Record · static-state-01</p>
    <div class="repair-progress-track"><ol class="repair-progress" aria-label="Repair stages"><li>Finding</li><li>Review</li><li>Change</li><li>Verification</li></ol><span class="repair-marker" aria-hidden="true"></span></div>
    <div class="stage-panels">
     <article class="repair-stage" aria-labelledby="finding-title"><h3 id="finding-title">One finding on the bench.</h3><p>The historical <strong>static-state-01</strong> report records one automated rule affecting one node.</p><pre>Rules: 1\nAffected nodes: 1\nAdapter: static</pre><p>The retained image cuts off the rule detail. The specific barrier and source candidate cannot be identified.</p><p class="source-note">Source: <a href="/images/${escape(report.file)}" target="_blank" rel="noopener noreferrer">historical report screenshot</a>. This is the same recorded finding throughout.</p></article>
     <article class="repair-stage" aria-labelledby="review-title"><h3 id="review-title">A human decision comes first.</h3><p>FormProof’s documented workflow requires human approval before an AI-assisted edit.</p><pre>static-state-01 · 1 affected node\nApproval record: unavailable</pre><p class="outcome">This retained report does not show who approved a change, or whether approval was recorded.</p><p class="source-note">Workflow: <a href="/projects/formproof/">FormProof case study</a>. Approval is a process requirement, not an observed event in this image.</p></article>
     <article class="repair-stage" aria-labelledby="change-title"><h3 id="change-title">A change needs something to inspect.</h3><p>A source diff would connect this finding to the proposed repair.</p><pre>static-state-01 · 1 affected node\nSource diff: unavailable</pre><p class="outcome">The diff was not retained with this image. There is no source edit here to inspect or attribute.</p><p class="source-note">The evidence trail has a gap. No replacement code or reconstructed patch is presented as historical evidence.</p></article>
     <article class="repair-stage" aria-labelledby="verification-title"><h3 id="verification-title">The recorded outcome.</h3><p>The historical report marks this run <strong>VERIFIED_FIXED</strong>.</p><pre>static-state-01 · 1 affected node\nRecorded status: VERIFIED_FIXED</pre><p>The report states that targeted automated barriers are absent and regression gates passed. Individual check logs and command output are unavailable here.</p><p class="source-note">${escape(report.caption)} The retained screenshot alone cannot independently establish the repair or its checks.</p></article>
    </div>
    <div class="stage-controls"><button id="previous-stage" type="button" hidden>Previous</button><p id="repair-summary" class="repair-summary" role="status" aria-live="polite" aria-atomic="true"></p><button id="next-stage" type="button" hidden>Next</button></div>
   </div>
   <div class="evidence-shelf"><details class="recorded-report"><summary>Inspect the recorded report ${arrow}</summary><figure><a href="/images/${escape(report.file)}" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size FormProof historical evidence report"><img src="/images/${escape(report.file)}" alt="${escape(report.alt)}" width="${report.width}" height="${report.height}" loading="lazy"></a><figcaption>${escape(report.caption)}</figcaption></figure></details><div class="exhibit-footnote"><p>Historical static-state-01 screenshot · retained report only. This does not run a repair or produce a new evaluation.</p><a href="${escape(project.repo)}" target="_blank" rel="noopener noreferrer">Repository ${arrow}</a></div></div>
  </div>
 </section>`;
}

export function renderWorkshopReview(){
 return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>The workshop — Dexter Soriano</title><meta name="description" content="Follow one recorded FormProof finding, including the limits of its retained evidence."><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/review/exhibits/style.css"></head>
<body>
<a class="skip-link" href="#workshop-title">Skip to the project explanation</a>
<header class="review-header"><a class="wordmark" href="/review/animatic/">Dexter Soriano<span>Selected work</span></a><nav aria-label="Review navigation"><a href="/review/animatic/">The entrance</a><a href="/projects/">All projects ${arrow}</a></nav></header>
<main class="exhibit-shell" data-standalone-workshop data-open="false">
 <section class="valley-pane" aria-labelledby="valley-title">
  <div class="valley-copy"><h1 id="valley-title">Good work<br>takes shape.</h1><p>Three places. Three different ways<br>to make something useful.</p></div>
  <div class="valley-frame"><img class="valley-art" src="/review/animatic/backplate.png" alt="A countryside valley with a campus, timber workshop and library beside the river" width="1672" height="941">
   <a class="landmark landmark-campus" href="/projects/student-advising-portal/"><span>Campus</span><strong>Student Advising Portal</strong>${arrow}</a>
   <a class="landmark landmark-library" href="/projects/claimcheck/"><span>Library</span><strong>ClaimCheck</strong>${arrow}</a>
   <button class="landmark landmark-workshop" id="workshop-trigger" type="button" aria-expanded="false" aria-controls="workshop-exhibit" hidden><span>Workshop</span><strong>FormProof</strong>${arrow}</button>
   <a class="landmark landmark-workshop marker-fallback" href="/projects/formproof/"><span>Workshop</span><strong>FormProof</strong>${arrow}</a>
  </div>
  <div class="valley-note"><span>Choose a place. Look inside.</span><span class="review-note">Workshop study · daytime</span></div>
 </section>
 ${renderWorkshopExhibit()}
</main>
<footer class="review-footer"><p>One workshop, ready to look inside.</p><a href="/projects/formproof/">Go directly to FormProof ${arrow}</a></footer>
<script type="module" src="/review/exhibits/controller.js"></script>
</body></html>`;
}

export async function prepareWorkshopReview(root){
 const output=path.join(root,'review/exhibits');
 await mkdir(output,{recursive:true});
 await cp('review/exhibits',output,{recursive:true});
 await writeFile(path.join(output,'index.html'),renderWorkshopReview());
}
