import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../experience.js',import.meta.url),'utf8');
function setup({ready=false,layered=false,libraries=true,intersection=true,fine=false}={}){
 const callbacks={},calls={timelines:0,layers:[],frames:[],focuses:[],focusPauses:0,focusResumes:0,clears:0,focusKills:0,pins:0,killed:0,reverted:0,disconnected:0,refreshes:0};
 let timeline,trigger;
 const sections=[{id:'home'},{id:'journey'}];
 const links=sections.map(section=>({hash:`#${section.id}`,attributes:{},classes:new Set(),
  addEventListener(){assert.fail('section navigation must keep native anchor behavior');},
  setAttribute(name,value){this.attributes[name]=value;},removeAttribute(name){delete this.attributes[name];},
  classList:{toggle(name,on){if(on)this.owner.classes.add(name);else this.owner.classes.delete(name);}}}));
 links.forEach(link=>{link.classList.owner=link;});
 const layers=Object.fromEntries(['hills','terrain','buildings','front'].map(name=>[`.town-depth-${name}`,{name}]));
 const art={dataset:{layered:String(layered)},querySelector:selector=>layers[selector]};
 const copy={},camera={},veil={},story={},cue={},next={};
 const landmarks=[0,1,2].map(index=>({addEventListener(name,callback){callbacks[`enter${index}`]=callback;},removeEventListener(name,callback){assert.equal(callback,callbacks[`enter${index}`]);delete callbacks[`enter${index}`];}}));
 const scene={dataset:{ready:String(ready),paused:'false'},querySelector:()=>art,
  querySelectorAll:()=>landmarks,
  insertBefore(node,sibling){assert.equal(sibling,next);node.parentNode=scene;node.nextSibling=next;}};
 next.parentNode=scene;
 const toggle={parentNode:scene,nextSibling:next};
 const entrance={dataset:{},querySelector:selector=>({'.entrance-copy':copy,'.entrance-camera':camera,'.entrance-veil':veil,'.entrance-story':story,'.entrance-scroll-cue':cue})[selector],appendChild(node){node.parentNode=entrance;node.nextSibling=null;},addEventListener(name,callback){callbacks.leave=callback;},removeEventListener(){delete callbacks.leave;}};
 const document={querySelectorAll:()=>links,getElementById:id=>sections.find(section=>section.id===id),
  querySelector:selector=>({'.town-scene':scene,'.entrance':entrance,'.town-motion-toggle':toggle})[selector]};
 class IntersectionObserver{constructor(callback){callbacks.intersection=callback;}observe(){}}
 class MutationObserver{constructor(callback){callbacks.mutation=callback;}observe(){}disconnect(){calls.disconnected++;}}
 const ScrollTrigger={refresh(){calls.refreshes++;},create(options){
  calls.pins++;callbacks.triggerOptions=options;
  trigger={progress:0,enabled:true,
   disable(){assert.fail('user pause must never disable the pin');},
   kill(){calls.killed++;this.enabled=false;},refresh(){calls.refreshes++;}};
  callbacks.scroll=progress=>{trigger.progress=progress;options.onUpdate(trigger);};
  return trigger;
 }};
 const gsap={registerPlugin(){},matchMedia:()=>({add:(query,callback)=>{callbacks.media=query;callbacks.cleanup=callback();}}),
  to(target,options){calls.focuses.push({target,options});return{pause(){calls.focusPauses++;},resume(){calls.focusResumes++;}};},killTweensOf(){calls.focusKills++;},set(){calls.clears++;},
  timeline:options=>{calls.timelines++;assert.equal(options.paused,true);
   timeline={fromTo(target,from,to,position){calls.layers.push({target,from,to,position});return timeline;},
    progress(value){calls.frames.push(value);return timeline;},revert(){calls.reverted++;}};
   return timeline;}};
 const window={innerHeight:900,matchMedia:()=>({matches:fine}),MutationObserver,IntersectionObserver:intersection?IntersectionObserver:undefined,
  history:{pushState(){assert.fail('navigation must not rewrite history');},replaceState(){assert.fail('navigation must not rewrite history');}}};
 if(libraries){window.gsap=gsap;window.ScrollTrigger=ScrollTrigger;}
 vm.runInNewContext(source,{window,document,gsap:window.gsap,ScrollTrigger:window.ScrollTrigger,MutationObserver,IntersectionObserver});
 return {scene,art,entrance,camera,story,toggle,next,links,sections,callbacks,calls,get timeline(){return timeline;},get trigger(){return trigger;}};
}

test('flight waits for independent artwork and ready assets before adding a native scroll pin',()=>{
 const flattened=setup({ready:true});
 assert.equal(flattened.calls.timelines,0);
 assert.equal(flattened.entrance.dataset.flight,undefined);
 flattened.art.dataset.layered='true';flattened.callbacks.mutation();
 assert.equal(flattened.calls.timelines,1);
 assert.equal(flattened.calls.pins,1);
 assert.equal(flattened.calls.layers.length,9);
 assert.equal(flattened.entrance.dataset.flight,'ready');
 assert.equal(flattened.toggle.parentNode,flattened.entrance);
 assert.equal(flattened.callbacks.triggerOptions.pin,true);
 assert.equal(flattened.callbacks.triggerOptions.refreshPriority,1,'the late-loaded entrance pin is measured before downstream chapters');
 assert.equal(flattened.callbacks.triggerOptions.trigger,flattened.entrance);
 assert.equal(flattened.callbacks.triggerOptions.end(),'+=1440');
 assert.equal(flattened.calls.refreshes,1);
 const loading=setup({layered:true});
 assert.equal(loading.calls.timelines,0);
 loading.scene.dataset.ready='true';loading.callbacks.mutation();
 assert.equal(loading.calls.timelines,1);
 loading.callbacks.mutation();
 assert.equal(loading.calls.timelines,1,'attribute updates must not duplicate the flight');
 assert.equal(loading.calls.refreshes,1,'the late pin remeasures all downstream triggers once, without mutation refresh loops');
});

