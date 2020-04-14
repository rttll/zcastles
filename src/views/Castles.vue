<template id="">
  <div class="view">
    <CastleDetail />
    <div class="f-row border-bottom">
      <div class="f-item-3">
        <Search :showCurrentSearch=showCurrentSearch />
      </div>
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
            <p class="f-item">{{results.length}} results</p>
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
  import CastleDetail from '@/components/CastleDetail.vue'

  export default {
    name: 'Castles',
    components: {Search, Map, List, CastleDetail},
    data () {
      return {
        // activeCastleId: null,
        // activeCastleLocation: null,
        showCurrentSearch: true
      }
    },
    methods: {
      // showCastleDetail: function(id) {
      //   // this.$store.state.map.locations['42bb36ce857287b90b6723e10a3a2b1c7ea2801b']
      //   this.activeCastleLocation = this.$store.state.map.locations[id];
      //   this.activeCastleId = this.activeCastleId = id;
      // },
      mouseEnterCastle: function(placeId) {
        this.$refs.map.mouseEnterCastle(placeId)
      }
    },
    computed: {
      results: function() {
        return this.$store.state.map.currentSearch.locations
      }
    }
  }
</script>
