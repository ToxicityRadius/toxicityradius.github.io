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
  for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
   let file=path.join('dist',url);if(url.endsWith('/'))file=path.join(file,'index.html');
   assert.ok((await stat(file)).isFile(),`${route}: ${url} exists`);
  }
 });
}
test('role correction and project attribution survive the build',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.match(home,/2025–2026<\/span><strong>SSC President<\/strong><small>T.I.P. Manila · Past role/);
 assert.match(home,/April 2025–Present<\/span><strong>Globe Ambassador Head/);
 assert.match(home,/Co-creator & major contributor/);
});
test('archive keeps all eleven legacy projects',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');assert.equal((html.match(/data-category=/g)||[]).length,11);
});
test('404 provides recovery and page content is present without JavaScript',async()=>{
 const html=await readFile('dist/404.html','utf8');assert.match(html,/Back to the town/);
 const home=await readFile('dist/index.html','utf8');for(const id of ['work','about','services','contact'])assert.ok(home.includes(`id="${id}"`));
});
