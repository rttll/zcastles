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
    mixins: [map],
    methods: {
      init () {
        let g = this.$store.state.map.api;
        let search = new g.maps.places.Autocomplete(
            document.getElementById('search'), {
                fields: ['formatted_address', 'geometry'],
                componentResctrictions: {'country': 'us'}
            }
        )
        search.addListener('place_changed', function() {
            // marker.setMap(null)
            // onPlaceChanged()
        });
        // this.$router.push('castles')
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
