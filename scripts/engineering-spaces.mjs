import { renderPhotoWall } from './photo-wall.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function renderEngineeringSpaces(projects, evidence, arrow) {
  const bySlug = Object.fromEntries(projects.map(project => [project.slug, project]));
  const categories = [
    ['Web systems', 'student-advising-portal', 'Connect the rules to the workflow.', 'React presents role-specific academic workflows. Express, PostgreSQL, and Sequelize connect curriculum rules, academic records, and versioned study plans.'],
    ['Developer tooling', 'formproof', 'Make a change inspectable.', 'TypeScript, Playwright, axe-core, and Codex connect browser findings to an approved source edit, a rescan, and required regression checks.'],
    ['Evidence workflows', 'claimcheck', 'Keep a claim close to its source.', 'React, Cloudflare, Supabase, and browser OCR support extraction, passage retrieval, and human review. Public sample judgments are illustrative fixtures; live inference is disabled.'],
  ];
  return `<div class="paper-seam paper-seam-reverse" aria-hidden="true"></div><section class="engineering-toolbox section" id="toolbox" aria-labelledby="toolbox-title">
    <div class="engineering-space-heading"><h2 id="toolbox-title">Tools with a <span class="marker marker-blue">purpose.</span></h2><p>The stack changes with the problem. The habit stays the same: make the system understandable, then check the result.</p></div>
    <div class="engineering-tool-chest">${categories.map(([name, slug, premise, detail]) => {
      const project = bySlug[slug];
      return `<details class="engineering-drawer"><summary><span class="engineering-drawer-handle" aria-hidden="true"></span><span><strong>${name}</strong><small>${escape(premise)}</small></span><span class="engineering-drawer-toggle" aria-hidden="true">+</span></summary><div class="engineering-drawer-content"><p>${escape(detail)}</p><ul aria-label="${name} technologies">${project.tech.map(tech => `<li>${escape(tech)}</li>`).join('')}</ul><a href="/projects/${slug}/" data-project-open="${slug}">Inspect ${escape(project.name)} ${arrow}</a></div></details>`;
    }).join('')}</div>
  </section>
  <section class="engineering-about section" id="about" aria-labelledby="desk-title">
    <div class="engineering-space-heading"><h2 id="desk-title">A little about the <span class="marker marker-peach">builder.</span></h2><p>I’m Dexter Soriano, a Computer Engineering student at T.I.P. Manila. I build web systems and developer tools, with an interest in data science and intelligent applications.</p></div>
    ${renderPhotoWall()}
    <div class="engineering-desk">
      <figure class="engineering-desk-portrait"><img src="/images/about-portrait.jpg" alt="Dexter Soriano" width="1676" height="2048" loading="lazy"><figcaption>Dexter Soriano<br><span>Computer Engineering · T.I.P. Manila</span></figcaption></figure>
      <div class="engineering-desk-notebook"><h3>Built with people.</h3><p>Engineering work means understanding the people who will use a system—and making decisions they can follow.</p><dl><div><dt>Supreme Student Council President</dt><dd>T.I.P. Manila · 2025–2026 · Past role</dd></div><div><dt>Globe Digital Thumbprint Program<br>Campus Ambassador Head</dt><dd>April 2025–Present</dd></div></dl></div>
      <div class="engineering-pinned-notes" role="group" aria-label="Engineering notes from the projects"><h3>Notes I build by</h3>${projects.map(project => `<details class="engineering-note"><summary>${escape(project.decisions[0][0])}</summary><p>${escape(project.decisions[0][1])}</p><a href="/projects/${escape(project.slug)}/" data-project-open="${escape(project.slug)}">From ${escape(project.name)} ${arrow}</a></details>`).join('')}</div>
    </div>
  </section>`;
}
