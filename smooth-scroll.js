export function initSmoothScroll({doc=document,win=window,load=()=>import('./vendor/lenis.mjs')}={}){
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)'),desktop=win.matchMedia('(min-width:860px) and (pointer:fine)');
 let lenis=null,frame=0,lastFrame=0,elapsed=0,revision=0,disposed=false,failed=false;
 const enabled=()=>!disposed&&!failed&&!reduced.matches&&desktop.matches&&!doc.hidden&&doc.querySelector('.experience-shell')?.dataset.motionPaused!=='true'&&!doc.querySelector('dialog[open]');
 function wake(){if(!frame&&lenis)frame=win.requestAnimationFrame(tick);}
 function tick(time){
  frame=0;if(!lenis)return;
  // Advance only active time, so a wheel event after idling cannot jump to its target.
  elapsed+=lastFrame?Math.min(64,time-lastFrame):16;lastFrame=time;
  lenis.raf(elapsed);
  if(lenis.isScrolling==='smooth')wake();
  else{win.cancelAnimationFrame(frame);frame=0;lastFrame=0;}
 }
 function destroy(){win.cancelAnimationFrame(frame);frame=0;lastFrame=0;elapsed=0;lenis?.destroy();lenis=null;doc.documentElement.dataset.smoothScroll='native';}
 async function configure(){
  const current=++revision;destroy();if(!enabled())return;
  try{
   const {default:Lenis}=await load();if(current!==revision||!enabled())return;
   lenis=new Lenis({lerp:.09,smoothWheel:true,wheelMultiplier:.9,syncTouch:false,autoRaf:false,anchors:false,respectReducedMotion:true,prevent:node=>node.matches?.('dialog,[data-lenis-prevent],textarea,[contenteditable="true"]')});
   lenis.on('virtual-scroll',wake);
   lenis.on('scroll',()=>{win.ScrollTrigger?.update();wake();});
   doc.documentElement.dataset.smoothScroll='active';
  }catch{failed=true;destroy();}
 }
 // Let existing anchors, keyboard navigation and instant chapter jumps own their destinations.
 const interrupt=event=>{if(event.type==='click'?event.target.closest?.('a,button'):['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))lenis?.reset();};
 const dialogs=new win.MutationObserver(records=>{if(records.some(record=>record.target.tagName==='DIALOG'))configure();});
 dialogs.observe(doc.body,{subtree:true,attributes:true,attributeFilter:['open']});
 doc.addEventListener('click',interrupt,true);doc.addEventListener('keydown',interrupt,true);
 doc.addEventListener('visibilitychange',configure);doc.addEventListener('portfolio:motionchange',configure);
 reduced.addEventListener('change',configure);desktop.addEventListener('change',configure);
 configure();
 return ()=>{disposed=true;revision++;destroy();dialogs.disconnect();
  doc.removeEventListener('click',interrupt,true);doc.removeEventListener('keydown',interrupt,true);
  doc.removeEventListener('visibilitychange',configure);doc.removeEventListener('portfolio:motionchange',configure);
  reduced.removeEventListener('change',configure);desktop.removeEventListener('change',configure);
 };
}
if(typeof document!=='undefined'&&typeof window!=='undefined')initSmoothScroll();
