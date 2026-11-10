import test from 'node:test';
import assert from 'node:assert/strict';
import {renderJourney} from '../scripts/journey-map.mjs';
import {cameraAt,chapterAt,stops,overview} from '../journey-state.js';
import {initJourney} from '../journey-map.js';

test('geographic journey retains five factual chapters and native links without scripts',()=>{
 const milestones=Array.from({length:5},(_,i)=>[`Date ${i}`,`Title ${i}`,'Role','A real fact & detail.']);
 const html=renderJourney(milestones);
 assert.equal((html.match(/class="journey-chapter"/g)||[]).length,5);
 assert.match(html,/journey-map-canvas/);assert.doesNotMatch(html,/backplate|journey-map-art/);
 for(let i=0;i<5;i++){assert.ok(html.includes(`href="#journey-chapter-${i}"`));assert.ok(html.includes(`id="journey-chapter-${i}"`));}
 assert.ok(html.includes('A real fact &amp; detail.'));assert.doesNotMatch(html,/<li[^>]*(hidden|inert)/);
 assert.doesNotMatch(html,/P\. Casal|Arlegui|Globe Tower/);
});
test('camera follows fictional stops with finite bounded interpolation',()=>{
 for(let i=0;i<5;i++){
  assert.equal(chapterAt(stops[i].at),i);
  const frame=cameraAt(stops[i].at);
  assert.deepEqual(frame.center,i===4?overview.center:stops[i].center);assert.equal(frame.zoom,i===4?overview.zoom:stops[i].zoom);
 }
 for(let p=0;p<=1;p+=.001){const frame=cameraAt(p);assert.ok(frame.center.every(Number.isFinite));assert.ok(frame.zoom>=11.4&&frame.zoom<=13.3);assert.ok(frame.pitch===0&&frame.bearing===0);}
 assert.deepEqual(cameraAt(-2),cameraAt(0));assert.deepEqual(cameraAt(2),cameraAt(1));
});
test('phone and reduced-motion camera avoids the long tilted or globe travel',()=>{
 for(const stop of stops){
  const phone=cameraAt(stop.at,{mobile:true}),still=cameraAt(stop.at,{still:true});
  assert.ok(phone.zoom<=15.8);assert.equal(phone.pitch,0);
  assert.equal(still.pitch,0);assert.equal(still.bearing,0);assert.ok(still.zoom<=15.5);
 }
});
function fixture({mobile=false,reduced=false,fail=false}={}){
 const node=()=>({dataset:{},style:{},attrs:{},listeners:{},hidden:false,inert:false,disabled:false,textContent:'',setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,fn){this.listeners[k]=fn;},getBoundingClientRect(){return {top:-100,width:1440,height:900};}});
 const stage=node(),canvas=node(),chapter=Array.from({length:5},node),choice=Array.from({length:5},node),previous=node(),next=node(),counter=node(),place=node(),loading=node(),hint=node(),shell=node(),startLink=node();
 const cardMotions=[];
 chapter.forEach(c=>{c.querySelector=()=>({animate(frames,options){const motion={frames,options,canceled:false,cancel(){this.canceled=true;}};cardMotions.push(motion);return motion;}});});
 const section=node();section.offsetHeight=4500;stage.offsetHeight=900;
 section.querySelector=s=>({'.journey-stage':stage,'.journey-map-canvas':canvas,'[data-journey-previous]':previous,'[data-journey-next]':next,'.journey-counter':counter,'.journey-location':place,'.journey-loading':loading,'.journey-hint':hint,'.journey-start':startLink})[s];
 section.querySelectorAll=s=>s==='.journey-chapter'?chapter:choice;
 const root=node(),doc={hidden:false,documentElement:root,listeners:{},querySelector:s=>s==='#journey'?section:shell,addEventListener(k,fn){this.listeners[k]=fn;},removeEventListener(){}};
 const medias=[],frames=new Map(),moves=[],themes=[],listeners={};let id=0,observer;
 const win={scrollY:100,location:{hash:''},history:{replaceState(){}},scrollTo(value){this.lastScroll=value;},matchMedia:q=>{const m={matches:q.includes('reduce')?reduced:!mobile,addEventListener(k,fn){this.change=fn;},removeEventListener(){}};medias.push(m);return m;},addEventListener(k,fn){listeners[k]=fn;},removeEventListener(){},requestAnimationFrame(fn){frames.set(++id,fn);return id;},cancelAnimationFrame(i){frames.delete(i);},MutationObserver:class{observe(){}disconnect(){}},IntersectionObserver:class{constructor(fn){observer=fn;}observe(){}disconnect(){}}};
 const progressUpdates=[];
 const api={progress:(...a)=>progressUpdates.push(a),move:(...a)=>moves.push(a),theme:value=>themes.push(value),resize(){},dispose(){}};
 const dispose=initJourney({doc,win,loadMap:async(el,{onReady})=>{if(fail)throw Error('offline');onReady(api);}});
 return {section,stage,chapter,choice,previous,next,startLink,shell,doc,win,moves,themes,medias,dispose,listeners,progressUpdates,cardMotions,
  async start(){observer([{isIntersecting:true}]);await Promise.resolve();await Promise.resolve();},
  tick(){const entries=[...frames.values()];frames.clear();entries.forEach(fn=>fn());},
  click(i,extra={}){choice[i].listeners.click({button:0,detail:1,preventDefault(){},...extra});},
 };
}
test('desktop creates a full scroll scene and chapter selection moves to its scroll position',async()=>{
 const f=fixture();await f.start();f.tick();assert.equal(f.section.dataset.journeyMode,'scroll');
 f.click(3);assert.equal(f.chapter[3].hidden,false);assert.equal(f.choice[3].attrs['aria-current'],'step');assert.ok(f.win.lastScroll.top>2000);
 assert.equal(f.chapter.filter(c=>!c.hidden).length,1);f.dispose();
});
test('phone chapter buttons and horizontal swipe work without taking vertical scroll',async()=>{
 const f=fixture({mobile:true});await f.start();f.tick();assert.equal(f.section.dataset.journeyMode,'chapters');
 f.next.listeners.click({detail:1});assert.equal(f.chapter[1].hidden,false);assert.equal(f.win.lastScroll,undefined);
 const touch=(x,y)=>({pointerType:'touch',clientX:x,clientY:y,target:{closest:()=>null}});
 f.stage.listeners.pointerdown(touch(240,200));f.stage.listeners.pointerup(touch(80,205));assert.equal(f.chapter[2].hidden,false);
 f.stage.listeners.pointerdown(touch(200,200));f.stage.listeners.pointerup(touch(190,370));assert.equal(f.chapter[2].hidden,false);
 f.click(4);assert.equal(f.next.disabled,true);f.dispose();
});
test('pause and reduced motion preserve chapter reading with stationary cameras',async()=>{
 const f=fixture({reduced:true});await f.start();f.click(3);
 assert.equal(f.section.dataset.journeyMode,'chapters');assert.equal(f.moves.at(-1)[0].pitch,0);assert.equal(f.moves.at(-1)[1].animate,false);
 f.dispose();const p=fixture();await p.start();p.shell.dataset.motionPaused='true';p.click(1);assert.equal(p.moves.at(-1)[0].pitch,0);assert.equal(p.moves.at(-1)[1].animate,false);p.dispose();
});
test('failed geographic loading restores every chapter and native link',async()=>{
 const f=fixture({fail:true});await f.start();assert.equal(f.section.dataset.journeyEnhanced,undefined);
 assert.equal(f.chapter.filter(c=>!c.hidden&&!c.inert).length,5);assert.match(f.section.querySelector('.journey-loading').textContent,/unavailable/);f.dispose();
});
test('a direct phone chapter hash aligns the complete journey stage rather than cropping its heading',async()=>{
 const f=fixture({mobile:true});f.win.location.hash='#journey-chapter-3';await f.start();
 assert.equal(f.chapter[3].hidden,false);assert.equal(f.win.lastScroll.top,0);
 f.win.lastScroll=undefined;f.next.listeners.click({detail:1});assert.equal(f.win.lastScroll,undefined);
 f.dispose();
});

