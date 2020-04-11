<template id="">
  <div class="search-box">
    <input id="search" type="text" value="" :class="classlist">
  </div>
</template>

<script type="text/javascript">
  import map from '@/mixins/map.js'
  export default {
    name: 'Search',
    props: {
      classlist: String
    },
    data() {
      return {
        search: null
      }
    },
    mixins: [map],
    methods: {
      placeChanged() {
        var place = this.search.getPlace();
        this.$store.dispatch('map/setPlace', {address: place.formatted_address, geometry: place.geometry})
        if (this.$router.currentRoute.name === 'Home') {
          this.$router.push('castles')
        }
      },
      init () {
        let api = this.$store.state.map.api;
        this.search = new api.maps.places.Autocomplete(
            document.getElementById('search'), {
                fields: ['formatted_address', 'geometry'],
                componentResctrictions: {'country': 'us'}
            }
        )
        this.search.addListener('place_changed', this.placeChanged)
      },

    },
    mounted () {
      this.$nextTick(() => {
        this.loadAPI().then((api) => {
          if (typeof api === 'object')
            this.$store.dispatch('map/api', api)
          this.init();
        })
      })
    }
  }
</script>

<style lang="scss">
  input {
    width: 100%;
    @include input-base();
    &.big {
      padding: 1.5rem;
      font-size: 130%;
    }
  }
</style>
