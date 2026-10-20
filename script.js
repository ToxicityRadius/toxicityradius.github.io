(() => {
 const root=document.documentElement, toggle=document.querySelector('.theme-toggle');
 const sync=()=>{const night=root.dataset.theme==='night';toggle?.setAttribute('aria-pressed',String(night));toggle?.setAttribute('aria-label',`Switch to ${night?'day':'night'} mode`);if(toggle)toggle.querySelector('span').textContent=night?'Night':'Day';};
 sync();
 toggle?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='night'?'day':'night';try{localStorage.setItem('dexter-theme',root.dataset.theme);}catch{}sync();});
 const filters=document.querySelectorAll('[data-filter]');
 filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));let visible=0;document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='All'&&item.dataset.category!==button.dataset.filter;if(!item.hidden)visible++;});document.querySelector('#project-count').textContent=`${visible} project${visible===1?'':'s'}`;}));
 const scene=document.querySelector('.town-scene'),motionToggle=document.querySelector('.town-motion-toggle');
 if(scene&&motionToggle&&window.matchMedia&&window.IntersectionObserver&&window.Image){
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let ready=false,userPaused=false,intersecting=false;
  const syncMotion=()=>{
   scene.dataset.ready=String(ready);
   scene.dataset.paused=String(userPaused);
   scene.dataset.running=String(ready&&!userPaused&&!preference.matches&&!document.hidden&&intersecting);
   motionToggle.hidden=!ready||preference.matches;
   motionToggle.textContent=`${userPaused?'Resume':'Pause'} town animation`;
   motionToggle.setAttribute('aria-label',motionToggle.textContent);
  };
  if(preference.addEventListener){
   const observer=new window.IntersectionObserver(entries=>{
    intersecting=entries.some(entry=>entry.isIntersecting);syncMotion();
   });
   observer.observe(scene);
   preference.addEventListener('change',syncMotion);
   document.addEventListener('visibilitychange',syncMotion);
   motionToggle.addEventListener('click',()=>{userPaused=!userPaused;syncMotion();});
   syncMotion();
   // Preload SVG image sources as well as HTML images before starting the shared CSS clock.
   const sources=[...scene.querySelectorAll('image, img')].map(image=>image.getAttribute('href')||image.getAttribute('src')).filter(Boolean);
   Promise.all(sources.map(source=>new Promise((resolve,reject)=>{
    const image=new window.Image();image.onload=resolve;image.onerror=reject;image.src=source;
   }))).then(()=>{ready=true;syncMotion();},()=>{observer.disconnect();syncMotion();});
  }
 }
 if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
 gsap.registerPlugin(ScrollTrigger);
 const media=gsap.matchMedia();
 media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
  // Content stays visible; decorative movement never gates reading or navigation.
  document.querySelectorAll('.project-art').forEach(art=>gsap.fromTo(art,{y:24},{y:0,ease:'none',scrollTrigger:{trigger:art,start:'top 90%',end:'top 45%',scrub:.5}}));
 });
})();
