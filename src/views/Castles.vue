<template id="">
  <div class="view">
    <div
      class="task-bg"
      v-if="isDetailOpen"
    >
      <router-view/>
    </div>
    <div class="f-row between border-bottom transparent-bg-9 fixed-medium">
      <div class="f-item-3 f-item-medium-6">
        <Search :showCurrentSearch="this.getShowCurrentSearch" />
      </div>
      <div class="f-item">
        <div class="f-row">
          <div class="f-item">
            <Range @changed="rangeChanged" :default="defaultPriceRange" /> 
          </div>
          <div class="f-item">
            <Select @input="bedroomsChanged" :options="bedOptions" name="Min. Bedrooms" v-model="bedrooms" />
          </div>
          <div class="f-item">
            <Select @input="bathroomsChanged" :options="bathOptions" name="Min. Bathrooms" v-model="bathrooms" />
          </div>
        </div>
      </div>
      <Logo />
    </div>

    <header class="show-small-only border-bottom">
      <div class="f-row between">
        <div class="f-item">
          <div class="f-row between">
            <h3 class="f-item">Castles for Sale</h3>
            <p class="f-item">{{searchCount}} results</p>
          </div>
        </div>

        <nav class="f-item">
          <ul class="f-row">
            <li @click.prevent="toggleView('map')">Map</li>
            <li @click.prevent="toggleView('list')">List</li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="f-row stretch f-item grow">
      <div class="f-item-6 f-item-small-12 collapse" :class="this.mapClass">
        <Map />
      </div>

      <div class="f-item-6 hide-small-only clear-fixed border-left shadow-left" :class="this.listClass">
        <header class="hide-small-only f-row between">
          <div class="f-item collapse">
            <h3>Castles for Sale</h3>
          </div>
          <div class="f-item collapse">
            <div class="f-row collapse-sides beanimate">
              <p class="f-item">{{searchCount}} results</p>
            </div>  
          </div>
        </header>

        <List id="list" ref="list" class="f-row wrap start" />
      </div>
    </div>

  </div>
</template>

<script type="text/javascript">
  import Search from '@/components/Search.vue'
  import Map from '@/components/Map.vue'
  import List from '@/components/List.vue'
  import Logo from '@/components/Logo.vue'
  import Range from '@/components/Range.vue'
  import Select from '@/components/Select.vue'
  
  import { Bus } from '@/mixins/bus.js'

  import {mapGetters} from 'vuex'
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields} = createHelpers({
    getterType: 'map/getMapField',
    mutationType: 'map/updateMapField'
  })

  export default {
    name: 'Castles',
    components: {Logo, Search, Map, List, Range, Select},
    data () {
      return {
        mapClass: '',
        listClass: '',
        showCurrentSearch: true,
        searchCount: 0,
        searchAnimator: {
          interval: null,
          newCount: 0
        }
      }
    },
    computed: {
      ...mapFields(['filters.prince', 'filters.bedrooms', 'filters.bathrooms']),
      ...mapGetters(['map/filters']),
      bedOptions() {
        let options = {}
        for (let i = 1; i < 11; i++) {
          options[`${i}`] = i
        }
        return options
      },
      bathOptions() {
        let options = {}
        for (let i = 1; i < 6; i++) {
          options[`${i}`] = i
        }
        return options
      },      
      defaultPriceRange () {
        return {
          low: this['map/filters'].minPrice,
          high: this['map/filters'].maxPrice
        }
      },      
      isDetailOpen () {
        return this.$route.name === 'detail'
      },
      getShowCurrentSearch: function() {
        return this.showCurrentSearch
      }
    },
    methods: {   
      bedroomsChanged: function(value) {
        this.$store.dispatch('map/updateFilters', {bedrooms: value})
      },
      bathroomsChanged: function(value) {
        this.$store.dispatch('map/updateFilters', {bathrooms: value})
      },
      rangeChanged: function(range) {
        this.$store.dispatch('map/updateFilters', range)
      },
      toggleView: function(view) {
        this.mapClass = view === 'map' ? 'f-item-small-12 show' : 'hide'
        this.listClass = view === 'list' ? 'f-item-small-12 show' : 'hide'
      },
      animate: function() {
        if (this.searchAnimator.newCount > this.searchCount) {
          this.searchCount++
        } else {
          this.searchCount--
        }
        if (this.searchAnimator.newCount === this.searchCount) {
          clearInterval(this.searchAnimator.interval);
        }
      }
    },
    mounted() {
      Bus.$on('searchStart', () => {
        document.getElementById('list').classList.add('searching')
      })
      Bus.$on('clickedCastle', id => {
        this.$router.push({name: 'detail', params: {id: id}})
      })      
      this.$store.subscribe((mutation) => {
        if (mutation.payload.markerRemoved !== undefined) return
        if (mutation.type === 'map/UPDATE_LOCATIONS' || mutation.type === 'map/updateMapField' || mutation.type === 'map/UPDATE_FILTERS') {
          document.getElementById('list').classList.remove('searching')
          let newCount = Object.keys(this.$store.getters['map/activeLocations']).length;
          let dif = Math.abs(this.searchCount - newCount);
          this.searchAnimator.newCount = newCount;
          if (dif !== 0) {
            this.searchAnimator.interval = setInterval(this.animate, 300/dif)
          }
        }
      })
    }
  }
</script>


<style lang="scss" scoped>
  .logo {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 2000;
  }
</style>

