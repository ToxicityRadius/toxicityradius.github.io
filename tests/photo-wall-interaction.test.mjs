import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../photo-wall.js',import.meta.url),'utf8');
function setup({missing=false,supported=true,overflow='auto',nestedFigure=true,reduced=false,paused=false,animate=true}={}){
 const node=()=>({listeners:{},addEventListener(type,callback){this.listeners[type]=callback;},focus(options){this.focuses=(this.focuses||0)+1;this.focusOptions=options;}});
 const close=node(),image={attributes:{},setAttribute(name,value){this.attributes[name]=value;},removeAttribute(name){delete this.attributes[name];}},caption={};
 const thumbnail={alt:'At the campus event',getAttribute:name=>({width:'1600',height:'1200'})[name]??null};
 const sourceCaption={textContent:'  Campus event, 2026  '};
 const figure={querySelector:()=>sourceCaption};
 const link={...node(),href:'https://example.test/full.jpg',isConnected:true,
  querySelector:selector=>selector==='img'?thumbnail:nestedFigure?sourceCaption:null,closest:()=>nestedFigure?null:figure};
 const animations=[];
 if(animate)image.animate=(frames,options)=>{const entry={frames,options,canceled:0,cancel(){this.canceled++;}};animations.push(entry);return entry;};
 const target={closest:()=>link};
 const panel={getBoundingClientRect:()=>({left:100,right:700,top:100,bottom:600})};
 const dialog={...node(),open:false,shows:0,closes:0,
  querySelector:selector=>({'.photo-lightbox-close':close,'.photo-lightbox-image':image,'.photo-lightbox-caption':caption,'.photo-lightbox-panel':panel})[selector],
  close(){this.open=false;this.closes++;this.listeners.close?.();}};
 if(supported)dialog.showModal=function(){this.open=true;this.shows++;};
 const wall={...node(),contains:value=>value===link};
 const body={style:{overflow}};
 const document={body,querySelector:selector=>missing?null:({'.photo-wall':wall,'.photo-lightbox':dialog,'.connected-home[data-motion-paused="true"]':paused?{}:null})[selector]};
 const history={pushState(){assert.fail('lightbox must preserve history');},replaceState(){assert.fail('lightbox must preserve history');}};
 vm.runInNewContext(source,{document,history,matchMedia:()=>({matches:reduced})});
 function emit(element,type,options={}){
  const event={target,button:0,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...options};
  element.listeners[type]?.(event);return event;
 }
 return {wall,dialog,close,image,caption,link,thumbnail,body,animations,emit,open:()=>emit(wall,'click')};
}

test('missing markup and unsupported dialog leave native links untouched',()=>{
 for(const options of [{missing:true},{supported:false}]){
  const state=setup(options);
  assert.equal(state.open().defaultPrevented,false);
  assert.deepEqual(Object.keys(state.wall.listeners),[]);
 }
});

test('modified, secondary and already handled clicks retain native navigation',()=>{
 const state=setup();
 for(const options of [{ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},{button:1},{defaultPrevented:true}]){
  state.emit(state.wall,'click',options);
  assert.equal(state.dialog.shows,0);
 }
});

test('opening uses full image, source description and caption, locks scrolling and focuses close',()=>{
 const state=setup();
 assert.equal(state.open().defaultPrevented,true);
 assert.equal(state.dialog.open,true);
 assert.equal(state.image.src,state.link.href);
 assert.equal(state.image.alt,state.thumbnail.alt);
 assert.deepEqual(state.image.attributes,{width:'1600',height:'1200'});
 assert.equal(state.caption.textContent,'Campus event, 2026');
 assert.equal(state.body.style.overflow,'hidden');
 assert.equal(state.close.focuses,1);
 assert.equal(state.close.focusOptions.preventScroll,true);
});

test('close and Escape restore original inline overflow and focus without scrolling',()=>{
 for(const type of ['click','cancel']){
  const state=setup({overflow:'clip'});state.open();
  const event=state.emit(type==='click'?state.close:state.dialog,type);
  assert.equal(state.dialog.open,false);
  assert.equal(state.dialog.closes,1);
  assert.equal(state.body.style.overflow,'clip');
  assert.equal(state.link.focuses,1);
  assert.equal(state.link.focusOptions.preventScroll,true);
  if(type==='cancel')assert.equal(event.defaultPrevented,true);
  state.emit(state.dialog,'close');
  assert.equal(state.link.focuses,1,'native close event must not restore twice');
 }
});

test('backdrop dismisses only when a click targets the dialog outside its panel',()=>{
 const state=setup();state.open();
 state.emit(state.dialog,'click',{target:state.dialog,clientX:300,clientY:300});
 assert.equal(state.dialog.open,true,'panel whitespace stays open');
 state.emit(state.dialog,'click',{target:state.image,clientX:20,clientY:20});
 assert.equal(state.dialog.open,true,'child clicks stay open');
 state.emit(state.dialog,'click',{target:state.dialog,clientX:20,clientY:300});
 assert.equal(state.dialog.open,false);
 assert.equal(state.link.focuses,1);
 assert.equal(state.body.style.overflow,'auto');
});

test('Tab and Shift-Tab stay on the only interactive lightbox control',()=>{
 const state=setup();state.open();
 for(const shiftKey of [false,true]){
  assert.equal(state.emit(state.dialog,'keydown',{key:'Tab',shiftKey}).defaultPrevented,true);
 }
 assert.equal(state.close.focuses,3);
 assert.equal(state.emit(state.dialog,'keydown',{key:'ArrowRight'}).defaultPrevented,false);
});

test('native close restores state, disconnected openers are safe and repeated opens recapture overflow',()=>{
 const state=setup({overflow:''});state.open();
 state.link.isConnected=false;state.dialog.close();
 assert.equal(state.body.style.overflow,'');
 assert.equal(state.link.focuses,undefined);
 state.body.style.overflow='scroll';state.link.isConnected=true;state.open();
 state.emit(state.close,'click');
 assert.equal(state.body.style.overflow,'scroll');
 assert.equal(state.link.focuses,1);
});

test('caption supports both a figure inside its link and a wrapping figure',()=>{
 for(const nestedFigure of [true,false]){
  const state=setup({nestedFigure});state.open();
  assert.equal(state.caption.textContent,'Campus event, 2026');
 }
});

test('pointer entry is brief and canceled on reopening or immediate dismissal',()=>{
 const state=setup();state.emit(state.wall,'click',{detail:1});
 const first=state.animations[0];
 assert.equal(first.frames[0].opacity,0);
 assert.equal(first.frames[0].transform,'scale(.97)');
 assert.equal(first.frames[1].opacity,1);
 assert.equal(first.frames[1].transform,'scale(1)');
 assert.equal(first.options.duration,180);
 assert.equal(first.options.easing,'cubic-bezier(.23,1,.32,1)');
 state.emit(state.wall,'click',{detail:1});
 assert.equal(first.canceled,1);
 state.emit(state.close,'click');
 assert.equal(state.dialog.open,false);
 assert.equal(state.animations[1].canceled,1);
});

test('keyboard, reduced motion, shared pause and absent WAAPI keep instant native opening',()=>{
 for(const options of [{detail:0},{detail:1,reduced:true},{detail:1,paused:true},{detail:1,animate:false}]){
  const state=setup(options);state.emit(state.wall,'click',{detail:options.detail});
  assert.equal(state.animations.length,0);
  assert.equal(state.dialog.open,true);
  assert.equal(state.close.focuses,1);
 }
});
