<template id="">
  <div class="">
    <div class="card-border-container">
      <div
        class="card border"
        :id="data.id"
        :data-show-location-detail="data.id"
        @click="clickedCastle"
        @mouseenter="mouseEnterCastle"
        @mouseleave="mouseLeaveCastle"
      >

        <div class="card-media">
          <div class="card-media-bg-image" :data-background-image="data.bg" :style="data.style"></div>
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
  import lozad from 'lozad'

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
          bg: l.photo.urls.regular,
          style: `background-color: ${l.photo.color}`,
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
    },
    mounted() {
      this.$nextTick(() => {
        const observer = lozad(document.getElementById(`${this.data.id}`).querySelector('[data-background-image]'))
        observer.observe();
      })

    }
  }
</script>
