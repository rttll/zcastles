<template id="">
  <div class="collapse-sides">
    <Castle v-for="location in locations"
      :location="location"
      :key="location.place.id"
      class="f-item-6 foo f-item-small-6">
    </Castle>
  </div>
</template>

<script type="text/javascript">
  import Castle from '@/components/Castle.vue'

  export default {
    name: 'List',
    components: {Castle},
    computed: {
      locations: function() {
        return this.$store.getters['map/activeLocations']
      }
    }
  }
</script>

<style lang="scss">
  #list {
    position: relative;
    &.searching:before {
      background: rgba(#fff, .7);
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1
    }
  }
  @media only screen and (max-width: #{$medium-break}) {
    #list > div {
      // width: 100%;
    }
  }
</style>
