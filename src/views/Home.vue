<template>
  <div class="view">
    <div class="bg"></div>
    <Search classlist="big solo-center" :showCurrentSearch="showCurrentSearch" />
  </div>
</template>

<script>

import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  data () {
    return {
      showCurrentSearch: false
    }
  },
  components: {
    Search
  }
}

</script>

<style lang="scss" scoped>
  .bg {
    background-image: url('../assets/images/patrick-mueller-2HeEHnWP8bs-unsplash.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }
</style>
