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
        getNextPage: function() {return},
        hasNextPage: false,
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
        var locations = this.$store.state.map.currentSearch.locations;
        var iconPath = this.api.SymbolPath.CIRCLE;
        var infoWindows = this.infoWindows;
        locations.forEach((item) => {
          let marker = new this.api.Marker({
            id: item.place.id,
            price: item.price,
            position: item.place.geometry.location,
            icon: {
              path: iconPath,
              scale: 6
            }
          })
          let windowContent = `
            <span>${item.price}</span>
            <p style="font-size:9px;line-height:1.5">${item.sqft} sq ft. ${item.bedrooms} bed. ${item.bathrooms} ba.</p>
          `
          infoWindows[item.place.id] = new this.api.InfoWindow({
            content: windowContent,
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
      nextAvailablePhoto(googleMapPlace) {
        let photos = this.$store.state.photos, keys = Object.keys(photos);
        var i = 0, nextAvailable = null;
        while (nextAvailable === null) {
          var thisPhoto = photos[keys[i]];
          if (thisPhoto.googleMapPlaces.length === 0 ) {
            nextAvailable = thisPhoto
          } else if (i === keys.length-1) {
            nextAvailable = photos[keys[0]]
          } else {
            var nextPhoto = photos[keys[i+1]]
            if (nextPhoto.googleMapPlaces.length < thisPhoto.googleMapPlaces.length) {
              nextAvailable = nextPhoto
            } else {
              i++
            }
          }
        }
        this.$store.dispatch('addGoogleMapPlaceIDToPhoto', {photoID: nextAvailable.id, googleMapPlaceID: googleMapPlace.id})
        return nextAvailable;
      },
      getOrCreateLocation(googleMapPlace) {
        let locations = this.$store.state.map.locations;
        let location = locations[googleMapPlace.id];
        if (typeof location === 'undefined') {
          let photo = this.nextAvailablePhoto(googleMapPlace)
          location = {
            place: googleMapPlace,
            photo: photo,
            price: `$${(Math.floor(Math.random() * 10000000)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
            bedrooms: Math.floor(Math.random() * 30),
            bathrooms: Math.floor(Math.random() * 20),
            sqft: `${(100000 + Math.floor(Math.random() * 100000)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
          }
          this.$store.dispatch('map/addLocation', {id: googleMapPlace.id, location: location})
        }
        return location;
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
        this.nearbySearch().then((places) => {
          let locations = []
          places.forEach((googleMapPlace) => {
            let location = this.getOrCreateLocation(googleMapPlace)
            locations.push(location)
          });
          // this.getNextPage()
          this.$store.dispatch('map/setCurrentSearch', {locations: locations})
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
          if (mutation.type === 'map/setCurrentSearch') {
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
