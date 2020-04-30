import { createHelpers } from 'vuex-map-fields';

const localKey = 'zcastles-current-search'

const { getMapField, updateMapField } = createHelpers({
  getterType: 'getMapField',
  mutationType: 'updateMapField',
});

function savedSearch() {
  let parsed = null;
  let stored = localStorage.getItem('zcastles-current-search')
  if (stored !== null) {
    parsed = JSON.parse(stored)
  }
  return parsed;
}

const state = {
  locations: {},
  search: null,
  filters: {
    bedrooms: 1,
    bathrooms: 1,
    prince: null,
    minPrice: 0,
    maxPrice: 10000000
  }
}

const mutations = {
  updateMapField,
  UPDATE_FILTERS (state, payload) {
    state.filters = {...state.filters, ...payload}
    localStorage.setItem('zcastles-filters', JSON.stringify(state.filters))
    console.log(JSON.stringify(state.filters))
  },
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

const getters = {
  getMapField,
  filters (state) {
    let filters = state.filters
    let stored = localStorage.getItem('zcastles-filters')
    if (stored != null) {
      filters = JSON.parse(stored)
    }
    return filters
  },
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
  activeLocations: (state, getters) => {
    var values = require('lodash/values');
    var filter = require('lodash/filter');

    var unfiltered = values(state.locations);
    var filtered = filter(unfiltered, ({visible, price, prince, bedrooms, bathrooms}) => 
      visible === true &&
      price >= getters.filters.minPrice &&
      prince === getters.filters.prince &&
      bedrooms >= getters.filters.bedrooms &&
      bathrooms >= getters.filters.bathrooms

    )

    var locations = {}
    for (let location of filtered) {
      locations[location.place.id] = location
    }

    return locations
  }
}

const actions = {
  updateFilters ({commit}, payload) {
    commit('UPDATE_FILTERS', payload)
  },
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
