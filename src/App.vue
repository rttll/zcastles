<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Panel from './components/Panel.vue';
import Toggler from './components/Toggler.vue';
</script>

<template>
  <section class="w-screen h-screen">
    <router-view></router-view>
    <Toggler />
  </section>
</template>
