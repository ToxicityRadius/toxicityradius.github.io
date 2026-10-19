import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {atmosphereActive,pointerOffset,initAtmosphere} from '../review/experience/atmosphere.js';

test('ambient work runs only in the arrived, visible and motion-enabled valley',()=>{
 const state={scene:'valley',entrance:'arrived',paused:false,hidden:false,reduced:false,visible:true};
 assert.equal(atmosphereActive(state),true);
 for(const [key,value] of Object.entries({scene:'approaching',entrance:'playing',paused:true,hidden:true,reduced:true,visible:false})){
  assert.equal(atmosphereActive({...state,[key]:value}),false,key);
 }
});

test('pointer offsets use local stage coordinates and clamp outside events',()=>{
 const rect={left:100,top:50,width:1000,height:500};
 assert.deepEqual(pointerOffset(600,300,rect),{x:0,y:0});
 assert.deepEqual(pointerOffset(0,1000,rect),{x:-1,y:1});
 assert.deepEqual(pointerOffset(100,50,{...rect,width:0,height:0}),{x:0,y:0});
});

test('unrelated review routes remain untouched',()=>{
 assert.equal(typeof initAtmosphere({querySelector:()=>null},{}),'function');
});

test('visibility, scene and preference changes pause work and cleanup removes every listener',()=>{
 const listeners=new Map(),observers=[],elements=[];
 function element(){
  const node={dataset:{},style:{},classList:{add(){}},setAttribute(){},querySelector:()=>null,
   addEventListener(type,fn){listeners.set(`${this.id}-${type}`,fn);},
   removeEventListener(type){listeners.delete(`${this.id}-${type}`);},
   insertBefore(){},remove(){this.removed=true;}};
  node.id=elements.length;elements.push(node);return node;
 }
 const shell=element(),stage=element(),world=element(),depth=element(),destinations=element(),doc=element();
 const reduced={matches:false,addEventListener(type,fn){this.change=fn;},removeEventListener(){this.change=null;}};
 const fine={...reduced,matches:true};
 doc.hidden=false;doc.createElementNS=()=>element();shell.ownerDocument=doc;
 shell.dataset.scene='valley';stage.dataset.entrance='arrived';
 stage.getBoundingClientRect=()=>({left:0,top:0,width:100,height:100});
 shell.querySelector=()=>stage;
 stage.querySelector=selector=>selector==='.world'?world:selector==='.destinations'?destinations:depth;
 class Observer{constructor(callback){this.callback=callback;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
 const win={matchMedia:query=>query.includes('reduced')?reduced:fine,MutationObserver:Observer,IntersectionObserver:Observer};
 const cleanup=initAtmosphere({querySelector:()=>shell},win),overlay=elements.at(-1);
 assert.equal(overlay.dataset.running,'false');
 observers[1].callback([{isIntersecting:true}]);assert.equal(overlay.dataset.running,'true');
 listeners.get(`${stage.id}-pointermove`)({clientX:100,clientY:100,pointerType:'mouse'});
 assert.equal(depth.style.transform,'translate(4px,2px)');
 assert.equal(destinations.style.transform,depth.style.transform);
 shell.dataset.scene='approaching';observers[0].callback();
 assert.equal(overlay.dataset.running,'false');assert.equal(depth.style.transform,'translate(0px,0px)');
 assert.equal(destinations.style.transform,'translate(0px,0px)');
 shell.dataset.scene='valley';observers[0].callback();assert.equal(overlay.dataset.running,'true');
 listeners.get(`${stage.id}-pointermove`)({clientX:0,clientY:0,pointerType:'mouse'});
 assert.equal(destinations.style.transform,'translate(-4px,-2px)');
 shell.dataset.motionPaused='true';observers[0].callback();
 assert.equal(destinations.style.transform,'translate(0px,0px)');
 shell.dataset.motionPaused='false';observers[0].callback();
 reduced.matches=true;reduced.change();assert.equal(overlay.dataset.running,'false');
 reduced.matches=false;reduced.change();doc.hidden=true;
 listeners.get(`${doc.id}-visibilitychange`)();assert.equal(overlay.dataset.running,'false');
 cleanup();assert.equal(listeners.size,0);assert.equal(overlay.removed,true);
 assert.equal(observers.every(observer=>observer.disconnected),true);assert.equal(reduced.change,null);
});

test('decorative motion pauses by default and has a reduced-motion static variant',async()=>{
 const css=await readFile(new URL('../review/experience/atmosphere.css',import.meta.url),'utf8');
 assert.match(css,/6s[^}]+alternate paused/);
 assert.match(css,/8s linear infinite paused/);
 assert.match(css,/data-running="true"[^}]+animation-play-state:running/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)[\s\S]+animation:none/);
 assert.doesNotMatch(css,/filter:|requestAnimationFrame|transition:all/);
});
