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
          <h3>Homes and stuff for sale</h3>
          <div class="f-row collapse-sides between">
            <p class="f-item">45 results</p>
            <div class="f-item">
              sorty by
              <select class="" name="">
                <option value="">foo</option>
              </select>
            </div>
          </div>
        </header>

        <div class="f-row">
          <Castle v-for="castle in castles" :key="castle.id" class="f-item-6">
          </Castle>
        </div>
      </div>

    </div>


  </div>
</template>

<script type="text/javascript">
  import Search from '@/components/Search.vue'
  import Map from '@/components/Map.vue'
  import Castle from '@/components/Castle.vue'

  export default {
    name: 'Castles',
    components: {Search, Map, Castle},
    data () {
      return {
        castles: [
          {id: '2', name: 'foo'},
          {id: '1', name: 'bar'}
        ]
      }
    },
    mounted: () => {

    }
  }
</script>
