<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Panel from '@/components/Panel.vue';
import Toggler from '@/components/Toggler.vue';
</script>

<template>
  <section class="w-screen h-screen">
    <Panel>
      <template #header>
        <div class="py-20 pt-28">
          <h1 class="text-4xl text-center">Find your dream castle</h1>
        </div>
      </template>
      <div ref="panel">
        <Header />
      </div>
      <router-view></router-view>
    </Panel>
    <Toggler />
  </section>
</template>
