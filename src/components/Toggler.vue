<script setup>
// import { ref, defineProps } from 'vue';
import { useStore } from '../store/panel';

const store = useStore();
const onClick = () => {
  store.active = !store.active;
};
</script>

<template>
  <div class="fixed bottom-0 left-0 z-50 bg-white">
    <a href="#" @click.prevent="onClick">
      {{ store.active }}
    </a>
  </div>
</template>
