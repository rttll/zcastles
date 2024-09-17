<script setup>
import SearchBar from '@/components/SearchBar.vue';
import Map from '@/components/Map.vue';
import ResultGrid from '@/components/ResultGrid.vue';

const show = true;
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <SearchBar />
    <div class="relative flex overflow-hidden grow">
      <Map />
      <ResultGrid />
    </div>
  </div>
</template>
