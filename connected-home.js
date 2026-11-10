import {finishEntrance} from './world/animatic/controller.js';
import {initAtmosphere} from './world/experience/atmosphere.js';

const OUT='cubic-bezier(.23,1,.32,1)',TRAVEL='cubic-bezier(.77,0,.175,1)';
const shell=document.querySelector('.connected-home');
document.addEventListener('portfolio:themeprepare',()=>finishEntrance());
const stage=shell.querySelector('.stage'),world=stage.querySelector('.world');
const camera=document.createElement('div'),depth=document.createElement('div');
camera.className='approach-camera';depth.className='pointer-depth';world.before(camera);camera.append(depth);depth.append(world);
const dialog=shell.querySelector('.project-preview'),panel=dialog.querySelector('.preview-panel');
const projects=[...dialog.querySelectorAll('[data-preview]')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),small=matchMedia('(max-width:900px)');
const motion=shell.querySelector('#scene-motion');
const introControl=shell.querySelector('#intro-control');
let selected=null,opener=null,returnScroll=0,returnHash='',revision=0,pushed=false,closing=false,pointerCloseRequested=false;
let animations=[];
const changeMotion=()=>document.dispatchEvent(new CustomEvent('portfolio:motionchange',{detail:{paused:shell.dataset.motionPaused==='true'}}));
const cancelAnimations=()=>{animations.forEach(animation=>animation.cancel());animations=[];};
const animate=(element,frames,options)=>{const animation=element.animate(frames,{...options,fill:'both'});animations.push(animation);return animation;};
const instant=keyboard=>keyboard||reduced.matches||shell.dataset.motionPaused==='true';
const setScene=()=>{shell.dataset.scene=dialog.open?'project':stage.dataset.entrance==='arrived'?'valley':'entrance';};
new MutationObserver(setScene).observe(stage,{attributes:true,attributeFilter:['data-entrance']});
initAtmosphere(document,window);
const points={'student-advising-portal':[420,350],formproof:[940,545],claimcheck:[1450,400]};

function cameraFocus(slug){
 const rect=stage.getBoundingClientRect(),worldRect=world.getBoundingClientRect(),panelRect=panel.getBoundingClientRect();
 const [x,y]=points[slug],cover=Math.max(rect.width/1672,rect.height/941),ratio=worldRect.width/rect.width;
 const pointX=worldRect.left-rect.left+(rect.width/2+(x-836)*cover)*ratio;
 const pointY=worldRect.top-rect.top+(rect.height/2+(y-470.5)*cover)*ratio;
 const scale=small.matches?1.12:1.32;
 const targetX=small.matches?rect.width/2:panel.dataset.side==='right'?(panelRect.left-rect.left)/2:(panelRect.right-rect.left+rect.width)/2;
 const targetY=small.matches?Math.max(70,(panelRect.top-rect.top)/2):rect.height/2;
 const limitX=rect.width*(scale-1)/2,limitY=rect.height*(scale-1)/2;
 const dx=Math.max(-limitX,Math.min(limitX,targetX-rect.width/2-(pointX-rect.width/2)*scale));
 const dy=Math.max(-limitY,Math.min(limitY,targetY-rect.height/2-(pointY-rect.height/2)*scale));
 return `translate(${dx}px,${dy}px) scale(${scale})`;
}

function showProject(slug,{trigger=null,keyboard=false,direct=false,record=true}={}){
 const article=projects.find(project=>project.dataset.preview===slug);
 if(!article)return;
 const wasOpen=dialog.open;
 if(!wasOpen){opener=trigger;returnScroll=scrollY;returnHash=location.hash.startsWith('#project-')?'':location.hash;}
 const cameraFrom=getComputedStyle(camera).transform;
 revision++;closing=false;cancelAnimations();finishEntrance();
 selected=slug;
 projects.forEach(project=>{project.hidden=project!==article;});
 dialog.setAttribute('aria-labelledby',article.querySelector('h2').id);
 panel.dataset.side=slug==='student-advising-portal'?'right':'left';panel.scrollTop=0;
 if(!wasOpen){
  window.scrollTo({top:shell.querySelector('#home').offsetTop,behavior:'instant'});
  dialog.showModal();
 }
 shell.dataset.previewOpen='true';setScene();changeMotion();
 if(record){
  const url=new URL(location.href);url.hash=`project-${slug}`;
  if(!wasOpen){history.pushState({...history.state,portfolioPreview:true},'',url);pushed=true;}
  else history.replaceState({...history.state,portfolioPreview:true},'',url);
 }
 else pushed=history.state?.portfolioPreview===true;
 article.querySelector('h2').focus({preventScroll:true});
 const immediate=keyboard||direct||shell.dataset.motionPaused==='true';
 const still=instant(keyboard)||direct;
 const from=small.matches?'translateY(24px)':panel.dataset.side==='right'?'translateX(24px)':'translateX(-24px)';
 if(!immediate)animate(panel,still?[{opacity:0},{opacity:1}]:[{opacity:0,transform:from},{opacity:1,transform:'none'}],{duration:still?120:small.matches?240:200,easing:OUT});
 if(!still)animate(camera,[{transform:cameraFrom},{transform:cameraFocus(slug)}],{duration:small.matches?320:600,easing:TRAVEL});
 else camera.style.transform='none';
}

