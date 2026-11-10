import test from 'node:test';
import assert from 'node:assert/strict';
import {travelTiming,cameraTarget,EASE_OUT,EASE_TRAVEL} from '../review/experience/motion.js';

const readTarget=value=>{
 const match=/^translate\(([-\d.e]+)px, ([-\d.e]+)px\) scale\(([-\d.e]+)\)$/.exec(value);
 assert.ok(match,`invalid camera transform: ${value}`);
 return match.slice(1).map(Number);
};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} should equal ${expected}`);

test('desktop and phone approaches use the agreed distinct travel and blend durations',()=>{
 assert.deepEqual(travelTiming(),{duration:600,blend:200,scale:1.32});
 assert.deepEqual(travelTiming({mobile:true}),{duration:320,blend:120,scale:1.12});
 assert.equal(EASE_OUT,'cubic-bezier(0.23, 1, 0.32, 1)');
 assert.equal(EASE_TRAVEL,'cubic-bezier(0.77, 0, 0.175, 1)');
});

test('every motion bypass takes precedence over device size and other travel flags',()=>{
 for(let bits=1;bits<16;bits++)for(const mobile of [false,true]){
  const flags={mobile,reduced:!!(bits&1),keyboard:!!(bits&2),paused:!!(bits&4),failed:!!(bits&8)};
  assert.deepEqual(travelTiming(flags),{duration:120,blend:120,scale:1},JSON.stringify(flags));
 }
});

test('camera centers the workshop artwork coordinate when the crop permits it',()=>{
 const [dx,dy,scale]=readTarget(cameraTarget(1672,941,{left:0,top:0,width:1672,height:941},1.32));
 near((920-836)*scale+836+dx,836);
 near((565-470.5)*scale+470.5+dy,470.5);
});

test('camera travel never uncovers image edges across responsive cover crops and transformed worlds',()=>{
 for(const [width,height] of [[1440,1000],[1920,1080],[768,1024],[390,844],[844,390]]){
  for(const scale of [1,1.12,1.32])for(const expansion of [1,1.1,1.3]){
   const world={left:width*(1-expansion)/2,top:height*(1-expansion)/2,width:width*expansion,height:height*expansion};
   const [dx,dy,actualScale]=readTarget(cameraTarget(width,height,world,scale));
   assert.equal(actualScale,scale);
   assert.ok(Number.isFinite(dx)&&Number.isFinite(dy));
   const left=width/2-width*scale/2+dx,right=width/2+width*scale/2+dx;
   const top=height/2-height*scale/2+dy,bottom=height/2+height*scale/2+dy;
   assert.ok(left<=1e-8&&right>=width-1e-8,`${width}×${height}: camera exposes a horizontal edge`);
   assert.ok(top<=1e-8&&bottom>=height-1e-8,`${width}×${height}: camera exposes a vertical edge`);
   if(scale===1){near(dx,0);near(dy,0);}
  }
 }
});

test('portrait crop clamps toward the workshop instead of exposing the distant river edge',()=>{
 const width=390,height=844,scale=1.12;
 const [dx,dy]=readTarget(cameraTarget(width,height,{left:0,top:0,width,height},scale));
 near(dx,-width*(scale-1)/2);
 near(dy,-height*(scale-1)/2);
});
