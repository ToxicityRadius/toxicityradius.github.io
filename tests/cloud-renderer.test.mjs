import test from 'node:test';
import assert from 'node:assert/strict';
import {createCloudRenderer} from '../review/animatic/cloud-renderer.js';
import {frameAt} from '../review/animatic/motion.js';

function fixture(){
 const calls=[];
 const context=Object.fromEntries(['setTransform','clearRect','save','translate','scale','rotate','drawImage','restore'].map(name=>[name,(...args)=>calls.push({name,args})]));
 Object.defineProperty(context,'globalAlpha',{set:value=>calls.push({name:'globalAlpha',args:[value]})});
 const canvas={clientWidth:1200,clientHeight:800,getContext:()=>context};
 const images=Array.from({length:24},()=>({offsetLeft:10,offsetTop:20,offsetWidth:500,offsetHeight:300}));
 return {canvas,calls,renderer:createCloudRenderer(canvas,images)};
}

test('every cloud frame draws 24 decoded sprites on one stable canvas without resizing it',()=>{
 const {canvas,calls,renderer}=fixture();renderer.resize();
 const size=[canvas.width,canvas.height];
 renderer.draw(.2,frameAt(.2),true);
 assert.equal(calls.filter(call=>call.name==='drawImage').length,24);
 assert.equal(calls.filter(call=>call.name==='save').length,24);
 assert.equal(calls.filter(call=>call.name==='restore').length,24);
 renderer.draw(.4,frameAt(.4),true);
 assert.deepEqual([canvas.width,canvas.height],size);
 assert.equal(calls.filter(call=>call.name==='clearRect').length,2);
});

test('nearby banks stay fuller than wisps and cloud transparency remains static through travel',()=>{
 const {calls,renderer}=fixture();renderer.resize();
 renderer.draw(0,frameAt(0),true);
 const opacity=calls.filter(call=>call.name==='globalAlpha').map(call=>call.args[0]);
 assert.equal(opacity.length,24);
 assert.ok(opacity.every(value=>value>=.68&&value<=.98));
 assert.equal(opacity.filter(value=>value<=.8).length,4,'only a few wisps should be visibly translucent');
 assert.ok(opacity.filter(value=>value>=.86).length>=20,'preserve substantial cloud structure');
 for(const side of [0,12]){
  const banks=opacity.slice(side,side+6),wisps=opacity.slice(side+6,side+12);
  assert.ok(banks.reduce((sum,value)=>sum+value,0)>wisps.reduce((sum,value)=>sum+value,0));
 }
 calls.length=0;renderer.draw(.4,frameAt(.4),true);
 assert.deepEqual(calls.filter(call=>call.name==='globalAlpha').map(call=>call.args[0]),opacity);
});

test('static and unavailable-canvas paths never attempt to paint cloud images',()=>{
 const {calls,renderer}=fixture();renderer.resize();renderer.draw(0,frameAt(0),false);
 assert.equal(calls.some(call=>call.name==='drawImage'),false);
 const missing=createCloudRenderer({getContext:()=>null},[]);
 assert.equal(missing.available,false);
 assert.doesNotThrow(()=>{missing.resize();missing.draw(0,frameAt(0),true);});
});

test('same-size resize does not clear or reallocate the backing canvas',()=>{
 const {canvas,renderer}=fixture();let writes=0,width=0,height=0;
 Object.defineProperties(canvas,{width:{get:()=>width,set:value=>{width=value;writes++;}},height:{get:()=>height,set:value=>{height=value;writes++;}}});
 renderer.resize();assert.equal(writes,2);renderer.resize();assert.equal(writes,2);
 canvas.clientWidth=1000;renderer.resize();assert.equal(writes,3);
});
