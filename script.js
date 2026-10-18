(() => {
 const root=document.documentElement, toggle=document.querySelector('.theme-toggle');
 const sync=()=>{const night=root.dataset.theme==='night';toggle?.setAttribute('aria-pressed',String(night));toggle?.setAttribute('aria-label',`Switch to ${night?'day':'night'} mode`);if(toggle)toggle.querySelector('span').textContent=night?'Night':'Day';};
 sync();
 toggle?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='night'?'day':'night';try{localStorage.setItem('dexter-theme',root.dataset.theme);}catch{}sync();});
 const filters=document.querySelectorAll('[data-filter]');
 filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));let visible=0;document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='All'&&item.dataset.category!==button.dataset.filter;if(!item.hidden)visible++;});document.querySelector('#project-count').textContent=`${visible} project${visible===1?'':'s'}`;}));
 if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
 gsap.registerPlugin(ScrollTrigger);
 const media=gsap.matchMedia();
 media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
  const scene=document.querySelector('.town-scene');
  if(scene)gsap.to('.town-image',{y:35,ease:'none',scrollTrigger:{trigger:scene,start:'top bottom',end:'bottom top',scrub:.6}});
  // Content stays visible; decorative movement never gates reading or navigation.
  document.querySelectorAll('.project-art').forEach(art=>gsap.fromTo(art,{y:24},{y:0,ease:'none',scrollTrigger:{trigger:art,start:'top 90%',end:'top 45%',scrub:.5}}));
 });
})();
