import http from 'node:http';
import { readFile, stat, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import {prepareWorkshopReview} from './review-workshop.mjs';
import {prepareExperienceReview} from './review-experience.mjs';
const root = path.resolve('dist');
await prepareWorkshopReview(root);
await prepareExperienceReview(root);
await cp('review/animatic', path.join(root, 'review/animatic'), { recursive: true });
await cp('review/gallery', path.join(root, 'review/gallery'), { recursive: true });
await cp('review/riverline', path.join(root, 'review/riverline'), { recursive: true });
await mkdir(path.join(root, 'review/riverline/vendor'), { recursive: true });
await cp('node_modules/three/build/three.module.js', path.join(root, 'review/riverline/vendor/three.module.js'));
await cp('node_modules/three/build/three.core.js', path.join(root, 'review/riverline/vendor/three.core.js'));
await cp('node_modules/three/LICENSE', path.join(root, 'review/riverline/vendor/THREE-LICENSE.txt'));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf'};
http.createServer(async (req,res) => {
  try {
    let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error('path');
    if ((await stat(file)).isDirectory()) file = path.join(file,'index.html');
    res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch {
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end(await readFile(path.join(root,'404.html')));
  }
}).listen(4173,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:4173'));
