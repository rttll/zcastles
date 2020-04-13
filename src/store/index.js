import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photos: {},
  },
  mutations: {
    addPhotos (state, payload) {
      state.photos = payload.photos
    }
  },
  actions: {
    addPhotos (context, payload) {
      context.commit('addPhotos', payload)
    }
  },
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})
