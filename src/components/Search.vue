<template id="">
  <div class="search-box">
    <input id="search" type="text" ref="search" :class="classlist" :value="getValue" @focus="clearValue" @blur="setValue">
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
    computed: {
      getValue() {
        return this.$store.state.map.place.address
      }
    },
    methods: {
      clearValue() {
        this.$refs.search.value = ''
      },
      setValue() {
        this.$refs.search.value = this.getValue
      },
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
