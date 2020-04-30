<template>
  <div class="slider">
    <div class="slider-track" ref="track" :data-min="min" :data-max="max"></div>
    <div class="readout-container">
      <span class="readout">{{formatted.low}}</span>
      <span class="readout">{{formatted.high}}</span>
    </div>
    <div class="slider-handle" data-handle="low"
      :style="lowStyle"
      @mousedown="mouseDown"
    ></div>
    <div class="slider-handle" data-handle="high"
      :style="highStyle"
      @mousedown="mouseDown"
    ></div>    
  </div>   
</template>

<script>
  export default {
    name: 'Range',
    props: {
      default: Object
    },
    data () {
      return {
        activeHandle: null,
        min: 0,
        max: 10000000,
        low: {
          is: 0,
          was: 0
        },
        high: {
          is: 0,
          was: 0
        },
        startX: 0
      }
    },
    computed: {
      lowStyle: function() {
        let val = Math.floor(this.low.is / (this.max - this.min) * 100)
        return `left: ${val}%`
      },
      highStyle: function() {
        let val = Math.floor(this.high.is / (this.max - this.min) * 100)
        return `left: ${val}%`
      },
      formatted () {
        return {
          low: this.delimiters(this.low.is),
          high: this.delimiters(this.high.is)
        }
      }
    },
    methods: {
      delimiters: function(a) {
        // todo: move to global helper 
        return `$${a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
      },
      pixelToPercent: function() {
        var trackWidth = this.$refs.track.clientWidth
        return this.max / trackWidth
      },
      mouseDown: function(e) {
        this.activeHandle = e.target.dataset.handle
        this.startX = e.clientX
        document.addEventListener('mousemove', this.mouseMoveHandler)
        document.addEventListener('mouseup', this.mouseUpHandler)
      },
      mouseUpHandler: function() {
        this[this.activeHandle].was = this[this.activeHandle].is
        this.activeHandle= null
        document.removeEventListener('mouseup', this.mouseUpHandler)
        document.removeEventListener('mousemove', this.mouseMoveHandler)
        this.$emit('changed', {minPrice: this.low.is, maxPrice: this.high.is})
      },
      mouseMoveHandler: function(e) {
        let converter = this.pixelToPercent()
        let dif = converter * (e.clientX - this.startX)
        let newVal = this[this.activeHandle].was + dif
        if (this.activeHandle === 'low') {
          if (newVal < 0) newVal = 0
          if (newVal > this['high'].is) newVal = this['high'].is
        } else {
          if (newVal > this.max) newVal = this.max
          if (newVal < this['low'].is) newVal = this['low'].is
        }
        newVal = Math.floor(newVal)
        this[this.activeHandle].is = newVal
      }
    },
    created() {
      this.low = {
        is: this.default.low,
        was: this.default.low
      }
      this.high = {
        is: this.default.high,
        was: this.default.high
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slider {
    width: 300px;
    height: 3px;
    position: relative;
  }
  .slider-track {
    background: black;
    width: 100%;
    height: 2px;
  }
  .slider-handle {
    background: #fff;
    width: 15px;
    height: 15px;
    border: 1px solid #333;
    border-radius: 50%;
    position: absolute;
    top: -7px;
    z-index: 1;
  }
  .readout-container {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    > span {
      font-size: 12px;
      user-select: none;
    }
  }
</style>