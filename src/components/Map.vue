<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';
import 'leaflet/dist/leaflet.css';

import { useMapStore } from '@/stores/map';
import { Map } from '@/lib/map';
import * as Marker from '@/lib/map/marker.jsx';
import { Search } from '@/services/search/places';

const store = useMapStore();
const { location } = storeToRefs(store);

// Initialize map
onMounted(async () => {
  store.map = new Map('map', { debug: true });
  store.map.self.setView(store.location.coordinates);

  const onChange = debounce(onMapChange, 150);
  store.map.self.on('dragend', onChange);
  store.map.self.on('zoomend', onChange);

  onMapChange();
});

// Update search and results, markers, on map move
const onMapChange = () => {
  store.setBounds(store.map.self.getBounds());

  // store.$patch({
  // });

  // Search visible map and add results to the store
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

// Watch for new results added to store and create markers
store.$onAction(({ name, args, after }) => {
  if (name !== 'addResult') return;
  // let res = store.results[args[0].id];
  after((result) => {
    Marker.create(result).then((marker) => {
      marker.addTo(store.map.self);

      marker.on('click', (e) => {
        console.log('marker click');
        console.log(e.target.options);
      });
    });
  });
});
</script>

<template>
  <section class="flex bg-gray-900 border border-pink-400 grow z-[1]">
    <h1 class="hidden">Map</h1>
    <div id="map" class="flex grow"></div>
  </section>
</template>
