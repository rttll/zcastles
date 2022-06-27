<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Panel from './components/Panel.vue';
</script>

<template>
  <section class="w-screen h-screen">
    <router-view></router-view>
  </section>
</template>
