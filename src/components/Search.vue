<template id="">
  <div class="search-box">
    <input id="search" type="text" value="" :class="classlist">
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Search',
    props: {
      classlist: String
    }
  }
</script>

<style lang="scss">
  input {
    width: 100%;
    @include input-base();
    &.big {
      padding: 1.5rem;
      font-size: 130%;
    }
  }
</style>
