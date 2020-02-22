import axios from 'axios'

export const getSolarAtlasData = ({ commit, dispatch }, payload) => {
  commit('solarAtlasDataLoading', true)
  dispatch('getGeoDetails', payload)
  return axios
    .get(
      `https://api.globalsolaratlas.info/data/lta?loc=${payload.latLng.lat()},${payload.latLng.lng()}`
    )
    .then(response => {
      commit('setSolarAtlasData', response.data.annual.data)
      commit('solarAtlasDataLoading', false)
    })
}

export const setProperty = ({ commit }, payload) => {
  const payloadKeys = Object.keys(payload)
  if (
    payloadKeys.indexOf('module') !== -1 &&
    payloadKeys.indexOf('path') !== -1 &&
    payloadKeys.indexOf('value') !== -1
  ) {
    console.log('payload', payload)
    commit('setProperty', payload)
  }
}

export const getGeoDetails = ({ commit }, payload) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latLng.lat()},${payload.latLng.lng()}&key=AIzaSyAdG-lHuJTjodmC3OcPDDnJuqIa6BTSC-4`
    )
    .then(response => {
      console.log('response', response)
    })
}
