<script setup>
// import 'the-new-css-reset/css/reset.css';
import Header from './components/Header.vue';
import Map from './components/Map.vue';
import ResultGrid from './components/ResultGrid.vue';
</script>

<template>
  <section class="w-screen h-screen">
    <Header />
    <div class="relative h-screen">
      <Map />
      <ResultGrid />
    </div>
  </section>
</template>
