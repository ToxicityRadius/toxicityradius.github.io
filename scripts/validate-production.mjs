import {readdir, readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {valleyAssets} from './valley-assets.mjs';

export async function validateProductionAssets(root) {
 root = path.resolve(root);
 const files = [];
 async function walk(directory) {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
   const file=path.join(directory,entry.name);
   if(entry.isDirectory()) await walk(file); else files.push(file);
  }
 }
 await walk(root);
 if(files.some(file=>path.relative(root,file).split(path.sep).includes('review'))) throw new Error('Production contains review output');
 async function check(url, file) {
  if(!url || /^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(url)) return;
  const pathname=decodeURIComponent(url.split(/[?#]/)[0]);
  let target=pathname.startsWith('/')?path.join(root,pathname):path.resolve(path.dirname(file),pathname);
  if(target!==root&&!target.startsWith(root+path.sep)) throw new Error(`Asset escapes output: ${url}`);
  try {
   if((await stat(target)).isDirectory()) target=path.join(target,'index.html');
   if(!(await stat(target)).isFile()) throw new Error('Not a file');
  } catch { throw new Error(`Missing local reference ${url} in ${path.relative(root,file)}`); }
 }
 for(const file of files) {
  const extension=path.extname(file);
  if(!['.html','.css','.js'].includes(extension)||file.includes(path.sep+'vendor'+path.sep)) continue;
  const source=await readFile(file,'utf8');
  const references=extension==='.html'?[...source.matchAll(/(?:href|src|poster)=["']([^"']+)["']/g)]:
   extension==='.css'?[...source.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)]:
   [...source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|\bnew URL\(\s*)["']([^"']+)["']/g)];
  for(const [,url] of references) await check(url,file);
 }
 // These images are also decoded by the entrance canvas at runtime.
 for(const asset of valleyAssets) await check('/world/animatic/'+asset.file,path.join(root,'index.html'));
 return files.length;
}
