<template id="">
  <div class="search-box">
    <input id="search" type="text" ref="search" 
      :class="classlist" 
      @keyup="keyup"
      @focus="clearValue" 
      @blur="setValue"
      autocomplete="off"
    >
    <ul v-if="results.length > 0">
      <li v-for="(result, index) in results" :key="index" @click="searchResultClicked(result)">
        {{result.name}}
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import { Bus } from '@/mixins/bus.js'
  const axios = require('axios').default
  
  export default {
    name: 'Search',
    props: {
      classlist: String,
      showCurrentSearch: Boolean
    },
    data() {
      return {
        search: null,
        results: []
      }
    },
    computed: {
      getValue() {
        return this.showCurrentSearch === false ? '' : this.$store.state.map.place.address
      }
    },
    methods: {
      keyup() {
        this.debounceSearch()
      },
      processResults(resp) {
        this.results = []
        for (let i = 0; i < 3 && i < resp.data.results.length-1; i++) {
          this.results.push(resp.data.results[i])
        }
      },
      osmSearch() {
        let input = this.$el.querySelector('input')
        let key = 'I5NzLRnIQV2Dhfeal1G5DbmKjbmpsXpe'
        let baseURL = `http://www.mapquestapi.com/search/v3/prediction?key=${key}`
        baseURL += '&limit=5&collection=address,adminArea,airport,category,franchise,poi&q='
        axios.get(baseURL + input.value).then((resp) => {
          this.processResults(resp)
        })
      },
      clearValue() {
        // this.$refs.search.value = ''
      },
      setValue() {
        // this.$refs.search.value = this.getValue
      },
      searchResultClicked(data) {
        this.$store.dispatch('map/updateSearch', data)
        if (this.$router.currentRoute.name === 'Home') {
          this.$router.push('castles')
        } else {
          Bus.$emit('placeChanged')
        }

      },
      init () {
        var debounce = require('lodash/debounce');
        this.debounceSearch = debounce(this.osmSearch, 100)
      },

    },
    mounted () {
      this.$nextTick(() => {
        this.init();
      })
    }
  }
</script>

<style lang="scss">
  .search-box {
    ul {border: 1px solid transparent}
    ul li {
      background: #fff;
      cursor: pointer;
      &:after {

      }
    }
  }
  input {
    width: 100%;
    @include input-base();
    &.big {
      padding: 1.7rem;
      font-size: 130%;
    }
  }
  .solo-center {
    width: 100%;
    max-width: 640px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 100;
  }
</style>
