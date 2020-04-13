<template id="">
  <div class="cover" id="map"></div>
</template>

<script type="text/javascript">
  import map from '@/mixins/map.js'
  import { Bus } from '@/mixins/bus.js'

  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        markers: {},
        infoWindows: {},
        activeInfoWindow: {
          infoWindow: null,
          markerId: null
        },
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
      closeInfoWindow(placeId) {
        this.infoWindows[placeId].close()
      },
      openInfoWindow(placeId) {
        let marker = this.markers[placeId];
        this.infoWindows[placeId].open(this.map, marker)
      },
      updateMarkers() {
        // TODO: clear old markers?
        var map = this.map;
        var results = this.$store.state.map.results;
        var iconPath = this.api.SymbolPath.CIRCLE;
        var infoWindows = this.infoWindows;
        results.forEach((item) => {
          let marker = new this.api.Marker({
            id: item.place.id,
            price: item.price,
            position: item.place.geometry.location,
            icon: {
              path: iconPath,
              scale: 6
            }
          })
          infoWindows[item.place.id] = new this.api.InfoWindow({
            content: item.price,
            map: null
          })

          marker.setMap(map)
          // TODO: does removing the marker clear the listener?
          this.api.event.addListener(marker, 'click', () => {
            if (infoWindows[marker.id].map === null) {
              this.openInfoWindow(marker.id)
            } else {
              this.closeInfoWindow(marker.id)
            }
          })
          this.markers[item.place.id] = marker;
        });
      },
      searchMap() {
        this.nearbySearch().then((resp) => {
          let results = [], castles = this.$store.state.unsplashCastles;
          resp.forEach((item, i) => {
            let price = `$${(500000 + Math.floor(Math.random() * 4000000)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
            let castle;
            if (i > castles.length) {
              castle = castles[i-castles.length];
            } else {
              castle = castles[i];
            }
            let result = {
              place: item,
              photo: castle,
              price: price
            }
            results.push(result)
          });
          this.$store.dispatch('map/setResults', results)
          this.updateMarkers()
        }).catch((err) => {
          console.log('places err', err)
        })
      },
      listeners() {
        this.map.addListener('dragstart', function() {
          // TODO: Show feedback on list
        })
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
        var debounce = require('lodash/debounce');
        this.debounceSearchMap = debounce(this.searchMap, 400)
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
