const projects = {
 advising: ['advising-demo.webp','Student Advising Portal academic progress dashboard','Application screen with fictional demo student data.','Co-creator & major contributor','A clearer path through academic advising.','Curricula, academic records, and study plans belong in one connected workflow. This platform brings them together for Computer Engineering programs.','student-advising-portal'],
 formproof: ['formproof-report.webp','FormProof historical automated evidence report','Historical static-state-01 report; not a new evaluation or WCAG certification.','Creator','A repair should come with evidence.','FormProof connects browser accessibility findings to proposed source repairs, human approval, and checks that show what changed.','formproof'],
 claimcheck: ['claimcheck-sample.jpg','ClaimCheck public sample with source passages','Public sample with illustrative fixture judgments and source data.','Creator','Bring the evidence into view.','ClaimCheck presents claims alongside source passages so the reasoning and supporting material can be examined together.','claimcheck']
};
function showProject(key) {
 const p=projects[key]; if(!p)return;
 const update=()=>{
  const image=document.querySelector('#evidence');image.src='/images/'+p[0];image.alt=p[1];
  for(const [id,value] of [['caption',p[2]],['role',p[3]],['project-title',p[4]],['description',p[5]]])document.getElementById(id).textContent=value;
  document.querySelector('#case-link').href='/projects/'+p[6]+'/';
  document.querySelector('.exhibit').id=key;
  document.querySelectorAll('[data-project]').forEach(a=>{if(a.dataset.project===key)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
 };
 if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(update);else update();
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
 const key=a.hash.slice(1);if(!projects[key])return;
 event.preventDefault();showProject(key);history.replaceState(null,'','#'+key);document.querySelector('#exhibits').scrollIntoView({behavior:'instant'});
}));
showProject(location.hash.slice(1));

async function enterGallery() {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches || location.hash || scrollY>0 || !Element.prototype.animate)return;
 const courtyard=document.querySelector('.architecture');
 const targets=[document.querySelector('header'),document.querySelector('main'),document.querySelector('footer')];
 const overlay=document.createElement('div');
 overlay.className='entrance';
 overlay.innerHTML='<div class="entrance-column left" aria-hidden="true"></div><div class="entrance-column right" aria-hidden="true"></div><svg class="entrance-arch" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path fill="#514737" fill-rule="evenodd" d="M0 0H1000V1000H0Z M235 1000V430C235 65 765 65 765 430V1000Z"/><path fill="none" stroke="#b5a285" stroke-width="28" d="M221 1000V430C221 45 779 45 779 430V1000"/></svg><div class="entrance-title">Dexter Soriano<span>A gallery of work</span></div><button class="entrance-skip" type="button">Skip entrance</button>';
 document.body.append(overlay);
 const rect=courtyard.getBoundingClientRect();
 const scale=Math.max(innerWidth/rect.width,innerHeight/rect.height)*1.05;
 const x=innerWidth/2-(rect.left+rect.width/2);
 const y=innerHeight/2-(rect.top+rect.height/2);
 const duration=innerWidth<=650?1600:2800;
 const animations=[];
 let finished=false;
 const skip=overlay.querySelector('button');
 const finish=()=>{
  if(finished)return;finished=true;
  const restoreFocus=overlay.contains(document.activeElement);
  animations.forEach(a=>a.cancel());
  targets.forEach(el=>el.inert=false);
  document.body.classList.remove('entering');
  overlay.remove();
  reduced.removeEventListener('change',finish);
  window.removeEventListener('resize',finish);
  window.removeEventListener('wheel',finish);
  window.removeEventListener('keydown',onKey);
  if(restoreFocus)document.querySelector('.enter').focus({preventScroll:true});
 };
 const onKey=event=>{if(event.key==='Escape')finish()};
 skip.addEventListener('click',finish);
 reduced.addEventListener('change',finish);
 window.addEventListener('resize',finish,{once:true});
 window.addEventListener('wheel',finish,{once:true,passive:true});
 window.addEventListener('keydown',onKey);
 try {
  targets.forEach(el=>el.inert=true);
  document.body.classList.add('entering');
  const timing={duration,easing:'cubic-bezier(.77,0,.175,1)',fill:'both'};
  animations.push(courtyard.animate([
   {transform:'translate('+x+'px,'+y+'px) scale('+scale+')',offset:0},
   {transform:'translate('+x+'px,'+y+'px) scale('+scale+')',offset:.45},
   {transform:'none',offset:1}
  ],timing));
  animations.push(overlay.querySelector('.entrance-arch').animate([
   {transform:'translateZ(0)',opacity:1},
   {transform:'translateZ(780px)',opacity:1,offset:.65},
   {transform:'translateZ(880px)',opacity:0}
  ],timing));
  for(const column of overlay.querySelectorAll('.entrance-column'))animations.push(column.animate([
   {transform:'translateZ(-150px)',opacity:1},
   {transform:'translateZ(650px)',opacity:0,offset:.7},
   {transform:'translateZ(650px)',opacity:0}
  ],timing));
  animations.push(overlay.querySelector('.entrance-title').animate([{opacity:1},{opacity:0,offset:.4},{opacity:0}],timing));
  await animations[0].finished;
 } catch {
  // Interrupted playback must always restore navigation.
 } finally { finish() }
}
enterGallery();