test('local story route reaches the confirmed stops and stays inside its vector map',async()=>{
 const {projectPoint,routePath}=await import('../journey-state.js');
 for(let i=0;i<stops.length;i++){
  const point=projectPoint(stops[i].center);
  assert.ok(point[0]>0&&point[0]<1800&&point[1]>0&&point[1]<1400);
  assert.ok(routePath(i).endsWith(point.join(' ')));
  assert.equal((routePath(i).match(/C/g)||[]).length,i);
 }
});

test('journey performance contract excludes a live map engine and bounds local assets',async()=>{
 const {readFile,stat}=await import('node:fs/promises');
 const renderer=await readFile('journey-geography.js','utf8'),build=await readFile('dist/index.html','utf8');
 assert.doesNotMatch(renderer,/fetch\(|new Worker|maplibre|WebGLRenderingContext/);
 assert.doesNotMatch(build,/vendor\/maplibre/);
 assert.doesNotMatch(await readFile('journey-map.css','utf8'),/backdrop-filter:\s*blur/);
 for(const file of ['story-map.svg','story-map-night.svg'])assert.ok((await stat('dist/images/journey/'+file)).size<15_000);
 assert.match(renderer,/phone\?1\.4:1\.8/);
});

test('local map renders a route, bounds transforms, switches theme and recovers image failure',async()=>{
 const {createGeography}=await import('../journey-geography.js');
 const {routePath}=await import('../journey-state.js');
 function fixture(fail=false){
  const nodes=[],frames=new Map();let frameId=0;
  const win={requestAnimationFrame:fn=>{frames.set(++frameId,fn);return frameId;},cancelAnimationFrame:id=>frames.delete(id)};
  const node=tag=>{const n={tag,attrs:{},style:{},dataset:{},children:[],listeners:{},setAttribute(k,v){this.attrs[k]=v;},append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},addEventListener(k,fn){this.listeners[k]=fn;},remove(){this.removed=true;},decode:()=>fail?Promise.reject(Error('image unavailable')):Promise.resolve(),getBoundingClientRect:()=>({width:1440,height:900})};nodes.push(n);return n;};
  const doc={defaultView:win,documentElement:{dataset:{theme:'day'}},createElement:node,createElementNS:(ns,tag)=>node(tag)};
  const container=node('container');container.ownerDocument=doc;
  return {nodes,container,frames,tick(time){const callbacks=[...frames.values()];frames.clear();callbacks.forEach(fn=>fn(time));}};
 }
 const f=fixture();let api,failures=0;
 await createGeography(f.container,{onReady:value=>api=value,onFailure:()=>failures++});
 assert.ok(api);api.highlight(3);
 assert.equal(f.nodes.filter(n=>n.tag==='g'&&n.dataset.active==='true').length,1);
 api.move(cameraAt(0));
 const entry=f.nodes[1].style.transform.match(/translate\(([-\d.]+)px,([-\d.]+)px\) scale\(([-\d.]+)\)/).slice(1).map(Number);
 assert.equal(f.nodes[1].dataset.preview,'true');assert.ok(entry[2]<.4);assert.ok(Math.abs(entry[0]+900*entry[2]-720)<.001);assert.ok(Math.abs(entry[1]+650*entry[2]-486)<.001);
 api.move(stops[0],{animate:true});assert.equal(f.nodes[1].dataset.preview,'false');assert.match(f.nodes[1].style.transform,/scale\(1.8\)/);assert.match(f.nodes[1].style.transition,/420ms/);
 api.move(stops[0],{animate:false,mobile:true});assert.match(f.nodes[1].style.transform,/scale\(1.4\)/);assert.equal(f.nodes[1].style.transition,'none');
 api.move(overview,{mobile:true});
 const scale=Number(f.nodes[1].style.transform.match(/scale\(([^)]+)\)/)[1]);
 const traveled=f.nodes.find(n=>n.attrs.class==='journey-route-traveled');
 assert.ok(Math.abs(parseFloat(traveled.style.strokeWidth)*scale-4)<.001,'overview route stays four screen pixels wide');
 api.progress(stops[0].at);api.progress(stops[2].at,{animate:true});assert.equal(f.frames.size,1);
 f.tick(0);f.tick(210);const midway=traveled.attrs.d;assert.notEqual(midway,routePath(0));assert.notEqual(midway,routePath(2));
 api.progress(stops[1].at,{animate:true});assert.equal(f.frames.size,1,'new chapter replaces the earlier animation');f.tick(220);f.tick(640);assert.equal(f.frames.size,0);assert.equal(traveled.attrs.d,routePath(1));
 api.progress(stops[3].at,{animate:true});api.settle();assert.equal(f.frames.size,0);assert.equal(traveled.attrs.d,routePath(3));
 api.progress(.6);assert.equal(f.frames.size,0,'scroll scrubbing has no independent ticker');
 assert.match(f.nodes.find(n=>n.attrs.class==='journey-route-cursor').attrs.transform,/rotate\(/);
 assert.equal(f.nodes.filter(n=>n.attrs.class==='journey-plane-body').length,1);
 assert.match(f.nodes.find(n=>n.attrs.class==='journey-plane-body').attrs.d,/^M0 0/,'airplane nose anchors to the leading edge');
 assert.match(f.nodes.find(n=>n.attrs.class==='journey-paper-plane').style.transform,/skewX/);
 api.progress(stops[1].at,{still:true});assert.equal(f.nodes.find(n=>n.attrs.class==='journey-paper-plane').style.transition,'none');assert.equal(f.nodes.find(n=>n.attrs.class==='journey-paper-plane').style.transform,'skewX(0deg) scaleY(1)');assert.ok(f.nodes.filter(n=>n.attrs.class==='journey-stop-halo').every(n=>Number(n.style.opacity)===0));
 api.theme(true);const image=f.nodes.find(n=>n.tag==='img');assert.equal(image.src,'/images/journey/story-map-night.svg');
 image.listeners.error();assert.equal(failures,1);api.progress(.7,{animate:true});assert.equal(f.frames.size,1);api.dispose();assert.equal(f.frames.size,0);image.listeners.error();assert.equal(failures,1);
 const broken=fixture(true);await createGeography(broken.container,{onReady:()=>assert.fail('broken map must not hide chapters'),onFailure:()=>failures++});assert.equal(failures,2);
});

