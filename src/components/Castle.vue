<template id="">
  <div class="">
    <div class="card-border-container">
      <div class="card border">
        <div class="card-media" :style="data.style">
        </div>
        <div class="card-content">
          <h3 class="title">{{data.price}}</h3>
          <p class="sub-title">{{data.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Castle',
    props: {
      result: {
        type: Object
      }
    },
    computed: {
      data: function() {
        let i = Math.floor(Math.random() * 30);
        let price = 500000;
        price += Math.floor(Math.random() * 4000000);
        //https://blog.abelotech.com/posts/number-currency-formatting-javascript/
        price = `$${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
        let data = this.$store.state.unsplashCastles[i];
        return {
          style: `background: url(${data.urls.regular}) center center; background-size: cover`,
          src: data.urls.regular,
          price: price,
          title: data.alt_description,
          address: this.result.address
        }
      }
    }
  }
</script>
