export default function() {
  return {
    currency: 'USD',
    rates: {},
    ratesLoading: false,
    solarAtlasData: {},
    solarAtlasDataLoading: false,
    selectedCountry: '',
    consumption: null,

    position: { 
      lat: 49.78349580450346, 
      lng: 19.057072588747076
    },

    energyUsage: {
      knowConsuption: false,
      yearlyCost: 500,
      yearlyUsage: 0
    }
  }
}
