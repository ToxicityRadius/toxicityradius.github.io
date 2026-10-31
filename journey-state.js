export const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
export const stops=[
 {at:.18,center:[260,1120],zoom:13.3,pitch:0,bearing:0},
 {at:.36,center:[620,960],zoom:13.3,pitch:0,bearing:0},
 {at:.53,center:[900,700],zoom:13.3,pitch:0,bearing:0},
 {at:.74,center:[1100,430],zoom:13.3,pitch:0,bearing:0},
 {at:.94,center:[1500,250],zoom:13.3,pitch:0,bearing:0},
];
export const overview={center:[900,650],zoom:11.8,pitch:0,bearing:0,overview:1};
export function chapterAt(progress){return Math.max(0,stops.findLastIndex(s=>progress>=s.at-.06));}
export function cameraAt(progress,{mobile=false,still=false}={}){
 const p=clamp(progress),index=chapterAt(p),exit=smooth((p-.94)/.06);
 if(still||mobile)return p>=1?{...overview,overview:0,intro:1}:p<stops[0].at?{...overview,overview:0,intro:1}:index===4?{...overview}:{...stops[index]};
 const intro=Math.max(1-smooth((p-.04)/.14),exit),reveal=smooth((p-.88)/.06),point=routeAt(p).point;
 let center=point,zoom=13.3;
 if(p<stops[0].at){const t=smooth(p/stops[0].at);center=overview.center.map((v,i)=>v+(point[i]-v)*t);zoom=overview.zoom+(13.3-overview.zoom)*t;}
 else{
  const right=stops.findIndex(stop=>stop.at>=p);
  if(right>0){const t=(p-stops[right-1].at)/(stops[right].at-stops[right-1].at);zoom-=.55*Math.sin(Math.PI*t)**2;}
 }
 return {center:center.map((v,i)=>v+(overview.center[i]-v)*reveal),zoom:zoom+(overview.zoom-zoom)*reveal,pitch:0,bearing:0,overview:reveal,intro};
}
export function projectPoint(point){return point;}
const curves=[
 [260,960,420,960,620,960],
 [1030,960,1170,700,900,700],
 [630,700,770,430,1100,430],
 [1410,430,1500,420,1500,250],
];
export const openRoadPath='M1500 250C1500 160 1560 160 1560 90';
export function routePath(index){return 'M260 1120'+curves.slice(0,clamp(index,0,4)).map(c=>'C'+c.join(' ')).join('');}
export function routeAt(progress){
 const p=clamp(progress),index=stops.findIndex(stop=>stop.at>=p);
 if(index===0)return {path:routePath(0),point:stops[0].center,angle:-90};
 if(index<0)return {path:routePath(4),point:stops[4].center,angle:-90};
 const a=stops[index-1],b=stops[index],t=clamp((p-a.at)/(b.at-a.at)),c=curves[index-1];
 const mix=(x,y)=>x.map((v,i)=>v+(y[i]-v)*t);
 const q0=mix(a.center,c.slice(0,2)),q1=mix(c.slice(0,2),c.slice(2,4)),q2=mix(c.slice(2,4),b.center);
 const r0=mix(q0,q1),r1=mix(q1,q2),point=mix(r0,r1);
 return {path:routePath(index-1)+'C'+[...q0,...r0,...point].map(v=>Math.round(v*1000)/1000).join(' '),point,angle:Math.atan2(r1[1]-r0[1],r1[0]-r0[0])*180/Math.PI};
}
