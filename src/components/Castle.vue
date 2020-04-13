<template id="">
  <div class="">
    <div class="card-border-container">
      <div class="card border" @mouseenter="mouseEnterCastle" @mouseleave="mouseLeaveCastle">
        <div class="card-media">
          <div class="card-media-bg-image" :style="data.style"></div>
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
  import { Bus } from '@/mixins/bus.js'
  export default {
    name: 'Castle',
    props: {
      result: {
        type: Object
      }
    },
    methods: {
      mouseEnterCastle: function() {
        Bus.$emit('mouseEnterCastle', this.data.id)
      },
      mouseLeaveCastle: function() {
        Bus.$emit('mouseLeaveCastle', this.data.id)
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
          id: this.result.place.id,
          style: `background-image: url(${data.urls.regular})`,
          src: data.urls.regular,
          price: price,
          title: data.alt_description,
          address: this.result.place.address
        }
      }
    }
  }
</script>
