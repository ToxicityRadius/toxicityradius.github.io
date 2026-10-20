(() => {
 const links=[...document.querySelectorAll('.experience-nav a[href^="#"]')];
 const sections=links.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
 if(window.IntersectionObserver&&sections.length){
  const visible=new Map();
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>visible.set(entry.target,entry.isIntersecting));
   const active=sections.filter(section=>visible.get(section)).at(-1);
   if(!active)return;
   links.forEach(link=>{
    const current=link.hash===`#${active.id}`;
    link.classList.toggle('is-current',current);
    if(current)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
   });
  },{rootMargin:'-15% 0px -45% 0px'});
  sections.forEach(section=>observer.observe(section));
 }

 const scene=document.querySelector('.town-scene');
 const art=scene?.querySelector('.town-art');
 const entrance=document.querySelector('.entrance');
 const copy=entrance?.querySelector('.entrance-copy');
 const toggle=document.querySelector('.town-motion-toggle');
 const camera=entrance?.querySelector('.entrance-camera')||scene;
 const veil=entrance?.querySelector('.entrance-veil');
 const story=entrance?.querySelector('.entrance-story');
 const cue=entrance?.querySelector('.entrance-scroll-cue');
 if(!scene||!art||!entrance||!copy||!window.gsap||!window.ScrollTrigger||!window.MutationObserver)return;
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
  let motion,trigger,focusTween,disposed=false,focused=false,restorePending=false;
  const landmarks=[...scene.querySelectorAll?.('.landmark')||[]];
  const pointerFine=window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  const focus=(index)=>{
   if(disposed||!motion||scene.dataset.paused==='true'||(trigger?.progress||0)>.04)return;
   focused=true;
   restorePending=false;
   const origins=['19% 57%','51% 54%','84% 61%'];
   focusTween=gsap.to(scene,{scale:1.32,transformOrigin:origins[index],duration:.6,ease:'power3.out',overwrite:true});
  };
  const restore=()=>{
   if(!focused)return;
   if(scene.dataset.paused==='true'){restorePending=true;return;}
   focused=false;
   restorePending=false;
   focusTween=gsap.to(scene,{scale:1,duration:.4,ease:'power3.out',overwrite:true});
  };
  const handlers=landmarks.map((landmark,index)=>{
   const enter=()=>focus(index);
   if(pointerFine)landmark.addEventListener('pointerenter',enter);
   return {landmark,enter};
  });
  if(pointerFine)entrance.addEventListener('pointerleave',restore);
  const toggleParent=toggle?.parentNode,toggleNext=toggle?.nextSibling;
  const applyProgress=self=>{
   if(!disposed&&scene.dataset.paused!=='true'){
    if(self.progress>.04)restore();
    motion?.progress(self.progress);
   }
  };
  const sync=()=>{
   if(disposed)return;
   if(scene.dataset.paused==='true')focusTween?.pause();
   else{
    focusTween?.resume();
    if(restorePending)restore();
   }
   if(!motion&&scene.dataset.ready==='true'&&art.dataset.layered==='true'){
    const layers=[['hills',0,1.056],['terrain',0,1.08],['buildings',0,1.08],['front',0,1.14]];
    if(!layers.some(([name])=>art.querySelector(`.town-depth-${name}`)))return;
    entrance.dataset.flight='ready';
    if(toggle)entrance.appendChild(toggle);
    motion=gsap.timeline({paused:true})
     .fromTo(camera,{scale:1,y:0},{scale:1.12,y:()=>-window.innerHeight*.05,transformOrigin:'52% 58%',ease:'none',duration:1},0)
     .fromTo(copy,{opacity:1,y:0},{opacity:0,y:()=>-window.innerHeight*.35,ease:'none',duration:.3},.02);
    layers.forEach(([name,y,scale])=>{
     const layer=art.querySelector(`.town-depth-${name}`);
     if(layer)motion.fromTo(layer,{y:0,scale:1},{y,scale,ease:p=>p*p*(3-2*p),transformOrigin:'52% 58%',duration:1},0);
    });
    if(cue)motion.fromTo(cue,{opacity:1,y:0},{opacity:0,y:-16,duration:.1,ease:'none'},0);
    if(veil)motion.fromTo(veil,{opacity:0},{opacity:.88,duration:.35,ease:'none'},.45);
    if(story)motion.fromTo(story,{opacity:0,y:60},{opacity:1,y:0,duration:.25,ease:'none'},.55);
    const storyLines=[...story?.querySelectorAll?.('p span')||[]];
    if(storyLines.length)motion.fromTo(storyLines,{opacity:0,y:24},{opacity:1,y:0,stagger:.07,duration:.16,ease:'none'},.55);
    trigger=ScrollTrigger.create({trigger:entrance,pin:true,refreshPriority:1,start:'top top',end:()=>`+=${Math.round(window.innerHeight*1.6)}`,
     invalidateOnRefresh:true,onUpdate:applyProgress});
    ScrollTrigger.refresh();
   }
   if(trigger)applyProgress(trigger);
  };
  const observer=new MutationObserver(sync);
  observer.observe(scene,{attributes:true,attributeFilter:['data-ready','data-paused']});
  observer.observe(art,{attributes:true,attributeFilter:['data-layered']});
  sync();
  return()=>{
   if(disposed)return;
   disposed=true;
   observer.disconnect();
   if(pointerFine){
    handlers.forEach(({landmark,enter})=>landmark.removeEventListener('pointerenter',enter));
    entrance.removeEventListener('pointerleave',restore);
   }
   if(pointerFine){gsap.killTweensOf(scene);gsap.set(scene,{clearProps:'transform,transformOrigin'});}
   trigger?.kill();trigger=null;
   motion?.revert();motion=null;
   delete entrance.dataset.flight;
   if(toggle&&toggleParent)toggleParent.insertBefore(toggle,toggleNext?.parentNode===toggleParent?toggleNext:null);
  };
 });
})();
