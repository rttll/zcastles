<template>
  <div>
    <label for="">{{name}}</label>
    <select name="" id="" v-on:input="$emit('input', parseInt($event.target.value))">
      <option v-for="k in options" :key="k" :value="k" :selected="k === value">{{options[k]}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'Select',
    props: {
      name: String,
      value: Number,
      options: Object
    },
    mounted() {
      // debugger
    }
  }
</script>

<style lang="scss" scoped>
  select {
    padding: 0.1rem 0.3rem;
  }
</style>