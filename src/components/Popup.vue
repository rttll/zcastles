<template>
  <div>

  </div>
</template>

<script>
  import { Bus } from '@/mixins/bus'
  export default {
    name: 'Popup',
    props: {
      data: Object,
      map: Object
    },    
    data() {
      return {
        popup: null,
        id: null, 
        latLng: null
      }
    },
    created() {
      let coordinates = this.data.location.place.place.geometry.coordinates;
      this.latLng = [coordinates[1], coordinates[0]];              
      this.id = this.data.location.place.id;
      this.popup = L.popup({
        autoPan: false
        })
        .setLatLng(this.latLng)
        .setContent(
          `<div class="popup-content">
            <p>${this.data.location.price}</p>
            <p>${this.data.location.sqft}</p>
          </div>
          `
        )
    },
    mounted() {
      this.$nextTick(() => {
        Bus.$on('mouseEnterCastle', placeId => {
          if (this.id === placeId) {
            this.popup.openOn(this.map)
            this.map.setView(this.latLng)
          }
        })
        Bus.$on('mouseLeaveCastle', placeId => {
          if (this.id === placeId) {
            this.popup.closeTooltip()
          }
        })        
      })
    }
  }
</script>
