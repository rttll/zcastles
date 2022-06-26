<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { useStore } from '../store/panel';

const route = useRoute();
const showHeader = true;

watch(
  () => route.path,
  () => {
    console.log(route.path);
  }
);

const top = ref(0);
</script>

<template>
  <!-- class="relative top-0 z-50 w-screen h-screen transition-transform duration-300 ease-in-out border-2 border-green-400"
    :class="store.active ? '' : 'translate-y-[30%] '" -->
  <section
    id="panel"
    class="transition-transform duration-300"
    :class="`-translate-y-[${top}]`"
  >
    <header ref="header" v-if="showHeader">
      <slot name="header" />
    </header>
    <slot />
  </section>
</template>
