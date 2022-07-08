import { defineStore } from 'pinia';

export const useImageStore = defineStore('images', {
  state: () => {
    return {
      search: {
        page: 0,
      },
      images: {},
      keys: [],
    };
  },
  actions: {
    addImages(resp) {
      for (const image of resp.results) {
        if (this.images[image.id] === undefined) {
          this.images[image.id] = image;
          this.keys.push(image.id);
        }
      }
    },
    getImage() {
      const key = this.keys.shift();
      return this.images[key];
    },
  },
});
