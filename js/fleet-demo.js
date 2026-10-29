// The live fleet: kimo's own map, running on the demo kit's invented world instead of a kimo.
// It loads when the section comes near the screen and pauses when it leaves. Without WebGL or
// modules, the screenshot stays.
import * as world from './map/world.js';
import { demoApi } from './map/map-demo.js';

const live = document.querySelector('.fleet-live');
let map = null;

new IntersectionObserver(async ([entry]) => {
  if (!entry.isIntersecting) { (await map)?.stop(); return; }
  map ||= import('./map/map.js')
    .then(({ initMap }) => {
      live.classList.add('running');
      return initMap({ api: demoApi(world) });
    })
    .catch(() => { live.classList.remove('running'); return null; });
  (await map)?.start();
}, { rootMargin: '200px' }).observe(live);