test('the final chapter reveals the complete path on desktop, phone and reduced motion',()=>{
 assert.deepEqual(cameraAt(stops[4].at,{mobile:true}),overview);
 assert.deepEqual(cameraAt(stops[4].at,{still:true}),overview);
 assert.deepEqual(cameraAt(1).center,overview.center);
 assert.equal(cameraAt(stops[4].at).overview,1);
 assert.equal(cameraAt(.88).overview,0);
 assert.ok(cameraAt(.91).overview>0&&cameraAt(.91).overview<1);
});

test('drawn route follows continuous scroll progress forward and backward without a chapter jump',async()=>{
 const {routeAt}=await import('../journey-state.js');
 for(const stop of stops)assert.deepEqual(routeAt(stop.at).point,stop.center);
 for(let p=0;p<=1;p+=.002){const state=routeAt(p);assert.ok(state.point.every(Number.isFinite));assert.ok(state.point[0]>=200&&state.point[0]<=1600&&state.point[1]>=200&&state.point[1]<=1200);assert.doesNotMatch(state.path,/NaN|Infinity/);}
 const p=(stops[1].at+stops[2].at)/2;
 assert.notEqual(routeAt(p).path,routeAt(stops[1].at).path);assert.notEqual(routeAt(p).path,routeAt(stops[2].at).path);
 for(const stop of stops.slice(1,-1)){const a=routeAt(stop.at-.000001).point,b=routeAt(stop.at+.000001).point;assert.ok(Math.hypot(a[0]-b[0],a[1]-b[1])<.1);}
});

