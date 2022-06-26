<script setup>
import ResultGridItem from './ResultGridItem.vue';
</script>

<template>
  <section class="flex overflow-hidden grow">
    <h1 class="hidden">Search results grid</h1>
    <div class="flex flex-wrap overflow-y-auto grow">
      <ResultGridItem
        v-for="int in [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1]"
        :key="int"
      />
    </div>
  </section>
</template>
