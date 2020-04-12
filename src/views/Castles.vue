<template id="">
  <div class="view">
    <div class="f-row border-bottom">
      <div class="f-item-3">
        <Search />
      </div>
      <div class="f-item">
        <button type="button" name="button">For Sale</button>
      </div>
    </div>

    <div class="f-row stretch f-item grow">
      <div class="f-item-6">
        <Map />
      </div>

      <div class="f-item-6">
        <header>
          <h3>Castles for Sale</h3>
          <div class="f-row collapse-sides between">
            <p class="f-item">{{results.length}} results</p>
            <div class="f-item">
              sorty by
              <select class="" name="">
                <option value="">foo</option>
              </select>
            </div>
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

  export default {
    name: 'Castles',
    components: {Search, Map, List},
    computed: {
      results: function() {
        return this.$store.state.map.results
      }
    }
  }
</script>
