<script setup>
import { ref, computed } from 'vue';
import Icon from './Icon.vue';
import Controls from './Controls.vue';

import { useStore } from '../store/panel';

const store = useStore();
const active = computed(() => store.active);
</script>

<template>
  <header class="">
    <section class="relative flex justify-center py-3 grow">
      <div class="relative flex w-2/3">
        <input
          type="text"
          placeholder="Search for destinations"
          class="relative z-20 p-6 px-8 text-lg bg-transparent outline-none grow"
        />
        <!-- @focus="active = true"
            @blur="active = false" -->
        <div class="absolute z-10 w-full">
          <div class="p-1 text-lg bg-gray-100 rounded-tl-full rounded-tr-full">
            &nbsp;
          </div>
          <!-- <ul class="flex flex-col pt-8 overflow-y-auto bg-gray-100 grow">
              <li
                v-for="res in [1, 2, 3, 4, 5]"
                :key="res"
                class="p-4 border-b border-gray-400 grow"
              >
                {{ res }}
              </li>
            </ul> -->
          <div class="p-1 text-lg bg-gray-100 rounded-bl-full rounded-br-full">
            &nbsp;
          </div>
        </div>
      </div>
    </section>

    <section v-if="active" class="" :class="active ? '' : ''">
      <Icon class="text-3xl" name="slider" />
      <!-- <Controls /> -->
    </section>
  </header>
</template>
