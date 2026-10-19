const NS='http://www.w3.org/2000/svg';

export function atmosphereActive({scene,entrance,paused,hidden,reduced,visible}){
 return scene==='valley'&&entrance==='arrived'&&!paused&&!hidden&&!reduced&&visible;
}

export function pointerOffset(x,y,rect){
 const clamp=value=>Math.max(-1,Math.min(1,value));
 return {x:rect.width?clamp((x-rect.left)/rect.width*2-1):0,y:rect.height?clamp((y-rect.top)/rect.height*2-1):0};
}

export function initAtmosphere(root=document,win=window){
 const shell=root.querySelector('.experience-shell'),stage=shell?.querySelector('.stage');
 const world=stage?.querySelector('.world'),depth=stage?.querySelector('.pointer-depth'),destinations=stage?.querySelector('.destinations');
 if(!shell||!stage||!world)return ()=>{};
 const doc=shell.ownerDocument,reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
 const pointer=win.matchMedia('(hover: hover) and (pointer: fine)');
 const overlay=doc.createElementNS(NS,'svg');
 overlay.classList.add('valley-atmosphere');overlay.setAttribute('viewBox','0 0 1672 941');
 overlay.setAttribute('preserveAspectRatio','xMidYMid slice');overlay.setAttribute('aria-hidden','true');
 const maskId=`river-${Math.random().toString(36).slice(2)}`;
 overlay.innerHTML=`<defs><clipPath id="${maskId}"><path d="M 1028 452 L 1085 463 L 1080 483 L 1160 515 L 1255 542 L 1355 561 L 1478 592 L 1580 623 L 1672 648 L 1672 673 L 1550 671 L 1460 653 L 1330 636 L 1260 613 L 1240 584 L 1145 552 L 1080 527 L 1045 496 Z M 850 763 L 960 751 L 1040 735 L 1110 768 L 1170 780 L 1200 811 L 1270 827 L 1340 848 L 1420 864 L 1510 877 L 1610 884 L 1672 891 L 1672 941 L 1400 941 L 1310 902 L 1190 874 L 1090 854 L 985 826 L 860 806 L 805 790 Z"/></clipPath></defs>
 <g clip-path="url(#${maskId})"><g class="river-reflections" fill="none" stroke="#fff4cf" stroke-linecap="round" stroke-width="3" opacity=".08"><path d="M 1055 478 q 20 -4 38 1 M 1125 528 q 28 -5 58 0 M 1250 577 q 36 -6 64 0 M 1390 612 q 26 -4 64 1 M 1525 649 q 36 -5 80 0 M 835 790 q 32 -4 68 1 M 995 789 q 38 -7 78 -1 M 1075 825 q 48 -6 92 0 M 1220 862 q 36 -5 80 -1 M 1360 901 q 40 -6 94 0 M 1550 916 q 34 -5 72 0"/></g></g>
 <g class="chimney-wisp" fill="#efe9d6" opacity="0"><path opacity=".55" d="M 943 467 C 936 458 949 451 942 442 C 933 431 943 424 950 416 C 947 428 956 434 951 444 C 944 453 952 459 950 467 Z"/><path opacity=".3" d="M 946 464 C 952 454 941 447 949 438 C 961 427 953 416 947 408 C 959 414 966 428 956 441 C 951 449 958 458 951 466 Z"/></g>`;
 const foreground=world.querySelector('.foreground');
 let foregroundDepth;
 if(foreground){foregroundDepth=doc.createElement('div');foregroundDepth.className='foreground-depth';foreground.before(foregroundDepth);foregroundDepth.append(foreground);}
 world.insertBefore(overlay,foregroundDepth||null);
 let visible=false,active=false;
 const reset=()=>{if(depth)depth.style.transform='translate(0px,0px)';if(destinations)destinations.style.transform='translate(0px,0px)';if(foregroundDepth)foregroundDepth.style.transform='translate(0px,0px)';};
 const update=()=>{
  active=atmosphereActive({scene:shell.dataset.scene,entrance:stage.dataset.entrance,paused:shell.dataset.motionPaused==='true',hidden:doc.hidden,reduced:reduced.matches,visible});
  overlay.dataset.running=String(active);
  if(!active||!pointer.matches)reset();
 };
 const move=event=>{
  if(!active||!pointer.matches||event.pointerType==='touch')return;
  const offset=pointerOffset(event.clientX,event.clientY,stage.getBoundingClientRect());
  if(depth)depth.style.transform=`translate(${offset.x*4}px,${offset.y*2}px)`;
  if(destinations)destinations.style.transform=`translate(${offset.x*4}px,${offset.y*2}px)`;
  // The foreground inherits the backdrop offset; add only the remaining half.
  if(foregroundDepth)foregroundDepth.style.transform=`translate(${offset.x*4}px,${offset.y*2}px)`;
 };
 const mutations=new win.MutationObserver(update);
 mutations.observe(shell,{attributes:true,attributeFilter:['data-scene','data-motion-paused']});
 mutations.observe(stage,{attributes:true,attributeFilter:['data-entrance']});
 const intersection=win.IntersectionObserver?new win.IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);update();}):null;
 if(intersection)intersection.observe(stage);else visible=true;
 stage.addEventListener('pointermove',move,{passive:true});stage.addEventListener('pointerleave',reset);
 doc.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);pointer.addEventListener('change',update);update();
 return ()=>{
  mutations.disconnect();intersection?.disconnect();
  stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerleave',reset);
  doc.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);pointer.removeEventListener('change',update);
  reset();overlay.remove();if(foregroundDepth){foregroundDepth.before(foreground);foregroundDepth.remove();}
 };
}
