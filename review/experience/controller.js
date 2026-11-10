import {finishEntrance} from '../animatic/controller.js';
import {initWorkshopStages} from '../exhibits/controller.js';
import {initAtmosphere} from './atmosphere.js';
import {cameraTarget,travelTiming,EASE_OUT,EASE_TRAVEL} from './motion.js';

const projectHash='#project-formproof';

export function initExperience(doc=document,win=window) {
 const shell=doc.querySelector('.experience-shell');
 if(!shell)return;
 const valley=shell.querySelector('.valley-pane'),stage=shell.querySelector('.stage');
 const world=stage.querySelector('.world'),trigger=shell.querySelector('#workshop-trigger');
 const exhibit=shell.querySelector('#workshop-exhibit'),heading=exhibit.querySelector('#workshop-title');
 const close=exhibit.querySelector('#close-workshop'),motion=doc.querySelector('#scene-motion');
 const introControl=doc.querySelector('#intro-control'),status=shell.querySelector('.scene-status');
 const header=shell.querySelector('.experience-header');
 const debugFooter=doc.querySelector('footer');
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)'),phone=win.matchMedia('(max-width:700px), (hover: none) and (pointer: coarse)');
 const camera=doc.createElement('div'),depth=doc.createElement('div');
 camera.className='approach-camera';depth.className='pointer-depth';
 world.before(camera);camera.append(depth);depth.append(world);
 const cancel=doc.createElement('button');cancel.className='travel-back';cancel.type='button';cancel.textContent='Back to valley';cancel.hidden=true;shell.append(cancel);
 const workshop=initWorkshopStages(exhibit,doc);
 if(!workshop)return;
 let destination=false,revision=0,animations=[],transitioning=false,visited=false;
 let pendingBack=false,reopenRequested=false;
 let valleyScroll=0,interiorScroll=0,approach='translate(0px, 0px) scale(1)',cameraTravel=false;
 const neutral='translate(0px, 0px) scale(1)';
 const image=exhibit.querySelector('.bench-art');
 let artworkReady=false;
 image.decode().then(()=>{artworkReady=true;},()=>{});
 const freeze=()=>{
  const transform=win.getComputedStyle(camera).transform,opacity=win.getComputedStyle(exhibit).opacity;
  animations.forEach(animation=>animation.cancel());animations=[];
  camera.style.transform=transform;exhibit.style.opacity=opacity;
 };
 const entranceChanged=()=>{
  if(!destination&&!transitioning)shell.dataset.scene=stage.dataset.entrance==='arrived'?'valley':'entrance';
  if(destination)stage.querySelector('.destinations').inert=true;
 };
 const observer=new win.MutationObserver(entranceChanged);
 observer.observe(stage,{attributes:true,attributeFilter:['data-entrance']});
 const setDestination=async(value,{keyboard=false,immediate=false}={})=>{
  if(value===destination&&!immediate)return;
  const id=++revision,changed=value!==destination;
  if(!destination&&value&&!transitioning)valleyScroll=win.scrollY;
  if(destination&&!value)interiorScroll=exhibit.scrollTop;
  destination=value;transitioning=true;
  freeze();
  finishEntrance();
  shell.dataset.open=String(value);shell.dataset.scene=value?'approaching':'returning';
  header.inert=false;header.setAttribute('aria-hidden','false');
  trigger.setAttribute('aria-expanded',String(value));
  valley.inert=value;valley.setAttribute('aria-hidden',String(value));
  exhibit.inert=!value;exhibit.setAttribute('aria-hidden',String(!value));
  debugFooter.inert=value;debugFooter.setAttribute('aria-hidden',String(value));
  cancel.hidden=!value||immediate;
  if(value){
   if(changed){heading.focus({preventScroll:true});exhibit.scrollTop=visited?interiorScroll:0;visited=true;}
   status.textContent='Entering the workshop.';
  }else status.textContent='Returning to the valley.';
  // Slow or missing artwork must never hold navigation hostage.
  const timing=travelTiming({mobile:phone.matches,reduced:reduced.matches,keyboard,paused:shell.dataset.motionPaused==='true',failed:(value&&!artworkReady)||(!value&&!cameraTravel)});
  if(value&&timing.scale>1){
   // Only measure the unapproached valley; reversals reuse the same target.
   if(!cameraTravel){
    const rect=stage.getBoundingClientRect(),worldRect=world.getBoundingClientRect();
    approach=cameraTarget(rect.width,rect.height,{left:worldRect.left-rect.left,top:worldRect.top-rect.top,width:worldRect.width,height:worldRect.height},timing.scale);
   }
   cameraTravel=true;
  }
  const target=value&&timing.scale>1?approach:neutral;
  if(timing.scale===1)camera.style.transform=neutral;
  const duration=immediate?0:timing.duration,blend=immediate?0:timing.blend;
  const complete=()=>{
   if(id!==revision)return;
   animations.forEach(animation=>animation.cancel());animations=[];
   camera.style.transform=target;exhibit.style.opacity=value?'1':'0';
   transitioning=false;shell.dataset.scene=value?'workshop':'valley';cancel.hidden=true;
   header.inert=value;header.setAttribute('aria-hidden',String(value));
   if(value&&doc.activeElement===motion)heading.focus({preventScroll:true});
   workshop.refresh();
   if(!value){
    cameraTravel=false;
    win.scrollTo({top:valleyScroll,behavior:'instant'});
    trigger.focus({preventScroll:true});
   }
   status.textContent=value?'Inside the workshop.':'Back in the valley.';
  };
  if(!duration){complete();return;}
  const from=win.getComputedStyle(camera).transform;
  animations=[camera.animate([{transform:from},{transform:target}],{duration,easing:EASE_TRAVEL,fill:'both'}),exhibit.animate([{opacity:win.getComputedStyle(exhibit).opacity},{opacity:value?1:0}],{duration:blend,delay:value?duration-blend:0,easing:EASE_OUT,fill:'both'})];
  await Promise.all(animations.map(animation=>animation.finished.catch(()=>{})));
  complete();
 };
 const navigate=(value,options={})=>{
  if(value===destination)return;
  if(pendingBack){reopenRequested=value;setDestination(value,options);return;}
  if(value){
   const url=new URL(win.location.href);url.hash=projectHash;
   win.history.pushState({...win.history.state,experienceWorkshop:true},'',url.href);
   setDestination(true,options);
  }else if(win.history.state?.experienceWorkshop){
   // Start reversing immediately; popstate will synchronize without starting twice.
   pendingBack=true;setDestination(false,options);win.history.back();
  }else{
   const url=new URL(win.location.href);if(url.hash===projectHash)url.hash='';
   win.history.replaceState(win.history.state,'',url.href);setDestination(false,options);
  }
 };
 const syncLocation=()=>{
  if(pendingBack){
   pendingBack=false;
   if(reopenRequested){
    reopenRequested=false;
    const url=new URL(win.location.href);url.hash=projectHash;
    win.history.pushState({...win.history.state,experienceWorkshop:true},'',url.href);
    setDestination(true);return;
   }
  }
  setDestination(win.location.hash===projectHash,{keyboard:reduced.matches});
 };
 shell.classList.add('is-enhanced');
 exhibit.inert=true;exhibit.setAttribute('aria-hidden','true');exhibit.style.opacity='0';
 close.hidden=motion.hidden=false;
 trigger.addEventListener('click',event=>{
  if(event.button>0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();navigate(true,{keyboard:event.detail===0});
 });
 close.addEventListener('click',event=>navigate(false,{keyboard:event.detail===0}));
 cancel.addEventListener('click',event=>navigate(false,{keyboard:event.detail===0}));
 doc.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();navigate(true,{keyboard:true});});
 doc.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&destination){event.preventDefault();navigate(false,{keyboard:true});}
  else if(event.key==='Tab'&&transitioning)setDestination(destination,{immediate:true});
 });
 motion.addEventListener('click',()=>{
  const paused=shell.dataset.motionPaused!=='true';shell.dataset.motionPaused=String(paused);
  motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Resume scene motion':'Pause scene motion';
  introControl.setAttribute('aria-disabled',String(paused));
  if(paused){finishEntrance();if(transitioning)setDestination(destination,{keyboard:true,immediate:true});}
 });
 introControl.addEventListener('click',event=>{
  if(shell.dataset.motionPaused==='true'){event.stopImmediatePropagation();finishEntrance();}
 },true);
 win.addEventListener('popstate',syncLocation);win.addEventListener('hashchange',syncLocation);
 win.addEventListener('resize',()=>{
  if(destination){freeze();camera.style.transform=neutral;cameraTravel=false;setDestination(true,{immediate:true});}
  else if(transitioning)setDestination(false,{immediate:true});
 });
 const preferenceChanged=()=>{if(transitioning)setDestination(destination,{keyboard:true,immediate:true});};
 reduced.addEventListener('change',preferenceChanged);phone.addEventListener('change',preferenceChanged);
 doc.addEventListener('visibilitychange',()=>{if(doc.hidden&&transitioning)setDestination(destination,{immediate:true});});
 initAtmosphere(doc,win);
 doc.fonts?.ready.then(()=>workshop.refresh());
 if(win.location.hash===projectHash)setDestination(true,{immediate:true});
 else {if(phone.matches)finishEntrance();entranceChanged();}
}

if(typeof document!=='undefined')initExperience();
