<template id="">
  <div>
    <div class="f-row border-bottom">
      <div class="f-item">
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
          <Card v-for="card in cards" :key="card.id" class="f-item-6">
          </Card>
        </div>
      </div>

    </div>


  </div>
</template>

<script type="text/javascript">
  import Search from '@/components/Search.vue'
  import Map from '@/components/Map.vue'
  import Card from '@/components/Card.vue'

  export default {
    name: 'Castles',
    components: {Search, Map, Card},
    data () {
      return {
        cards: [
          {id: '2', name: 'foo'},
          {id: '1', name: 'bar'}
        ]
      }
    },
    mounted: () => {

    }
  }
</script>
