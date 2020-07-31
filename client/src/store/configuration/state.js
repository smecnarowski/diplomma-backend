export default function() {
  return {
    consumption: null,
    currency: 'USD',
    invertersLoading: false,
    loadedInverters: [],
    loadedModules: [],
    manufacturersData: [],
    manufacturersDataLoading: false,
    modulesLoading: false,
    rates: {},
    ratesLoading: false,
    selectedInverter: {},
    selectedModule: {},
    solarAtlasData: {},
    solarAtlasDataLoading: false,
    selectedCountry: '',

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
