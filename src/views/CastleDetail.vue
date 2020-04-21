<template id="">

  <div v-if="id" class="modal">
    <a href="#" class="close" @click.prevent="close">&times;</a>
    <h1 class="modal-title">{{location.place.address}}</h1>
    <Castle :location="location" />
    <div class="box">
      <h3>{{location.photo.description}}</h3>
      <p>You'll feel right at home in this incomparable {{location.photo.alt_description}}</p>
    </div>

  </div>

</template>

<script type="text/javascript">
  import Castle from '@/components/Castle.vue'
  import { Bus } from '@/mixins/bus.js'

  export default {
    name: 'CastleDetail',
    components: {Castle},
    data () {
      return {
        id: null,
        location: null
      }
    },
    methods: {
      close: function() {
        this.id = null
        this.location = null
        this.$router.go(-1)
      }
    },
    mounted() {
      this.$nextTick(() => {
        let locations = this.$store.state.map.locations
        let id = this.$route.params.id
        this.location = locations[id]
        this.id = id
        Bus.$on('placeChanged', () => {
          this.close()
        })
      })
    }
  }
</script>

<style lang="scss">
  .box {
    @include box();
    p {
      margin: .7rem 0;
      line-height: 1.3;
    }

  }
</style>
