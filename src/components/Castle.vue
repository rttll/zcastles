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
      location: {
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
        return {
          id: this.location.place.id,
          style: `background-image: url(${this.location.photo.urls.regular})`,
          src: this.location.photo.regular,
          price: this.location.price,
          title: this.location.photo.alt_description,
          address: this.location.place.address
        }
      }
    }
  }
</script>
