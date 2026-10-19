const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function renderProjectBox(projects, evidence, arrow) {
  return `<div class="project-box section" data-project-box>
    <div class="project-box-controls" hidden><div class="project-box-selectors" role="group" aria-label="Choose a project">${projects.map((project, index) => `<button type="button" data-project-select="${index}" aria-controls="project-panel-${escape(project.slug)}" aria-pressed="${index === 0}">${escape(project.name)}</button>`).join('')}</div><div class="project-box-pagination"><button type="button" data-project-previous aria-label="Previous project">←</button><span data-project-status aria-live="polite" aria-atomic="true"></span><button type="button" data-project-next aria-label="Next project">→</button></div></div>
    <div class="project-box-stage">${projects.map((project, index) => {
      const item = evidence[project.slug];
      return `<article class="project-box-panel" id="project-panel-${escape(project.slug)}" data-project-panel aria-labelledby="work-${escape(project.slug)}">
        <div class="project-box-story"><h3 id="work-${escape(project.slug)}">${escape(project.name)}</h3><p class="project-box-role">${escape(project.role)}</p><p class="project-box-premise">${escape(item.heading)}</p><p>${escape(item.detail)}</p><ul class="work-tech" aria-label="Technologies used in ${escape(project.name)}">${project.tech.map(tech => `<li>${escape(tech)}</li>`).join('')}</ul><a class="text-link" href="/projects/${escape(project.slug)}/">Read the project story ${arrow}</a></div>
        <figure class="project-box-preview"><a href="/images/${escape(item.file)}" target="_blank" rel="noopener noreferrer" aria-label="Inspect full-size ${escape(project.name)} screenshot"><img src="/images/${escape(item.file)}" alt="${escape(item.alt)}" loading="lazy" width="${item.width}" height="${item.height}"></a><figcaption>${escape(item.caption)} Select the image to inspect it at full size.</figcaption></figure>
      </article>`;
    }).join('')}</div>
  </div>`;
}

