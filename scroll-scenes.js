export function initScrollScenes(doc=document,win=window){
 const shell=doc.querySelector('.connected-home');
 if(!shell||!win.gsap||!win.ScrollTrigger)return;
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)'),phone=win.matchMedia('(max-width:700px)');
 const effects=[],triggers=[];
 const clamp=v=>Math.max(0,Math.min(1,v));
 const stopped=()=>reduced.matches||shell.dataset.motionPaused==='true';
 win.gsap.registerPlugin(win.ScrollTrigger);
 function effect(trigger,targets,draw,{start='top 88%',end='top 38%'}={}){
  if(!trigger||!targets.length)return;
  const state={progress:0,held:false,render(value){
   this.progress=value;
   if(doc.hidden||shell.dataset.previewOpen==='true')return;
   targets.forEach((target,index)=>draw(target,stopped()||this.held?1:clamp(value*(1+targets.length*.06)-index*.06),index));
  }};
  effects.push(state);
  triggers.push(win.ScrollTrigger.create({trigger,start,end,onUpdate:self=>state.render(self.progress),onRefresh:self=>state.render(self.progress)}));
  trigger.addEventListener('focusin',()=>{state.held=true;state.render(1);});
  state.render(0);
 }
 const intro=doc.querySelector('.world-introduction'),copy=intro?.querySelector('.introduction-description');
 if(copy){
  const words=copy.textContent.split(/(\s+)/).map(part=>{
   if(/^\s+$/.test(part))return doc.createTextNode(part);
   const span=doc.createElement('span');span.textContent=part;span.className='scroll-word';return span;
  });
  copy.replaceChildren(...words);
  effect(copy,[...copy.querySelectorAll('.scroll-word')],(el,p)=>{
   el.style.opacity=String(.72+.28*p);
  },{start:'top 85%',end:'bottom 52%'});
 }
 effect(intro,[...doc.querySelectorAll('.introduction-notes p')],(el,p,i)=>{
  const settle=el.dataset.noteMoved==='true'?1:1-(1-p)**3;
  el.style.translate=`${(1-settle)*(i?20:-20)}px ${(1-settle)*28}px`;
  el.style.rotate=`${(i?1:-1)*(1.3+(1-settle)*5)}deg`;el.style.opacity=String(.7+.3*settle);
  const icon=el.querySelector('.sign-icon');if(icon)icon.style.transform=`rotate(${(1-settle)*(i?-12:18)}deg) scale(${.92+.08*settle})`;
 },{start:'top 90%',end:'top 42%'});
 const work=doc.querySelector('.project-box-stage');
 effect(work,work?[work]:[],(el,p)=>{el.style.translate=`0 ${(1-p)*(phone.matches?16:50)}px`;});
 const toolbox=doc.querySelector('.engineering-tool-chest');
 effect(toolbox,[...doc.querySelectorAll('.engineering-drawer')],(el,p,i)=>{el.style.translate=`${(1-p)*(i%2?32:-32)}px 0`;el.style.opacity=String(.6+.4*p);});
 const wall=doc.querySelector('.photo-wall');
 effect(wall,[...doc.querySelectorAll('.photo-wall figure')],(el,p,i)=>{el.style.translate=`${(1-p)*(i%2?18:-18)}px ${(1-p)*36}px`;el.style.opacity=String(.65+.35*p);},{start:'top 88%',end:'top 28%'});
 const desk=doc.querySelector('.engineering-desk');
 effect(desk,[...doc.querySelectorAll('.engineering-desk>figure,.engineering-desk-notebook,.engineering-pinned-notes')],(el,p,i)=>{el.style.translate=`0 ${(1-p)*(i===1?36:20)}px`;});
 const contact=doc.querySelector('.contact-desk');
 effect(contact,contact?[...contact.children]:[],(el,p)=>{el.style.translate=`0 ${(1-p)*16}px`;el.style.opacity=String(.7+.3*p);});
 for(const heading of doc.querySelectorAll('.world-section-heading h2,.engineering-space-heading h2,.world-services h2,.world-contact h2')){
  const marks=[...heading.querySelectorAll('.marker')];
  effect(heading,marks,(el,p)=>{el.classList.add('scroll-mark');el.style.setProperty('--mark-progress',String(p));});
 }
 const refresh=()=>effects.forEach(state=>state.render(state.progress));
 reduced.addEventListener('change',refresh);phone.addEventListener('change',refresh);
 doc.addEventListener('portfolio:motionchange',refresh);doc.addEventListener('visibilitychange',refresh);
 const observer=new win.MutationObserver(refresh);observer.observe(shell,{attributes:true,attributeFilter:['data-preview-open']});
 doc.fonts?.ready.then(()=>win.ScrollTrigger.refresh());
 return ()=>{triggers.forEach(trigger=>trigger.kill());observer.disconnect();effects.forEach(state=>{state.held=true;state.render(1);});
  reduced.removeEventListener('change',refresh);phone.removeEventListener('change',refresh);doc.removeEventListener('portfolio:motionchange',refresh);doc.removeEventListener('visibilitychange',refresh);
 };
}
if(typeof document!=='undefined'&&typeof window!=='undefined')initScrollScenes();
