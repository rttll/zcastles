export default {
  methods: {
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
    }
  }
}
