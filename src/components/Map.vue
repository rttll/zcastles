<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import 'leaflet/dist/leaflet.css';

import { useMapStore } from '@/stores/map';
import { Map } from '@/lib/map';
import { Search } from '@/services/search/places';

const store = useMapStore();
const { location } = storeToRefs(store);
let map;

const onMapChange = () => {
  store.$patch({
    bounds: map.self.getBounds(),
  });

  const bbox = store.boundsToString;
  const search = new Search(bbox);
  search.on('results', (res) => {
    store.addResults(res);
  });
  search.start();
};

onMounted(async () => {
  map = new Map('map', { debug: true });
  map.self.setView(store.location.coordinates);

  // todo: debounce
  map.self.on('dragend', onMapChange);
  map.self.on('zoomend', onMapChange);
});

store.$onAction(({ name, args, after }) => {
  if (name === 'addResult') {
    let res = store.results[args[0].id];
    after((result) => {
      let marker = map.marker.create(result);
    });
  }
});
</script>

<template>
  <section class="flex bg-gray-900 border border-pink-400 grow z-[1]">
    <h1 class="hidden">Map</h1>
    <div id="map" class="flex grow"></div>
  </section>
</template>
