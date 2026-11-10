import {VectorTile} from '@mapbox/vector-tile';
import {PbfReader} from 'pbf';
import {writeFile} from 'node:fs/promises';
const metadata=await (await fetch('https://tiles.openfreemap.org/planet')).json();
const results=[];
for(const [name,lon,lat] of [['P. Casal',120.9877957,14.5953397],['Arlegui',120.9905617,14.596151],['Globe Tower area',121.0501066,14.5528868]]){
 const z=14,n=2**z,x=Math.floor((lon+180)/360*n),y=Math.floor((1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*n);
 const url=metadata.tiles[0].replace('{z}',z).replace('{x}',x).replace('{y}',y);
 const response=await fetch(url),tile=new VectorTile(new PbfReader(new Uint8Array(await response.arrayBuffer())));
 const layer=tile.layers.building,buildings=[];
 if(layer)for(let i=0;i<layer.length;i++){const f=layer.feature(i);buildings.push(f.toGeoJSON(x,y,z));}
 const named=[];
 for(const key of Object.keys(tile.layers))if(key==='poi'||key==='poi_label')for(let i=0;i<tile.layers[key].length;i++){
  const f=tile.layers[key].feature(i);if(/globe|technological/i.test(f.properties.name||''))named.push(f.toGeoJSON(x,y,z));
 }
 results.push({name,url,status:response.status,buildingCount:buildings.length,withHeight:buildings.filter(f=>f.properties.render_height>0).length,named});
}
await writeFile('output/geographic-data-check.json',JSON.stringify({date:'2026-10-27',results},null,2));
console.log(JSON.stringify(results.map(({name,status,buildingCount,withHeight,named})=>({name,status,buildingCount,withHeight,named})),null,2));
