export function consumption(state) {
    return state.manualConsumption
        ? state.manualYearlyUsage || state.consumption
        : state.consumption
}

export function efficiency(state, getters) {
    return parseInt((state.pvWattData['outputs'] || {})['ac_annual'] / (getters.consumption / 100))
}