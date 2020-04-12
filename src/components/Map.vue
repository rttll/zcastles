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
      nearbySearch() {
        var request = {
          bounds: this.map.getBounds(),
          types: ['church']
        };
        var api = new this.api.places.PlacesService(this.map),
          results = [];

        function processSearchResults(resp) {
          resp.forEach((item) => {
            results.push({
              id: item.id,
              address: item.vicinity,
              geometry: item.geometry
            })
          });
        }

        return new Promise(function(resolve, reject) {
          api.nearbySearch(request, function(resp, status) {
            if (status !== 'OK') return;
            if (status === 'ZERO_RESULTS') return results;
            processSearchResults(resp)
            // if (pagination.hasNextPage) {
            //   console.log('yes')
            //   pagination.nextPage();
            // } else {
            //   console.log('no')
            // }
            return resolve(results)
          })
          setTimeout(function() {
            reject('search timeout')
          }, 5000)

        });
      },
      updateMarkers(results) {
        // TODO: clear old markers?
        var map = this.map,
            markers = {},
            iconPath = this.api.SymbolPath.CIRCLE;
        // var results = this.$store.state.map.results;
        results.forEach((item, i) => {
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
      searchMap() {
        // TODO: debounce
        this.nearbySearch().then((res) => {
          this.$store.dispatch('map/setResults', res)
        }).catch((err) => {
          console.log('places err', err)
        })
      },
      listeners() {
        this.map.addListener('dragstart', function() {
          // TODO: Show feedback on list
        })
        this.map.addListener('dragend', () => {
          this.searchMap()
        })
        this.map.addListener('zoom_changed', () => {
          this.searchMap()
        })
      },
      subscribe() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/setPlace') {
            this.map.setCenter(this.place.latLng)
            this.searchMap()
          }
          if (mutation.type === 'map/setResults') {
            this.updateMarkers(mutation.payload)
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
          this.searchMap()
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
