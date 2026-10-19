import { renderJourney } from './journey-map.mjs';
import { renderProjectBox } from './project-box.mjs';
import { evidence, milestones } from './portfolio-content.mjs';
export function renderHome({ projects, renderTown, contact, arrow, email }) {
  return `<div class="experience-home">
    <section class="entrance" id="home" aria-labelledby="entrance-title">
      <div class="entrance-copy">
        
        <h1 id="entrance-title">Dexter Soriano.<br>AI &amp; web builder.</h1>
        <p class="entrance-intro">Websites, web apps, and AI tools, built to be useful.</p>
        <a class="entrance-invitation button primary" href="#journey">Explore my journey <span aria-hidden="true">↓</span></a>
      </div>
      <div class="entrance-stage"><div class="entrance-camera">${renderTown(projects)}</div></div>
      <div class="entrance-veil" aria-hidden="true"></div>
      <div class="entrance-story" aria-hidden="true"><p><span>Student.</span><span>Student leader.</span><span>AI &amp; web builder.</span></p><span class="entrance-story-next">Every chapter led to the next. ↓</span></div>
      <p class="entrance-scroll-cue" aria-hidden="true">Scroll into the town <span>↓</span></p>
      <p class="entrance-caption">Three places to explore. Each one holds a project.</p>
    </section>

    ${renderJourney(milestones, arrow)}

    <section class="experience-work" id="work" aria-labelledby="work-title">
      <div class="experience-heading section"><h2 id="work-title">Ideas you can<br>look inside.</h2><p>Different problems. The same care for clear workflows, useful interfaces, and evidence you can inspect.</p></div>
      ${renderProjectBox(projects, evidence, arrow)}
      <div class="experience-archive section"><p>There’s more in the notebook.</p><a class="text-link" href="/projects/">11 experiments, notebooks, and builds ${arrow}</a></div>
    </section>

    <section class="experience-about section" id="about" aria-labelledby="about-title">
      <figure class="experience-portrait"><img src="/images/about-portrait.jpg" alt="Dexter Soriano" loading="lazy" width="1676" height="2048"><figcaption>The person behind this little world.</figcaption></figure>
      <div class="experience-about-copy"><h2 id="about-title">Meet the builder.</h2><p>I’m Dexter Soriano, a Computer Engineering student majoring in Data Science at the Technological Institute of the Philippines — Manila.</p><p>I’m interested in machine learning, computer vision, and intelligent applications: especially the point where a technical idea becomes something a person can use. Continuous learning is part of the process.</p><p>Student leadership has also shaped how I work. Listening, collaboration, and responsibility belong in the build as much as the code does.</p><div class="experience-roles"><p><span>2025–2026 · Past role</span><strong>SSC President</strong><small>T.I.P. Manila</small></p><p><span>April 2025–Present</span><strong>Globe Ambassador Head</strong><small>Digital Thumbprint Program</small></p></div><a class="text-link" href="mailto:${email}?subject=CV%20request">Request my CV ${arrow}</a></div>
    </section>

    <section class="experience-services section" id="services" aria-labelledby="services-title"><div class="experience-heading"><h2 id="services-title">Have an idea<br>in mind?</h2></div><div class="experience-service-list"><article><h3>Websites</h3><p>Personal sites and business pages with a clear story, considered design, and responsive layouts.</p></article><article><h3>Web applications</h3><p>Purpose-built tools connecting interfaces, data, and the workflows people need to complete.</p></article><article><h3>AI integrations</h3><p>Practical AI-assisted features with clear inputs, useful outputs, and room for human review.</p></article></div></section>
    ${contact}
    <nav class="experience-nav" aria-label="Explore this portfolio"><a href="#home" aria-current="location">Home</a><a href="#journey">Journey</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
  </div>`;
}
