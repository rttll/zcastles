<template id="">
  <div class="cover" id="map"></div>
</template>

<script type="text/javascript">
  import map from '@/mixins/map.js'

  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        apiReadyInterval: null
      }
    },
    mixins: [map],
    computed: {
      place: function() {
        return this.$store.state.map.place
      }
    },
    methods: {
      subscribeToPlaceChange() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/setPlace') {
            // let place = mutation.payload;
            // var ll = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
            this.map.setCenter(this.place.latLng)
          }
        })
      },
      isAPIReady() {
        if (this.$store.state.map.api !== null) {
          clearInterval(this.apiReadyInterval)
          this.init()
        }
      },
      init() {

        // eslint-disable-next-line
        let map = new this.$store.state.map.api.maps.Map(document.getElementById('map'), {
          center: this.place.latLng,
          zoom: 16,
          disableDefaultUI: true
        })
        map.addListener('click', (evt) => {
          console.log(evt.latLng.lat())
        })
        this.map = map;
        this.subscribeToPlaceChange()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.apiReadyInterval = setInterval(this.isAPIReady, 10)
      })
    },
  }
</script>
