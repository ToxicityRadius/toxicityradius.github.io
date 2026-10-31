import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile, mkdir, rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {validateProductionAssets} from '../scripts/validate-production.mjs';
import {valleyAssets} from '../scripts/valley-assets.mjs';

test('self-hosted heading font is a complete WOFF2 with its redistribution license',async()=>{
 const font=await readFile('fonts/bricolage-grotesque.woff2');
 assert.equal(font.subarray(0,4).toString(),'wOF2');
 assert.equal(font.readUInt32BE(8),font.length,'WOFF2 header matches the downloaded file size');
 assert.match(await readFile('fonts/BricolageGrotesque-OFL.txt','utf8'),/Copyright 2022 The Bricolage Grotesque Project Authors/);
 assert.match(await readFile('fonts/BricolageGrotesque-OFL.txt','utf8'),/SIL Open Font License, Version 1\.1/);
});

test('night foreground keeps an RGBA canvas and both night assets ship from the manifest',async()=>{
 const foreground = await readFile('review/animatic/foreground-night.png');
 assert.equal(foreground.readUInt32BE(16),1672);
 assert.equal(foreground.readUInt32BE(20),941);
 assert.equal(foreground[25],6,'generated foreground must retain an alpha channel');
 const html = await readFile('dist/index.html','utf8');
 assert.equal((html.match(/data-night-src=/g)||[]).length,2,'entrance retains both theme artwork layers');
 for (const name of ['backplate-night.png','foreground-night.png']) {
  const asset = valleyAssets.find(asset=>asset.source===name);
  assert.ok(asset);
  assert.ok((await readFile('dist/world/animatic/'+asset.file)).length>1000);
  assert.ok(html.includes(`data-night-src="/world/animatic/${asset.file}"`));
 }
});

test('production validator follows CSS URLs, module imports, and dynamic image URLs',async()=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'portfolio-assets-'));
 try {
  await mkdir(path.join(root,'world/animatic/clouds'),{recursive:true});
  for(const asset of valleyAssets) await writeFile(path.join(root,'world/animatic',asset.file),'fixture');
  await writeFile(path.join(root,'index.html'),'<link href="/style.css"><script type="module" src="/app.js"></script>');
  await writeFile(path.join(root,'style.css'),'body {background:url("./image.webp")}');
  await writeFile(path.join(root,'image.webp'),'fixture');
  await writeFile(path.join(root,'app.js'),'import "./module.js"; new URL("./image.webp", import.meta.url);');
  await writeFile(path.join(root,'module.js'),'export const ready=true;');
  assert.ok(await validateProductionAssets(root));
  await writeFile(path.join(root,'module.js'),'import "./missing.js";');
  await assert.rejects(validateProductionAssets(root),/Missing local reference .\/missing.js/);
  await writeFile(path.join(root,'module.js'),'new URL("./missing.webp", import.meta.url);');
  await assert.rejects(validateProductionAssets(root),/Missing local reference .\/missing.webp/);
  await writeFile(path.join(root,'module.js'),'');
  await writeFile(path.join(root,'style.css'),'body{background:url(missing.webp)}');
  await assert.rejects(validateProductionAssets(root),/Missing local reference missing.webp/);
 } finally { await rm(root,{recursive:true,force:true}); }
});