test('controller forwards exact progress and disables tweening for pause and reduced motion',async()=>{
 const f=fixture({mobile:true});await f.start();f.click(2);assert.equal(f.progressUpdates.at(-1)[0],stops[2].at);assert.equal(f.progressUpdates.at(-1)[1].animate,true);
 f.shell.dataset.motionPaused='true';f.doc.listeners['portfolio:motionchange']();assert.equal(f.progressUpdates.at(-1)[1].animate,false);assert.equal(f.progressUpdates.at(-1)[1].still,true);f.dispose();
 const r=fixture({reduced:true});await r.start();r.click(3);assert.equal(r.progressUpdates.at(-1)[1].animate,false);assert.equal(r.progressUpdates.at(-1)[1].still,true);r.dispose();
});

test('camera follows the drawn curve and widens at bends while preserving arrival framing',async()=>{
 const {routeAt}=await import('../journey-state.js');
 for(const [a,b] of [[stops[0],stops[1]],[stops[1],stops[2]],[stops[2],stops[3]]]){
  const mid=(a.at+b.at)/2,frame=cameraAt(mid);
  assert.deepEqual(frame.center,routeAt(mid).point);assert.ok(frame.zoom<Math.min(a.zoom,b.zoom));
  assert.ok(Number.isFinite(routeAt(mid).angle));
 }
});

