
const state = {
  api: null,
  ready: false,
  currentSearch: null,
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
  api (state, google) {
    state.api = google
  },
  ready (state) {
    state.ready = true
  }
}

const actions = {
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
