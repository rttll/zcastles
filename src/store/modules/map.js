
const state = {
  api: null,
  ready: false,
  place: {
    address: null,
    geometry: null
  },
  currentSearchResults: []
}

const getters = {
  api: (state) => {
    return state.api
  },
  isReady: (state) => {
    return state.ready
  }
}

const mutations = {
  setPlace (state, payload) {
    state.place.address = payload.address
    state.place.geometry = payload.geometry
  },
  api (state, google) {
    state.api = google
  },
  ready (state) {
    state.ready = true
  }
}

const actions = {
  setPlace (context, payload) {
    context.commit('setPlace', payload)
  },
  api (context, google) {
    context.commit('api', google)
  },
  ready (context) {
    context.commit('ready')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
