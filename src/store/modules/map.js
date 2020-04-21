
const state = {
  locations: {},
  search: null
}

const mutations = {
  UPDATE_SEARCH (state, payload) {
    state.search = {...state.search, ...payload}
  },
  UPDATE_LOCATIONS (state, payload) {
    let prev = state.locations;
    for (let id of payload.remove) {
      prev[id].visible = false;
    }
    state.locations = {...prev, ...payload.locations}
  },
  ADD_LOCATION (state, payload) {
    state.locations[payload.id] = payload.location
  }
}

const getters = {
  getLocation (state) {
    return (id) => {
      for (let k in state.locations) {
        if (k === id) return state.locations[k]
      }
    }
  },
  activeLocations: state => {
    let filtered = {}
    for (let k in state.locations) {
      if (state.locations[k].visible) filtered[k] = state.locations[k]
    }
    return filtered
  }
}

const actions = {
  updateSearch ({commit}, payload) {
    commit('UPDATE_SEARCH', payload)
  },
  updateLocations ({commit}, payload) {
    commit('UPDATE_LOCATIONS', payload)
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
