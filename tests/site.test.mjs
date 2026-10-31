import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {validateProductionAssets} from '../scripts/validate-production.mjs';
import {valleyAssets, valleyUrl} from '../scripts/valley-assets.mjs';
const routes=['/','/projects/','/projects/student-advising-portal/','/projects/formproof/','/projects/claimcheck/'];
test('only the homepage loads the local Anime.js headline enhancement and keeps semantic fallback text',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.match(home,/<h1>Curious enough to ask\.<br><span class="marker hero-marker">Ready to build\.<\/span><\/h1>/);
 assert.match(home,/<script type="module" src="\/headline-text\.js"><\/script>/);
 for(const route of routes.slice(1)){
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  assert.doesNotMatch(html,/headline-text\.js|anime\.esm/);
 }
 assert.deepEqual(await readFile('dist/vendor/anime.esm.min.js'),await readFile('node_modules/animejs/dist/bundles/anime.esm.min.js'));
 assert.match(await readFile('dist/vendor/anime-LICENSE.md','utf8'),/MIT License/);
});
for(const route of routes){
 test(`${route} has metadata, a heading, and resolvable local links/assets`,async()=>{
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.match(html,/<link rel="canonical"/);
  assert.doesNotMatch(html,/town-(?:day|night)\.webp/);
  for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
   let file=path.join('dist',url);if(url.endsWith('/'))file=path.join(file,'index.html');
   assert.ok((await stat(file)).isFile(),`${route}: ${url} exists`);
  }
 });
}
test('role correction and project attribution survive the build',async()=>{
 const home=await readFile('dist/index.html','utf8');
 const about=home.match(/<section[^>]*id="about"[\s\S]*?(?=<section id="services")/)?.[0]?.replace(/<[^>]*>/g,' ');
 assert.ok(about,'personal desk retains leadership');
 assert.match(about,/Supreme Student Council President[\s\S]*2025–2026[\s\S]*Past role/);
 assert.match(about,/Globe Digital Thumbprint Program[\s\S]*Campus Ambassador Head[\s\S]*April 2025–Present/);
 assert.match(home.replace(/&amp;/g,'&'),/Co-creator & major contributor/);
});

test('archive keeps all eleven legacy projects',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');assert.equal((html.match(/data-category=/g)||[]).length,11);
 assert.match(html,/<div class="filters"[^>]* hidden>/);
});

