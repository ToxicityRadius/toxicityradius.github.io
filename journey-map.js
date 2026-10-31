import {cameraAt,chapterAt,clamp,stops} from './journey-state.js';
import {createGeography} from './journey-geography.js';

export function initJourney({doc=document,win=window,loadMap=createGeography}={}){
 const section=doc.querySelector('#journey');if(!section)return;
 const stage=section.querySelector('.journey-stage'),canvas=section.querySelector('.journey-map-canvas');
 const chapters=[...section.querySelectorAll('.journey-chapter')],choices=[...section.querySelectorAll('[data-journey-choice]')];
 const previous=section.querySelector('[data-journey-previous]'),next=section.querySelector('[data-journey-next]');
 const counter=section.querySelector('.journey-counter'),location=section.querySelector('.journey-location');
 const shell=doc.querySelector('.experience-shell'),reduced=win.matchMedia('(prefers-reduced-motion: reduce)'),wide=win.matchMedia('(min-width:1101px) and (pointer:fine)');
 if(!stage||!canvas||chapters.length!==5)return;
 let map=null,loading=false,failed=false,disposed=false,active=0,progress=0,raf=0,lastCamera='',touch=null,cardMotion=null;
 const paused=()=>shell?.dataset.motionPaused==='true';
 const scrollMode=()=>wide.matches&&!reduced.matches;
 const blocked=()=>doc.hidden||shell?.dataset.previewOpen==='true';
 function settleCard(){cardMotion?.cancel();cardMotion=null;}
 function fallback(){
  settleCard();
  if(disposed)return;
  failed=true;map?.dispose();map=null;
  delete section.dataset.journeyIntro;delete section.dataset.journeyCover;delete section.dataset.journeyEnhanced;delete section.dataset.journeyMode;delete section.dataset.mapReady;
  const heading=section.querySelector('.journey-heading');if(heading)heading.style.opacity='';
  chapters.forEach(chapter=>{chapter.hidden=false;chapter.inert=false;});
  section.querySelector('.journey-loading').textContent='The map is unavailable. Follow all five chapters below.';
 }
 function paint(value,{animate=false,direct=false}={}){
  const previousActive=active;progress=clamp(value);active=chapterAt(progress);
  if(!map||blocked())return;
  chapters.forEach((chapter,i)=>{chapter.hidden=i!==active;chapter.inert=i!==active;});
  if(direct||reduced.matches||paused())settleCard();
  else if(previousActive!==active){
   settleCard();cardMotion=chapters[active].querySelector?.('.journey-chapter-copy')?.animate?.([{opacity:.5,transform:`translateY(${wide.matches?14:8}px)`},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.23,1,.32,1)'})||null;
  }
  choices.forEach((choice,i)=>{if(i===active)choice.setAttribute('aria-current','step');else choice.removeAttribute('aria-current');});
  previous.disabled=active===0;next.disabled=active===4;
  counter.textContent=`${active+1} / 5`;
  map.highlight?.(progress<.12||progress>.97?-1:active);
  location.textContent=`Chapter ${active+1} of 5`;
  const camera=cameraAt(progress,{mobile:!wide.matches,still:reduced.matches||paused()}),key=JSON.stringify(camera),intro=camera.intro||0;
  if(intro>.12)section.dataset.journeyIntro='';else delete section.dataset.journeyIntro;
  if(intro>=.5)section.dataset.journeyCover='';else delete section.dataset.journeyCover;
  const heading=section.querySelector('.journey-heading');if(heading)heading.style.opacity=String(Math.abs(intro-.5)*2);
  if(key!==lastCamera){lastCamera=key;map.move(camera,{animate:animate&&!reduced.matches&&!paused(),mobile:!wide.matches});}
  map.progress?.(progress,{animate:animate&&!reduced.matches&&!paused(),still:reduced.matches||paused()||direct});
 }
 function update(){
  raf=0;if(!map||failed)return;
  if(scrollMode()){
   const rect=section.getBoundingClientRect();
   if(rect.top>win.innerHeight||rect.top+section.offsetHeight<0)return;
   const travel=Math.max(1,section.offsetHeight-stage.offsetHeight);
   paint(-rect.top/travel);
  }else paint(progress);
 }
 function schedule(){if(!raf&&!disposed)raf=win.requestAnimationFrame(update);}
 function configure(){
  if(!map)return;
  section.dataset.journeyEnhanced='';section.dataset.journeyMode=scrollMode()?'scroll':'chapters';
  map.resize();lastCamera='';schedule();win.ScrollTrigger?.refresh();
 }
 function select(index,{record=false,animate=false,align=false}={}){
  if(failed||!map)return;
  index=clamp(index,0,4);const value=stops[index].at;
  if(record)win.history.replaceState(win.history.state,'',`#journey-chapter-${index}`);
  if(scrollMode()){
   const top=win.scrollY+section.getBoundingClientRect().top+value*(section.offsetHeight-stage.offsetHeight);
   win.scrollTo({top,behavior:'instant'});
  }else if(align){
   win.scrollTo({top:win.scrollY+section.getBoundingClientRect().top,behavior:'instant'});
  }
  paint(value,{animate,direct:!animate});
 }
 async function start(){
  if(loading||disposed)return;loading=true;
  try{await loadMap(canvas,{onFailure:fallback,onReady:api=>{
   if(disposed||failed){api.dispose();return;}
   map=api;section.dataset.mapReady='';api.theme(doc.documentElement.dataset.theme==='night');configure();
   const match=win.location.hash.match(/^#journey-chapter-([0-4])$/);
   if(match)select(Number(match[1]),{align:true});else update();
  }});}catch(error){console.warn('Geographic journey could not initialize:',error);fallback();}
 }
 choices.forEach((choice,index)=>choice.addEventListener('click',event=>{
  if(failed||!map||event.button>0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();select(index,{record:true,animate:event.detail>0});
 }));
 section.querySelector('.journey-start')?.addEventListener('click',event=>{
  if(failed||!map||event.button>0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();select(0,{record:true,animate:event.detail>0,align:true});
  if(!event.detail)choices[0].focus?.({preventScroll:true});
 });
 previous.addEventListener('click',event=>select(active-1,{record:true,animate:event.detail>0}));
 next.addEventListener('click',event=>select(active+1,{record:true,animate:event.detail>0}));
 stage.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'&&!event.target.closest('a,button'))touch={x:event.clientX,y:event.clientY};},{passive:true});
 stage.addEventListener('pointerup',event=>{
  if(!touch)return;const dx=event.clientX-touch.x,dy=event.clientY-touch.y;touch=null;
  if(!scrollMode()&&Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)select(active+(dx<0?1:-1),{record:true,animate:true});
 },{passive:true});
 stage.addEventListener('pointercancel',()=>{touch=null;});
 const hash=()=>{const match=win.location.hash.match(/^#journey-chapter-([0-4])$/);if(match)select(Number(match[1]),{align:true});};
 const motion=()=>{lastCamera='';paint(progress);};
 const visible=()=>{if(!blocked()){lastCamera='';schedule();}else{settleCard();map?.settle?.();}};
 const theme=()=>{if(map){map.theme(doc.documentElement.dataset.theme==='night');lastCamera='';paint(progress);}};
 const observer=new win.MutationObserver(theme);observer.observe(doc.documentElement,{attributes:true,attributeFilter:['data-theme']});
 const shellObserver=new win.MutationObserver(visible);if(shell)shellObserver.observe(shell,{attributes:true,attributeFilter:['data-preview-open']});
 const entrance=new win.IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){start();entrance.disconnect();}},{rootMargin:'600px'});entrance.observe(section);
 if(/^#journey-chapter-[0-4]$/.test(win.location.hash)){start();entrance.disconnect();}
 win.addEventListener('scroll',schedule,{passive:true});win.addEventListener('resize',configure);win.addEventListener('hashchange',hash);win.addEventListener('pageshow',hash);
 reduced.addEventListener('change',configure);wide.addEventListener('change',configure);
 doc.addEventListener('portfolio:motionchange',motion);doc.addEventListener('visibilitychange',visible);
 return ()=>{disposed=true;settleCard();win.cancelAnimationFrame(raf);observer.disconnect();shellObserver.disconnect();entrance.disconnect();map?.dispose();
  win.removeEventListener('scroll',schedule);win.removeEventListener('resize',configure);win.removeEventListener('hashchange',hash);win.removeEventListener('pageshow',hash);
  reduced.removeEventListener('change',configure);wide.removeEventListener('change',configure);doc.removeEventListener('portfolio:motionchange',motion);doc.removeEventListener('visibilitychange',visible);
 };
}
if(typeof document!=='undefined'&&typeof window!=='undefined')initJourney();
