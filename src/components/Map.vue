<template id="">
  <div class="cover" id="map"></div>
</template>

<script type="text/javascript">
  import map from '@/mixins/map.js'
  export default {
    name: 'Map',
    data() {
      return {
        apiReadyInterval: null,
      }
    },
    mixins: [map],
    methods: {
      isAPIReady() {
        if (this.$store.state.map.api !== null) {
          clearInterval(this.apiReadyInterval)
          this.init()
        }
      },
      init() {
        // eslint-disable-next-line
        let map = new this.$store.state.map.api.maps.Map(document.getElementById('map'), {
          center: {
            lat: 37.758868753957636,
            lng: -122.43455562331151
          },
          zoom: 16,
          disableDefaultUI: true
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.apiReadyInterval = setInterval(this.isAPIReady, 10)
      })
    },
  }
</script>
