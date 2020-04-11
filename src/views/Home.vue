<template>
  <div class="view">
    <div class="f-row">
      <div class="f-item-6 center">
        <Search classlist="big"/>
        <router-link to="/castles">asdf</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Search
  },
  methods: {
    search () {

    }
  }
}

</script>
