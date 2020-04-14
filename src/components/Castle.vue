<template id="">
  <div class="">
    <div class="card-border-container">
      <div class="card border" @click="clickedCastle" @mouseenter="mouseEnterCastle" @mouseleave="mouseLeaveCastle" :data-show-location-detail="data.id">
        <div class="card-media">
          <div class="card-media-bg-image" :style="data.style"></div>
          <div class="card-media-attribution">
            <span>Photo: </span>
            <a :href="data.html" target="_blank">{{data.credit}}</a>
          </div>
        </div>
        <div class="card-content">
          <h3 class="title">{{data.price}}</h3>
          <p class="">{{data.sqft}} sq ft. {{data.bedrooms}} bed. {{data.bathrooms}} ba.</p>
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
      clickedCastle: function() {
        Bus.$emit('clickedCastle', this.data.id)
      },
      mouseEnterCastle: function() {
        Bus.$emit('mouseEnterCastle', this.data.id)
      },
      mouseLeaveCastle: function() {
        Bus.$emit('mouseLeaveCastle', this.data.id)
      }
    },
    computed: {
      data: function() {
        let l = this.location;
        return {
          id: l.place.id,
          style: `background-image: url(${l.photo.urls.regular})`,
          html: l.photo.links.html,
          credit: l.photo.user.name,
          price: l.price,
          bedrooms: l.bedrooms,
          bathrooms: l.bathrooms,
          sqft: l.sqft,
          description: l.photo.description,
          alt_description: l.photo.alt_description,
          address: l.place.address,
        }
      }
    }
  }
</script>
