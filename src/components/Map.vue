<script setup>
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';

import img from '../../tmp/kitera-dent-z4ky2zXIjDM-unsplash.jpg';

import { Map } from '../composables/map';
// import MapMarker from './MapMarker.vue';

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
  <div id="map" class="flex w-full h-full bg-gray-900"></div>
</template>
