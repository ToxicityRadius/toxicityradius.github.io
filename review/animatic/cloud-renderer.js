import {cloudOffsetAt} from './motion.js';

// Fuller nearby banks, translucent distant wisps; retain each sprite's painted alpha.
const cloudOpacity=[.98,.94,.98,.90,.94,.96,.76,.88,.90,.92,.86,.80,.96,.94,.98,.90,.94,.96,.78,.90,.88,.92,.74,.86];

// One viewport-sized surface avoids separate, oversized GPU layers for each cloud.
export function createCloudRenderer(canvas,images){
 const context=canvas.getContext('2d',{alpha:true});
 let width=0,height=0,ratio=1,bounds=[];
 return {
  available:!!context,
  resize(){
   if(!context)return;
   width=canvas.clientWidth;height=canvas.clientHeight;
   ratio=Math.min(globalThis.devicePixelRatio||1,1.5);
   const pixelWidth=Math.round(width*ratio),pixelHeight=Math.round(height*ratio);
   if(canvas.width!==pixelWidth)canvas.width=pixelWidth;
   if(canvas.height!==pixelHeight)canvas.height=pixelHeight;
   bounds=images.map(image=>({image,x:image.offsetLeft,y:image.offsetTop,width:image.offsetWidth,height:image.offsetHeight}));
  },
  draw(progress,frame,visible){
   if(!context||!width||!height)return;
   context.setTransform(ratio,0,0,ratio,0,0);
   context.clearRect(0,0,width,height);
   if(!visible)return;
   bounds.forEach((box,index)=>{
    const cloud=cloudOffsetAt(progress,index),side=index<12?-1:1;
    context.save();
    context.globalAlpha=cloudOpacity[index];
    context.translate(width/2+side*frame.cloudSplit*width/100,height/2);
    context.scale(frame.cloudScale,frame.cloudScale);
    context.translate(-width/2,-height/2);
    context.translate(box.x+box.width/2+cloud.x*width/100,box.y+box.height/2+cloud.y*height/100);
    context.rotate(cloud.rotation*Math.PI/180);
    context.scale(.85*cloud.flip,.85);
    context.drawImage(box.image,-box.width/2,-box.height/2,box.width,box.height);
    context.restore();
   });
  }
 };
}
