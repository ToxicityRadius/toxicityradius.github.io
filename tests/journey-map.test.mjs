import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {renderJourney} from '../scripts/journey-map.mjs';
test('journey retains every real chapter and native chapter destination without scripts',()=>{
 const milestones=Array.from({length:5},(_,i)=>[`Date ${i}`,`Title ${i}`,'Role','A real fact & detail.']);
 const html=renderJourney(milestones);
 assert.equal((html.match(/class="journey-chapter"/g)||[]).length,5);
 for(let i=0;i<5;i++){assert.ok(html.includes(`href="#journey-chapter-${i}"`));assert.ok(html.includes(`id="journey-chapter-${i}"`));}
 assert.ok(html.includes('A real fact &amp; detail.'));
});
test('journey scroll progress freezes when paused; direct selection and reduced motion remain usable',async()=>{
 const source=await readFile(new URL('../journey-map.js',import.meta.url),'utf8');
 const node=()=>({style:{},attrs:{},classList:{toggle(){}},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,v){this[k]=v;}});
 const route=Object.assign(node(),{getTotalLength:()=>856,getPointAtLength:value=>({x:value,y:0})}),traveler=node(),choices=Array.from({length:5},node),waypoints=Array.from({length:5},node),chapters=Array.from({length:5},node),scene={dataset:{paused:'false'}};
 const section=Object.assign(node(),{querySelector:s=>s==='.journey-drawn'?route:traveler,querySelectorAll:s=>s==='.journey-chapter'?chapters:s==='[data-journey-choice]'?choices:waypoints});
 const reduce={matches:false,addEventListener(k,fn){this.change=fn;}},desktop={matches:true,addEventListener(){}};
 let options;
 const context={document:{querySelector:s=>s==='#journey'?section:scene},window:{matchMedia:s=>s.includes('reduce')?reduce:desktop,gsap:{registerPlugin(){}},ScrollTrigger:{create:value=>(options=value,{progress:0,kill(){}})}}};
 vm.runInNewContext(source,context);
 options.onUpdate({progress:.5});assert.equal(route.style.strokeDashoffset,'428');
 scene.dataset.paused='true';options.onUpdate({progress:.8});assert.equal(route.style.strokeDashoffset,'428');
 choices[4].click();assert.equal(route.style.strokeDashoffset,'0');assert.equal(choices[4].attrs['aria-current'],'step');
 reduce.matches=true;reduce.change();assert.equal(route.style.strokeDashoffset,'0');
});
