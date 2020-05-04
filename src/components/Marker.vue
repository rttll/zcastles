<template>
  <div>
    <Popup :data="popupData" :map="map" />
  </div>
</template>

<script>
  import Popup from '@/components/Popup'
  
  export default {
    name: 'MapMarker',
    components: {Popup},
    props: {
      visible: Boolean,
      location: Object,
      map: Object
    },
    data() {
      return {
        marker: null
      }
    },
    created() {
      this.createMarker()
    },
    computed: {
      popupData() {
        return {
          location: this.location
        }
      }
    },
    methods: {
      createMarker() {
        let icon = L.divIcon({
          className: 'marker-icon',
          html: '<div></div>'
        })
        let coordinates = this.location.place.place.geometry.coordinates;
        let ll = [coordinates[1], coordinates[0]];
        this.marker = L.marker(ll, {
          id: this.location.place.id,
          price: this.location.price,
          icon: icon
        })
        this.marker.addTo(this.map)
      }
    },
    destroyed() {
      this.marker.remove()
    }
  }
</script>

<style lang="scss">

  .marker-icon {
    background: rgba($primary-color, .5);
    width: 10px;
    height: 10px;
    border: 1px solid maroon;
    border-radius: 50%;
    
  }
</style>