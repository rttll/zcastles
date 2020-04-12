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
      api: function() {
        return this.$store.state.map.api.maps
      },
      place: function() {
        return this.$store.state.map.place
      }
    },
    methods: {
      getPlaces() {
        var request = {
              bounds: this.map.getBounds(),
              types: ['church']
            },
            api = new this.$store.state.map.api.maps.places.PlacesService(this.map);
        // TODO: make an easier way to get to this.$store.state.map.api.
        return new Promise(function(resolve, reject) {
          api.nearbySearch(request, function(resp, status) {
            // TODO: check status
            console.log(status)
            let results = [];
            resp.forEach((item) => {
              results.push({
                address: item.formatted_address,
                geometry: item.geometry
              })
            });
            return resolve(results)
          })
          setTimeout(function() {
            reject('no')
          }, 5000)

        });
      },
      updateMarkers(res) {
        var map = this.map,
            markers = {},
            iconPath = this.api.SymbolPath.CIRCLE;
        res.forEach((item, i) => {
          markers[i] = new this.api.Marker({
            position: item.geometry.location,
            icon: {
              path: iconPath,
              scale: 6
            },
            map: map
          })
        });
      },
      getCastles() {
        // TODO: debounce
        this.getPlaces().then((res) => {
          this.$store.dispatch('map/setResults', res)
          // TODO: clear old markers?
          this.updateMarkers(res)
        }).catch((err) => {
          console.log('places err', err)
        })
      },
      listeners() {
        this.map.addListener('dragstart', function() {
          // TODO: Show feedback on list
        })
        this.map.addListener('dragend', () => {
          this.getCastles()
        })
        this.map.addListener('zoom_changed', () => {
          this.getCastles()
        })
      },
      subscribe() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/setPlace') {
            this.map.setCenter(this.place.latLng)
            this.getCastles()
          }
        })

      },
      isAPIReady() {
        // TODO: Could subscribe to store instead of using interval
        if (this.$store.state.map.api !== null) {
          clearInterval(this.apiReadyInterval)
          this.init()
        }
      },
      init() {
        // eslint-disable-next-line
        let map = new this.api.Map(document.getElementById('map'), {
          center: this.place.latLng,
          zoom: 16,
          disableDefaultUI: true
        })
        this.map = map;
        this.subscribe();
        this.listeners();
        this.$store.state.map.api.maps.event.addListenerOnce(map, 'idle', () =>{
          this.getCastles()
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.apiReadyInterval = setInterval(this.isAPIReady, 10)
      })
    },
  }
</script>
