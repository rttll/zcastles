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
    addGoogleMapPlaceIDToPhoto (state, payload) {
      state.photos[payload.photoID].googleMapPlaces.push(payload.googleMapPlaceID)
    }
  },
  actions: {
    addPhotos (context, payload) {
      context.commit('addPhotos', payload)
    },
    addGoogleMapPlaceIDToPhoto (context, payload) {
      context.commit('addGoogleMapPlaceIDToPhoto', payload)
    }
  },
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})
