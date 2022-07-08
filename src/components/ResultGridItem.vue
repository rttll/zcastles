<script setup>
import { defineProps, ref, watch } from 'vue';
import { useMapStore } from '@/stores/map';

const store = useMapStore();
const props = defineProps(['id']);
const location = store.getResultById(props.id);

const onClick = () => {
  store.focusedId = location.id;
  store.map.self.flyTo(location.coordinates);
  // store.$patch((state) => {
  // const res = state.results[marker.options.locationData.id];
  // if (res) res.focused = visible;
  // });
  // console.log(store.focusedId, location);
};
</script>

<template>
  <transition name="fade">
    <article
      v-if="location.visible"
      class="w-1/2 h-0 pb-[50%] relative overflow-hidden"
      :style="`background-color: ${location.image.color}`"
      @click="onClick"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div class="relative w-full h-full">
          <header class="absolute top-0 left-0 z-10">
            <p class="p-4 text-sm text-white">
              {{ location.address.street }},
              {{ location.address.city }}
              {{ location.address.stateCode }}
            </p>
          </header>
          <div
            class="w-full h-full transition-transform duration-1000 hover:scale-105"
          >
            <img
              :src="location.image.urls.regular"
              alt=""
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </article>
  </transition>
</template>
