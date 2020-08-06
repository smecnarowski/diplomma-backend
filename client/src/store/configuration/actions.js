import axios from 'axios'

export const getSolarAtlasData = ({ commit, dispatch }, payload) => {
  commit('solarAtlasDataLoading', true)

  const position = {
    lat: payload.latLng.lat(),
    lng: payload.latLng.lng()
  }
  commit('setPosition', position)

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
    commit('setProperty', payload)
  }
}

export const getGeoDetails = ({ commit, dispatch }, payload) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latLng.lat()},${payload.latLng.lng()}&key=AIzaSyAdG-lHuJTjodmC3OcPDDnJuqIa6BTSC-4`
    )
    .then(response => {
      const countryResults = response.data.results.filter(result => result.types.indexOf('country') !== -1)
      const countryName = countryResults.length ? countryResults[0].formatted_address : ''
      commit('setCountry', countryName)
      dispatch('getCountryConsumption', countryName)
    })
}

export const getCountryConsumption = ({ commit }, countryName) => {
  axios
  .get(
    `${process.env.API_URL}/api/energy-consumptions/${countryName}`
  )
  .then(response => {
    commit('setConsumption', response.data.consumption)
  })
  .catch(() => {
    commit('setConsumption', null)
  });
}

export const getRates = ({ commit }) => {
  commit('ratesLoading', true)

  return axios
    .get(
      `${process.env.API_URL}/api/rates`
    )
    .then(response => {
      commit('setRates', response.data)
      commit('ratesLoading', false)
    })
}

export const setCurrency = ({ commit }, currency) => {
  commit('setCurrency', currency)
}

export const getManufacturersData = ({ commit }) => {
  commit('manufacturersDataLoading', true)

  return axios
    .get(
      `${process.env.API_URL}/api/manufacturers`
    )
    .then(response => {
      commit('setManufacturersData', response.data)
      commit('manufacturersDataLoading', false)
    })
}

export const setModule = ({ commit }, module) => {
  commit('setModule', module)
}

export const setModulesAngle = ({ commit }, angle) => {
  commit('setModulesAngle', angle)
}

export const setModulesDirection = ({ commit }, direction) => {
  commit('setModulesDirection', direction)
}

export const setModulesManufacturer = ({ commit }, manufacturer) => {
  commit('setModulesManufacturer', manufacturer)
}

export const setInverter = ({ commit }, inverter) => {
  commit('setInverter', inverter)
}

export const setInvertersManufacturer = ({ commit }, manufacturer) => {
  commit('setInvertersManufacturer', manufacturer)
}

export const setManualConsumption = ({ commit }, manualConsumption) => {
  commit('setManualConsumption', manualConsumption)
}

export const getManufacturerData = ({ commit }, { manufacturerId, type }) => {
  const destination = type.replace(/^./, type[0].toUpperCase()) + 's'; 
  commit('set' + destination + 'Loading', true)
  axios
  .get(
    `${process.env.API_URL}/api/manufacturers/${manufacturerId}`
  )
  .then(response => {
    const products = (response.data.products || []).filter(product =>{
      return product.type === type
    })
    commit('setLoaded' + destination, products)
  })
  .catch(() => {
    commit('setLoaded' + destination, [])
  })
  .finally(() => {
    commit('set' + destination + 'Loading', false)
  })
}

export const getPvWattData = ({ commit, state, getters }) => {
  commit('setPvWattDataLoading', true)
  return axios
    .get(
      'https://developer.nrel.gov/api/pvwatts/v6.json',
      {
        params: {
          api_key: 'm4F3EXwxtBf0MTY6Vv72TFI7tAS2d91AAaLHUznt',
          array_type: 1,
          azimuth: state.modulesDirection,
          dataset: 'intl',
          lat: state.position.lat,
          lon: state.position.lng,
          losses: 0,
          module_type: 0,
          system_capacity: getters.consumption / 1000,
          tilt: state.modulesAngle,
        }
      }
    )
    .then(response => {
      commit('setPvWattData', response.data)
    })
    .catch(error => {
      const data = error.response.data
      const errors = data['errors'] || []
      if (errors.length) {
        commit('showDialog', {
          dark: true,
          title: 'Information',
          message: errors[0]
        })
      }
    })
    .finally(() => {
      commit('setPvWattDataLoading', false)
    })
}