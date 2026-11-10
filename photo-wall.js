(() => {
 const wall=document.querySelector('.photo-wall');
 const dialog=document.querySelector('.photo-lightbox');
 const close=dialog?.querySelector('.photo-lightbox-close');
 const image=dialog?.querySelector('.photo-lightbox-image');
 const caption=dialog?.querySelector('.photo-lightbox-caption');
 if(!wall||!dialog||!close||!image||!caption||typeof dialog.showModal!=='function')return;
 const panel=dialog.querySelector('.photo-lightbox-panel')||dialog;
 let opener=null,overflow='',animation=null;

 function cancelEntry(){animation?.cancel();animation=null;}

 function restore(){
  cancelEntry();
  if(!opener)return;
  document.body.style.overflow=overflow;
  const target=opener;opener=null;
  if(target.isConnected)target.focus({preventScroll:true});
 }
 function dismiss(){
  if(!dialog.open)return;
  dialog.close();restore();
 }
 wall.addEventListener('click',event=>{
  const link=event.target.closest('.photo-wall-photo[data-photo-index]');
  if(!link||!wall.contains(link)||event.defaultPrevented||event.button>0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const thumbnail=link.querySelector('img');
  if(!thumbnail)return;
  event.preventDefault();
  cancelEntry();
  image.src=link.href;image.alt=thumbnail.alt;
  for(const name of ['width','height']){
   const value=thumbnail.getAttribute(name);
   if(value)image.setAttribute(name,value);else image.removeAttribute(name);
  }
  caption.textContent=(link.querySelector('figcaption')||link.closest('figure')?.querySelector('figcaption'))?.textContent.trim()||'';
  if(!dialog.open){
   opener=link;overflow=document.body.style.overflow;
   dialog.showModal();document.body.style.overflow='hidden';
  }
  close.focus({preventScroll:true});
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(event.detail>0&&!reduced&&!document.querySelector('.connected-home[data-motion-paused="true"]')&&typeof image.animate==='function'){
   animation=image.animate([{opacity:0,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}],{duration:180,easing:'cubic-bezier(.23,1,.32,1)'});
  }
 });
 close.addEventListener('click',dismiss);
 dialog.addEventListener('cancel',event=>{event.preventDefault();dismiss();});
 dialog.addEventListener('close',()=>{if(!dialog.open)restore();});
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=panel.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dismiss();
 });
 dialog.addEventListener('keydown',event=>{
  if(dialog.open&&event.key==='Tab'){event.preventDefault();close.focus({preventScroll:true});}
 });
})();
