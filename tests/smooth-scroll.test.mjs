import test from 'node:test';
import assert from 'node:assert/strict';
import {initSmoothScroll} from '../smooth-scroll.js';
function fixture({phone=false,reduced=false,fail=false}={}){
 const events={},frames=new Map(),instances=[];let id=0,imports=0,dialog=false,mutate;
 const shell={dataset:{}},root={dataset:{}},medias=[];
 const doc={body:{},hidden:false,documentElement:root,querySelector:s=>s==='dialog[open]'?dialog:shell,addEventListener:(name,fn)=>events[name]=fn,removeEventListener:name=>delete events[name]};
 const win={matchMedia:q=>{const media={matches:q.includes('reduce')?reduced:!phone,addEventListener:(name,fn)=>media.change=fn,removeEventListener(){}};medias.push(media);return media;},ScrollTrigger:{update(){}},requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:key=>frames.delete(key),MutationObserver:class{constructor(fn){mutate=fn;}observe(){}disconnect(){}}};
 class Lenis{constructor(options){this.options=options;this.events={};this.times=[];this.isScrolling=false;this.resets=0;instances.push(this);}on(name,fn){this.events[name]=fn;}raf(time){this.times.push(time);if(this.times.length%2===0)this.isScrolling=false;this.events.scroll();}reset(){this.resets++;this.isScrolling=false;}destroy(){this.destroyed=true;}}
 const dispose=initSmoothScroll({doc,win,load:async()=>{imports++;if(fail)throw Error('unavailable');return {default:Lenis};}});
 return {doc,win,root,events,frames,instances,medias,shell,dispose,get imports(){return imports;},ready:()=>Promise.resolve(),tick(time){const callbacks=[...frames.values()];frames.clear();callbacks.forEach(fn=>fn(time));},dialog(value){dialog=value;mutate([{target:{tagName:'DIALOG'}}]);}};
}
test('wheel smoothing matches reference settings and schedules no idle frames',async()=>{
 const f=fixture();await f.ready();const l=f.instances[0];
 assert.equal(f.root.dataset.smoothScroll,'active');assert.equal(l.options.lerp,.09);assert.equal(l.options.wheelMultiplier,.9);assert.equal(l.options.autoRaf,false);assert.equal(l.options.syncTouch,false);assert.equal(l.options.anchors,false);assert.equal(f.frames.size,0);
 l.isScrolling='smooth';l.events['virtual-scroll']();f.tick(100);assert.equal(f.frames.size,1);f.tick(116);assert.equal(f.frames.size,0);
 l.isScrolling='smooth';l.events['virtual-scroll']();f.tick(100000);assert.ok(l.times.at(-1)-l.times.at(-2)<=16);f.tick(100016);assert.equal(f.frames.size,0);f.dispose();
});
test('phones, reduced motion and unavailable library retain native scrolling',async()=>{
 for(const options of [{phone:true},{reduced:true},{fail:true}]){const f=fixture(options);await f.ready();assert.equal(f.root.dataset.smoothScroll,'native');assert.equal(f.instances.length,0);assert.equal(f.frames.size,0);if(!options.fail)assert.equal(f.imports,0);f.dispose();}
});
test('pause, dialogs, hidden pages and live reduced motion remove smoothing cleanly',async()=>{
 const f=fixture();await f.ready();let current=f.instances[0];
 f.shell.dataset.motionPaused='true';f.events['portfolio:motionchange']();await f.ready();assert.equal(current.destroyed,true);assert.equal(f.root.dataset.smoothScroll,'native');
 f.shell.dataset.motionPaused='false';f.events['portfolio:motionchange']();await f.ready();f.dialog(true);await f.ready();assert.equal(f.root.dataset.smoothScroll,'native');
 f.dialog(false);await f.ready();assert.equal(f.root.dataset.smoothScroll,'active');
 f.doc.hidden=true;f.events.visibilitychange();await f.ready();assert.equal(f.root.dataset.smoothScroll,'native');
 f.doc.hidden=false;f.events.visibilitychange();await f.ready();f.medias[0].matches=true;f.medias[0].change();await f.ready();assert.equal(f.root.dataset.smoothScroll,'native');assert.equal(f.frames.size,0);f.dispose();
});
test('native navigation interrupts inertia without consuming keyboard or click events',async()=>{
 const f=fixture();await f.ready();const l=f.instances[0];
 f.events.click({type:'click',target:{closest:()=>true}});f.events.keydown({type:'keydown',key:'PageDown'});assert.equal(l.resets,2);
 f.events.keydown({type:'keydown',key:'a'});assert.equal(l.resets,2);f.dispose();assert.equal(f.frames.size,0);assert.equal(l.destroyed,true);
});
