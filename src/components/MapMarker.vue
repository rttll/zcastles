<script>
import Popup from '@/components/Popup';
import { Bus } from '@/mixins/bus.js';

export default {
  name: 'MapMarker',
  components: { Popup },
  props: {
    visible: Boolean,
    location: Object,
    map: Object,
  },
  data() {
    return {
      marker: null,
    };
  },
  created() {
    this.createMarker();
    this.map.on({
      zoomend: () => {
        this.mapChanged();
      },
      dragend: () => {
        this.mapChanged();
      },
    });
    // Emitted after map updates, after search changes.
    // This is the most reliable way of knowing the map is done moving.
    Bus.$on('searchDone', () => {
      this.mapChanged();
    });
  },
  computed: {
    popupData() {
      return {
        location: this.location,
      };
    },
  },
  methods: {
    mapChanged() {
      let markerIsVisible = this.map
        .getBounds()
        .contains(this.marker.getLatLng());
      if (!markerIsVisible) {
        this.$store.dispatch('map/updateLocations', {
          markerRemoved: true,
          remove: this.marker.options.id,
        });
      }
    },
    createMarker() {
      let icon = L.divIcon({
        className: 'marker-icon',
        html: '<div></div>',
      });
      let coordinates = this.location.place.place.geometry.coordinates;
      let ll = [coordinates[1], coordinates[0]];
      this.marker = L.marker(ll, {
        id: this.location.place.id,
        price: this.location.price,
        icon: icon,
      });
      this.marker.addTo(this.map);
    },
  },
  destroyed() {
    this.marker.remove();
  },
};
</script>

<template>
  <div>
    <Popup :data="popupData" :map="map" />
  </div>
</template>

<style lang="scss">
.marker-icon {
  background: rgba($primary-color, 0.5);
  width: 10px;
  height: 10px;
  border: 1px solid maroon;
  border-radius: 50%;
}
</style>
