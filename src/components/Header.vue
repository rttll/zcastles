<script setup>
import { ref } from 'vue';
const active = ref(false);
</script>

<template>
  <header
    class="duration-300 ease-in-out transition-transform h-screen top-0 fixed items-end w-screen flex"
    :class="active ? '-translate-y-full ' : '-translate-y-1/2 '"
  >
    <section
      class="duration-300 ease-in-out p-8 grow flex items-center justify-between"
      :class="{
        'translate-y-full border-b border-gray-200 shadow bg-white': active,
      }"
    >
      <!-- :class="active ? 'scale-x-50' : 'scale-x-100'" -->
      <!-- <div
          class="rounded-tl-full bg-gray-200 w-12 content rounded-bl-full"
        ></div> -->
      <!-- <div class="rounded-tr-full bg-gray-200 w-12 rounded-br-full"></div> -->
      <div class="flex origin-left transition-transform duration-300 grow">
        <input
          type="text"
          class="bg-gray-200 p-6 pl-0 text-lg grow"
          @focus="active = true"
          @blur="active = false"
        />
      </div>
      <div v-if="active" class="flex space-x-4" :class="active ? '' : ''">
        <div>1</div>
        <div>2</div>
      </div>
    </section>
  </header>
</template>
