import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderExperienceReview} from '../scripts/review-experience.mjs';
import {renderWorkshopExhibit} from '../scripts/review-workshop.mjs';
import {projects,evidence} from '../scripts/portfolio-content.mjs';

const entrance = await readFile(new URL('../review/animatic/index.html',import.meta.url),'utf8');

test('combined review contains one entrance and one shared workshop with unique IDs',()=>{
 const html=renderExperienceReview(entrance);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(([,id])=>id);
 assert.equal(new Set(ids).size,ids.length,'duplicate IDs break control and label targets');
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.equal((html.match(/id="workshop-title"/g)||[]).length,1);
 assert.equal((html.match(/id="workshop-trigger"/g)||[]).length,1);
 assert.equal((html.match(/id="intro-control"/g)||[]).length,1);
 assert.equal((html.match(/class="track"/g)||[]).length,1);
 assert.ok(html.includes(renderWorkshopExhibit()));
 assert.match(html,/<a class="workshop" id="workshop-trigger" aria-expanded="false" aria-controls="workshop-exhibit" href="\/projects\/formproof\/"/);
 assert.match(html,/class="skip-link" href="#workshop-title"/);
 assert.match(html,/class="experience-shell|class="exhibit-shell experience-shell"/);
 assert.doesNotMatch(html,/data-standalone-workshop|<iframe|<script[^>]+src="\/review\/(?:animatic|exhibits)\/controller/);
 assert.match(html,/<script type="module" src="\/review\/experience\/controller.js"><\/script>/);
});

test('combined review retains native case studies and sequential, honest report evidence',()=>{
 const html=renderExperienceReview(entrance);
 for(const project of projects)assert.ok(html.includes(`href="/projects/${project.slug}/"`));
 assert.match(html,/class="case-link" href="\/projects\/formproof\/">Read the case study/);
 assert.ok(html.includes(`/images/${evidence.formproof.file}`));
 assert.ok(html.includes(evidence.formproof.caption));
 for(const text of ['Approval record: unavailable','Source diff: unavailable','Individual check logs and command output are unavailable','does not run a repair or produce a new evaluation'])assert.ok(html.includes(text),text);
 assert.equal((html.match(/<article class="repair-stage"/g)||[]).length,4);
 assert.doesNotMatch(html,/<article[^>]*(?:hidden|inert|aria-hidden)/);
 assert.match(html,/<meta name="robots" content="noindex">/);
 assert.match(html,/id="scene-motion"[^>]*hidden>Pause scene motion/);
 assert.match(html,/<footer hidden>/);
});

test('incomplete entrance fragments fail rather than render a misleading partial experience',()=>{
 for(const fragment of ['',entrance.replace('<section class="track">',''),entrance.replace('<section id="after">',''),entrance.replace('<footer hidden>',''),entrance.replace('</footer>',''),'<section id="after"><section class="track"><footer hidden></footer>']){
  assert.throws(()=>renderExperienceReview(fragment),/Entrance review markup is incomplete/);
 }
});
