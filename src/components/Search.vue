<template id="">
  <div class="search-box">
    <input id="search" type="text" ref="input"
      :class="classlist" 
      value=""
      @keydown="keydown"
      @keyup="keyup"
      @focus="inputFocused"
      placeholder="Enter a Destination"
      autocomplete="off"
    >
    <ul v-if="results.length > 0">
      <li 
        v-for="(result, index) in results" 
        :key="index" 
        :data-index="index"
        tabindex="0" 
        :class="{selected: selectedID === index}"
        @click="searchResultClicked(result)"
      >
        {{result.name}}
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import remote from '@/services/remote-api-proxy.js'
  import { Bus } from '@/mixins/bus.js'
  import {mapGetters} from 'vuex'
  
  export default {
    name: 'Search',
    props: {
      classlist: String,
      showCurrentSearch: Boolean
    },
    data() {
      return {
        selectedID: -1,
        searchTerm: '',
        results: []
      }
    },
    computed: {
      ...mapGetters({
        searchDisplay: 'map/currentSearchDisplay'
      })
    },
    methods: {
      keyup(e) {
        if (e.which !== 40 && e.which !== 38)
          this.searchTerm = this.$refs.input.value
      },
      keydown(e) {
        if (e.which === 13) {
          if (this.results.length > 0) {
            let index = this.selectedID > 0 ? this.selectedID : 0
            this.searchResultClicked(this.results[index])
            return
          }
        }
        if (e.which === 40 || e.which === 38) {
          e.preventDefault()
        }
        if (e.which === 40 && this.selectedID !== this.results.length-1) {
          this.selectedID++
          this.$refs.input.value = this.results[this.selectedID].name
        } else if (e.which === 38 && this.selectedID !== -1) {
            this.selectedID--
            if (this.selectedID === -1) {
              this.$refs.input.value = this.searchTerm
            } else {
              this.$refs.input.value = this.results[this.selectedID].name
            }
        } else {
          if (this.$refs.input.value.length > 1) {
            this.debounceSearch()
          } else {
            this.clearResults()
          }
        }
      },
      search() {
        let input = this.$refs.input
        if (input.value.length > 1) {
          remote.prediction(input.value).then((resp) => {
            this.processResults(resp)
          }).catch((err) => {
            console.log(err)
          })
        }
      },      
      processResults(resp) {
        this.clearResults()
        for (let i = 0; i < 3 && i < resp.data.results.length-1; i++) {
          this.results.push(resp.data.results[i])
        }
      },      
      searchResultClicked(data) {
        this.$store.dispatch('map/updateSearch', data)
        this.clearResults()
        if (this.$router.currentRoute.name !== 'castles') {
          this.$router.push('/castles')
        } else {
          Bus.$emit('placeChanged')
        }
      },        
      clearResults() {
        this.results = []
      },
      inputFocused() {
        if (this.$refs.input.value.length > 2) {
          this.debounceSearch()
        }
      },
      blurListener(e) {
        if (e.target.closest('.search-box') === null) {
          this.searchBoxBlurred()
        }
      },
      searchBoxBlurred() {
        this.$refs.input.value = this.searchDisplay;
        this.clearResults()
      },
      init () {
        var debounce = require('lodash/debounce')
        this.debounceSearch = debounce(this.search, 100)
        if (this.showCurrentSearch) this.$refs.input.value = this.searchDisplay
        document.addEventListener('click', this.blurListener)
      }

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
    position: relative;
    ul {
      background: #fff;
      width: 100%;
      border: $border;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      position: absolute;
      top: calc(100% - 2px);
      z-index: 100;
    }
    ul li {
      background: #fff;
      padding: 0.7rem 1rem;
      font-size: 13px;
      cursor: pointer;
      &.selected, &:hover {
        background: #efefef;
      }
    }
  }
  input {
    background: #efefef;
    height: 30px;
    width: 100%;
    padding: 1.1rem;
    border: 0;
    border-radius: 15px;
    font-size: 80%;
    &.big {
      background: #fff;
      @include input-base();
      padding: 1.9rem;
      font-size: 110%;
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
