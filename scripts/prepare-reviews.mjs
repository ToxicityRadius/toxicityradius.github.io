import {cp, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {prepareWorkshopReview} from './review-workshop.mjs';
import {prepareExperienceReview} from './review-experience.mjs';

export async function prepareReviews(root = path.resolve('dist')) {
 await prepareWorkshopReview(root);
 await prepareExperienceReview(root);
 for (const review of ['animatic', 'gallery', 'riverline']) await cp('review/' + review, path.join(root, 'review', review), {recursive:true});
 const vendor = path.join(root, 'review/riverline/vendor');
 await mkdir(vendor, {recursive:true});
 for (const file of ['three.module.js', 'three.core.js']) await cp('node_modules/three/build/' + file, path.join(vendor, file));
 await cp('node_modules/three/LICENSE', path.join(vendor, 'THREE-LICENSE.txt'));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
 await prepareReviews();
 console.log('Prepared development review routes in dist/review');
}
