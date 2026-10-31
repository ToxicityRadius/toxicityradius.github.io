import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=(await readFile(new URL('../connected-home.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'');
const flush=()=>new Promise(resolve=>setImmediate(resolve));

function fixture({hash='',reduced=false,small=false,paused=false,clipboard}={}){
 let focused=null,scroll=420;
 const animations=[];
 const node=()=>({
  dataset:{},style:{},attrs:{},listeners:new Map(),isConnected:true,hidden:false,
  addEventListener(type,listener){const entries=this.listeners.get(type)||[];entries.push(listener);this.listeners.set(type,entries);},
  dispatchEvent(event){event.target??=this;for(const listener of this.listeners.get(event.type)||[])listener(event);},
  setAttribute(key,value){this.attrs[key]=value;},removeAttribute(key){delete this.attrs[key];},
  focus(){focused=this;},before(){},append(){},closest(selector){return selector==='[data-entrance-shortcut]'&&this.dataset.entranceShortcut!==undefined?this:null;},
  getClientRects(){return this.hidden?[]:[{}];},
  getBoundingClientRect:()=>({left:0,right:1440,top:0,bottom:900,width:1440,height:900}),
  animate(frames,options){
   let resolve,reject,promise,settled=false;
   const animation={frames,options,element:this,canceled:false,
    get finished(){return promise||(promise=new Promise((yes,no)=>{resolve=yes;reject=no;}));},
    cancel(){this.canceled=true;if(!settled){settled=true;reject?.(new Error('Animation canceled'));}},
    finish(){if(!settled){settled=true;resolve?.();}},
   };
   animations.push(animation);return animation;
  },
 });
 const shell=node(),stage=node(),world=node(),dialog=node(),panel=node(),close=node(),motion=node(),intro=node(),name=node(),home=node(),copy=node(),status=node(),shortcuts=[node(),node()];
 shortcuts[0].dataset.entranceShortcut='';shortcuts[0].href='#work';shortcuts[0].textContent='View work';
 shortcuts[1].dataset.entranceShortcut='';shortcuts[1].href='#contact';shortcuts[1].textContent='Contact';
 copy.dataset.email='hello@example.com';
 shell.dataset={motionPaused:String(paused),previewOpen:'false'};stage.dataset.entrance='arrived';home.offsetTop=0;
 const slugs=['student-advising-portal','formproof','claimcheck'];
 const projects=slugs.map(slug=>{
  const article=node(),heading=node();heading.id=`preview-${slug}`;article.dataset.preview=slug;article.heading=heading;article.querySelector=()=>heading;
  article.controls=[node(),node()];
  article.controls.forEach(control=>{control.getClientRects=()=>article.hidden?[]:[{}];});
  return article;
 });
 const links=slugs.map(slug=>{const link=node();link.dataset.projectOpen=slug;link.href=`/projects/${slug}/`;link.closest=selector=>selector==='[data-project-open]'?link:null;return link;});
 shell.querySelector=selector=>({'.stage':stage,'.project-preview':dialog,'#scene-motion':motion,'#intro-control':intro,'.experience-nav a[href="#home"]':name,'#home':home})[selector];
 shell.querySelectorAll=()=>[];stage.querySelector=()=>world;
 dialog.querySelector=selector=>selector==='.preview-panel'?panel:close;
 dialog.querySelectorAll=selector=>selector==='[data-preview]'?projects:[close,...projects.flatMap(project=>project.controls)];dialog.open=false;
 dialog.showModal=()=>{dialog.open=true;};dialog.close=()=>{dialog.open=false;};
 const created=[];
 const document=Object.assign(node(),{querySelector:selector=>({'.connected-home':shell,'#copy-email':copy,'#copy-status':status})[selector],querySelectorAll:selector=>selector==='[data-entrance-shortcut]'?shortcuts:[],createElement(){const element=node();created.push(element);return element;}});
 Object.defineProperty(document,'activeElement',{get:()=>focused});
 const window=node();window.scrollTo=({top})=>{scroll=top;};
 let location=new URL(`https://portfolio.example/${hash}`),position=0,backCalls=0,replaceCalls=0;
 const entries=[{url:location.href,state:null}];
 const history={
  get state(){return entries[position].state;},
  pushState(state,unused,url){entries.splice(position+1);entries.push({url:String(url),state});position++;location=new URL(String(url));},
  replaceState(state,unused,url){replaceCalls++;entries[position]={url:String(url),state};location=new URL(String(url));},
  back(){backCalls++;travel(-1);},forward(){travel(1);},
 };
 function travel(delta){
  if(position+delta<0||position+delta>=entries.length)return;
  position+=delta;location=new URL(entries[position].url);
  window.dispatchEvent({type:'popstate'});window.dispatchEvent({type:'hashchange'});
 }
 const preference={matches:reduced,addEventListener(){}};
 let finishCount=0;
 const context={document,window,history,URL,Map,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},MutationObserver:class{observe(){}},IntersectionObserver:class{observe(){}},matchMedia:query=>query.includes('reduce')?preference:{matches:small,addEventListener(){}},getComputedStyle:element=>{
  const active=animations.findLast(animation=>animation.element===element&&!animation.canceled&&animation.renderedTransform);
  return {opacity:element.style.opacity||'1',transform:active?.renderedTransform||element.style.transform||'none'};
 },finishEntrance(){finishCount++;},initAtmosphere(){},addEventListener:window.addEventListener.bind(window),navigator:{clipboard}};
 Object.defineProperties(context,{location:{get:()=>location},scrollY:{get:()=>scroll}});
 vm.runInNewContext(source,context);
 function click(target,options={}){
  const event={type:'click',target,currentTarget:target,button:0,detail:1,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...options};
  (target===close?close:document).dispatchEvent(event);return event;
 }
 return {dialog,projects,links,shortcuts,copy,status,close,name,history,animations,click,document,panel,camera:created[0],navigate(hash){location.hash=hash;window.dispatchEvent({type:'hashchange'});},get hash(){return location.hash;},get search(){return location.search;},get focused(){return focused;},get scroll(){return scroll;},get backCalls(){return backCalls;},get replaceCalls(){return replaceCalls;},get finishCount(){return finishCount;},async finish(){animations.forEach(animation=>animation.finish());await flush();}};
}

test('entrance shortcuts finish the entrance once and keep their native anchor action',()=>{
 const app=fixture(),event=app.click(app.shortcuts[0]);
 assert.equal(app.finishCount,1);assert.equal(event.defaultPrevented,false);
 assert.equal(app.shortcuts[0].href,'#work');assert.equal(app.shortcuts[0].textContent,'View work');
 for(const options of [{ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},{button:1},{defaultPrevented:true}]){
  const next=fixture(),click=next.click(next.shortcuts[1],options);
  assert.equal(next.finishCount,0);assert.equal(click.defaultPrevented,Boolean(options.defaultPrevented));
  assert.equal(next.shortcuts[1].href,'#contact');
 }
});

test('normal project selection focuses its heading and closing restores the opener and scroll',async()=>{
 const app=fixture();
 assert.equal(app.click(app.links[1]).defaultPrevented,true);
 assert.equal(app.dialog.open,true);assert.equal(app.hash,'#project-formproof');
 assert.equal(app.focused,app.projects[1].heading);
 assert.equal(app.projects[0].hidden,true);assert.equal(app.projects[1].hidden,false);
 assert.equal(app.dialog.attrs['aria-labelledby'],'preview-formproof');
 app.click(app.close);await app.finish();
 assert.equal(app.dialog.open,false);assert.equal(app.focused,app.links[1]);assert.equal(app.scroll,420);
});

test('Forward cancels a pending pointer close instead of leaving a closed project hash',async()=>{
 const app=fixture();app.click(app.links[0]);
 app.click(app.close);assert.equal(app.dialog.open,true,'close fade is still pending');
 app.history.forward();await flush();
 assert.equal(app.dialog.open,true);assert.equal(app.hash,'#project-student-advising-portal');
 assert.equal(app.focused,app.projects[0].heading);
 app.click(app.close);await app.finish();
 assert.equal(app.dialog.open,false);assert.equal(app.hash,'');
 assert.equal(app.backCalls,2);assert.equal(app.replaceCalls,0);
});

test('external Back and hash navigation dismiss immediately without exit animations',()=>{
 for(const hashChange of [false,true]){
  const app=fixture();app.click(app.links[0]);const count=app.animations.length;
  if(hashChange)app.navigate('#work');else app.history.back();
  assert.equal(app.dialog.open,false);assert.equal(app.animations.length,count);
  assert.equal(app.focused,app.links[0]);assert.equal(app.scroll,420);
 }
});

test('Forward-restored previews retain history ownership; direct preview URLs close in place',async()=>{
 const app=fixture();app.click(app.links[2]);app.history.back();await app.finish();
 app.history.forward();assert.equal(app.dialog.open,true);
 app.click(app.close);await app.finish();
 assert.equal(app.backCalls,2);assert.equal(app.replaceCalls,0);assert.equal(app.hash,'');
 app.history.forward();assert.equal(app.dialog.open,true,'the preview history entry is preserved');
 const direct=fixture({hash:'#project-claimcheck'});
 assert.equal(direct.dialog.open,true);direct.click(direct.close);await direct.finish();
 assert.equal(direct.backCalls,0);assert.equal(direct.replaceCalls,1);assert.equal(direct.hash,'');
 assert.equal(direct.focused,direct.name);
});

test('modified clicks and unsupported dialogs preserve native case-study routes',()=>{
 for(const options of [{ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},{button:1},{defaultPrevented:true}]){
  const app=fixture(),event=app.click(app.links[0],options);
  assert.equal(app.dialog.open,false);assert.equal(event.defaultPrevented,Boolean(options.defaultPrevented));
  assert.equal(app.links[0].href,'/projects/student-advising-portal/');assert.equal(app.hash,'');
 }
 const app=fixture();app.dialog.showModal=undefined;
 assert.equal(app.click(app.links[0]).defaultPrevented,false);assert.equal(app.dialog.open,false);
});

test('keyboard, direct/history and paused previews open without animations',()=>{
 for(const options of [{detail:0},{paused:true,detail:1},{hash:'#project-formproof'}]){
  const app=fixture(options);if(!options.hash)app.click(app.links[1],{detail:options.detail});
  assert.equal(app.focused,app.projects[1].heading);assert.equal(app.animations.length,0);
 }
 const app=fixture();app.click(app.links[0]);app.click(app.close,{detail:0});
 const count=app.animations.length;app.history.forward();
 assert.equal(app.dialog.open,true);assert.equal(app.animations.length,count);
});

test('reduced pointer entry and exit use only 120ms opacity',async()=>{
 const app=fixture({reduced:true});app.click(app.links[1]);
 app.click(app.close);
 assert.equal(app.animations.length,2);
 for(const animation of app.animations){
  assert.equal(animation.options.duration,120);
  assert.ok(animation.frames.every(frame=>!('transform' in frame)));
 }
 await app.finish();assert.equal(app.dialog.open,false);
});

test('keyboard close and Escape close synchronously across popstate and hashchange',()=>{
 for(const escape of [false,true]){
  const app=fixture({hash:'?source=preview#work'});app.click(app.links[1]);
  const count=app.animations.length;
  if(escape)app.dialog.dispatchEvent({type:'cancel',preventDefault(){}});
  else app.click(app.close,{detail:0});
  assert.equal(app.dialog.open,false);assert.equal(app.animations.length,count);
  assert.equal(app.hash,'#work');assert.equal(app.search,'?source=preview');assert.equal(app.focused,app.links[1]);assert.equal(app.scroll,420);
 }
 const paused=fixture({paused:true});paused.click(paused.links[0]);paused.click(paused.close);
 assert.equal(paused.dialog.open,false);assert.equal(paused.animations.length,0);
 const interrupted=fixture();interrupted.click(interrupted.links[0]);interrupted.click(interrupted.close);
 assert.equal(interrupted.dialog.open,true,'pointer fade is pending');
 const count=interrupted.animations.length;
 interrupted.dialog.dispatchEvent({type:'cancel',preventDefault(){}});
 assert.equal(interrupted.dialog.open,false);assert.equal(interrupted.animations.length,count);
 assert.equal(interrupted.backCalls,1,'Escape does not consume another history entry');
});

test('reopening during camera travel starts from its rendered position before cancellation',()=>{
 for(const small of [false,true]){
  const app=fixture({small});app.click(app.links[0]);
  const camera=app.animations.find(animation=>animation.element===app.camera);
  camera.renderedTransform='matrix(1.1, 0, 0, 1.1, 23, -17)';
  app.click(app.links[1]);
  const next=app.animations.findLast(animation=>animation.element===app.camera);
  assert.equal(camera.canceled,true);
  assert.equal(next.frames[0].transform,camera.renderedTransform);
  assert.equal(next.options.duration,small?320:600);
  assert.match(next.frames[1].transform,small?/scale\(1\.12\)/:/scale\(1\.32\)/);
 }
});

test('Tab and Shift+Tab wrap within the visible preview controls',()=>{
 const app=fixture();
 const tab=(shiftKey=false)=>{
  const event={type:'keydown',key:'Tab',shiftKey,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;}};
  app.dialog.dispatchEvent(event);return event;
 };
 for(const index of [0,2]){
  app.click(app.links[index]);
  const [screenshot,caseStudy]=app.projects[index].controls;
  caseStudy.focus();assert.equal(tab().defaultPrevented,true);assert.equal(app.focused,app.close);
  assert.equal(tab(true).defaultPrevented,true);assert.equal(app.focused,caseStudy);
  screenshot.focus();assert.equal(tab().defaultPrevented,false);assert.equal(app.focused,screenshot,'interior Tab uses native navigation');
 }
});
