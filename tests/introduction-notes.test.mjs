import test from 'node:test';
import assert from 'node:assert/strict';
import {initIntroductionNotes} from '../introduction-notes.js';

function fixture({motion=false,reduced=false,frames=false}={}){
 const node=()=>({listeners:{},style:{},dataset:{},addEventListener(type,fn){const previous=this.listeners[type];this.listeners[type]=previous?event=>{previous(event);fn(event);}:fn;},removeEventListener(type){delete this.listeners[type];}});
 const area={left:100,top:100,right:900,bottom:700};
 const wrapper={...node(),classList:{add(){},remove(){}},setPointerCapture(id){this.capture=id;},hasPointerCapture(id){return this.capture===id;},releasePointerCapture(){this.capture=null;}};
 const flight=node();
 const handle={...node(),contains:target=>target===handle,focus(){}};
 const note={...node(),querySelector:()=>null,getBoundingClientRect(){const [x,y]=(wrapper.style.transform?.match(/-?[\d.]+(?=px)/g)||[0,0]).map(Number);return {left:600+x,right:800+x,top:200+y,bottom:400+y};}};
 wrapper.querySelector=selector=>selector==='.intro-sign'?note:selector==='.note-flight'?flight:handle;
 const section={...node(),getBoundingClientRect:()=>area,querySelectorAll:selector=>selector==='.intro-note-position'?[wrapper]:[note]};
 const observers=[],animations=[],preference={...node(),matches:reduced};
 if(motion)note.animate=(frames,options)=>{const animation={frames,options,cancelled:false,cancel(){this.cancelled=true;}};animations.push(animation);return animation;};
 const win=node(),doc={...node(),querySelector:()=>section};
 if(motion){win.matchMedia=()=>preference;win.IntersectionObserver=class{constructor(callback){this.callback=callback;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}};}
 const pending=new Map();let frameId=0;
 if(frames){win.requestAnimationFrame=fn=>{pending.set(++frameId,fn);return frameId;};win.cancelAnimationFrame=id=>pending.delete(id);}
 const tick=time=>{const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn(time));};
 const dispose=initIntroductionNotes(doc,win);
 const emit=(target,type,options={})=>target.listeners[type]?.({button:0,isPrimary:true,pointerType:'mouse',pointerId:1,clientX:650,clientY:250,target:handle,preventDefault(){},...options});
 return {wrapper,handle,note,flight,section,win,doc,area,dispose,emit,observers,animations,preference,pending,tick};
}

test('notes remain inside the section at extreme pointer positions',()=>{
 const f=fixture();f.emit(f.wrapper,'pointerdown');f.emit(f.wrapper,'pointermove',{clientX:9999,clientY:-9999});
 const rect=f.note.getBoundingClientRect();assert.equal(rect.right,868);assert.equal(rect.top,132);
 f.emit(f.wrapper,'pointerup');assert.equal(f.wrapper.capture,null);f.dispose();
});
test('pointer cancellation restores the previous position and releases capture',()=>{
 const f=fixture();f.emit(f.wrapper,'pointerdown');f.emit(f.wrapper,'pointermove',{clientX:700});f.emit(f.wrapper,'pointercancel');
 assert.equal(f.note.getBoundingClientRect().left,600);assert.equal(f.wrapper.capture,null);f.dispose();
});
test('keyboard movement supports faster steps and Home reset',()=>{
 const f=fixture();f.emit(f.handle,'keydown',{key:'ArrowLeft',shiftKey:true});assert.equal(f.note.getBoundingClientRect().left,570);
 f.emit(f.handle,'keydown',{key:'ArrowDown'});assert.equal(f.note.getBoundingClientRect().top,210);
 f.emit(f.handle,'keydown',{key:'Home'});assert.equal(f.note.getBoundingClientRect().left,600);assert.equal(f.note.getBoundingClientRect().top,200);f.dispose();
});
test('touch scrolling on note text does not start a drag; the grip does',()=>{
 const f=fixture();f.emit(f.wrapper,'pointerdown',{pointerType:'touch',target:f.note});assert.equal(f.wrapper.capture,undefined);
 f.emit(f.wrapper,'pointerdown',{pointerType:'touch'});assert.equal(f.wrapper.capture,1);f.dispose();assert.equal(f.wrapper.capture,null);
});
test('resize reclamps moved notes and switching apps cancels an active drag',()=>{
 const f=fixture();f.emit(f.handle,'keydown',{key:'ArrowRight',shiftKey:true});f.area.right=810;f.win.listeners.resize();assert.equal(f.note.getBoundingClientRect().right,798);
 f.emit(f.wrapper,'pointerdown');f.emit(f.wrapper,'pointermove',{clientX:400});f.win.listeners.blur();assert.equal(f.note.getBoundingClientRect().right,798);f.dispose();
});

