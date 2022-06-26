<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Map from '@/components/Map.vue';
import ResultGrid from '@/components/ResultGrid.vue';

const route = useRoute();
const foo = computed(() => Math.random());
// console.log(route.path, foo);
</script>

<template>
  <div class="relative h-screen">
    <Map />
    <ResultGrid />
  </div>
</template>
