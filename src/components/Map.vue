<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';
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
  search.on('error', (err) => {
    console.error(err);
  });
  search.start();
};

onMounted(async () => {
  map = new Map('map', { debug: true });
  map.self.setView(store.location.coordinates);

  const onChange = debounce(onMapChange, 150);
  map.self.on('dragend', onChange);
  map.self.on('zoomend', onChange);

  onMapChange();
});

store.$onAction(({ name, args, after }) => {
  if (name === 'addResult') {
    let res = store.results[args[0].id];
    after((result) => {
      let marker = map.marker.create(result);
      // marker.on('click', (e) => {
      //   console.log('marker click');
      //   console.log(e.target.options.locationData.name);
      //   console.log(e.target.options.locationData.address);
      // });
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
