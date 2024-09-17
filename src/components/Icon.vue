<script setup>
import { defineProps } from 'vue';
import slider from '../assets/icons/slider.svg?raw';

const props = defineProps(['name']);
const icons = {
  slider,
};
</script>

<template>
  <i v-html="icons[name]"></i>
</template>
