<script setup>
import { useImageStore } from '@/stores/images';
import { search } from '@/services/images';

const store = useImageStore();
search(store.page).then((resp) => {
  store.search.page++;
  store.addImages(resp);
});
</script>

<template>
  <section class="w-screen h-screen">
    <router-view></router-view>
  </section>
</template>
