<template>
  <main id="app">
    <router-view/>
  </main>
</template>

<script type="text/javascript">
  const axios = require('axios').default
  export default {
    name: 'App',
    data () {
      return {
        secrets: null,
        page: 1,
        photos: {}
      }
    },
    methods: {
      getPhotos(resolve, reject) {
        var collection = 'https://api.unsplash.com/collections/9881644/photos';
        var url = `${collection}?page=${this.page}&per_page=30&orientation=landscape&query=castles&client_id=${this.secrets.data.access}&client_secret=${this.secrets.data.secret}`;

        axios.get(url).then((resp) => {
          resp.data.forEach((item) => {
            item.googleMapPlaces = []
            this.photos[item.id] = item
          })
          if (resp.data.length < 30 ) {
            this.secrets = null;
            resolve()
          } else {
            this.page++
            this.getPhotos(resolve, reject)
          }
        })
      }
    },
    created: function() {
      let unsplashSecretsURL = 'https://us-central1-thisadrian.cloudfunctions.net/unsplash-secrets';
      if (window.location.hostname === 'localhost') {
        unsplashSecretsURL = 'http://localhost:8000/'
      }

      axios.get(unsplashSecretsURL).then((resp) => {
        this.secrets = resp;
        new Promise((resolve, reject) => {
          this.getPhotos(resolve, reject)
        }).then(() => {
          this.$store.dispatch('addPhotos', {photos: this.photos})
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/app.scss'
</style>
