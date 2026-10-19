(() => {
 const section=document.querySelector('#journey');
 if(!section||!window.matchMedia)return;
 const route=section.querySelector('.journey-drawn'), traveler=section.querySelector('.journey-traveler');
 if(!route?.getTotalLength||!route.getPointAtLength)return;
 const chapters=[...section.querySelectorAll('.journey-chapter')];
 const choices=[...section.querySelectorAll('[data-journey-choice]')];
 const waypoints=[...section.querySelectorAll('[data-waypoint]')];
 const scene=document.querySelector('.town-scene');
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)'),desktop=window.matchMedia('(min-width: 901px)');
 const distances=[0,220/856,416/856,636/856,1],length=route.getTotalLength();
 let trigger=null,requested=0;
 route.style.strokeDasharray=String(length);
 const render=(progress,direct=false)=>{
  requested=Math.max(0,Math.min(1,Number.isFinite(progress)?progress:0));
  if(scene?.dataset.paused==='true'&&!direct&&!preference.matches)return;
  route.style.strokeDashoffset=String(preference.matches?0:length*(1-requested));
  const point=route.getPointAtLength(length*requested);
  traveler?.setAttribute('transform',`translate(${point.x} ${point.y})`);
  let active=0;
  distances.forEach((distance,index)=>{if(requested>=distance-.015)active=index;});
  choices.forEach((choice,index)=>{if(index===active)choice.setAttribute('aria-current','step');else choice.removeAttribute('aria-current');});
  waypoints.forEach((waypoint,index)=>waypoint.classList.toggle('is-active',index===active));
 };
 const configure=()=>{
  trigger?.kill();trigger=null;
  section.setAttribute('data-journey-enhanced','');
  if(desktop.matches&&!preference.matches&&window.gsap&&window.ScrollTrigger){
   window.gsap.registerPlugin(window.ScrollTrigger);
   trigger=window.ScrollTrigger.create({trigger:chapters[0],endTrigger:chapters.at(-1),start:'top center',end:'top center',onUpdate:self=>render(self.progress)});
   render(trigger.progress||0);
  }else render(requested,true);
 };
 choices.forEach((choice,index)=>choice.addEventListener('click',()=>render(distances[index],true)));
 preference.addEventListener('change',configure);
 desktop.addEventListener('change',configure);
 if(scene&&window.MutationObserver)new MutationObserver(()=>{if(scene.dataset.paused!=='true')render(requested);}).observe(scene,{attributes:true,attributeFilter:['data-paused']});
 configure();
})();