async function hideProject({keyboard=false,immediate=false}={}){
 if(!dialog.open)return;
 const id=++revision;closing=true;
 const panelOpacity=getComputedStyle(panel).opacity,cameraFrom=getComputedStyle(camera).transform;
 cancelAnimations();
 const still=instant(keyboard);
 if(!immediate&&!keyboard&&shell.dataset.motionPaused!=='true'){
  const panelExit=animate(panel,[{opacity:panelOpacity},{opacity:0}],{duration:120,easing:OUT});
  if(!still)animate(camera,[{transform:cameraFrom},{transform:'translate(0px,0px) scale(1)'}],{duration:small.matches?320:600,easing:TRAVEL});
  await panelExit.finished.catch(()=>{});
 }
 if(id!==revision)return;
 dialog.close();selected=null;closing=false;shell.dataset.previewOpen='false';setScene();changeMotion();
 panel.style.opacity='1';
 window.scrollTo({top:returnScroll,behavior:'instant'});
 if(opener?.isConnected)opener.focus({preventScroll:true});
 else shell.querySelector('.experience-nav a[href="#home"]').focus({preventScroll:true});
 if(immediate||still){cancelAnimations();camera.style.transform='none';}
}

function requestClose(keyboard=false){
 if(!dialog.open)return;
 if(closing){if(keyboard)hideProject({keyboard:true});return;}
 closeFromKeyboard=keyboard;
 if(keyboard)hideProject({keyboard:true});
 if(pushed&&history.state?.portfolioPreview){pointerCloseRequested=!keyboard;pushed=false;history.back();}
 else {const url=new URL(location.href);url.hash=returnHash;history.replaceState(history.state,'',url);hideProject({keyboard});}
}

document.addEventListener('click',event=>{
 const shortcut=event.target.closest('[data-entrance-shortcut]');
 if(shortcut&&!event.defaultPrevented&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey)finishEntrance();
 const trigger=event.target.closest('[data-project-open]');
 if(!trigger||event.defaultPrevented||event.button>0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||typeof dialog.showModal!=='function')return;
 event.preventDefault();showProject(trigger.dataset.projectOpen,{trigger,keyboard:event.detail===0});
});
dialog.querySelector('.preview-close').addEventListener('click',event=>requestClose(event.detail===0));
dialog.addEventListener('cancel',event=>{event.preventDefault();requestClose(true);});
dialog.addEventListener('click',event=>{if(event.target===dialog)requestClose();});
dialog.addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const controls=[...dialog.querySelectorAll('button,a[href]')].filter(control=>control.getClientRects().length);
 const first=controls[0],last=controls.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
let closeFromKeyboard=false;
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeFromKeyboard=true;});
function syncLocation(){
 const slug=location.hash.startsWith('#project-')?location.hash.slice(9):null;
 if(projects.some(project=>project.dataset.preview===slug)){if(selected!==slug||!dialog.open||closing)showProject(slug,{record:false,direct:true});}
 else {if(!closing)hideProject({keyboard:closeFromKeyboard,immediate:!pointerCloseRequested});closeFromKeyboard=false;}
 pointerCloseRequested=false;
}
addEventListener('popstate',syncLocation);addEventListener('hashchange',syncLocation);
motion.addEventListener('click',()=>{
 const paused=shell.dataset.motionPaused!=='true';shell.dataset.motionPaused=String(paused);
 motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Resume scene motion':'Pause scene motion';
 introControl.setAttribute('aria-disabled',String(paused));
 if(paused){finishEntrance();cancelAnimations();camera.style.transform='none';}
 changeMotion();
});
introControl.addEventListener('click',event=>{if(shell.dataset.motionPaused==='true'){event.stopImmediatePropagation();finishEntrance();}},true);
const preferenceChanged=()=>{cancelAnimations();camera.style.transform='none';panel.style.opacity='1';motion.hidden=reduced.matches;changeMotion();};
reduced.addEventListener('change',preferenceChanged);
small.addEventListener('change',preferenceChanged);
addEventListener('resize',()=>{if(dialog.open){cancelAnimations();camera.style.transform='none';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimations();camera.style.transform='none';}});

const nav=[...shell.querySelectorAll('.experience-nav a[href^="#"]')];
const visible=new Map();
const navigation=new IntersectionObserver(entries=>{
 entries.forEach(entry=>visible.set(entry.target.id,entry.isIntersecting));
 const active=nav.filter(link=>visible.get(link.hash.slice(1))).at(-1);
 if(active)nav.forEach(link=>{if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
},{rootMargin:'-15% 0px -45% 0px'});
nav.forEach(link=>{const section=document.querySelector(link.hash);if(section)navigation.observe(section);});
motion.hidden=reduced.matches;setScene();syncLocation();
