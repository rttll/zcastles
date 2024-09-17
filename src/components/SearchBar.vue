<script setup>
import { ref, computed } from 'vue';

import Icon from './Icon.vue';
import Controls from './Controls.vue';
import SearchBarInput from './SearchBarInput.vue';

const active = false; //computed(() => store.active);
</script>

<template>
  <header class="">
    <section class="relative flex justify-center py-3 grow">
      <div class="w-2/3">
        <SearchBarInput />
      </div>
    </section>

    <section v-if="active" class="" :class="active ? '' : ''">
      <Icon class="text-3xl" name="slider" />
      <!-- <Controls /> -->
    </section>
  </header>
</template>
