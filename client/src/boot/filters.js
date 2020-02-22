import Vue from 'vue'

Vue.filter('rounded', function(value, precision = 0) {
  if (!value) return ''

  if (precision < 0) {
    precision = 0
  }
  const pow = Math.pow(10, precision)

  return Math.round((value + Number.EPSILON) * pow) / pow
})
