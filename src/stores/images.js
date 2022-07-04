import { defineStore } from 'pinia';

export const useImageStore = defineStore('images', {
  state: () => {
    return {
      images: {},
    };
  },
  actions: {
    addImages(images) {
      for (const image of images) {
        this.images[image.id] = image;
      }
    },
  },
});
