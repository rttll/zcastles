<template>
  <main id="app">
    <router-view/>
  </main>
</template>

<script type="text/javascript">
  import remote from '@/services/remote-api-proxy.js'
  export default {
    name: 'App',
    data () {
      return {
        secrets: null,
        page: 1,
        photos: {}
      }
    },   
    created: function() {  
      remote.photos().then((resp) => {
        this.$store.dispatch('addPhotos', {photos: resp})
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/app.scss'
</style>
