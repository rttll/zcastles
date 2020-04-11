import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    map
  },
  strict: process.env.NODE_ENV !== 'production'
})
