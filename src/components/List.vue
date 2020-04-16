<template id="">
  <div class="collapse-sides">
    <Castle v-for="location in locations" :location="location" :key="location.id" class="f-item-6">
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
        return this.$store.state.map.currentSearch
      }
    }
  }
</script>
