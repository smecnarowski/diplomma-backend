import _set from 'lodash/set'

export const setSolarAtlasData = (state, payload) => {
  state.solarAtlasData = payload
}

export const solarAtlasDataLoading = (state, value) => {
  state.solarAtlasDataLoading = value
}

export const setProperty = (state, payload) => {
  const mod = state[payload.module]
  _set(mod, payload.path, payload.value)
  state[payload.module] = mod
}
