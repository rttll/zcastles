<template id="">
  <div class="card">
    <div class="card-media">
      <img src="" alt="">
    </div>
    <div class="card-content">
      <h3 class="title">{{name}}</h3>
      <p class="content">12334 street</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Card',
    props: ['name']
  }
</script>
