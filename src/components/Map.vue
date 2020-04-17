<template id="">
  <div class="cover" id="map"></div>
</template>

<script type="text/javascript">
  import markers from '@/mixins/markers.js'
  import locations from '@/mixins/locations.js'
  import { Bus } from '@/mixins/bus.js'

  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        markers: {},
        infoWindows: {},
        locations: {},
        getNextPage: function() {return},
        hasNextPage: false,
        apiReadyInterval: null
      }
    },
    mixins: [markers, locations],
    computed: {
      api: function() {
        return this.$store.state.map.api.maps
      },
      place: function() {
        return this.$store.state.map.place
      }
    },
    methods: {
      closeInfoWindow(placeId) {
        this.infoWindows[placeId].close()
      },
      openInfoWindow(placeId) {
        let marker = this.markers[placeId];
        this.infoWindows[placeId].open(this.map, marker)
      },
      updateView(locations) {
        let remove = this.removeMarkers(locations)
        this.$store.dispatch('map/setCurrentSearch', {locations: locations, removeIDs: remove})
        this.addMarkers(locations)
      },
      nearbySearch() {
        var request = {
          bounds: this.map.getBounds(),
          types: ['church']
        };
        var service = new this.api.places.PlacesService(this.map),
            results = [];

        // var setNextPage = (pagination) => {
        //   this.getNextPage = (pagination) => {
        //     console.log('next')
        //     pagination.nextPage()
        //   }
        // }

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
          service.nearbySearch(request, function(resp, status) {
            if (status !== 'OK') return;
            if (status === 'ZERO_RESULTS') return results;
            processSearchResults(resp)
            // if (pagination.hasNextPage) setNextPage(pagination)
            return resolve(results)
          })
          setTimeout(function() {
            reject('search timeout')
          }, 5000)

        });
      },
      searchMap() {
        Bus.$emit('searchStart')
        this.nearbySearch().then((googleMapPlaces) => {
          let locations = {}
          googleMapPlaces.forEach((place) => {
            let location = this.getOrCreateLocation(place)
            locations[location.place.id] = location
          });
          this.updateView(locations);
        }).catch((err) => {
          console.log('places err', err)
        })
      },
      listeners() {
        this.map.addListener('dragend', () => {
          this.debounceSearchMap()
        })
        this.map.addListener('zoom_changed', () => {
          this.debounceSearchMap()
        })
        Bus.$on('mouseEnterCastle', placeId => {
          this.openInfoWindow(placeId)
        })
        Bus.$on('mouseLeaveCastle', placeId => {
          this.closeInfoWindow(placeId)
        })
      },
      subscribe() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/setPlace') {
            this.map.setCenter(this.place.latLng)
            this.debounceSearchMap()
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
        var debounce = require('lodash/debounce');
        this.debounceSearchMap = debounce(this.searchMap, 500)
        this.$store.state.map.api.maps.event.addListenerOnce(map, 'idle', () =>{
          this.debounceSearchMap()
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
