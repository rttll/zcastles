const localKey = 'z-castles-current-search'

const state = {
  locations: {},
  search: null,
}

const mutations = {
  UPDATE_SEARCH (state, payload) {
    state.search = {...state.search, ...payload}
    if (Object.keys(state.search).length < 1) {
      localStorage.removeItem(localKey)
    } else {
      localStorage.setItem(localKey, JSON.stringify(state.search))
    }
    
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

function savedSearch() {
  let parsed = null;
  let stored = localStorage.getItem('z-castles-current-search')
  if (stored !== null) {
    parsed = JSON.parse(stored)
  }
  return parsed;
}

const getters = {
  currentSearch (state) {
    let search = state.search
    if (search === null) {
      search = savedSearch()
    }
    return search
  },
  currentSearchDisplay (state) {
    let display = ''
    if (state.search === null) {
      let saved = savedSearch()
      display = saved === null ? '' : saved.displayString
    } else {
      display = state.search.displayString
    }
    return display
  },
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
