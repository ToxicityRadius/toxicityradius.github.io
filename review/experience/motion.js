export const EASE_OUT='cubic-bezier(0.23, 1, 0.32, 1)';
export const EASE_TRAVEL='cubic-bezier(0.77, 0, 0.175, 1)';

export function travelTiming({mobile=false,reduced=false,keyboard=false,paused=false,failed=false}={}) {
 if(reduced||keyboard||paused||failed)return {duration:120,blend:120,scale:1};
 return mobile?{duration:320,blend:120,scale:1.12}:{duration:600,blend:200,scale:1.32};
}

export function cameraTarget(width,height,world,scale) {
 // Match the centered cover crop shared by the backplate and atmosphere SVG.
 const cover=Math.max(width/1672,height/941);
 const x=world.left+(width/2+(920-836)*cover)/width*world.width;
 const y=world.top+(height/2+(565-470.5)*cover)/height*world.height;
 const limitX=width*(scale-1)/2,limitY=height*(scale-1)/2;
 const dx=Math.max(-limitX,Math.min(limitX,(width/2-x)*scale));
 const dy=Math.max(-limitY,Math.min(limitY,(height/2-y)*scale));
 return `translate(${dx}px, ${dy}px) scale(${scale})`;
}
