import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, copyFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = fileURLToPath(new URL('../../', import.meta.url));
const tools = path.join(project, 'work/tooling/reverse-engineering');
process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(tools, 'browsers');
const require = createRequire(path.join(tools, 'package.json'));
const { chromium } = require('playwright');
const output = path.join(project, 'work/reverse-engineering/smoke', new Date().toISOString().replaceAll(':', '-'));
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 480, height: 320 }, reducedMotion: 'no-preference', recordVideo: { dir: output, size: { width: 480, height: 320 } } });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  await page.setContent('<title>Synthetic tooling test</title><body style="margin:0;background:white"><p style="margin:16px">Synthetic tooling test — not reference evidence</p><div id="target" style="position:absolute;left:30px;top:100px;width:80px;height:80px;background:black"></div></body>');
  const samples = await page.evaluate(async () => {
    const target = document.querySelector('#target');
    target.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(180px)' }], { duration: 600, fill: 'forwards', easing: 'linear' });
    const result = [], start = performance.now();
    while (performance.now() - start < 850) {
      await new Promise(requestAnimationFrame);
      result.push({ time: performance.now() - start, x: target.getBoundingClientRect().x });
    }
    return result;
  });
  assert.ok(samples.length >= 10, 'Browser did not produce enough samples');
  assert.ok(Math.abs(samples.at(-1).x - 210) < 1, 'Animation did not reach its known destination');
  await page.screenshot({ path: path.join(output, 'final.png') });
  await writeFile(path.join(output, 'dom-samples.json'), JSON.stringify({ synthetic: true, samples }, null, 2));
  await context.tracing.stop({ path: path.join(output, 'trace.zip') });
  const video = page.video();
  await context.close();
  await copyFile(await video.path(), path.join(output, 'synthetic-motion.webm'));
  assert.ok((await stat(path.join(output, 'synthetic-motion.webm'))).size > 1000);
  console.log(JSON.stringify({ passed: true, synthetic: true, output, samples: samples.length }));
} finally { await browser.close(); }
