import { defineStore } from 'pinia';

export const useStore = defineStore('panel', {
  state: () => {
    return {
      active: false,
    };
  },
});
