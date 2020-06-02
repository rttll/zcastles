<template id="">

  <div class="modal">
    <a href="#" class="close" @click.prevent="close">&times;</a>
    <div v-if="location !== undefined">
      <h3 class="modal-title">{{location.place.displayString}}</h3>
      <Castle :location="location" />
      <div class="box">
        <h3>{{location.photo.description}}</h3>
        <p>You'll feel right at home in this incomparable {{location.photo.alt_description}}</p>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
  import Castle from '@/components/Castle.vue'
  import { Bus } from '@/mixins/bus.js'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CastleDetail',
    components: {Castle},
    computed: {
      ...mapGetters({
        getLocation: 'map/getLocation'
      }),
      location () {
        return this.getLocation(this.$route.params.id)
      }
    },    
    methods: {
      close () {
        this.$router.push({ name: 'castles' })
      },   
    },
    mounted() {
      this.$nextTick(() => {
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
