import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {frameAt,clamp,DURATION_MS,SESSION_KEY} from '../review/animatic/motion.js';

const source=(await readFile(new URL('../review/animatic/controller.js',import.meta.url),'utf8')).replace(/^import[^\n]+\n/gm,'').replace(/^export /gm,'');
function fixture({pending=false,fail=false,storage=new Map(),storageBlocked=false,reduced=false,phone=false,debug=false,canvasAvailable=true}={}){
 const elements=new Map(),listeners={},frames=new Map(),documentListeners={},draws=[];
 const media=new Map();let id=0,resolveAssets;
 const decoding=pending?new Promise(resolve=>{resolveAssets=resolve;}):fail?Promise.reject(new Error('image unavailable')):Promise.resolve();
 const element=()=>({style:{},classList:{remove(){}},value:'0',listeners:{},addEventListener(type,fn){this.listeners[type]=fn;}});
 const context={frameAt,clamp,DURATION_MS,SESSION_KEY,URLSearchParams,location:{search:debug?'?debug=1':''},
  sessionStorage:{getItem(key){if(storageBlocked)throw Error('blocked');return storage.get(key);},setItem(key,value){if(storageBlocked)throw Error('blocked');storage.set(key,value);}},
  createCloudRenderer:()=>({available:canvasAvailable,resize(){},draw(progress,frame,visible){draws.push({progress,visible});}}),
  document:{hidden:false,querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector);},querySelectorAll:selector=>selector==='.stage img'?[{decode:()=>decoding}]:[],addEventListener(type,fn){documentListeners[type]=fn;}},
  matchMedia(query){const result={matches:query.includes('reduced')?reduced:phone,addEventListener(type,fn){this.change=fn;}};media.set(query,result);return result;},
  addEventListener(type,fn){listeners[type]=fn;},requestAnimationFrame(fn){frames.set(++id,fn);return id;},cancelAnimationFrame(id){frames.delete(id);}};
 vm.runInNewContext(source,context);
 return {context,elements,listeners,documentListeners,media,storage,resolveAssets,draws,frames,
  async ready(){await new Promise(setImmediate);this.tick(0);this.tick(0);await new Promise(setImmediate);},
  click:selector=>elements.get(selector).listeners.click(),
  scrub(value){elements.get('#position').value=String(value);elements.get('#position').listeners.input();},
  position:()=>Number(elements.get('#position').value),
  tick(time){assert.ok(frames.size,'expected scheduled animation frame');const [key,fn]=frames.entries().next().value;frames.delete(key);fn(time);}};
}

test('first eligible visit autoplays only after decoding and two preparation frames',async()=>{
 const f=fixture({pending:true});assert.equal(f.elements.get('#intro-control').disabled,true);assert.equal(f.frames.size,0);
 f.resolveAssets();await f.ready();assert.equal(f.elements.get('#intro-control').textContent,'Skip intro');
 assert.equal(f.storage.get(SESSION_KEY),'1');f.tick(0);f.tick(450);assert.equal(f.position(),10);
 assert.equal(f.elements.get('footer').hidden,true);
});

test('refresh and return visits settle immediately; the same focused control replays and skips',async()=>{
 const storage=new Map([[SESSION_KEY,'1']]),f=fixture({storage});await f.ready();
 const control=f.elements.get('#intro-control');assert.equal(f.position(),100);assert.equal(control.textContent,'Replay intro');
 f.click('#intro-control');f.tick(0);f.tick(450);assert.equal(f.position(),10);
 f.click('#intro-control');assert.equal(f.position(),100);assert.equal(f.elements.get('#intro-control'),control);
 assert.equal(f.elements.get('.destinations').inert,false);
});

test('destinations remain inert during their fade and activate only at exact arrival',async()=>{
 const f=fixture({debug:true});await f.ready();assert.equal(f.elements.get('footer').hidden,false);
 f.scrub(96);assert.equal(f.elements.get('.destinations').inert,true);
 f.scrub(100);assert.equal(f.elements.get('.destinations').inert,false);
});

test('wheel, touch scrolling, scroll events and navigation keys settle without preventing native input',async()=>{
 for(const type of ['wheel','touchmove','scroll','keydown']){
  const f=fixture();await f.ready();
  f.listeners[type]({key:'PageDown',target:{closest:()=>null}});
  assert.equal(f.position(),100);assert.equal(f.frames.size,0);
 }
 const f=fixture();await f.ready();f.listeners.keydown({key:'ArrowDown',target:{closest:()=>({})}});
 assert.equal(f.position(),0);assert.equal(f.frames.size,1);
});

test('hidden tabs pause elapsed time and resume without counting time spent hidden',async()=>{
 const f=fixture();await f.ready();f.tick(0);f.tick(450);assert.equal(f.position(),10);
 f.context.document.hidden=true;f.documentListeners.visibilitychange();assert.equal(f.frames.size,0);
 f.context.document.hidden=false;f.documentListeners.visibilitychange();f.tick(20000);assert.equal(f.position(),10);
 f.tick(20450);assert.equal(f.position(),20);
});

test('resize preserves progress; motion or phone preference changes settle without starting again',async()=>{
 const f=fixture();await f.ready();f.tick(0);f.tick(900);f.listeners.resize();assert.equal(f.position(),20);
 const preference=f.media.get('(prefers-reduced-motion: reduce)');preference.matches=true;preference.change();
 assert.equal(f.position(),100);assert.equal(f.draws.at(-1).visible,false);
 preference.matches=false;preference.change();assert.equal(f.position(),100);assert.equal(f.frames.size,0);
});

test('phone, reduced-motion and failed artwork retain static direct access without autoplay',async()=>{
 for(const options of [{phone:true},{reduced:true},{fail:true},{canvasAvailable:false}]){
  const f=fixture(options);await f.ready();assert.equal(f.position(),100);
  assert.equal(f.elements.get('.destinations').inert,false);assert.equal(f.draws.at(-1).visible,false);
  assert.equal(f.frames.size,0);assert.equal(f.elements.get('#intro-control').disabled,true);
 }
});

test('unavailable session storage still allows one automatic run and manual replay in the document',async()=>{
 const f=fixture({storageBlocked:true});await f.ready();f.tick(0);f.tick(DURATION_MS);
 assert.equal(f.position(),100);f.listeners.resize();assert.equal(f.frames.size,0);
 f.click('#intro-control');f.tick(0);f.tick(450);assert.equal(f.position(),10);
});

test('debug pause and resume retain the displayed frame',async()=>{
 const f=fixture({debug:true});await f.ready();f.scrub(40);f.click('#play');f.tick(0);f.tick(450);
 assert.equal(f.position(),50);f.click('#play');f.click('#play');f.tick(1000);f.tick(1450);assert.equal(f.position(),60);
});
