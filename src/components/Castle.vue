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
          <div
            class="card-media-bg-image"
            :data-background-image="data.bg"
            :style="data.style"  
            ></div>
          <div class="card-media-attribution">
            <span>Photo: </span>
            <a :href="data.html" target="_blank">{{data.credit}}</a>
          </div>
        </div>
        <div class="card-content">
          <h3 class="title">{{data.price}}</h3>
          <p class="content">{{data.sqft}} sq ft. {{data.bedrooms}} bed. {{data.bathrooms}} ba.</p>
          <p class="content">{{data.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Bus } from '@/mixins/bus.js'
  import util from '@/assets/js/util'
  import lozad from 'lozad'

  export default {
    name: 'Castle',
    props: {
      location: {
        type: Object
      }
    },
    data() {
      return {
        observer: null
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
          price: util.currency(l.price),
          bedrooms: l.bedrooms,
          bathrooms: l.bathrooms,
          sqft: l.sqft.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          prince: l.prince,
          description: l.photo.description,
          alt_description: l.photo.alt_description,
          address: l.place.displayString,
          visible: l.visible
        }
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
      },
      resetImg: function() {
        let el = this.$el.querySelector('[data-background-image]')
        el.removeAttribute('data-loaded')
        this.observer.observe();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.observer = lozad(document.getElementById(`${this.data.id}`).querySelector('[data-background-image]'))
        this.observer.observe();
      })
    },
    beforeUpdate() {
      this.resetImg()
    }
  }
</script>
