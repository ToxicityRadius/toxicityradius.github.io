const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const places=['An early question','Learning together','Taking the lead','Building with people','The next chapter'];
export function renderJourney(milestones,arrow='') {
 return `<section class="experience-journey" id="journey" aria-labelledby="journey-title">
 <div class="journey-stage">
 <div class="journey-geography" aria-hidden="true"><div class="journey-map-fallback"></div><div class="journey-map-canvas"></div></div>
 <header class="journey-heading"><h2 id="journey-title">A world of <span class="marker marker-blue">possibility.</span></h2><p>Five chapters. A path of my own.</p></header>
 <div class="journey-orientation" aria-hidden="true"><span class="journey-location">My story, mapped out</span><span class="journey-compass">N ↑</span></div>
 <p class="journey-loading" role="status">A journey through learning, leadership and making.</p>
 <ol class="journey-story">${milestones.map(([date,title,role,description],i)=>`<li class="journey-chapter" id="journey-chapter-${i}"><article class="journey-chapter-copy"><p class="journey-place">${escape(places[i])}</p><p class="journey-date">${escape(date)}</p><h3>${escape(title)}</h3><p class="journey-role">${escape(role)}</p><p>${escape(description)}</p></article></li>`).join('')}</ol>
 <nav class="journey-choices" aria-label="Choose a journey chapter">${milestones.map(([date,title],i)=>`<a href="#journey-chapter-${i}" data-journey-choice="${i}" aria-label="${escape(date)}: ${escape(title)}"><span class="journey-choice-dot" aria-hidden="true"></span>${escape(date)}</a>`).join('')}</nav>
 <a class="journey-start" href="#journey-chapter-0">Explore the journey ${arrow}</a>
 <div class="journey-mobile-controls"><button type="button" data-journey-previous aria-label="Previous journey chapter">←</button><span class="journey-counter" aria-live="polite">1 / 5</span><button type="button" data-journey-next aria-label="Next journey chapter">→</button></div>
 </div></section>`;
}
