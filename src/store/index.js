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
    },
    ADD_PLACE_ID_TO_PHOTO (state, payload) {
      state.photos[payload.photoID].mapPlaces.push(payload.placeID)
    }
  },
  actions: {
    addPhotos (context, payload) {
      context.commit('addPhotos', payload)
    },
    addMapPlaceIDToPhoto (context, payload) {
      context.commit('ADD_PLACE_ID_TO_PHOTO', payload)
    }
  },
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})
