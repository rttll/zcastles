import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    unsplashCastles: null
  },
  mutations: {
    addUnsplashCastles (state, payload) {
      state.unsplashCastles = payload.castles
    }
  },
  actions: {
    addUnsplashCastles (context, payload) {
      context.commit('addUnsplashCastles', payload)
    }
  },
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})
