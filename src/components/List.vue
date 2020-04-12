<template id="">
  <div class="collapse-sides">
    <Castle v-for="result in results" :result="result" :key="result.id" class="f-item-6">
    </Castle>
  </div>
</template>

<script type="text/javascript">
  import Castle from '@/components/Castle.vue'

  export default {
    name: 'List',
    components: {Castle},
    computed: {
      results: function() {
        return this.$store.state.map.results
      }
    },
    methods: {
      updateList() {
        // console.log(this.results())
      },
      subscribe() {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'map/setResults') {
            this.updateList(mutation.payload)
          }

        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.subscribe()
      })
    },
  }
</script>
