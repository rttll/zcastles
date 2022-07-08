<script setup>
import { defineProps, ref, watch } from 'vue';
import { useMapStore } from '@/stores/map';

const store = useMapStore();
const props = defineProps(['id']);
const location = store.getResultById(props.id);

const clicked = () => {
  console.log(location);
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="location.visible"
      class="w-1/2 h-0 pb-[50%] relative overflow-hidden"
      :style="`background-color: ${location.image.color}`"
      @click="clicked"
    >
      <div
        class="absolute inset-0 overflow-hidden transition-transform duration-1000 hover:scale-105"
      >
        <img
          :src="location.image.urls.regular"
          alt=""
          class="object-cover w-full h-full"
        />
      </div>
    </div>
  </transition>
</template>
