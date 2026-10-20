import {frameAt,clamp,DURATION_MS,SESSION_KEY} from './motion.js';
import {createCloudRenderer} from './cloud-renderer.js';

const world=document.querySelector('.world'),foreground=document.querySelector('.foreground');
const intro=document.querySelector('.intro'),destinations=document.querySelector('.destinations'),cue=document.querySelector('.cue');
const slider=document.querySelector('#position'),phase=document.querySelector('#phase'),play=document.querySelector('#play');
const control=document.querySelector('#intro-control'),stage=document.querySelector('.stage');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),phone=matchMedia('(max-width:700px)');
const cloudRenderer=createCloudRenderer(document.querySelector('.cloud-canvas'),[...document.querySelectorAll('.cloud-sprite')]);
const debug=new URLSearchParams(location.search).get('debug')==='1';
let assetsReady=false,assetFailed=!cloudRenderer.available,imagesDecoded=false;
let progress=0,playing=false,request=0,last=null,seen=false;
try{seen=sessionStorage.getItem(SESSION_KEY)==='1';}catch{}
const staticView=()=>reduced.matches||phone.matches||assetFailed;
let allowAutoplay=!seen&&!staticView();
document.querySelector('footer').hidden=!debug;

function remember(){seen=true;try{sessionStorage.setItem(SESSION_KEY,'1');}catch{}}
function controls(){
 const disabled=!assetsReady||staticView();
 control.disabled=disabled;control.hidden=assetsReady&&staticView();
 control.textContent=!assetsReady?'Preparing entrance…':progress<1?'Skip intro':'Replay intro';
 play.disabled=slider.disabled=disabled;
 play.textContent=playing?'Pause':progress>=1?'Replay sequence':progress>0?'Resume sequence':'Play sequence';
}
function render(value){
 progress=clamp(value);
 const frame=frameAt(progress),still=staticView(),reachable=still||progress===1;
 if(stage.dataset)stage.dataset.entrance=!assetsReady?'loading':reachable?'arrived':'intro';
 world.style.transform=still?'none':`translate(${frame.x}%,${frame.y}%) scale(${frame.scale})`;
 foreground.style.transform=still?'none':`translate(${frame.foregroundX}%,${frame.foregroundY}%) scale(${frame.foregroundScale})`;
 cloudRenderer.draw(progress,frame,imagesDecoded&&!still);
 intro.style.opacity=still?'1':String(frame.intro);
 destinations.style.opacity=still?'1':String(frame.destinations);
 destinations.style.visibility=reachable||frame.destinations>0?'visible':'hidden';
 destinations.style.pointerEvents=reachable?'auto':'none';destinations.inert=!reachable;
 cue.style.opacity=!still&&progress===1?'1':'0';
 slider.value=String(Math.round(progress*100));
 phase.value=assetFailed?'Artwork unavailable — static overview':still?'Static overview':frame.phase;
 controls();
}
function pause(){playing=false;cancelAnimationFrame(request);last=null;controls();}
function finish(){pause();render(1);}
export function finishEntrance(){allowAutoplay=false;finish();}
function tick(time){
 if(!playing||document.hidden)return;
 if(last!==null)progress=clamp(progress+(time-last)/DURATION_MS);
 last=time;render(progress);
 if(progress===1)pause();else request=requestAnimationFrame(tick);
}
function begin(replay=false){
 if(!assetsReady||staticView())return;
 cancelAnimationFrame(request);
 if(replay||progress===1)progress=0;
 playing=true;last=null;remember();render(progress);
 if(!document.hidden)request=requestAnimationFrame(tick);
}
control.addEventListener('click',()=>{if(progress<1)finish();else begin(true);});
play.addEventListener('click',()=>{if(playing)pause();else begin();});
slider.addEventListener('input',()=>{if(!assetsReady||staticView())return;pause();render(Number(slider.value)/100);});
function interrupt(){allowAutoplay=false;if(assetsReady&&progress<1)finish();}
addEventListener('wheel',interrupt,{passive:true});
addEventListener('touchmove',interrupt,{passive:true});
addEventListener('scroll',interrupt,{passive:true});
addEventListener('keydown',event=>{
 if(event.target.closest('input,textarea,select,button,a,[contenteditable="true"]'))return;
 if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))interrupt();
});
addEventListener('resize',()=>{if(imagesDecoded)cloudRenderer.resize();render(progress);});
document.addEventListener('visibilitychange',()=>{
 cancelAnimationFrame(request);last=null;
 if(!document.hidden&&playing)request=requestAnimationFrame(tick);
});
function preference(){allowAutoplay=false;if(imagesDecoded)cloudRenderer.resize();finish();}
reduced.addEventListener('change',preference);phone.addEventListener('change',preference);
render(seen||staticView()?1:0);

// Decode and paint the complete opening before starting its clock.
async function prepareAssets(){
 try{await Promise.all([...document.querySelectorAll('.stage img')].map(image=>image.decode()));}
 catch{assetFailed=true;}
 imagesDecoded=!assetFailed;
 if(imagesDecoded)cloudRenderer.resize();
 render(allowAutoplay&&!staticView()?0:1);
 stage.classList.remove('is-loading');
 await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 assetsReady=true;
 if(allowAutoplay&&!staticView())begin();else finish();
}
prepareAssets();
