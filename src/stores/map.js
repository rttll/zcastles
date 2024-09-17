import { defineStore } from 'pinia';
import { useImageStore } from '@/stores/images';

const imageStore = useImageStore();
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
  getResultById: (state) => {
    return (id) => state.results[id];
  },
};

export const useMapStore = defineStore('map', {
  state: () => {
    return {
      map: null,
      bounds: null,
      prediction: null,
      location: {
        coordinates: [37.69097298486733, -122.43164062500001],
      },
      results: {},
      focusedId: null,
    };
  },
  actions: {
    setBounds(data) {
      return new Promise((resolve, reject) => {
        this.bounds = data;
        resolve(data);
      });
    },
    addResult(data) {
      return new Promise((resolve, reject) => {
        const res = {
          id: data.id,
          // Reverse coord order. Mapquest style to Leaflet style
          coordinates: [
            data.place.geometry.coordinates[1],
            data.place.geometry.coordinates[0],
          ],
          address: data.place.properties,
          name: data.name,
          image: data.image,
          visible: true,
        };

        // Get image from the image store
        res.image = imageStore.getImage();

        this.results[data.id] = res;
        resolve(res);
      });
    },
    addResults(results) {
      for (const res of results) {
        const isNew = this.results[res.id] === undefined;
        const isMatch =
          res.place.properties.street.match(/[c|C]hurch/) === null;

        if (isNew && isMatch) {
          this.addResult(res);
        }
      }
    },
  },
  getters,
});
