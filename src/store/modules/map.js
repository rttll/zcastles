
const state = {
  api: null,
  ready: false,
  place: {
    address: null,
    geometry: null,
    latLng: {lat: 37.758868753957636, lng: -122.43455562331151}
  },
  locations: {},
  currentSearch: {}
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
  SET_CURRENT_SEARCH (state, payload) {
    // let clonedeep = require('lodash/clonedeep');
    // let current = clonedeep(state.currentSearch)
    let newSearch = payload.locations;
    for (let k in state.currentSearch) {
      if (payload.removeIDs.indexOf(k) < 0) {
        newSearch[k] = state.currentSearch[k]
      }
    }
    state.currentSearch = newSearch;
  },
  addLocation (state, payload) {
    state.locations[payload.id] = payload.location
  },
  setPlace (state, payload) {
    state.place.address = payload.address
    state.place.geometry = payload.geometry
    state.place.latLng = {lat: payload.geometry.location.lat(), lng: payload.geometry.location.lng()}
  },
  api (state, google) {
    state.api = google
  },
  ready (state) {
    state.ready = true
  }
}

const actions = {
  setCurrentSearch ({commit}, payload) {
    commit('SET_CURRENT_SEARCH', payload)
  },
  addLocation (context, payload) {
    context.commit('addLocation', payload)
  },
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
