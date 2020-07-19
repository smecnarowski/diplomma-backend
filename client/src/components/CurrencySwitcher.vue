<template>
  <q-btn 
    flat
    :label="currency"
  >
    <q-menu
      fit
      anchor="bottom right"
      self="top right"
      v-model="menuVisible"
    >
      <q-item>
        <q-item-section>
          <q-input
            dense
            v-model="search"
            maxlength="3"
            class="text-uppercase"
          >
            <template v-slot:append>
              <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
              <q-icon v-else name="search" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item 
        clickable 
        v-for="currencyElement in currencies"
        :key="currencyElement"
        @click="setRateCurrency(currencyElement)"
      >
        <q-item-section>{{currencyElement}}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      menuVisible: false,
      search: '',
    }
  },
  computed: {
    ...mapState('configuration', ['rates', 'currency']),
    currencies: function () {
      const currencies = Object.keys(this.rates).sort()
      if (this.search === '') {
        return currencies
      }

      return currencies.filter(currency => currency.indexOf(this.search.toUpperCase()) === 0)
    },
  },
  methods: {
    ...mapActions('configuration', ['setCurrency']),
    setRateCurrency(currency) {
      this.search = ''
      this.setCurrency(currency)
      this.menuVisible = false
    },
  }
}
</script>