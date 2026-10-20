import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {renderProjectBox} from '../scripts/project-box.mjs';
const source = await readFile(new URL('../project-box.js', import.meta.url), 'utf8');
function fixture() {
  const element = () => ({attributes:{},dataset:{},listeners:{},setAttribute(key,value){this.attributes[key]=value;},addEventListener(key,callback){this.listeners[key]=callback;},focus(){this.focused=true;}});
  const panels = Array.from({length:3},element);
  const buttons = Array.from({length:3},element);
  const previous=element(),next=element(),status=element(),controls={hidden:true};
  const box={classList:{add(){}},querySelectorAll:selector=>selector==='[data-project-panel]'?panels:buttons,querySelector:selector=>({'.project-box-controls':controls,'[data-project-status]':status,'[data-project-previous]':previous,'[data-project-next]':next}[selector])};
  vm.runInNewContext(source,{document:{querySelectorAll:()=>[box]}});
  return {panels,buttons,previous,next,status,controls};
}
test('project box exposes one project and changes selected content through buttons',()=>{
  const {panels,buttons,next,previous,status,controls}=fixture();
  assert.equal(controls.hidden,false);
  assert.deepEqual(panels.map(panel=>panel.inert),[false,true,true]);
  next.listeners.click();
  assert.deepEqual(panels.map(panel=>panel.inert),[true,false,true]);
  assert.equal(buttons[1].attributes['aria-pressed'],'true');
  assert.equal(status.textContent,'2 of 3');
  previous.listeners.click();previous.listeners.click();
  assert.equal(status.textContent,'3 of 3');
  buttons[0].listeners.click();
  assert.equal(panels[0].attributes['aria-hidden'],'false');
});
test('keyboard selection moves focus and supports boundaries without scrolling',()=>{
  const {buttons,status}=fixture();
  let prevented=false;
  buttons[0].listeners.keydown({key:'End',preventDefault(){prevented=true;}});
  assert.equal(prevented,true);assert.equal(buttons[2].focused,true);
  assert.equal(status.textContent,'3 of 3');
  buttons[2].listeners.keydown({key:'ArrowRight',preventDefault(){}});
  assert.equal(status.textContent,'1 of 3');
  buttons[0].listeners.keydown({key:'Tab'});
  assert.equal(status.textContent,'1 of 3');
});
test('renderer keeps all stories, truthful captions, and one image each without scripts',()=>{
 const projects=['one','two','three'].map(slug=>({slug,name:slug,role:'Co-creator & contributor',tech:['Web']}));
 const evidence=Object.fromEntries(projects.map(({slug})=>[slug,{file:`${slug}.webp`,width:100,height:60,alt:slug,caption:'Illustrative fixture, not certification.',heading:'Inspect the work.',detail:'Verified scope.'}]));
 const html=renderProjectBox(projects,evidence,'→');
 assert.equal((html.match(/<article /g)||[]).length,3);
 assert.equal((html.match(/<img /g)||[]).length,3);
 assert.equal((html.match(/Read the project story/g)||[]).length,3);
 assert.equal((html.match(/Illustrative fixture, not certification\./g)||[]).length,3);
 assert.equal((html.match(/Co-creator &amp; contributor/g)||[]).length,3);
 assert.match(html,/project-box-controls" hidden/);
 assert.doesNotMatch(html,/<article[^>]*\bhidden/);
});

