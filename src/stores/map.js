import { defineStore } from 'pinia';
import { useImageStore } from '@/stores/images';

const getters = {
  // Fun fact. Leaflet coordinate point order is Lat, Lng. and mapquest uses Lng, Lat.
  boundsToString() {
    return [
      this.bounds.getSouthWest().lng,
      this.bounds.getSouthWest().lat,
      this.bounds.getNorthEast().lng,
      this.bounds.getNorthEast().lat,
    ].join(',');
  },
};

export const useMapStore = defineStore('map', {
  state: () => {
    return {
      prediction: null,
      location: {
        coordinates: [37.69097298486733, -122.43164062500001],
      },
      bounds: null,
      results: {},
    };
  },
  actions: {
    addResult(data) {
      return new Promise((resolve, reject) => {
        const res = {
          id: data.id,
          // Reverse coord order. Mapquest style to Leaflet style
          coordinates: [
            data.place.geometry.coordinates[1],
            data.place.geometry.coordinates[0],
          ],
          address: data.properties,
          name: data.name,
          image: data.image,
        };
        this.results[data.id] = res;
        resolve(res);
      });
    },
    addResults(results) {
      for (const res of results) {
        if (!this.results[res.id]) {
          const imageStore = useImageStore();
          let keys = Object.keys(imageStore.images);
          res.image = imageStore.images[keys[0]];

          this.addResult(res);
        }
      }
    },
  },
  getters,
});