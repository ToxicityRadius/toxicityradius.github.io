import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const routes=['/','/projects/','/projects/student-advising-portal/','/projects/formproof/','/projects/claimcheck/'];
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
 const roles=home.match(/<div class="experience-roles">([\s\S]*?)<\/div>/)?.[1];
 assert.ok(roles,'leadership roles are present');
 const plainRoles=roles.replace(/<[^>]*>/g,' ');
 assert.match(plainRoles,/2025\u20132026[\s\S]*Past role[^]*SSC President[^]*T\.I\.P\. Manila/);
 assert.match(plainRoles,/April 2025\u2013Present[\s\S]*Globe Ambassador Head[^]*Digital Thumbprint Program/);
 assert.match(home.replace(/&amp;/g,'&'),/Co-creator & major contributor/);
});
test('archive keeps all eleven legacy projects',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');assert.equal((html.match(/data-category=/g)||[]).length,11);
});
test('404 provides recovery and page content is present without JavaScript',async()=>{
 const html=await readFile('dist/404.html','utf8');assert.match(html,/Back to the town/);
 const home=await readFile('dist/index.html','utf8');for(const id of ['work','about','services','contact'])assert.ok(home.includes(`id="${id}"`));
});
test('town uses the approved coordinate system with static landmark access',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.equal((home.match(/class="town-scene"/g)||[]).length,1);
 assert.match(home,/<svg[^>]*class="town-art"[^>]*viewBox="0 0 1672 941"[^>]*aria-hidden="true"/);
 assert.match(home,/<button class="town-motion-toggle"[^>]*hidden>/);
 const landmarks=[...home.matchAll(/<a class="landmark landmark-\d" href="([^"]+)"/g)].map(match=>match[1]);
 assert.deepEqual(landmarks,routes.slice(2));
 const scene=home.match(/<svg class="town-art"[\s\S]*?<button class="town-motion-toggle"/)?.[0];
 assert.ok(scene,'layered town markup exists');
 assert.match(scene,/data-layered="true"/);
 assert.doesNotMatch(scene,/town-master-v2|town-(?:day|night)\.webp|<animateMotion/);
 for(const asset of ['hills','terrain','campus','workshop','library','foreground','traveler','smoke']){
  assert.ok(scene.includes(`/images/town-${asset}.webp`));
  assert.ok((await stat(`dist/images/town-${asset}.webp`)).isFile());
 }

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

test('homepage shows all three project evidence images with their limits',async()=>{
 const home=await readFile('dist/index.html','utf8');
 const figures=[...home.matchAll(/<figure class="project-box-preview">([\s\S]*?)<\/figure>/g)].map(match=>match[1]);
 assert.equal(figures.length,3);
 for(const [index,file,caption] of [[0,'advising-demo.webp','fictional demo student data'],[1,'formproof-report.webp','not a new evaluation or WCAG certification'],[2,'claimcheck-sample.jpg','illustrative fixtures; live inference is disabled']]){
  assert.ok(figures[index].includes(`/images/${file}`));
  assert.ok(figures[index].includes(caption));
  assert.match(figures[index],/<img[^>]*alt="[^"]+"/);
  assert.match(figures[index],/<figcaption>[^]*<\/figcaption>/);
 }
 const panels=[...home.matchAll(/<article class="project-box-panel" id="([^"]+)"[^>]*>/g)];
 const selectors=[...home.matchAll(/<button[^>]*data-project-select="(\d+)" aria-controls="([^"]+)"/g)];
 assert.deepEqual(panels.map(match=>match[1]),['project-panel-student-advising-portal','project-panel-formproof','project-panel-claimcheck']);
 assert.deepEqual(selectors.map(match=>match[2]),panels.map(match=>match[1]));
 assert.deepEqual(selectors.map(match=>Number(match[1])),[0,1,2]);
 for(const panel of panels)assert.doesNotMatch(panel[0],/\bhidden|\binert|aria-hidden="true"/);
 assert.match(home,/<div class="project-box-controls" hidden>/);
});
