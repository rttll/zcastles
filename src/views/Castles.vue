<template id="">
  <div class="view">
    <CastleDetail />
    <div class="f-row border-bottom">
      <div class="f-item-3 f-item-medium-6">
        <Search :showCurrentSearch="this.getShowCurrentSearch" />
      </div>
      <Logo />
    </div>

    <div class="f-row stretch f-item grow">
      <div class="f-item-6 collapse">
        <Map />
      </div>

      <div class="f-item-6">
        <header>
          <h3>Castles for Sale</h3>
          <div class="f-row collapse-sides beanimate">
            <p class="f-item">{{searchCount}} results</p>
            <!-- <div class="f-item">
              sorty by
              <select class="" name="">
                <option value="">foo</option>
              </select>
            </div> -->
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
  import CastleDetail from '@/components/CastleDetail.vue'

  import { Bus } from '@/mixins/bus.js'

  export default {
    name: 'Castles',
    components: {Logo, Search, Map, List, CastleDetail},
    data () {
      return {
        showCurrentSearch: true,
        searchCount: 0,
        searchAnimator: {
          interval: null,
          newCount: 0
        }
      }
    },
    computed: {
      getShowCurrentSearch: function() {
        return this.showCurrentSearch
      }
    },
    methods: {
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
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'map/SET_CURRENT_SEARCH') {
          document.getElementById('list').classList.remove('searching')
          let newCount = Object.keys(state.map.currentSearch).length;
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
