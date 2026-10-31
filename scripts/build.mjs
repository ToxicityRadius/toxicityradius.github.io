import { mkdir, readFile, writeFile, cp, rm, realpath } from 'node:fs/promises';
import path from 'node:path';
import {renderConnectedHome} from './connected-home.mjs';
import { projects, evidence } from './portfolio-content.mjs';
import {renderPhotoWall} from './photo-wall.mjs';
import {valleyAssets, valleyUrl, useValleyAssets} from './valley-assets.mjs';
import {validateProductionAssets} from './validate-production.mjs';

const site = process.env.SITE_URL || 'https://dexter-soriano-portfolio.pages.dev';
const email = 'mdasoriano01@tip.edu.ph';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const archive = [
 ['Coin-Scan','Data science','Philippine coin detection and counting with YOLOv8 and OpenCV.','ToxicityRadius/Coin-Scan'],
 ['RecipeChecker','Web apps','A group-built recipe management project with relational data and browsing workflows.','DBMS-S1/RecipeChecker'],
 ['Match Prediction','Data science','Exploring League of Legends match outcomes with ranked-game data.','ToxicityRadius/Match-Prediction'],
 ['NeuralLab','Data science','Feedforward neural-network experiments using the Iris dataset.','ToxicityRadius/NeuralLab'],
 ['Chip','Data science','Exploratory analysis of semiconductor performance data.','ToxicityRadius/Chip'],
 ['Neural','Data science','Housing-price regression with feature engineering and notebooks.','ToxicityRadius/Neural'],
 ['Classification','Data science','Comparing several classifiers on the Iris dataset.','ToxicityRadius/Classification'],
 ['Titanic','Data science','Survival prediction, exploratory analysis, and model comparison.','ToxicityRadius/Titanic'],
 ['Regression Models','Data science','Ames Housing regression experiments and prediction analysis.','ToxicityRadius/Regression-Models'],
 ['Project UNITE','Web apps','A Django web application with a product-focused frontend.','ToxicityRadius/Project-Unite'],
 ['Portfolio Website','Websites','This evolving home for my projects, experiments, and story.','ToxicityRadius/toxicityradius.github.io']
];
const nav = `<header class="site-header"><a class="wordmark" href="/" aria-label="Dexter Soriano home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10h3V7h3V4h6v3h3v3h3v11h-7v-7h-4v7H3z" fill="currentColor"/></svg>Dexter Soriano</a><nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#about">About</a><a href="/#services">Services</a><a href="/#contact">Contact</a></nav><button class="theme-toggle" type="button" aria-label="Switch to night mode" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg><span>Day</span></button></header>`;
const footer = `<footer class="footer"><a class="wordmark" href="/">Dexter Soriano</a><p>Built with curiosity. Made to be explored.</p><a href="https://github.com/ToxicityRadius" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a><span>© ${new Date().getFullYear()} Dexter Soriano</span></footer>`;
function shell(title, description, route, body){return `<!doctype html><html lang="en" data-theme="day"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${description}"><meta name="color-scheme" content="light dark"><title>${title} — Dexter Soriano</title><link rel="canonical" href="${site}${route}"><meta property="og:title" content="${title} — Dexter Soriano"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${site}${route}"><meta property="og:image" content="${site}${valleyUrl('backplate.png')}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg"><link rel="preload" href="/fonts/outfit.ttf" as="font" type="font/ttf" crossorigin><link rel="preload" href="/fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/vendor/lenis.css">${route==='/'?'<link rel="stylesheet" href="/world/animatic/style.css"><link rel="stylesheet" href="/world/experience/atmosphere.css"><link rel="stylesheet" href="/connected-home.css"><link rel="stylesheet" href="/journey-map.css"><link rel="stylesheet" href="/scroll-scenes.css"><link rel="stylesheet" href="/project-box.css"><link rel="stylesheet" href="/engineering-spaces.css"><link rel="stylesheet" href="/photo-wall.css">':''}<script src="/theme.js"></script><script src="/vendor/gsap.min.js" defer></script><script src="/vendor/ScrollTrigger.min.js" defer></script><script src="/script.js" defer></script><script type="module" src="/smooth-scroll.js"></script>${route==='/'?'<script type="module" src="/connected-home.js"></script><script type="module" src="/introduction-notes.js"></script><script type="module" src="/headline-text.js"></script><script type="module" src="/journey-map.js"></script><script type="module" src="/scroll-scenes.js"></script><script src="/project-box.js" defer></script><script src="/engineering-spaces.js" defer></script><script src="/photo-wall.js" defer></script>':''}</head><body><a class="skip-link" href="#main">Skip to content</a>${route==='/'?'':nav}<main id="main">${body}</main>${footer}</body></html>`}
const contact = `<section class="contact section" id="contact"><div class="contact-copy"><h2>Let’s build<br>together.</h2><p>A website, a web app, an AI idea—or an opportunity to work together. I’d love to hear about it.</p><a class="button primary" href="mailto:${email}">Email Dexter ${arrow}</a></div><div class="contact-links"><a class="contact-email" href="mailto:${email}">${email} ${arrow}</a><button type="button" id="copy-email" data-email="${email}">Copy email</button><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p><a href="https://github.com/ToxicityRadius" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a><a href="https://www.linkedin.com/in/dexter-aic-soriano-382063335/" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a><a href="mailto:${email}?subject=CV%20request">Request my CV ${arrow}</a></div></section>`;
const home = useValleyAssets(renderConnectedHome(await readFile('review/animatic/index.html','utf8'),{arrow,email}));
const destinations = [['/',shell('AI & web builder','Websites, web applications, and thoughtful AI tools by Dexter Soriano. Explore a painted valley of projects and the work behind them.','/',home)]];
for (const p of projects){
 const body=`<article class="case-study"><div class="case-heading section"><a class="text-link back-link" href="/#work">← Back to the town</a><p class="case-role">${p.name} · ${p.role} · ${p.type}</p><h1>${p.headline}</h1><p class="case-intro">${p.intro}</p><div class="case-actions">${p.repo?`<a class="button primary" href="${p.repo}" target="_blank" rel="noopener noreferrer">View repository ${arrow}</a>`:''}${p.live?`<a class="button primary" href="${p.live}" target="_blank" rel="noopener noreferrer">Explore public sample ${arrow}</a>`:''}<a class="text-link" href="#case-details">Read the story ↓</a></div></div><section class="case-summary" aria-labelledby="project-name"><h2 id="project-name">${p.name}</h2><ul class="tags" aria-label="Project technologies">${p.tech.map(t=>`<li>${t}</li>`).join('')}</ul></section><div class="case-body section" id="case-details"><nav class="case-contents" aria-label="On this page"><h2>Inside the project</h2><a href="#problem">The problem</a><a href="#contribution">My contribution</a><a href="#decisions">Key decisions</a><a href="#status">Current scope</a></nav><div class="case-prose"><section id="problem"><h2>The problem</h2><p>${p.problem}</p></section><section id="contribution"><h2>My contribution</h2><p>${p.contribution}</p></section><section><h2>How the workflow connects</h2><ol class="workflow">${p.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="caption">Workflow overview—not an application screenshot.</p></section><section id="decisions"><h2>Decisions behind the build</h2>${p.decisions.map(([t,d])=>`<h3>${t}</h3><p>${d}</p>`).join('')}</section><section id="status" class="scope-note"><h2>Where it stands</h2><p>${p.note}</p><p class="caption">Based on project documentation reviewed October 18, 2026.</p></section></div></div><nav class="next-project section" aria-label="Other projects"><a href="/projects/">All projects ${arrow}</a><a href="/projects/${projects[(projects.indexOf(p)+1)%3].slug}/">Next: ${projects[(projects.indexOf(p)+1)%3].name} ${arrow}</a></nav></article>${contact}`;
 const screenshots = {
  'student-advising-portal': ['advising-demo.webp','Student Advising Portal academic progress dashboard with fictional demo student data','Recorded application screen with fictional demo student data (Alex Reyes, DEMO-2026).'],
  'formproof': ['formproof-report.webp','FormProof historical static-state-01 automated evidence report','Historical static-state-01 report. This recorded automated result is not a new evaluation or WCAG certification.'],
  'claimcheck': ['claimcheck-sample.jpg','ClaimCheck public sample showing claims beside source passages','Public sample captured October 18, 2026. Judgments and source data are illustrative fixtures.']
 };
 const [file,alt,caption] = screenshots[p.slug];
 const {width,height} = evidence[p.slug];
 const figure = `<figure class="project-evidence"><a href="/images/${file}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size ${p.name} screenshot"><img src="/images/${file}" alt="${alt}" width="${width}" height="${height}" loading="lazy"></a><figcaption>${caption} Select the image to inspect it at full size.</figcaption></figure>`;
 destinations.push([`/projects/${p.slug}/`,shell(p.name,p.summary,`/projects/${p.slug}/`,body.replace('<div class="case-body section"',figure+'<div class="case-body section"'))]);
}
const archiveBody=`<section class="archive section"><a class="text-link" href="/">← Back to the town</a><h1>The project<br><em>notebook.</em></h1><p class="archive-intro">A collection of builds, coursework, and experiments.<br>Start with a featured story, or browse the shelves.</p><div class="featured-links">${projects.map(p=>`<a href="/projects/${p.slug}/"><strong>${p.name}</strong><span>Read case study ${arrow}</span></a>`).join('')}</div><div class="filters" role="group" aria-label="Filter projects" hidden>${['All','Data science','Web apps','Websites'].map((c,i)=>`<button type="button" data-filter="${c}" aria-pressed="${i===0}">${c}</button>`).join('')}</div><p id="project-count" role="status" aria-live="polite">${archive.length} projects</p><div class="archive-list">${archive.map(([name,category,desc,repo])=>`<article data-category="${category}"><div><span>${category}</span><h2><a href="https://github.com/${repo}" target="_blank" rel="noopener noreferrer">${name} ${arrow}</a></h2></div><p>${desc}</p><a class="archive-source" href="https://github.com/${repo}" target="_blank" rel="noopener noreferrer" aria-label="${name} source code">Source ${arrow}</a></article>`).join('')}</div></section>${contact}`;
destinations.push(['/projects/',shell('Project notebook','Browse Dexter Soriano’s web projects, data-science notebooks, and experiments.','/projects/',archiveBody)]);
const workspace = await realpath(process.cwd());
const output = path.resolve(workspace, 'dist');
if (output !== path.join(workspace, 'dist')) throw new Error('Invalid production output path');
// Resolve an existing directory before deleting so a redirected dist cannot escape the workspace.
try { if (await realpath(output) !== output) throw new Error('dist must be a real workspace directory'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
await rm(output,{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const [route,html] of destinations){const target=path.join('dist',route,'index.html');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,html);}
await writeFile('dist/404.html',shell('This path ends here','Return to Dexter’s town.','/404.html','<section class="not-found section"><h1>A little off<br>the map.</h1><p>This page has moved, or the path doesn’t exist.</p><a class="button primary" href="/">Back to the town '+arrow+'</a></section>'));
for(const file of ['introduction-notes.js','smooth-scroll.js','photo-wall.css','photo-wall.js','headline-text.js','connected-home.css','connected-home.js','engineering-spaces.css','engineering-spaces.js','styles.css','journey-map.css','project-box.css','script.js','journey-map.js','journey-state.js','journey-geography.js','scroll-scenes.js','scroll-scenes.css','project-box.js','theme.js','theme-artwork.js','theme-transition.js','favicon.svg'])await cp(file,path.join('dist',file));
const photos = [...renderPhotoWall().matchAll(/<img src="([^"]+)"/g)].map(([,url])=>url.slice(1));
const assets = new Set(['images/paper/torn-edge.svg','images/about-portrait.jpg', ...Object.values(evidence).map(item=>'images/'+item.file), ...photos,
 'vendor/gsap.min.js','vendor/ScrollTrigger.min.js','fonts/outfit.ttf','fonts/bricolage-grotesque.woff2','fonts/Outfit-OFL.txt','fonts/BricolageGrotesque-OFL.txt']);
for (const file of assets) {await mkdir(path.dirname(path.join(output,file)),{recursive:true});await cp(file,path.join(output,file));}
await cp('node_modules/animejs/dist/bundles/anime.esm.min.js',path.join(output,'vendor/anime.esm.min.js'));
await cp('node_modules/animejs/LICENSE.md',path.join(output,'vendor/anime-LICENSE.md'));
for(const file of ['dist/lenis.mjs','dist/lenis.css','LICENSE'])await cp('node_modules/lenis/'+file,path.join(output,'vendor/'+(file==='LICENSE'?'lenis-LICENSE.txt':file.split('/').at(-1))));
await mkdir('dist/images/journey',{recursive:true});
for(const name of ['story-map.svg','story-map-night.svg'])await cp('images/journey/'+name,'dist/images/journey/'+name);

await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${destinations.map(([r])=>`<url><loc>${site}${r}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n');



// Publish the same entrance and atmosphere sources used by the review harnesses.
await mkdir('dist/world/experience',{recursive:true});
await rm('dist/world/animatic',{recursive:true,force:true});
await mkdir('dist/world/animatic/clouds',{recursive:true});
for(const file of ['controller.js','motion.js','cloud-renderer.js'])await cp('review/animatic/'+file,'dist/world/animatic/'+file);
const entranceStyle=(await readFile('review/animatic/style.css','utf8')).replace("content:url('phone.png');",'');
await writeFile('dist/world/animatic/style.css',entranceStyle);
for(const asset of valleyAssets)await cp('review/animatic/'+asset.file,'dist/world/animatic/'+asset.file);

for(const file of ['atmosphere.js','atmosphere.css'])await cp('review/experience/'+file,'dist/world/experience/'+file);


await validateProductionAssets(output);
console.log(`Built ${destinations.length} pages + 404 for ${site}`);
