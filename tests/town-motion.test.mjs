import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../script.js',import.meta.url),'utf8');
function setup({reduced=false,unsupported=false}={}){
 const listeners={};
 const toggle={hidden:true,addEventListener:(name,callback)=>{listeners[name]=callback;},setAttribute(){}};
 const scene={dataset:{},querySelectorAll:()=>[{getAttribute:name=>name==='href'?'/town.png':null}]};
 const preference={matches:reduced,addEventListener:(_,callback)=>{listeners.preference=callback;}};
 const pending=[];
 const document={documentElement:{dataset:{}},hidden:false,
  querySelector:selector=>selector==='.town-scene'?scene:selector==='.town-motion-toggle'?toggle:null,
  querySelectorAll:()=>[],addEventListener:(_,callback)=>{listeners.visibility=callback;}};
 const window={matchMedia:()=>preference,Image:class{set src(value){pending.push(this);}},
  IntersectionObserver:unsupported?undefined:class{constructor(callback){listeners.intersection=callback;}observe(){}disconnect(){listeners.disconnected=true;}}};
 vm.runInNewContext(source,{window,document});
 return {scene,toggle,preference,document,listeners,pending};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('town waits for assets and viewport, then preserves pause intent across lifecycle changes',async()=>{
 const {scene,toggle,preference,document,listeners,pending}=setup();
 listeners.intersection([{isIntersecting:true}]);
 assert.equal(scene.dataset.running,'false');
 assert.equal(toggle.hidden,true);
 pending[0].onload();await flush();
 assert.equal(scene.dataset.running,'true');
 assert.equal(toggle.hidden,false);
 listeners.click();
 assert.equal(scene.dataset.running,'false');
 assert.equal(toggle.textContent,'Resume town animation');
 preference.matches=true;listeners.preference();
 assert.equal(toggle.hidden,true);
 preference.matches=false;listeners.preference();
 assert.equal(scene.dataset.running,'false');
 assert.equal(toggle.textContent,'Resume town animation');
 listeners.click();
 document.hidden=true;listeners.visibility();
 assert.equal(scene.dataset.running,'false');
 document.hidden=false;listeners.visibility();
 assert.equal(scene.dataset.running,'true');
 listeners.intersection([{isIntersecting:false}]);
 assert.equal(scene.dataset.running,'false');
 listeners.intersection([{isIntersecting:true}]);
 assert.equal(scene.dataset.running,'true');
});

test('an initial reduced-motion preference can change live without rebuilding the scene',async()=>{
 const {scene,toggle,preference,listeners,pending}=setup({reduced:true});
 pending[0].onload();await flush();listeners.intersection([{isIntersecting:true}]);
 assert.equal(scene.dataset.ready,'true');
 assert.equal(scene.dataset.running,'false');
 assert.equal(toggle.hidden,true);
 preference.matches=false;listeners.preference();
 assert.equal(scene.dataset.running,'true');
 assert.equal(toggle.hidden,false);
});

test('a failed image or unavailable observer leaves a static scene with no dead control',async()=>{
 const {scene,toggle,listeners,pending}=setup();
 pending[0].onerror();await flush();
 assert.equal(scene.dataset.ready,'false');
 assert.equal(scene.dataset.running,'false');
 assert.equal(toggle.hidden,true);
 assert.equal(listeners.disconnected,true);
 const fallback=setup({unsupported:true});
 assert.equal(fallback.toggle.hidden,true);
 assert.equal(fallback.pending.length,0);
});
