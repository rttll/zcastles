<template id="">
  <div class="cover" id="map"></div>
</template>

<script type="text/javascript">
  // eslint-disable-next-line
  import leaflet from 'leaflet'
  import markers from '@/mixins/markers.js'
  import locations from '@/mixins/locations.js'
  import { Bus } from '@/mixins/bus.js'
  
  const axios = require('axios').default
  
  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        markers: {},
        infoWindows: {},
        locations: {}
      }
    },
    mixins: [markers, locations],
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
        this.$store.dispatch('map/updateLocations', {add: locations, remove: remove})
        this.addMarkers(locations)
      },
      getLocations(results) {
        let locations = {}
        for (let result of results) {
          let location = this.getOrCreateLocation(result)
          locations[location.place.id] = location
        }
        return locations
      },
      async searchMap() {
        let bounds = this.map.getBounds()
        // fun fact. Leaflet coordinate point order is Lat, Lng. and mapquest uses Lng, Lat.
        let bbox = 
          `${bounds.getSouthWest().lng},` +
          `${bounds.getSouthWest().lat},` +
          `${bounds.getNorthEast().lng},` +
          `${bounds.getNorthEast().lat}`;

        let url = 'https://www.mapquestapi.com/search/v4/place' + 
          '?sort=relevance&feedback=false' + 
          '&pageSize=10&page=1&q=church' + 
          `&key=${process.env.VUE_APP_MAPQUEST_KEY}` + 
          `&bbox=${bbox}`

        let mapQuestResp = await axios.get(url).then((resp) => {
          return resp;
        }).catch((err) => {
          console.log(err.response.data.error)
        })
        let f = this.getLocations(mapQuestResp.data.results)
        this.updateView(f);
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
          // console.log(this.map.getZoom())
          this.debounceSearchMap()
        })
        // Bus.$on('mouseEnterCastle', placeId => {
        //   this.openInfoWindow(placeId)
        // })
        // Bus.$on('mouseLeaveCastle', placeId => {
        //   this.closeInfoWindow(placeId)
        // })
      },
      subscribe() {
        // Can't get watch to work so subscribing instead
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/updateSearch') {
            this.map.setCenter(this.place.latLng)
            this.debounceSearchMap()
          }
        })
      },
      init() {
        
        let map = L.map('map').setView([37.69097298486733, -122.43164062500001], 8)

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
        this.searchMap()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
  }
</script>

<style lang="scss">
  @import '../../node_modules/leaflet/dist/leaflet.css';
  .marker-icon {
    background: pink;
    width: 50px;
    height: 50px;
    border: 1px solid maroon;
    border-radius: 50%;
    
  }
</style>