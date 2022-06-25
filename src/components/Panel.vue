<script setup>
// import { ref, defineProps } from 'vue';
import { useStore } from '../store/panel';

const store = useStore();
</script>

<template>
  <!-- class="relative top-0 z-50 w-screen h-screen transition-transform duration-300 ease-in-out border-2 border-green-400"
    :class="store.active ? '' : 'translate-y-[30%] '" -->
  <section>
    <slot />
  </section>
</template>
