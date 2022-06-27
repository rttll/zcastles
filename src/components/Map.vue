<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import 'leaflet/dist/leaflet.css';

import { useSearchStore } from '@/stores/search';
import { Map } from '@/lib/map';
import { places } from '@/services/search';

const store = useSearchStore();
const { location } = storeToRefs(store);

let map = null;

// Initialize the map
onMounted(async () => {
  map = new Map('map');
  map.self.setView(store.location.coordinates);

  map.self.on('dragend', () => {
    let bounds = map.self.getBounds();
    // fun fact. Leaflet coordinate point order is Lat, Lng. and mapquest uses Lng, Lat.
    let bbox =
      `${bounds.getSouthWest().lng},` +
      `${bounds.getSouthWest().lat},` +
      `${bounds.getNorthEast().lng},` +
      `${bounds.getNorthEast().lat}`;

    const res = places(bbox);
  });
  // this.map.on('zoomend', () => {
  //   this.debounceSearchMap()
  //   thi
});

store.$subscribe((mutation, state) => {
  // if mutation.events.key
  map.self.setView(state.location.coordinates);
});
</script>

<template>
  <section class="flex bg-gray-900 border border-pink-400 grow z-[1]">
    <h1 class="hidden">Map</h1>
    <div id="map" class="flex grow"></div>
  </section>
</template>
