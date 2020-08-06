<template>
  <span>{{ priceByCurrency }}({{ currency }})</span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    price: {
      required: true,
      type: Number,
    },
    baseCurrency: {
      default: 'USD',
      type: String,
    },
    rounded: Boolean,
  },
  template: '<div class="price"></div>',
  computed: {
    ...mapState('configuration', ['rates', 'currency']),
    priceByCurrency() {
      if (this.currency === this.baseCurrency) {
        return this.price
      }
      const priceInUSD = this.price * (this.rates[this.baseCurrency] || 0)
      return (priceInUSD * this.rates[this.currency]).toFixed(this.rounded ? 0 : 2)
    }
  }
}
</script>