test('scroll controls camera progress and pause freezes visuals without disabling physical pin release',()=>{
 const {scene,callbacks,calls,trigger}=setup({ready:true,layered:true});
 const camera=calls.layers[0],copy=calls.layers[1];
 assert.equal(camera.from.scale,1);
 assert.equal(camera.to.scale,1.12);
 assert.equal(copy.to.opacity,0);
 callbacks.scroll(.25);
 assert.equal(calls.frames.at(-1),.25);
 scene.dataset.paused='true';callbacks.mutation();
 const frameCount=calls.frames.length;
 callbacks.scroll(1);
 assert.equal(calls.frames.length,frameCount);
 assert.equal(trigger.enabled,true,'the pin must still release at its physical end');
 scene.dataset.paused='false';callbacks.mutation();
 assert.equal(calls.frames.at(-1),1,'resume catches up to physical scroll progress');
});

test('cleanup restores static markup and the motion button, and tolerates context-first disposal',()=>{
 const state=setup({ready:true,layered:true});
 state.trigger.kill();state.timeline.revert();
 assert.doesNotThrow(()=>state.callbacks.cleanup());
 assert.equal(state.calls.disconnected,1);
 assert.equal(state.entrance.dataset.flight,undefined);
 assert.equal(state.toggle.parentNode,state.scene);
 assert.equal(state.toggle.nextSibling,state.next);
 const reverted=state.calls.reverted;
 state.callbacks.cleanup();state.callbacks.mutation();state.callbacks.scroll(.4);
 assert.equal(state.calls.reverted,reverted,'repeated cleanup does not touch disposed animation');
 assert.equal(state.calls.timelines,1,'queued mutation callbacks do not restart a disposed flight');
});

test('landmark focus is pointer-only, pauses with the town, and restores before scroll travel',()=>{
 const touch=setup({ready:true,layered:true});
 assert.equal(touch.callbacks.enter0,undefined);
 const loading=setup({fine:true});loading.callbacks.enter0();
 assert.equal(loading.calls.focuses.length,0,'asset failure or loading must keep the static fallback static');
 const state=setup({ready:true,layered:true,fine:true});
 state.callbacks.enter0();
 assert.equal(state.calls.focuses.at(-1).options.scale,1.32);
 state.scene.dataset.paused='true';state.callbacks.mutation();
 const count=state.calls.focuses.length;
 state.callbacks.enter1();state.callbacks.leave();
 assert.equal(state.calls.focuses.length,count,'pause must freeze pointer focus as well as scroll movement');
 assert.ok(state.calls.focusPauses>0);
 state.scene.dataset.paused='false';state.callbacks.mutation();
 assert.equal(state.calls.focuses.at(-1).options.scale,1,'resume restores focus when pointer left during pause');
 state.callbacks.enter0();state.callbacks.scroll(.1);
 assert.equal(state.calls.focuses.at(-1).options.scale,1);
 state.callbacks.cleanup();
 assert.equal(state.callbacks.enter0,undefined);
 assert.equal(state.calls.clears,1,'media cleanup removes the remaining camera transform');
});

test('pause and resume preserve an already-running focus return instead of killing its destination',()=>{
 const state=setup({ready:true,layered:true,fine:true});
 state.callbacks.enter0();state.callbacks.leave();
 assert.equal(state.calls.focuses.at(-1).options.scale,1);
 const tweenCount=state.calls.focuses.length;
 state.scene.dataset.paused='true';state.callbacks.mutation();
 assert.equal(state.calls.focusKills,0,'pausing must not discard an in-progress return');
 state.scene.dataset.paused='false';state.callbacks.mutation();
 assert.equal(state.calls.focuses.length,tweenCount,'resume continues the same tween');
 assert.ok(state.calls.focusResumes>0);
});

test('section tracking works without GSAP and preserves native navigation',()=>{
 const {links,sections,callbacks,calls}=setup({libraries:false});
 callbacks.intersection([{target:sections[0],isIntersecting:true}]);
 assert.equal(links[0].attributes['aria-current'],'location');
 assert.equal(links[0].classes.has('is-current'),true);
 callbacks.intersection([{target:sections[0],isIntersecting:false},{target:sections[1],isIntersecting:true}]);
 assert.equal(links[0].attributes['aria-current'],undefined);
 assert.equal(links[0].classes.has('is-current'),false);
 assert.equal(links[1].attributes['aria-current'],'location');
 assert.deepEqual(links.map(link=>link.hash),['#home','#journey']);
 assert.equal(calls.timelines,0);
 const fallback=setup({libraries:false,intersection:false});
 assert.equal(fallback.callbacks.intersection,undefined);
 assert.deepEqual(fallback.links.map(link=>link.hash),['#home','#journey']);
});

test('the incoming section becomes current while the preceding section tail is still visible',()=>{
 const {links,sections,callbacks}=setup({libraries:false});
 callbacks.intersection([{target:sections[0],isIntersecting:true}]);
 callbacks.intersection([{target:sections[1],isIntersecting:true}]);
 assert.equal(links[0].attributes['aria-current'],undefined);
 assert.equal(links[1].attributes['aria-current'],'location');
 callbacks.intersection([{target:sections[1],isIntersecting:false}]);
 assert.equal(links[0].attributes['aria-current'],'location','tracking also restores the preceding section when returning upward');
});
