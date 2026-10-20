export const DURATION_MS=4500;
export const SESSION_KEY='portfolio:valley-entrance:v1';
export const clamp=value=>Math.min(1,Math.max(0,value));
export const smooth=value=>{const p=clamp(value);return p*p*(3-2*p);};
export function frameAt(progress){
 const p=clamp(progress),time=p*DURATION_MS/1000;
 const travel=smooth((time-.8)/3.1),cloudReveal=smooth((time-.25)/1.45);
 return {
  scale:1+travel*.1,x:-travel*2,y:-travel*3,
  foregroundScale:1+travel*.5,foregroundX:-travel*13,foregroundY:travel*22,
  intro:smooth((time-1)/.3)*(1-smooth((time-2.7)/.4)),
  destinations:smooth((time-3.9)/.4),
  cloudSplit:cloudReveal*110,cloudScale:1.75-.75*cloudReveal,
  phase:time<.8?'Overlook':time<3.9?'Approach':'Arrival',
 };
}
export function cloudOffsetAt(progress,index){
 const time=clamp(progress)*DURATION_MS/1000,delay=(index%4)*.035;
 const spread=smooth((time-.25-delay)/(1.45-delay)),side=index<12?-1:1;
 return {x:side*spread*(4+(index%3)*3),y:spread*((index%5)-2)*2,rotation:spread*((index%3)-1)*3,flip:index%4===1?-1:1};
}