test('chapter arrivals animate once and settle for keyboard, pause and hidden pages',async()=>{
 const f=fixture({mobile:true});await f.start();f.click(1);assert.equal(f.cardMotions.length,1);assert.equal(f.cardMotions[0].options.duration,280);
 f.click(2,{detail:0});assert.equal(f.cardMotions.length,1);assert.equal(f.cardMotions[0].canceled,true);
 f.click(3);f.shell.dataset.motionPaused='true';f.doc.listeners['portfolio:motionchange']();assert.equal(f.cardMotions.at(-1).canceled,true);
 f.shell.dataset.motionPaused='false';f.click(4);f.doc.hidden=true;f.doc.listeners.visibilitychange();assert.equal(f.cardMotions.at(-1).canceled,true);f.dispose();
});

test('journey opens on a compact overview and zooms in only as scrolling continues',()=>{
 for(const options of [{},{mobile:true},{still:true}]){
  const entry=cameraAt(0,options);assert.equal(entry.intro,1);assert.deepEqual(entry.center,overview.center);
 }
 assert.equal(cameraAt(.03).intro,1);
 assert.ok(cameraAt(.1).intro>0&&cameraAt(.1).intro<1);
 assert.equal(cameraAt(stops[0].at).intro,0);
 assert.deepEqual(cameraAt(stops[0].at).center,stops[0].center);
});

test('phone overview has a native start link that reveals the first chapter',async()=>{
 const f=fixture({mobile:true});await f.start();f.tick();assert.equal(f.section.dataset.journeyIntro,'');
 f.startLink.listeners.click({button:0,detail:1,preventDefault(){}});
 assert.equal(f.section.dataset.journeyIntro,undefined);assert.equal(f.chapter[0].hidden,false);assert.equal(f.win.lastScroll.top,0);
 assert.equal(f.moves.at(-1)[1].animate,true);f.dispose();
});


