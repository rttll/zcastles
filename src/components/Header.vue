<script setup>
import { ref } from 'vue';
import Icon from './Icon.vue';
import Controls from './Controls.vue';

const active = ref(true);
</script>

<template>
  <header
    class="fixed top-0 z-50 flex items-end w-screen h-screen transition-transform duration-300 ease-in-out"
    :class="active ? '-translate-y-full ' : '-translate-y-1/2 '"
  >
    <div
      class="flex items-center justify-between p-8 duration-300 ease-in-out grow"
      :class="{
        'translate-y-full border-b border-gray-200 shadow bg-white': active,
      }"
    >
      <section class="relative flex grow" :class="active ? '' : ''">
        <div
          class="flex w-full grow"
          :class="active ? 'md:w-1/2 md:grow-0' : ''"
        >
          <input
            type="text"
            class="relative z-20 p-6 px-8 text-lg bg-transparent outline-none grow"
          />
          <div class="absolute z-10 w-full">
            <div
              class="p-1 text-lg bg-gray-100 rounded-tl-full rounded-tr-full"
            >
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
            <div
              class="p-1 text-lg bg-gray-100 rounded-bl-full rounded-br-full"
            >
              &nbsp;
            </div>
          </div>
        </div>
      </section>

      <section v-if="active" class="" :class="active ? '' : ''">
        <Icon class="text-3xl" name="slider" />
        <!-- <Controls /> -->
      </section>
    </div>
  </header>
</template>
