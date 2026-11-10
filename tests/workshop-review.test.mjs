import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderWorkshopReview,renderWorkshopExhibit} from '../scripts/review-workshop.mjs';
import {projects,evidence} from '../scripts/portfolio-content.mjs';

test('workshop retains one traceable finding and discloses missing approval, diff and verification logs',()=>{
 const html=renderWorkshopReview(),project=projects.find(project=>project.slug==='formproof');
 assert.ok(html.includes(project.headline));assert.ok(html.includes(project.intro));
 assert.ok(html.includes(evidence.formproof.caption));
 for(const text of ['static-state-01','Approval record: unavailable','Source diff: unavailable','Recorded status: VERIFIED_FIXED','Individual check logs and command output are unavailable','cannot independently establish the repair or its checks','does not run a repair or produce a new evaluation'])assert.ok(html.includes(text),text);
 assert.equal((html.match(/<article class="repair-stage"/g)||[]).length,4);
 assert.equal((html.match(/class="repair-trail"/g)||[]).length,1);
 assert.doesNotMatch(html,/workflow-paper|connector-path|<dialog|aria-modal/);
 assert.match(html,/<h2 id="workshop-title" tabindex="-1">FormProof<\/h2>/);
 assert.match(html,/<details class="recorded-report">/);
});

test('unextended markup exposes sequential articles and native project and evidence links',()=>{
 const html=renderWorkshopReview();
 for(const slug of projects.map(project=>project.slug))assert.ok(html.includes(`/projects/${slug}/`));
 assert.match(html,/class="case-link" href="\/projects\/formproof\/">Read the case study/);
 assert.match(html,/class="skip-link" href="#workshop-title"/);
 assert.match(html,/id="project-formproof"/);
 assert.doesNotMatch(html,/<article[^>]*(?:hidden|inert|aria-hidden)/);
 for(const id of ['workshop-trigger','close-workshop','previous-stage','next-stage'])assert.match(html,new RegExp(`<button[^>]*id="${id}"[^>]*hidden`));
 assert.ok(html.includes(`/images/${evidence.formproof.file}`));
});

test('fullscreen and artifact transitions use opacity and transform with a reduced-motion path',async()=>{
 const css=await readFile(new URL('../review/exhibits/style.css',import.meta.url),'utf8');
 assert.match(css,/position:fixed;inset:0/);
 assert.match(css,/opacity 240ms var\(--ease\),transform 240ms/);
 assert.match(css,/opacity 200ms var\(--ease\),transform 200ms/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/transform:none;transition:opacity 120ms/);
 assert.doesNotMatch(css,/transition:all|animation:/);
});


test('combined experience reuses the exhibit without standalone document or navigation bootstrap',()=>{
 const exhibit=renderWorkshopExhibit(),standalone=renderWorkshopReview();
 assert.ok(standalone.includes(exhibit));
 assert.match(exhibit,/^ <section class="project-exhibit"/);
 assert.match(exhibit,/class="record-identity">Record · static-state-01/);
 assert.match(exhibit,/class="repair-progress-track"/);
 assert.match(exhibit,/class="repair-marker" aria-hidden="true"/);
 assert.doesNotMatch(exhibit,/<main|<script|<!doctype|data-standalone-workshop/);
 assert.match(standalone,/data-standalone-workshop/);
});