test('shared hint disappears only after a note moves and stays dismissed after reset',()=>{
 const f=fixture();f.emit(f.wrapper,'pointerdown');assert.equal(f.section.dataset.notesMoved,undefined);
 f.emit(f.wrapper,'pointermove',{clientX:670});assert.equal(f.section.dataset.notesMoved,'true');
 f.emit(f.wrapper,'pointerup');f.emit(f.handle,'keydown',{key:'Home'});assert.equal(f.section.dataset.notesMoved,'true');f.dispose();
});

test('arrival waits for visibility, stops observing and cancels on reduced-motion change',()=>{
 const f=fixture({motion:true});f.observers[0].callback([{isIntersecting:false}]);assert.equal(f.animations.length,0);
 f.observers[0].callback([{isIntersecting:true}]);assert.equal(f.animations.length,1);assert.equal(f.observers[0].disconnected,true);
 f.preference.matches=true;f.preference.listeners.change();assert.equal(f.animations[0].cancelled,true);f.dispose();
 const quiet=fixture({motion:true,reduced:true});quiet.observers[0].callback([{isIntersecting:true}]);assert.equal(quiet.animations.length,0);quiet.dispose();
});

test('floating visibility and reduced-motion flags pause offscreen and quiet notes',()=>{
 const f=fixture({motion:true});const floating=f.observers.at(-1);
 floating.callback([{target:f.wrapper,isIntersecting:true}]);assert.equal(f.wrapper.dataset.noteVisible,'true');
 floating.callback([{target:f.wrapper,isIntersecting:false}]);assert.equal(f.wrapper.dataset.noteVisible,'false');
 f.doc.hidden=true;f.doc.listeners.visibilitychange();assert.equal(f.section.dataset.noteFloatPaused,'true');
 f.doc.hidden=false;f.doc.listeners.visibilitychange();assert.equal(f.section.dataset.noteFloatPaused,'false');
 f.preference.matches=true;f.preference.listeners.change();assert.equal(f.section.dataset.noteFloatPaused,'true');f.dispose();assert.equal(floating.disconnected,true);
});

test('airborne drag banks with movement, stays bounded and lands on release',()=>{
 const f=fixture();f.emit(f.wrapper,'pointerdown');f.emit(f.wrapper,'pointermove',{clientX:750,clientY:210,timeStamp:16});
 const bank=Number(f.flight.style.transform.match(/rotateZ\(([^)]+)deg/)[1]);assert.ok(bank>0&&bank<=8);const scale=Number(f.flight.style.transform.match(/scale\(([^)]+)\)/)[1]);assert.ok(scale>1&&scale<=1.035);
 f.emit(f.wrapper,'pointerup');assert.equal(f.flight.style.transform,'none');f.dispose();
 const quiet=fixture({motion:true,reduced:true});quiet.emit(quiet.wrapper,'pointerdown');quiet.emit(quiet.wrapper,'pointermove',{clientX:700});assert.equal(quiet.flight.style.transform,undefined);quiet.dispose();
});

test('drag frames coalesce pointer samples, relax the bank and stop without an idle ticker',()=>{
 const f=fixture({frames:true});f.emit(f.wrapper,'pointerdown');
 f.emit(f.wrapper,'pointermove',{clientX:670});f.emit(f.wrapper,'pointermove',{clientX:690});assert.equal(f.pending.size,1);
 f.tick(16);assert.equal(f.note.getBoundingClientRect().left,640);
 const bank=()=>Number(f.flight.style.transform.match(/rotateZ\(([^)]+)deg/)[1]);const first=bank();f.tick(32);assert.ok(bank()<first);
 for(let time=48;time<1500&&f.pending.size;time+=16)f.tick(time);assert.equal(f.pending.size,0);
 f.emit(f.wrapper,'pointermove',{clientX:710});assert.equal(f.pending.size,1);f.emit(f.wrapper,'pointerup');assert.equal(f.pending.size,0);assert.equal(f.note.getBoundingClientRect().left,660);assert.equal(f.flight.style.transform,'none');f.dispose();
});
