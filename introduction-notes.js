export function initIntroductionNotes(doc=document,win=window){
 const section=doc.querySelector('.world-introduction');if(!section)return;
 const cleanups=[],states=[];
 const quiet=()=>win.matchMedia?.('(prefers-reduced-motion: reduce)').matches||section.closest?.('.connected-home')?.dataset.motionPaused==='true';
 const listen=(node,type,fn)=>{node.addEventListener(type,fn);cleanups.push(()=>node.removeEventListener(type,fn));};
 for(const wrapper of section.querySelectorAll('.intro-note-position')){
  const note=wrapper.querySelector('.intro-sign'),handle=wrapper.querySelector('.note-drag-handle'),flight=wrapper.querySelector('.note-flight');
  if(!note||!handle)continue;
  let arrival=null;
  const state={x:0,y:0,drag:null};const restAngle=states.length===0?'-1.3deg':'1.3deg';states.push({state,place,cancel:()=>finish(true)});
  function settle(){
   arrival?.cancel();arrival=null;note.dataset.noteMoved='true';note.style.translate='0px';note.style.rotate=restAngle;note.style.opacity='1';
   const icon=note.querySelector('.sign-icon');if(icon)icon.style.transform='none';
  }
  function place(x,y){
   const area=section.getBoundingClientRect(),rect=note.getBoundingClientRect(),inset=state.drag&&!quiet()?32:12;
   const bound=(value,low,high)=>low>high?(low+high)/2:Math.max(low,Math.min(high,value));
   state.x=bound(x,state.x+area.left+inset-rect.left,state.x+area.right-inset-rect.right);
   state.y=bound(y,state.y+area.top+inset-rect.top,state.y+area.bottom-inset-rect.bottom);
   wrapper.style.transform=`translate3d(${state.x}px,${state.y}px,0)`;
   if(Math.hypot(state.x,state.y)>2)section.dataset.notesMoved='true';
  }
  function finish(cancel=false){
   if(!state.drag)return;
   const drag=state.drag;win.cancelAnimationFrame?.(drag.frame);
   if(!cancel)place(drag.x+drag.targetX-drag.px,drag.y+drag.targetY-drag.py);
   state.drag=null;wrapper.classList.remove('is-dragging');
   if(flight)flight.style.transform='none';
   if(cancel)place(drag.x,drag.y);
   if(wrapper.hasPointerCapture?.(drag.id))wrapper.releasePointerCapture(drag.id);
  }
  listen(wrapper,'pointerdown',event=>{
   if(event.button!==0||event.isPrimary===false||state.drag)return;
   // Keep native phone scrolling on the note text; the visible grip owns touch dragging.
   if(event.pointerType==='touch'&&!handle.contains(event.target))return;
   event.preventDefault();wrapper.dataset.notePointer='true';settle();handle.focus({preventScroll:true});
   state.drag={id:event.pointerId,px:event.clientX,py:event.clientY,x:state.x,y:state.y,lastX:event.clientX,lastY:event.clientY,targetX:event.clientX,targetY:event.clientY,time:0,frame:0,vx:0,vy:0,lift:0};
   wrapper.classList.add('is-dragging');wrapper.setPointerCapture(event.pointerId);
   if(flight&&!quiet()){if(win.requestAnimationFrame)state.drag.frame=win.requestAnimationFrame(drawDrag);else drawDrag(event.timeStamp||16);}
  });
  function drawDrag(time){
   const drag=state.drag;if(!drag)return;drag.frame=0;
   if(doc.hidden){finish(true);return;}
   const dt=drag.time?Math.max(8,Math.min(40,time-drag.time)):16,mix=1-Math.exp(-dt/75);
   drag.lift+=(1-drag.lift)*mix;
   drag.vx+=((drag.targetX-drag.lastX)/dt-drag.vx)*mix;
   drag.vy+=((drag.targetY-drag.lastY)/dt-drag.vy)*mix;
   if(flight&&!quiet()){
    const limit=(value,max)=>Math.max(-max,Math.min(max,value));
    const roll=limit(drag.vx*4,8),pitch=limit(-drag.vy*4,6),yaw=limit(-drag.vx*2.5,5);
    flight.style.transform=`perspective(800px) translate3d(0,${-10*drag.lift}px,0) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg) scale(${1+.035*drag.lift})`;
   }else if(flight?.style.transform)flight.style.transform='none';
   drag.lastX=drag.targetX;drag.lastY=drag.targetY;drag.time=time;
   place(drag.x+drag.targetX-drag.px,drag.y+drag.targetY-drag.py);
   // Relax the bank after movement stops, then stop scheduling frames.
   if(!quiet()&&Math.abs(drag.vx)+Math.abs(drag.vy)+Math.abs(1-drag.lift)>.003&&win.requestAnimationFrame)drag.frame=win.requestAnimationFrame(drawDrag);
  }
  listen(wrapper,'pointermove',event=>{
   const drag=state.drag;if(!drag||drag.id!==event.pointerId)return;
   drag.targetX=event.clientX;drag.targetY=event.clientY;
   if(win.requestAnimationFrame){if(!drag.frame)drag.frame=win.requestAnimationFrame(drawDrag);}
   else drawDrag(event.timeStamp||drag.time+16);
  });
  listen(wrapper,'pointerup',event=>{if(event.pointerId===state.drag?.id)finish();});
  listen(wrapper,'pointercancel',event=>{if(event.pointerId===state.drag?.id)finish(true);});
  listen(wrapper,'lostpointercapture',()=>finish());
  listen(handle,'keydown',event=>{
   delete wrapper.dataset.notePointer;
   if(event.key==='Escape'&&state.drag){event.preventDefault();finish(true);return;}
   const direction={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
   if(!direction&&event.key!=='Home')return;
   event.preventDefault();settle();finish();
   const step=event.shiftKey?30:10;
   if(event.key==='Home')place(0,0);else place(state.x+direction[0]*step,state.y+direction[1]*step);
  });
  const reveal=win.IntersectionObserver?new win.IntersectionObserver(entries=>{
   if(!entries.some(entry=>entry.isIntersecting))return;reveal.disconnect();
   if(quiet()||note.dataset.noteMoved==='true')return;
   arrival=note.animate?.([{transform:`translateY(18px) rotate(${restAngle.startsWith('-')?-5:5}deg) scale(.97)`,opacity:.7},{transform:'translateY(-3px) rotate(1deg) scale(1.01)',opacity:1,offset:.72},{transform:'none',opacity:1}],{duration:650,easing:'cubic-bezier(.23,1,.32,1)'})||null;
  },{threshold:.3}):null;
  reveal?.observe(note);
  const stopArrival=()=>{if(quiet()||doc.hidden){arrival?.cancel();arrival=null;if(flight)flight.style.transform='none';if(doc.hidden)finish(true);}};
  listen(doc,'portfolio:motionchange',stopArrival);listen(doc,'visibilitychange',stopArrival);
  const preference=win.matchMedia?.('(prefers-reduced-motion: reduce)');if(preference)listen(preference,'change',stopArrival);
  cleanups.push(()=>{finish(true);arrival?.cancel();reveal?.disconnect();});
 }
 const floating=win.IntersectionObserver?new win.IntersectionObserver(entries=>{
  entries.forEach(entry=>{entry.target.dataset.noteVisible=String(entry.isIntersecting);});
 },{threshold:0}):null;
 section.querySelectorAll('.intro-note-position').forEach(wrapper=>floating?.observe(wrapper));
 const syncFloating=()=>{section.dataset.noteFloatPaused=String(!!doc.hidden||!!quiet());};
 listen(doc,'visibilitychange',syncFloating);listen(doc,'portfolio:motionchange',syncFloating);
 const floatPreference=win.matchMedia?.('(prefers-reduced-motion: reduce)');if(floatPreference)listen(floatPreference,'change',syncFloating);
 syncFloating();
 const resize=()=>states.forEach(({state,place})=>{if(state.drag)return;if(state.x||state.y)place(state.x,state.y);});
 const observer=win.ResizeObserver?new win.ResizeObserver(resize):null;
 observer?.observe(section);section.querySelectorAll('.intro-sign').forEach(note=>observer?.observe(note));
 listen(win,'resize',resize);listen(win,'blur',()=>states.forEach(entry=>entry.cancel()));
 return ()=>{floating?.disconnect();observer?.disconnect();cleanups.reverse().forEach(cleanup=>cleanup());};
}

if(typeof document!=='undefined'&&typeof window!=='undefined')initIntroductionNotes();
