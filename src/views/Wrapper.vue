<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import MapView from '@/views/MapView.vue';
</script>

<template>
  <section class="w-screen h-screen">
    <header>
      <div class="py-20 pt-28">
        <h1 class="text-4xl text-center">Find your dream castle</h1>
      </div>
    </header>
    <MapView />
    <div>other thingsss???</div>
  </section>
</template>
