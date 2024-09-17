<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useMapStore } from '@/stores/map';
import { prediction } from '@/services/search';

const router = useRouter();
const route = useRoute();
const store = useMapStore();

// const { term, results }
const term = ref('');
const results = ref([]);

const search = () => {
  if (term.value.length < 2) return (results.value = []);
  prediction(term.value).then((json) => (results.value = json.results));
};

const onResultClick = (location) => {
  const coords = location.place.geometry.coordinates;
  store.location.coordinates = [coords['1'], coords['0']];
};

watch(term, () => {
  router.push({
    query: {
      search: term.value,
    },
  });

  search();
});

onMounted(() => {
  if (route.query.search) {
    term.value = route.query.search;
  }
});
</script>

<template>
  <div class="relative flex flex-col">
    <input
      type="text"
      placeholder="Search for destinations"
      class="relative z-20 p-6 px-8 text-lg bg-transparent outline-none grow"
      v-model="term"
    />
    <!-- @focus="active = true"
            @blur="active = false" -->
    <div class="absolute z-10 w-full">
      <div class="p-1 text-lg bg-gray-100 rounded-tl-full rounded-tr-full">
        &nbsp;
      </div>
      <ul
        v-if="results.length > 0"
        class="flex flex-col pt-8 overflow-y-auto bg-gray-100 grow"
      >
        <li
          v-for="res in results"
          :key="res.id"
          class="p-4 border-b border-gray-400 grow"
        >
          <a
            href="#"
            @click.prevent="
              () => {
                onResultClick(res);
              }
            "
          >
            {{ res.displayString }}
          </a>
        </li>
      </ul>
      <div class="p-1 text-lg bg-gray-100 rounded-bl-full rounded-br-full">
        &nbsp;
      </div>
    </div>
  </div>
</template>
