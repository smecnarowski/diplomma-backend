export default function() {
  return {
    solarAtlasData: {},
    solarAtlasDataLoading: false,
    selectedCountry: '',
    consumption: null,

    energyUsage: {
      knowConsuption: false,
      yearlyCost: 500,
      yearlyUsage: 0
    }
  }
}
