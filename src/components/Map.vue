<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import 'leaflet/dist/leaflet.css';

import { useSearchStore } from '@/stores/search';
import { Map } from '@/lib/map';

const store = useSearchStore();
const { location } = storeToRefs(store);

let map = null;

store.$subscribe((mutation, state) => {
  // if mutation.events.key
  map.self.setView(state.location.coordinates);
});

onMounted(async () => {
  map = new Map('map');
  map.self.setView(store.location.coordinates);

  // map.self.setView(a);
  // let marker = map.marker.create(data);
  // marker.addTo(map.self);

  // let popup = await map.popup.create(data);
  // popup.openOn(map.self);
});
</script>

<template>
  <section class="flex bg-gray-900 border border-pink-400 grow z-[1]">
    <h1 class="hidden">Map</h1>
    <div id="map" class="flex grow"></div>
  </section>
</template>
