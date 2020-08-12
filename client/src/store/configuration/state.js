export default function() {
  return {
    assemblyCost: 0,
    consumption: null,
    currency: 'USD',
    energyPriceIncrease: 2,
    invertersLoading: false,
    invertersManufacturer: '',
    loadedInverters: [],
    loadedModules: [],
    manualConsumption: false,
    manufacturersData: [],
    manufacturersDataLoading: false,
    modulesAngle: 30,
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
