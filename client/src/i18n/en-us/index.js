// This is just an example,
// so you can safely delete all default props below

export default {
  building: {
    angle: 'The angle of inclination of the surface on which the panels will be placed',
    compass: 'Location in terms of compass points',
    efficiency: 'Efficiency related to the tilt and azimuth',
  },
  dni_text: 'Direct normal irradiation',
  energy: {
    consumption: 'I know and whant to put exact yearly energy consuption.',
    cost: 'Yearly cost',
    info: 'Suggested usage base on "Factbook" data. It\'s energy consumption per capita for selected country.',
    usage: 'Yearly usage',
  },
  failed: 'Action failed',
  inverters: {
    all: 'Show all',
    oversized: 'Allow oversized',
  },
  manufacturer: 'Manufacturer',
  'optimum-tilt': 'Optimum tilt of PV modules',
  result: {
    assembly: 'You can provide assembly costs',
    costs: 'Costs',
    increase: 'Assumed annual increase in the price of energy',
    modules: 'Modules',
    inverter: 'Inverter',
    summary: [
      'Median degradation rates for modules is {v}% per year',
      'and assuming an increase in the electricity price of {v}%',
      'it will generate <span>in {v1}&nbsp;years</span> electricity totaling <span>{v2}({v3})</span>',
      'Your investment will return in {v} years where the lines intersect on the chart.',
      'It seems that your investment won\'t return in {v} years period.',
    ],
    yearly: 'Yearly income',
  },
  success: 'Action was successful'
}
