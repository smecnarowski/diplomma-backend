export function consumption(state) {
    return state.manualConsumption
        ? state.manualYearlyUsage || state.consumption
        : state.consumption
}

export function efficiency(state, getters) {
    return parseInt((state.pvWattData['outputs'] || {})['ac_annual'] / (getters.consumption / 100))
}

export function modulesCount(state, getters) {
    return Math.ceil(getters.consumption / (state.selectedModule.power * (getters.efficiency / 100)))
}