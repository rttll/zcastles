<template>
  <main id="app">
    <router-view/>
  </main>
</template>

<script type="text/javascript">
  const axios = require('axios').default
  export default {
    name: 'App',
    created: function() {
      // Local? Run: `npm run unsplash`
      let unsplashSecretsURL = 'https://us-central1-thisadrian.cloudfunctions.net/unsplash-secrets';
      if (window.location.hostname === 'localhost') {
        unsplashSecretsURL = 'http://localhost:8000/'
      }
      axios.get(unsplashSecretsURL).then((resp) => {
        let perPage = 30, query = 'castles', api = 'https://api.unsplash.com/collections/9881644/photos';
        let url = `${api}?page=1&per_page=${perPage}&orientation=landscape&query=${query}&client_id=${resp.data.access}&client_secret=${resp.data.secret}`
        axios.get(url).then((resp) => {
          this.$store.dispatch('addUnsplashCastles', {castles: resp.data})
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
