<script setup>
import ResultGridItem from './ResultGridItem.vue';
</script>

<template>
  <div
    class="absolute top-0 right-0 z-30 flex flex-wrap w-1/2 h-screen overflow-y-auto"
  >
    <ResultGridItem
      v-for="int in [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1]"
      :key="int"
    />
  </div>
</template>
