<script setup>
// import 'the-new-css-reset/css/reset.css';
import Header from './components/Header.vue';
import Map from './components/Map.vue';
</script>

<template>
  <section class="w-screen h-screen bg-teal-200">
    <Header />
    <div class="relative z-10 h-screen">
      <Map />
    </div>
  </section>
</template>
