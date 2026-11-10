import * as THREE from './vendor/three.module.js';

const host=document.querySelector('#scene');
const status=document.querySelector('#scene-status');
const buttons=[...document.querySelectorAll('[data-view]')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const destinations=[
 {name:'Student Advising Portal',href:'/projects/student-advising-portal/',point:new THREE.Vector3(2.4,3.3,-8)},
 {name:'FormProof',href:'/projects/formproof/',point:new THREE.Vector3(2.4,3.7,-1)},
 {name:'ClaimCheck',href:'/projects/claimcheck/',point:new THREE.Vector3(2.4,3.4,6)}
];
let renderer,scene,camera,frame=0,animation=0;

const colors={ground:0xe4e0d6,stone:0xd3d0c6,roof:0x777c75,glass:0x82999a,wood:0x856c52,water:0x8baeb8,path:0xc1bba9,edge:0x59635d};
function material(color,roughness=.9){return new THREE.MeshStandardMaterial({color,roughness,metalness:0})}
function box(parent,name,size,position,mat){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);mesh.name=name;mesh.position.set(...position);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function studio(scene,{name,z,width,depth,height,kind}){
 const group=new THREE.Group();group.name=name;group.position.set(2.4,0,z);scene.add(group);
 const shell=material(colors.stone),roof=material(colors.roof),glass=material(colors.glass,.28),wood=material(colors.wood);
 box(group,'raised plinth',[width+.35,.35,depth+.35],[0,.18,0],material(colors.path));
 box(group,'main volume',[width,height,depth],[0,.35+height/2,0],shell);
 box(group,'floating roof',[width+.8,.28,depth+.7],[0,.35+height+.14,0],roof);
 if(kind==='connected'){
  box(group,'connecting wing',[width*.42,height*.62,depth*.55],[-width*.3,.35+height*.31,-depth*.29],shell);
  box(group,'connector glazing',[.08,height*.38,depth*.4],[width*.08,.35+height*.38,-depth*.29],glass);
 }else if(kind==='precise'){
  box(group,'recessed entry',[.16,height*.66,depth*.32],[-width/2-.015,.35+height*.33,0],wood);
  box(group,'entry canopy',[width*.45,.16,depth*.5],[-width/2-.4,.35+height*.68,0],roof);
 }else{
  box(group,'offset wall plane',[.22,height*.8,depth*.5],[-width*.34,.35+height*.4,-depth*.27],roof);
  box(group,'interior screen',[.10,height*.62,depth*.44],[-width*.2,.35+height*.31,-depth*.27],glass);
 }
 box(group,'facade glazing',[.07,height*.46,depth*.42],[-width/2-.03,.35+height*.48,depth*.23],glass);
 box(group,'door',[.09,height*.62,depth*.20],[-width/2-.04,.35+height*.31,-depth*.22],wood);
 return group;
}
function build(){
 scene=new THREE.Scene();scene.background=new THREE.Color(0xcad6d5);scene.fog=new THREE.Fog(0xcad6d5,28,65);
 camera=new THREE.PerspectiveCamera(46,1,.1,120);
 scene.add(new THREE.HemisphereLight(0xffffff,0x77776d,2.1));
 const sun=new THREE.DirectionalLight(0xfff1d7,3.3);sun.position.set(-6,14,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20;scene.add(sun);
 const root=new THREE.Group();root.name='Riverline site';scene.add(root);
 const ground=material(colors.ground);box(root,'site ground',[24,.5,30],[0,-.28,-1],ground);
 box(root,'river',[8,.12,30],[-6.5,.02,-1],material(colors.water,.25));
 box(root,'waterfront edge',[.26,.28,30],[-2.45,.14,-1],material(colors.edge));
 box(root,'continuous promenade',[2.35,.16,25],[-1.05,.16,-1],material(colors.path));
 box(root,'central landing terrace',[7,.22,6],[.15,.19,-1],material(colors.path));
 studio(root,{name:'Student Advising Portal',z:-8,width:4.5,depth:3.8,height:2.3,kind:'connected'});
 studio(root,{name:'FormProof',z:-1,width:3.4,depth:3.4,height:2.7,kind:'precise'});
 studio(root,{name:'ClaimCheck',z:6,width:4,depth:3.7,height:2.4,kind:'comparison'});
 for(let z=-12;z<=11;z+=3){
  box(root,'path marker',[.06,.025,.9],[-1.05,.25,z],material(0x8c897f));
 }
 const presets={
  overview:{position:[-26,19,10],target:[0,0,-1]},
  approach:{position:[-20,10,4],target:[2,.8,-1]},
  landing:{position:[-16,6,0],target:[2,1.1,-1]}
 };
 return presets;
}
function render(){
 renderer.render(scene,camera);
 const bounds=host.getBoundingClientRect();
 for(const destination of destinations){
  if(!destination.element)continue;
  const position=destination.point.clone().project(camera);
  const visible=position.z>-1&&position.z<1&&Math.abs(position.x)<.92&&Math.abs(position.y)<.9;
  destination.element.style.visibility=visible?'visible':'hidden';
  if(visible){destination.element.style.left=((position.x*.5+.5)*bounds.width)+'px';destination.element.style.top=((-position.y*.5+.5)*bounds.height)+'px'}
 }
}
function ease(t){return 1-Math.pow(1-t,4)}
function moveTo(view,duration=900){
 const preset=presets[view];if(!preset)return;
 cancelAnimationFrame(animation);const startPos=camera.position.clone(),startTarget=camera.userData.target.clone();
 const endPos=new THREE.Vector3(...preset.position),endTarget=new THREE.Vector3(...preset.target);
 const start=performance.now();
 buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));
 function tick(now){const t=Math.min(1,(now-start)/duration),e=ease(t);camera.position.lerpVectors(startPos,endPos,e);const target=startTarget.clone().lerp(endTarget,e);camera.lookAt(target);camera.userData.target=target;render();if(t<1)animation=requestAnimationFrame(tick)}
 if(reduced.matches||duration===0){camera.position.copy(endPos);camera.lookAt(endTarget);camera.userData.target=endTarget;render();return}
 animation=requestAnimationFrame(tick);
}
function resize(){
 if(!renderer)return;const rect=host.getBoundingClientRect();if(!rect.width||!rect.height)return;
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(rect.width,rect.height,false);
 camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();render();
}
function animateEntrance(){
 const start={position:new THREE.Vector3(...presets.overview.position),target:new THREE.Vector3(...presets.overview.target)};
 const end={position:new THREE.Vector3(...presets.landing.position),target:new THREE.Vector3(...presets.landing.target)};
 const route=new THREE.CatmullRomCurve3([start.position,new THREE.Vector3(-23,14,7),new THREE.Vector3(-20,10,3),new THREE.Vector3(-18,7,1),end.position]);
 let t0,duration=6000;
 const skip=document.querySelector('#skip-entrance');
 let active=true;
 function finish(){if(!active)return;active=false;cancelAnimationFrame(frame);moveTo('landing',0);skip.textContent='Go to Landing';skip.disabled=false;reduced.removeEventListener('change',onMotion);buttons.forEach(b=>b.disabled=false)}
 function onMotion(){if(reduced.matches)finish()}
 function tick(now){
  if(!active)return;t0??=now;const raw=Math.min(1,Math.max(0,(now-t0)/duration));
  const progress=ease(raw);camera.position.copy(route.getPoint(progress));const target=start.target.clone().lerp(end.target,progress);camera.lookAt(target);camera.userData.target=target;render();
  if(raw<1)frame=requestAnimationFrame(tick);else finish();
 }
 skip.textContent='Skip entrance';skip.disabled=false;
 skip.addEventListener('click',()=>active?finish():moveTo('landing',0));reduced.addEventListener('change',onMotion);
 buttons.forEach(b=>b.disabled=true);
 if(reduced.matches){finish();return}
 frame=requestAnimationFrame(tick);
}
let presets;
try{
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 host.append(renderer.domElement);presets=build();camera.position.set(...presets.overview.position);camera.userData.target=new THREE.Vector3(...presets.overview.target);camera.lookAt(camera.userData.target);resize();
 for(const destination of destinations){destination.element=document.createElement('a');destination.element.className='scene-label';destination.element.href=destination.href;destination.element.textContent=destination.name;host.append(destination.element)}
 render();
 status?.remove();
 new ResizeObserver(resize).observe(host);addEventListener('resize',resize,{passive:true});
 buttons.forEach(button=>button.addEventListener('click',()=>moveTo(button.dataset.view)));
 if(innerWidth>700&&!reduced.matches&&!location.hash)animateEntrance();
 else if(reduced.matches)moveTo('landing',0);
}catch(error){
 console.error('Riverline preview could not start',error);
 if(renderer){renderer.dispose();renderer.domElement.remove()}
 if(status)status.textContent='The 3D preview is unavailable here. Use the project links below.';
 buttons.forEach(button=>button.disabled=true);
 document.querySelector('#skip-entrance').disabled=true;
}
