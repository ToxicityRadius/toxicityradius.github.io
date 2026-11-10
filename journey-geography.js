import {stops,projectPoint,routePath,routeAt,clamp,openRoadPath} from './journey-state.js';

// The map is one local image and a small route overlay: no WebGL, workers or live tiles.
export async function createGeography(container,{onReady,onFailure}){
 const doc=container.ownerDocument,win=doc.defaultView;
 const world=doc.createElement('div');world.className='journey-map-world';
 const image=doc.createElement('img');image.className='journey-street-map';image.alt='';image.width=1800;image.height=1400;image.draggable=false;
 const source=night=>`/images/journey/story-map${night?'-night':''}.svg`;
 image.src=source(doc.documentElement.dataset.theme==='night');
 const ns='http://www.w3.org/2000/svg',svg=doc.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1800 1400');svg.setAttribute('aria-hidden','true');
 const line=(className,d)=>{const el=doc.createElementNS(ns,'path');el.setAttribute('class',className);el.setAttribute('d',d);svg.append(el);return el;};
 const casing=line('journey-route-casing',routePath(4)+openRoadPath),ahead=line('journey-route-ahead',routePath(4)+openRoadPath);
 const ribbon=line('journey-route-ribbon',routePath(0)),traveled=line('journey-route-traveled',routePath(0));
 const labels=['First questions','Learning together','Taking the lead','Building with people','What comes next'];
 const pins=stops.map((stop,index)=>{
  const [x,y]=projectPoint(stop.center),pin=doc.createElementNS(ns,'g');pin.setAttribute('class','journey-route-pin');pin.setAttribute('transform',`translate(${x} ${y})`);
  const halo=doc.createElementNS(ns,'circle');halo.setAttribute('class','journey-stop-halo');halo.setAttribute('r','27');
  const circle=doc.createElementNS(ns,'circle');circle.setAttribute('class','journey-stop-core');circle.setAttribute('r','18');
  const number=doc.createElementNS(ns,'text');number.textContent=String(index+1);number.setAttribute('text-anchor','middle');number.setAttribute('dy','.35em');
  const label=doc.createElementNS(ns,'g');label.setAttribute('class','journey-stop-label');
  const left=index===0||index===2,labelX=left?-188:28;
  const chip=doc.createElementNS(ns,'rect');chip.setAttribute('x',String(labelX));chip.setAttribute('y','-15');chip.setAttribute('width','160');chip.setAttribute('height','30');chip.setAttribute('rx','8');
  const text=doc.createElementNS(ns,'text');text.setAttribute('x',String(labelX+10));text.setAttribute('dy','.35em');text.textContent=labels[index];
  label.append(chip,text);pin.dataset.chapter=String(index);pin.append(halo,circle,number,label);svg.append(pin);return pin;
 });
 const cursor=doc.createElementNS(ns,'g');cursor.setAttribute('class','journey-route-cursor');
 const plane=doc.createElementNS(ns,'g');plane.setAttribute('class','journey-paper-plane');
 const shape=(className,d)=>{const path=doc.createElementNS(ns,'path');path.setAttribute('class',className);path.setAttribute('d',d);plane.append(path);};
 shape('journey-plane-shadow','M-1 3L-37 -11L-28 3L-37 17Z');
 shape('journey-plane-body','M0 0L-36 -14L-27 0L-36 14Z');
 shape('journey-plane-fold','M0 0L-27 0L-36 14Z');
 shape('journey-plane-crease','M-27 0L0 0');
 cursor.append(plane);svg.append(cursor);
 world.append(image,svg);container.replaceChildren(world);
 try{await image.decode();}catch{world.remove();onFailure();return;}
 let disposed=false,highlighted=-1,camera=null,mobile=false,currentScale=1,routeValue=stops[0].at,targetProgress=routeValue,animation=0;
 let currentPoint=stops[0].center,currentAngle=0,quiet=false;
 function positionCursor(){cursor.setAttribute('transform',`translate(${currentPoint.join(' ')}) scale(${.75/currentScale}) rotate(${currentAngle})`);}
 function drawProgress(value){
  routeValue=value;const state=routeAt(value);currentPoint=state.point;
  const turn=(state.angle-currentAngle+540)%360-180,bank=quiet?0:clamp(turn*2,-10,10);
  plane.style.transition=quiet?'none':'transform 160ms cubic-bezier(.23,1,.32,1)';
  plane.style.transform=`skewX(${bank}deg) scaleY(${1-Math.abs(bank)/70})`;
  currentAngle=state.angle;
  pins.forEach((pin,i)=>{
   const proximity=quiet?0:Math.max(0,1-Math.abs(value-stops[i].at)/.045);
   pin.children[0].style.opacity=String(proximity*.28);
   pin.setAttribute('transform',`translate(${stops[i].center.join(' ')}) scale(${(.75+.12*proximity)/currentScale})`);
  });
  ahead.style.strokeDashoffset=`${-value*80/currentScale}px`;
  ribbon.setAttribute('d',state.path);
  traveled.setAttribute('d',state.path);positionCursor();
  cursor.style.visibility=value<=stops[0].at||value>=stops[4].at||stops.some(stop=>Math.abs(stop.at-value)<.0001)?'hidden':'visible';
 }
 function setProgress(value,{animate=false,still=false}={}){
  quiet=still;
  targetProgress=clamp(value);win?.cancelAnimationFrame(animation);animation=0;
  if(disposed)return;
  if(!animate||!win||Math.abs(targetProgress-routeValue)<.000001){drawProgress(targetProgress);return;}
  const from=routeValue,to=targetProgress;let start=null;
  function tick(time){
   if(disposed)return;start??=time;
   const t=clamp((time-start)/420);drawProgress(from+(to-from)*(1-(1-t)**3));
   animation=t<1?win.requestAnimationFrame(tick):0;
  }
  animation=win.requestAnimationFrame(tick);
 }
 image.addEventListener('error',()=>{if(!disposed)onFailure();});
 function move(next,{animate=false,mobile:phone=false}={}){
  if(disposed)return;camera=next;mobile=phone;
  const box=container.getBoundingClientRect(),baseScale=Math.min(phone?1.4:1.8,Math.pow(2,next.zoom-11.8)*Math.min(box.width/1800,box.height/1400));
  const card=container.closest?.('#journey')?.querySelector('.journey-story');
  const top=phone?145:175,bottom=phone?Math.max(270,(card?.getBoundingClientRect().top??box.height*.48)-(box.top||0)-20):box.height-190;
  const fit=Math.min((phone?box.width-44:box.width*.57)/1800,Math.max(100,bottom-top)/1400),reveal=next.overview||0;
  const intro=next.intro||0;world.dataset.preview=String(intro>.12);svg.dataset.overview=String(intro>.8||reveal>.95);
  const entryFit=Math.min(Math.min(phone?box.width-40:580,box.width*.9)/1800,Math.min(phone?350:420,box.height*.45)/1400);
  const travelScale=baseScale+(fit-baseScale)*reveal,scale=travelScale+(entryFit-travelScale)*intro;currentScale=scale;positionCursor();
  const [x,y]=projectPoint(next.center),baseX=phone?box.width/2:box.width*.31,cx=baseX+(box.width/2-baseX)*intro,baseY=phone?Math.min(250,box.height*.28):box.height*.45,travelY=baseY+((top+bottom)/2-baseY)*reveal,cy=travelY+(box.height*.54-travelY)*intro;
  pins.forEach((pin,i)=>pin.setAttribute('transform',`translate(${stops[i].center.join(' ')}) scale(${.75/scale})`));
  [casing,ahead,traveled].forEach((path,i)=>{path.style.strokeWidth=`${(i===0?8:4)/scale}px`;});
  ahead.style.strokeDasharray=`${2/scale} ${8/scale}`;
  ribbon.style.strokeWidth=`${12/scale}px`;
  world.style.transition=animate?'transform 420ms cubic-bezier(.16,1,.3,1)':'none';
  world.style.transform=`translate(${cx-x*scale}px,${cy-y*scale}px) scale(${scale})`;
 }
 onReady({
  highlight(index){if(index===highlighted)return;highlighted=index;pins.forEach((pin,i)=>pin.dataset.active=String(i===index));},
  move,
  progress:setProgress,
  settle(){setProgress(targetProgress,{still:true});},
  theme(night){image.src=source(night);},
  resize(){if(camera)move(camera,{mobile});},
  dispose(){disposed=true;win?.cancelAnimationFrame(animation);world.remove();},
 });
 return ()=>{disposed=true;win?.cancelAnimationFrame(animation);world.remove();};
}
