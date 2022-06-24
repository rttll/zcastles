<script setup>
import { ref } from 'vue';
const active = ref(false);
</script>

<template>
  <section class="h-screen w-screen relative">
    <div class="h-full relativwe">
      <div
        class="p-0 w-full h-full transition-transform ease-in-out duration-300"
        :class="active ? 'translate-y-0 ' : 'translate-y-1/2'"
      >
        <header
          class="relativwe duration-300 flex p-8 transition-all"
          :class="
            active
              ? 'translate-y-0 border-b  border-gray-200 shadow bg-white'
              : '-translate-y-16 w-full'
          "
        >
          <input
            type="text"
            class="bg-gray-200 p-6 text-lg rounded-full grow"
            @focus="active = true"
            @blur="active = false"
          />
        </header>
      </div>
    </div>
    <div
      class="fixed h-screen w-screen pt-40 bg-wred-400 inset-0 flex items-center"
    >
      hi
    </div>
  </section>
</template>