test('reduced-motion entry bypasses zoom and desktop reverse scroll restores the overview',async()=>{
 const r=fixture({reduced:true});await r.start();r.tick();assert.equal(r.section.dataset.journeyIntro,'');
 r.startLink.listeners.click({button:0,detail:0,preventDefault(){}});assert.equal(r.moves.at(-1)[1].animate,false);assert.equal(r.section.dataset.journeyIntro,undefined);r.dispose();
 const f=fixture();await f.start();f.tick();f.click(3);assert.equal(f.section.dataset.journeyIntro,undefined);
 f.section.getBoundingClientRect=()=>({top:0,width:1440,height:900});f.listeners.scroll();f.tick();assert.equal(f.section.dataset.journeyIntro,'');assert.equal(f.section.dataset.journeyCover,'');f.dispose();
});

test('after the fifth chapter the camera returns to the same compact preview',()=>{
 const entry=cameraAt(0),exit=cameraAt(1);
 assert.deepEqual(exit.center,entry.center);assert.equal(exit.zoom,entry.zoom);assert.equal(exit.intro,entry.intro);
 assert.equal(cameraAt(stops[4].at).intro,0,'chapter five remains readable before exit');
 assert.ok(cameraAt(.97).intro>0&&cameraAt(.97).intro<1);
 for(const options of [{mobile:true},{still:true}])assert.deepEqual(cameraAt(1,options),cameraAt(0,options));
});

test('end preview hides chapter controls and reverse scroll restores chapter five',async()=>{
 const f=fixture();await f.start();f.tick();
 f.section.getBoundingClientRect=()=>({top:-3600,width:1440,height:900});f.listeners.scroll();f.tick();
 assert.equal(f.section.dataset.journeyIntro,'');assert.equal(f.section.dataset.journeyCover,'');
 f.section.getBoundingClientRect=()=>({top:-3384,width:1440,height:900});f.listeners.scroll();f.tick();
 assert.equal(f.section.dataset.journeyIntro,undefined);assert.equal(f.chapter[4].hidden,false);f.dispose();
});

test('overview labels explain all five fictional stops without adding real locations',async()=>{
 const {readFile}=await import('node:fs/promises');
 const source=await readFile('journey-geography.js','utf8');
 for(const label of ['First questions','Learning together','Taking the lead','Building with people','What comes next'])assert.ok(source.includes(label));
 assert.match(source,/svg.dataset.overview=String\(intro>\.8\|\|reveal>\.95\)/);
 const html=await readFile('dist/index.html','utf8');
 assert.equal((html.match(/class="paper-seam(?: [^"]*)?" aria-hidden="true"/g)||[]).length,3);
 assert.ok(html.indexOf('paper-seam')<html.indexOf('class="world-introduction"'));
 assert.ok(html.indexOf('paper-seam-surface')<html.indexOf('id="work"'));
 const css=await readFile('connected-home.css','utf8');assert.match(css,/\.paper-seam\{height:0;[^}]*pointer-events:none/);
 for(const name of ['story-map.svg','story-map-night.svg'])assert.match(await readFile('dist/images/journey/'+name,'utf8'),/id="town-blocks"/);
});

test('detailed map stays intact while only the preview outer backdrop becomes transparent',async()=>{
 const {readFile}=await import('node:fs/promises');
 for(const name of ['story-map.svg','story-map-night.svg']){
  const svg=await readFile('dist/images/journey/'+name,'utf8');
  assert.match(svg,/<rect/);assert.match(svg,/<circle/);assert.doesNotMatch(svg,/<rect x="0" y="0" width="1800" height="1400"/);
  assert.match(svg,/fill="none"/);assert.match(svg,/id="town-blocks"/);
 }
 const css=await readFile('journey-map.css','utf8');assert.match(css,/\.journey-map-world\[data-preview=true\] \.journey-street-map\{background:transparent\}/);assert.match(css,/\.journey-street-map\{background:#f0f0e7;-webkit-mask-image:none;mask-image:none\}/);
});
