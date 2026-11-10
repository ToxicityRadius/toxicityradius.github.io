import test from 'node:test';
import assert from 'node:assert/strict';
import {createThemeReveal, revealGeometry} from '../theme-transition.js';

function fixture({supported=true,reduced=false,small=false,paused=false,fail=false,hold=false}={}) {
 const commits=[], animations=[], events=[];
 const properties=new Map(),button={disabled:false,getBoundingClientRect:()=>({left:1320,top:30,width:80,height:48})};
 const root={dataset:{theme:'day'},style:{setProperty:(key,value)=>properties.set(key,value),removeProperty:key=>properties.delete(key)}};
 let finish;
 const held=new Promise(resolve=>{finish=resolve;});
 const doc={documentElement:root,querySelector:()=>({dataset:{motionPaused:String(paused)}}),querySelectorAll:()=>[],dispatchEvent:event=>events.push(event.type)};
 let transitions=0, skipped=0;
 if(supported)doc.startViewTransition=callback=>{
  transitions++;
  if(fail)throw new Error('Capture unavailable');
  animations.push(Object.fromEntries(properties));
  const ready=Promise.resolve().then(callback);
  return {ready,finished:hold?ready.then(()=>held):ready,skipTransition(){skipped++;finish();}};
 };
 const win={innerWidth:1440,innerHeight:900,setTimeout,clearTimeout,Event,
  matchMedia:q=>({matches:q.includes('reduced')?reduced:small})};
 const click=createThemeReveal({doc,win,button,applyTheme:theme=>{root.dataset.theme=theme;commits.push(theme);}});
 return {click,root,button,properties,finish,commits,animations,events,get transitions(){return transitions;},get skipped(){return skipped;}};
}

test('reveal begins at button center and covers the farthest viewport corner',()=>{
 const {x,y,radius}=revealGeometry({left:1320,top:30,width:80,height:48},1440,900);
 assert.equal(x,1360);assert.equal(y,54);
 for(const [cx,cy] of [[0,0],[1440,0],[0,900],[1440,900]])assert.ok(radius>=Math.hypot(cx-x,cy-y));
});
test('both directions use the same button origin and release transition state',async()=>{
 const f=fixture();await f.click({detail:1});await f.click({detail:1});
 assert.deepEqual(f.commits,['night','day']);
 assert.equal(f.animations.length,2);
 assert.equal(f.animations[0]['--theme-reveal-x'],'1360px');
 assert.equal(f.animations[0]['--theme-reveal-y'],'54px');
 assert.equal(f.animations[0]['--theme-reveal-duration'],'450ms');
 assert.deepEqual(f.animations[0],f.animations[1]);
 assert.equal(f.root.dataset.themeReveal,undefined);
 assert.equal(f.properties.size,0);assert.equal(f.button.disabled,false);
 assert.deepEqual(f.events,['portfolio:themeprepare','portfolio:themeprepare']);
});
test('phone uses a shorter reveal',async()=>{
 const f=fixture({small:true});await f.click({detail:1});assert.equal(f.animations[0]['--theme-reveal-duration'],'300ms');
});
test('unsupported, reduced, paused and keyboard activation switch immediately',async()=>{
 for(const options of [{supported:false},{reduced:true},{paused:true},{keyboard:true}]){
  const f=fixture(options);await f.click({detail:options.keyboard?0:1});
  assert.deepEqual(f.commits,['night']);assert.equal(f.transitions,0);assert.equal(f.animations.length,0);
 }
});
test('rapid clicks during preparation run only one reveal',async()=>{
 const f=fixture();await Promise.all([f.click({detail:1}),f.click({detail:1}),f.click({detail:1})]);
 assert.deepEqual(f.commits,['night']);assert.equal(f.transitions,1);
});
test('clicks during an active snapshot cannot restart it and cleanup unlocks the next toggle',async()=>{
 const f=fixture({hold:true}),first=f.click({detail:1});
 while(!f.commits.length)await Promise.resolve();
 assert.equal(f.button.disabled,true);
 await f.click({detail:2});await f.click({detail:3});
 assert.equal(f.transitions,1);assert.deepEqual(f.commits,['night']);assert.equal(f.skipped,0);
 f.finish();await first;
 assert.equal(f.button.disabled,false);assert.equal(f.properties.size,0);assert.equal(f.root.dataset.themeReveal,undefined);
 await f.click({detail:1});assert.deepEqual(f.commits,['night','day']);
});
test('failed capture still applies theme and clears temporary state',async()=>{
 const f=fixture({fail:true});await f.click({detail:1});
 assert.deepEqual(f.commits,['night']);assert.equal(f.root.dataset.themeReveal,undefined);
 assert.equal(f.button.disabled,false);assert.equal(f.properties.size,0);
});
