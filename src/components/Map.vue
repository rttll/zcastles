<script setup>
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';

import img from '../../tmp/kitera-dent-z4ky2zXIjDM-unsplash.jpg';

import { Map } from '@/lib/map';

let map = null;

onMounted(async () => {
  map = new Map('map');
  map.set();

  let a = [50.5, 30.5];
  const data = {
    url: img,
    location: {
      place: {
        geometry: {
          coordinates: a,
        },
      },
      photo: {
        urls: {
          thumb: '',
        },
      },
      price: '$$$',
      sqft: 1234,
      bedrooms: 12,
      bathrooms: 123,
    },
  };

  map.self.setView(a);
  let marker = map.marker.create(data);
  marker.addTo(map.self);

  let popup = await map.popup.create(data);
  // popup.openOn(map.self);
});
</script>

<template>
  <section class="flex bg-gray-900 border border-pink-400 grow z-[1]">
    <h1 class="hidden">Map</h1>
    <div id="map" class="flex grow"></div>
  </section>
</template>
