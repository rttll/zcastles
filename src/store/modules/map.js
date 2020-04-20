
const state = {
  locations: {},
  search: {
    osm: null,
    zoom: null
  }
}

const mutations = {
  UPDATE_SEARCH (state, payload) {
    state.search = {...state.search, ...payload}
  },
  UPDATE_LOCATIONS (state, payload) {
    state.locations = {...state.locations, ...payload}
  },
  ADD_LOCATION (state, payload) {
    state.locations[payload.id] = payload.location
  }
}

const getters = {}

const actions = {
  updateSearch ({commit}, payload) {
    commit('UPDATE_SEARCH', payload)
  },
  addLocation (context, payload) {
    context.commit('ADD_LOCATION', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
