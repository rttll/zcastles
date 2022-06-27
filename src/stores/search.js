import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      prediction: null,
      location: {
        coordinates: [50.5, 30.5],
      },
    };
  },
});
