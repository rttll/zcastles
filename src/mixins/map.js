
export default {
  methods: {
    mapBoundsChanged() {
      // updateCurrentResults()
      // getResultsFromView()
      // updateCardList()
    },
    loadAPI() {
      if (this.$store.state.map.api !== null) {
        return Promise.resolve(true)
      } else {
        return new Promise(function(resolve, reject) {
          let el = document.createElement('script');
          let key = 'AIzaSyDCvPfZK8KSP7Gsr5Fs8zzDbNhWonS-Q70';
          el.type = 'text/javascript';
          el.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=googleAPILoaded`;
          document.getElementsByTagName('body')[0].appendChild(el)

          window.googleAPILoaded = function() {
            resolve(window.google)
            // slow it down for testing maps component
            // setTimeout(function(){resolve(window.google)}, 3000)
          }

          setTimeout(function() {
            if (!window.google) {
              reject('no google')
            }
          }, 5000)

        });
      }
    }
  }
}
