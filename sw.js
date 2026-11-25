/* Däckkoll LV – gör att appen startar och fungerar utan internet */
const V='dackkoll-lv-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const EXT=['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE).then(()=>Promise.all(EXT.map(u=>fetch(u,{mode:'cors'}).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const req=e.request,u=new URL(req.url);
  if(req.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
  const ok=u.origin===location.origin||/(^|\.)cdnjs\.cloudflare\.com$|(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);if(!ok)return;
  const key=req.mode==='navigate'?'./index.html':req;
  e.respondWith(caches.open(V).then(c=>c.match(key,{ignoreSearch:req.mode==='navigate'}).then(hit=>{
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(key,r.clone());return r}).catch(()=>hit);
    return hit?(e.waitUntil(net),hit):net})))});
