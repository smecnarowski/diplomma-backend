export default function() {
  return {
    modulesAngle: 30,
    consumption: null,
    currency: 'USD',
    invertersLoading: false,
    invertersManufacturer: '',
    loadedInverters: [],
    loadedModules: [],
    manualConsumption: false,
    manufacturersData: [],
    manufacturersDataLoading: false,
    modulesDirection: 180,
    modulesLoading: false,
    modulesManufacturer: '',
    position: { 
      lat: 49.78349580450346, 
      lng: 19.057072588747076
    },
    pvWattData: {},
    pvWattDataLoading: false,
    rates: {},
    ratesLoading: false,
    selectedInverter: {},
    selectedModule: {},
    solarAtlasData: {},
    solarAtlasDataLoading: false,
    selectedCountry: '',
    stepTitle: '',
    yearlyCost: 500,
    yearlyUsage: 0
  }
}
