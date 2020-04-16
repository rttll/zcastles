<template id="">
  <div class="view">
    <CastleDetail />
    <div class="f-row border-bottom">
      <div class="f-item-3">
        <Search :showCurrentSearch=showCurrentSearch />
      </div>
      <Logo />
      <!-- <div class="f-item">
        <button type="button" name="button">For Sale</button>
      </div> -->
    </div>

    <div class="f-row stretch f-item grow">
      <div class="f-item-6 collapse">
        <Map ref="map" />
      </div>

      <div class="f-item-6">
        <header>
          <h3>Castles for Sale</h3>
          <div class="f-row collapse-sides between">
            <p class="f-item">{{searchCount}} results</p>
            <!-- <div class="f-item">
              sorty by
              <select class="" name="">
                <option value="">foo</option>
              </select>
            </div> -->
          </div>
        </header>

        <List id="list" class="f-row wrap start" />

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

  export default {
    name: 'Castles',
    components: {Logo, Search, Map, List, CastleDetail},
    data () {
      return {
        showCurrentSearch: true
      }
    },
    methods: {
      mouseEnterCastle: function(placeId) {
        this.$refs.map.mouseEnterCastle(placeId)
      }
    },
    computed: {
      searchCount: function() {
        return Object.keys(this.$store.state.map.currentSearch).length
      }
    }
  }
</script>
