export default {
  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'map/UPDATE_FILTERS') {
        this.filterMarkers()
      }
    })    
  },
  methods: {
    filterMarkers() {
      let activeLocations = this.$store.getters['map/activeLocations']
      for (let k in this.makers) {
        let isActive = activeLocations[k] !== null
        if (isActive) {
          marker.addTo(this.map)
        } else {
          marker.remove()
        }
      }
    },
    addMarkers(locations) {
      let activeLocations = this.$store.getters['map/activeLocations']
      for (let k in locations) {
        let marker;
        let location = locations[k]
        if (typeof this.markers[location.place.id] === 'undefined') {
          marker = this.createMarker(location)
          this.markers[location.place.id] = marker;
        } else {
          marker = this.markers[location.place.id]
        }
        let isActive = activeLocations[k] !== undefined
        if (isActive) {
          marker.addTo(this.map)
        }
      }
    },
    removeMarkers() {
      let removeIDs = [];
      for (let k in this.markers) {
        let marker = this.markers[k]
        let markerIsVisible = this.map.getBounds().contains(marker.getLatLng());
        if (!markerIsVisible) {
          removeIDs.push(marker.options.id)
          marker.remove()
        }
      }
      return removeIDs
    },
    createMarker(location) {
      let icon = L.divIcon({
        className: 'marker-icon',
        html: '<div></div>'
      })
      let ll = [location.place.place.geometry.coordinates[1], location.place.place.geometry.coordinates[0]]
      let marker = L.marker(ll, {
        id: location.place.id,
        price: location.price,
        icon: icon
      })
      // this.addInfoWindow(marker, location)
      // this.addMarkerListeners(marker)
      return marker
    },
    addInfoWindow(marker, location) {
      let windowContent = `
        <span>${location.price}</span>
        <p style="font-size:9px;line-height:1.5">${location.sqft} sq ft. ${location.bedrooms} bed. ${location.bathrooms} ba.</p>
      `
      this.infoWindows[marker.id] = new this.api.InfoWindow({
        content: windowContent,
        map: null
      })
    },
    addMarkerListeners(marker) {
      this.api.event.addListener(marker, 'click', () => {
        if (this.infoWindows[marker.id].map === null) {
          this.openInfoWindow(marker.id)
        } else {
          this.closeInfoWindow(marker.id)
        }
      })
    },
  }
}
