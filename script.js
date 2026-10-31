(() => {
 const root=document.documentElement, toggle=document.querySelector('.theme-toggle');
 const sync=()=>{const night=root.dataset.theme==='night';toggle?.setAttribute('aria-pressed',String(night));toggle?.setAttribute('aria-label',`Switch to ${night?'day':'night'} mode`);if(toggle)toggle.querySelector('span').textContent=night?'Night':'Day';};
 sync();
 const applyTheme=theme=>{root.dataset.theme=theme;try{localStorage.setItem('dexter-theme',theme);}catch{}sync();};
 if(toggle)import('./theme-transition.js').then(({createThemeReveal})=>{
  toggle.addEventListener('click',createThemeReveal({button:toggle,applyTheme}));
 }).catch(()=>toggle.addEventListener('click',()=>applyTheme(root.dataset.theme==='night'?'day':'night')));
 const copy=document.querySelector('#copy-email'),status=document.querySelector('#copy-status');
 copy?.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(copy.dataset.email);status.textContent='Email copied. Say hello when you’re ready.';}
  catch{status.textContent=`Copy unavailable. Select the email address above, or email ${copy.dataset.email}.`;}
 });
 const filters=document.querySelectorAll('[data-filter]');
 if(filters.length){
  const categories={'Data science':'data-science','Web apps':'web-apps','Websites':'websites'};
  const applyFilter=()=>{
   const value=new URL(window.location.href).searchParams.get('category');
   const selected=Object.keys(categories).find(label=>categories[label]===value)||'All';
   filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selected)));
   let visible=0;
   document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=selected!=='All'&&item.dataset.category!==selected;if(!item.hidden)visible++;});
   const count=document.querySelector('#project-count');
   if(count)count.textContent=`${visible} project${visible===1?'':'s'}`;
  };
  filters.forEach(button=>button.addEventListener('click',()=>{
   if(button.getAttribute('aria-pressed')==='true')return;
   const url=new URL(window.location.href);
   const value=categories[button.dataset.filter];
   if(value)url.searchParams.set('category',value);else url.searchParams.delete('category');
   if(url.href!==window.location.href)window.history.pushState(window.history.state,'',url);
   applyFilter();
  }));
  window.addEventListener('popstate',applyFilter);
  applyFilter();
  document.querySelector('.filters').hidden=false;
 }
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
