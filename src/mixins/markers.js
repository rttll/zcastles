export default {
  methods: {
    addMarkers(locations) {
      for (let k in locations) {
        let marker;
        let location = locations[k]
        if (typeof this.markers[location.place.id] === 'undefined') {
          marker = this.createMarker(location)
          this.markers[location.place.id] = marker;
        } else {
          marker = this.markers[location.place.id]
        }
        marker.setMap(this.map)
      }
    },
    removeMarkers() {
      let removeIDs = [];
      for (let k in this.markers) {
        let marker = this.markers[k]
        if (!this.map.getBounds().contains(marker.position)) {
          removeIDs.push(marker.id)
          marker.setMap(null);
        }
      }
      return removeIDs
    },
    createMarker(location) {
      let iconPath = this.api.SymbolPath.CIRCLE;
      let marker = new this.api.Marker({
        id: location.place.id,
        price: location.price,
        position: location.place.geometry.location,
        icon: {
          path: iconPath,
          scale: 6
        }
      })
      this.addInfoWindow(marker, location)
      this.addMarkerListeners(marker)
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
