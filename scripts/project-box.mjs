const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function renderProjectBox(projects, evidence, arrow) {
  return `<div class="project-box section" data-project-box>
    <div class="project-box-stage">
      <div class="project-box-lid" aria-hidden="true"><span>Selected work</span><small>Built, documented, open to inspect.</small></div>
      <div class="project-box-interior" aria-hidden="true"></div>
      <div class="project-box-cards">${projects.map((project, index) => {
        const item = evidence[project.slug];
        return `<article class="project-box-card project-box-card-${index}" data-project-card>
          <a class="project-box-pull" href="/projects/${escape(project.slug)}/" data-project-open="${escape(project.slug)}" aria-labelledby="work-${escape(project.slug)}">
            <span class="project-box-tab">${escape(item.category)}</span>
            <img src="/images/${escape(item.file)}" alt="${escape(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy">
            <span class="project-box-card-copy"><span class="project-box-role">${escape(project.role)}</span><h3 id="work-${escape(project.slug)}">${escape(project.name)}</h3><span class="project-box-premise">${escape(item.heading)}</span><span class="project-box-action">Explore the project ${arrow}</span></span>
          </a>
          <p class="project-box-evidence">${escape(item.caption)}</p>
        </article>`;
      }).join('')}</div>
      <div class="project-box-front" aria-hidden="true"><span>Dexter’s project files</span><i></i></div>
    </div>
    <p class="project-box-instruction">Three projects. Real screens. Open a card to inspect the work and its limits.</p>
  </div>`;
}
