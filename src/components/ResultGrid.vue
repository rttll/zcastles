<script setup>
import { useMapStore } from '@/stores/map';
import ResultGridItem from './ResultGridItem.vue';

const store = useMapStore();
</script>

<template>
  <section class="flex overflow-hidden grow">
    <h1 class="hidden">Search results grid</h1>
    <div class="flex flex-wrap overflow-y-auto grow">
      <ResultGridItem v-for="(res, k) in store.results" :id="res.id" :key="k" />
    </div>
  </section>
</template>
