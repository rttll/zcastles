<template id="">
  <div class="cover" id="map">
    <div v-if="this.map !== null">
      <MapMarker 
        v-for="location in activeLocations" 
        :key="location.place.id" 
        :location="location"
        :map="map" 
      />
    </div>
  </div>
  
</template>

<script type="text/javascript">
  // eslint-disable-next-line
  import leaflet from 'leaflet'
  import MapMarker from '@/components/Marker.vue'
  import locations from '@/mixins/locations.js'
  import remote from '@/services/remote-api-proxy.js'
  import NProgress from 'nprogress'
  import { Bus } from '@/mixins/bus.js'
  import { mapGetters} from 'vuex'

  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        infoWindows: {},
        locations: {}
      }
    },
    components: {MapMarker},
    computed: {
      ...mapGetters(['map/currentSearch', 'photosReady']),
      activeLocations: function() {
        return this.$store.getters['map/activeLocations']
      }  
    },
    mixins: [locations],
    methods: {
      closeInfoWindow(placeId) {
        this.infoWindows[placeId].close()
      },
      openInfoWindow(placeId) {
        let marker = this.markers[placeId];
        this.infoWindows[placeId].open(this.map, marker)
      },
      updateView(searchResults) {
        let locations = this.getLocations(searchResults)
        this.$store.dispatch('map/updateLocations', locations)
        console.log(Object.keys(this.$store.state.map.locations).length)
        console.log(Object.keys(this.activeLocations).length)
        NProgress.done()
      },
      getLocations(results) {
        let locations = {}
        for (let result of results) {
          let location = this.getOrCreateLocation(result)
          locations[location.place.id] = location
        }
        return locations
      },
      searchMap() {
        NProgress.start()
        let bounds = this.map.getBounds()
        // fun fact. Leaflet coordinate point order is Lat, Lng. and mapquest uses Lng, Lat.
        let bbox = 
          `${bounds.getSouthWest().lng},` +
          `${bounds.getSouthWest().lat},` +
          `${bounds.getNorthEast().lng},` +
          `${bounds.getNorthEast().lat}`;

        remote.search(bbox).then((resp) => {
          if (resp.status === 200) {
            this.updateView(resp.results);
          } else {
            console.log(resp)
          }
        }).catch((err) => {
          console.log(err)
        })
        
      },
      listeners() {
        this.map.on('click', (e) => {
          console.log(e)
        })
        this.map.on('dragend', () => {
          Bus.$emit('searchStart')
          this.debounceSearchMap()
        })
        this.map.on('zoomend', () => {
          Bus.$emit('searchStart')
          this.debounceSearchMap()
        })
      },
      subscribe() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/UPDATE_SEARCH') {
            const center = mutation.payload.place.geometry.coordinates
            this.map.setView([center[1], center[0]])
            // this.debounceSearchMap()
          }
        })
      },
      init() {
        let map = L.map('map', {
          zoomControl: false,
          zoom: 8
        })
        const currentSearch = this['map/currentSearch']
        const defaultView = [37.69097298486733, -122.43164062500001]
        if (currentSearch !== null) {
          const center = currentSearch.place.geometry.coordinates
          map.setView([center[1], center[0]])
        } else {
          map.setView(defaultView)
        }
        // eslint-disable-next-line
        const zoom = L.control.zoom({position: 'bottomright'}).addTo(map)

        var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
        });
        map.addLayer(Stamen_Toner);
        
        this.map = map;
        
        this.subscribe();
        this.listeners();
        var debounce = require('lodash/debounce');
        this.debounceSearchMap = debounce(this.searchMap, 500)
        
        if (this.photosReady) {
          this.searchMap()
        } else {
          var interval = setInterval(() => {
            if (this.photosReady) {
              clearInterval(interval)
              this.searchMap()
            }
          }, 10);        
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        NProgress.configure({ minimum: 0.1 });
        NProgress.start()
        this.init()
      })
    },
  }
</script>

<style lang="scss">
  @import '../../node_modules/leaflet/dist/leaflet.css';
  @import '../../node_modules/nprogress/nprogress.css';

  // Popup styles have to go here, after leaflet.css
  // because popup.vue css is rendered above this component
  .leaflet-popup-content {
    display: flex;
    img {
      height: 40px;
      width: auto;
    }
    img + div {
      padding-left: .5rem
    }
    p {
      margin: 0;
      white-space: nowrap;
    }
  }
  
  #nprogress {
    .bar {
      background: $primary-color;
      .peg {
        box-shadow: 0 0 10px $primary-color, 0 0 5px $primary-color;
      }
    }
    .bar, .spinner {
      z-index: 3000;
    }
    .spinner-icon {
      border-top-color: $primary-color;
      border-left-color: $primary-color;
    }
  }
</style>