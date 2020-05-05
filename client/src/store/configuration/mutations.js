import _set from 'lodash/set'

export const setSolarAtlasData = function(state, payload) {
  if (payload['DIF'] === undefined) {
    this._vm.$q.dialog({
      dark: true,
      title: 'Information',
      message: 'Currently we have no data about selected location.'
    })
  }
  state.solarAtlasData = payload
}

export const setCountry = (state, country) => {
  state.selectedCountry = country
}

export const setConsumption = (state, consumption) => {
  state.consumption = Math.floor(consumption)
}

export const solarAtlasDataLoading = (state, value) => {
  state.solarAtlasDataLoading = value
}

export const setProperty = (state, payload) => {
  const mod = state[payload.module]
  _set(mod, payload.path, payload.value)
  state[payload.module] = mod
}