test('production validates local assets and omits review and obsolete artwork',async()=>{
 assert.ok(await validateProductionAssets('dist'));
 for(const file of ['review','images/town-day.webp','images/town-night.webp','experience.js','experience.css','hero-flight.css','world/animatic/phone.png','world/animatic/backplate.png']) {
  await assert.rejects(stat(path.join('dist',file)),{code:'ENOENT'});
 }
 const html=await readFile('dist/index.html','utf8');
 const backdrop=valleyUrl('backplate.png');
 assert.equal((html.match(new RegExp(`\\ssrc="${backdrop}"`,'g'))||[]).length,1,'the hero retains its painted backdrop while the journey uses geography');
 assert.ok(html.includes(`content="https://dexter-soriano-portfolio.pages.dev${backdrop}"`));
 assert.match(html,/<img class="plate" fetchpriority="high"/);
 for(const [font,type] of [['outfit.ttf','ttf'],['bricolage-grotesque.woff2','woff2']]) {
  assert.ok(html.includes(`<link rel="preload" href="/fonts/${font}" as="font" type="font/${type}" crossorigin>`));
  assert.deepEqual(await readFile('dist/fonts/'+font),await readFile('fonts/'+font));
 }
 assert.doesNotMatch(html,/fraunces/i);
 for(const file of ['fraunces.ttf','Fraunces-OFL.txt']) await assert.rejects(stat('dist/fonts/'+file),{code:'ENOENT'});
 assert.match(await readFile('dist/fonts/BricolageGrotesque-OFL.txt','utf8'),/SIL Open Font License, Version 1\.1/);
 for(const asset of valleyAssets) {assert.ok(asset.bytes<asset.sourceBytes);assert.equal((await stat('dist/world/animatic/'+asset.file)).size,asset.bytes);}
 assert.doesNotMatch(await readFile('dist/world/animatic/style.css','utf8'),/phone\.png/);
});
test('404 provides recovery and page content is present without JavaScript',async()=>{
 const html=await readFile('dist/404.html','utf8');assert.match(html,/Back to the town/);
 const home=await readFile('dist/index.html','utf8');for(const id of ['work','about','services','contact'])assert.ok(home.includes(`id="${id}"`));
});
test('homepage reuses the approved painted valley and native landmark access',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.equal((home.match(/class="stage"/g)||[]).length,1);
 const landmarks=[...home.matchAll(/class="(?:campus|workshop|library)" data-project-open="([^"]+)" href="([^"]+)"/g)];
 assert.deepEqual(landmarks.map(match=>match[2]),routes.slice(2));
 assert.equal(new Set(landmarks.map(match=>match[1])).size,3);
 assert.ok(home.includes(`src="${valleyUrl('backplate.png')}"`));
 assert.equal((home.match(/class="cloud-sprite /g)||[]).length,24);
 for(const file of ['controller.js','motion.js','cloud-renderer.js','style.css',...valleyAssets.map(asset=>asset.file)])assert.ok((await stat('dist/world/animatic/'+file)).isFile());
 const source=await readFile('review/animatic/controller.js','utf8');
 assert.equal(await readFile('dist/world/animatic/controller.js','utf8'),source,'production and review share entrance implementation');
});

test('homepage journey and navigation remain available without scripts',async()=>{
 const home=await readFile('dist/index.html','utf8');
 const journey=home.match(/<section[^>]*id="journey"[\s\S]*?<\/section>/)?.[0];
 assert.ok(journey,'journey chapter exists');
 const chapters=[...journey.matchAll(/<li class="journey-chapter" id="([^"]+)">([\s\S]*?)<\/li>/g)];
 const stops=chapters.map(match=>match[2].replace(/<[^>]*>/g,' '));
 assert.equal(stops.length,5);
 for(const [index,date,role] of [[0,'2022\u20132023','Research'],[1,'2023\u20132024','Mentee'],[2,'2024\u20132025','Vice-Mayor'],[3,'2025\u20132026','SSC President'],[4,'Today','Computer Engineering']]){
  assert.ok(stops[index].includes(date));
  assert.ok(stops[index].includes(role));
 }
 const mapChoices=[...journey.matchAll(/<a href="#([^"]+)" data-journey-choice="(\d+)"/g)];
 assert.equal(mapChoices.length,5);
 assert.deepEqual(mapChoices.map(match=>match[1]),chapters.map(match=>match[1]));
 assert.deepEqual(mapChoices.map(match=>Number(match[2])),[0,1,2,3,4]);
 assert.doesNotMatch(chapters.map(match=>match[0]).join(''),/<li[^>]*(?:\bhidden|\binert|aria-hidden="true")/);
 const navigation=home.match(/<nav class="experience-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert.ok(navigation,'floating navigation exists');
 assert.deepEqual([...navigation.matchAll(/href="(#[^"]+)"/g)].map(match=>match[1]),['#home','#journey','#work','#about','#contact']);
 for(const [,id] of navigation.matchAll(/href="#([^"]+)"/g))assert.ok(home.includes(`id="${id}"`),`${id} navigation target exists`);
});

test('project cards and one shared dialog retain all three evidence records and case-study links',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.equal((home.match(/<dialog\b/g)||[]).length,1);
 assert.equal((home.match(/<article class="project-box-card /g)||[]).length,3);
 for(const [slug,file,caption] of [['student-advising-portal','advising-demo.webp','fictional demo student data'],['formproof','formproof-report.webp','not a new evaluation or WCAG certification'],['claimcheck','claimcheck-sample.jpg','illustrative fixtures; live inference is disabled']]){
  assert.ok(home.includes('data-preview="'+slug+'"'));
  assert.ok(home.includes('data-project-open="'+slug+'"'));
  assert.ok(home.includes('/images/'+file));assert.ok(home.includes(caption));
  assert.ok(home.includes('href="/projects/'+slug+'/"'));
 }
 const ids=[...home.matchAll(/\bid="([^"]+)"/g)].map(([,id])=>id);
 assert.equal(new Set(ids).size,ids.length,'IDs stay unique across projects and scene controls');
 assert.doesNotMatch(home,/<iframe|id="workshop-exhibit"|\/review\//);
});

test('all built pages share the selectable contact address and email copy controls',async()=>{
 for(const route of routes){
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  assert.match(html,/<a[^>]*class="contact-email"[^>]*href="mailto:[^"]+"[^>]*>[^<]+(?:<svg[\s\S]*?<\/svg>)?<\/a>/,route);
  assert.equal((html.match(/id="copy-email"/g)||[]).length,1,route);
  assert.equal((html.match(/id="copy-status"/g)||[]).length,1,route);
 }
});

test('case studies use semantic summaries and keep the evidence sections',async()=>{
 for(const [slug,name] of [['student-advising-portal','Student Advising Portal'],['formproof','FormProof'],['claimcheck','ClaimCheck']]){
  const html=await readFile(path.join('dist/projects',slug,'index.html'),'utf8');
  const summary=html.match(/<section class="case-summary"[^>]*>[\s\S]*?<\/section>/)?.[0];
  assert.ok(summary,`${slug} has a case summary`);assert.ok(new RegExp(`<h2[^>]*>${name}</h2>`).test(summary));
  assert.match(summary,/<h2[^>]*>[^<]+<\/h2>[\s\S]*?<ul class="tags"/);
  assert.doesNotMatch(summary,/<p>/);
  assert.ok(html.includes(`<p class="case-role">${name} · `));
  assert.doesNotMatch(html,/case-banner|pixel-art/);
 }
});

test('homepage removes duplicate hero controls and offers an honest CV email request in navigation',async()=>{
 const html=await readFile('dist/index.html','utf8');
 assert.doesNotMatch(html,/class="experience-name"/);
 const intro=html.match(/<([a-z]+)[^>]*class="intro"[^>]*>[\s\S]*?<\/\1>/)?.[0];
 assert.ok(intro,'entrance intro exists');
 assert.doesNotMatch(html,/class="valley-shortcuts"/);
 const nav=html.match(/<nav class="experience-nav"[^>]*>[\s\S]*?<\/nav>/)?.[0];
 assert.match(nav,/<a class="nav-cv" href="mailto:[^"]+\?subject=CV%20request" aria-label="Curriculum Vitae — request by email">/);
 assert.match(nav,/Curriculum Vitae<\/span>/);
});

test('shared copy control reports clipboard success and failure',async()=>{
 const source=await readFile('script.js','utf8');
 async function copyResult(writeText){
  const copy={dataset:{email:'hello@example.com'},listener:null,addEventListener(type,listener){if(type==='click')this.listener=listener;}};
  const status={textContent:''};
  const document={documentElement:{dataset:{}},querySelector(selector){return {'#copy-email':copy,'#copy-status':status}[selector]||null;},querySelectorAll(){return [];}};
  vm.runInNewContext(source,{document,navigator:{clipboard:{writeText}},window:{}});
  await copy.listener();return {copy,status};
 }
 let copied='';
 const success=await copyResult(async value=>{copied=value;});
 assert.equal(copied,'hello@example.com');assert.match(success.status.textContent,/Email copied/);
 const failure=await copyResult(async()=>{throw new Error('clipboard denied');});
 assert.match(failure.status.textContent,/Copy unavailable/);assert.match(failure.status.textContent,/hello@example\.com/);
});

test('reading contents and archive filters expose named navigation and group semantics',async()=>{
 for(const route of routes.slice(2)){
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  assert.match(html,/<nav class="case-contents" aria-label="On this page">/);
  assert.doesNotMatch(html,/<aside>/);
 }
 assert.match(await readFile('dist/projects/index.html','utf8'),/class="filters" role="group" aria-label="Filter projects"/);
});
