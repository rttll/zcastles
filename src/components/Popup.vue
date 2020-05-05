<script>
  import { Bus } from '@/mixins/bus'
  import util from '@/assets/js/util'

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
        autoPan: false,
        closeButton: false
        })
        .setLatLng(this.latLng)
        .setContent(
          `
            <img src="${this.data.location.photo.urls.thumb}" />
            <div class="content">
              <p>$${util.decimal(this.data.location.price)}</p>
              <p class="">${this.data.location.bedrooms} bed. ${this.data.location.bathrooms} ba.</p>
              <p class="">${util.delimiters(this.data.location.sqft)} sq ft.</p>
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
            this.popup.remove()
          }
        })        
      })
    },
    render() {
      return null
    }
  }
</script>


<style lang="scss">
  // Popup styles are in Map.vue
</style>
