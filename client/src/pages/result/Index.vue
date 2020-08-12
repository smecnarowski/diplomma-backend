<template>
  <div>
    <div class="q-my-xs text-subtitle2">
      {{ $t('result.summary[0]', { v: degradation * 100 } ) }}
      {{ this.priceIncrease ? $t('result.summary[1]', { v: priceIncrease } ) : '' }}
      <span v-html="$t('result.summary[2]', { v1: lastYear, v2: income.toFixed(0), v3: currency })" />.
      {{ 
        this.returnYear
          ? $t('result.summary[3]', { v: returnYear } )
          : $t('result.summary[4]', { v: lastYear } )
      }}
    </div>
    <q-input
        v-model.number="cost"
        type="number"
        :label="$t('result.assembly')"
        style="width: 100%"
        min="0"
        step="10"
        stack-label
      >
      <template v-slot:append>
        <q-icon name="toll" />
      </template>
    </q-input>

    <div class="row q-field--float q-mt-lg">
      <div class="col-12 q-field__label">
        {{ $t('result.increase') }}
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col-12">
        <q-slider
          v-model="priceIncrease"
          :min="0"
          :max="10"
          :step=".5"
          label
          :label-value="priceIncrease + '%'"
          label-always
        />
      </div>
    </div>
    <v-chart :options="options" class="full-width"/>

    <div class="row q-field--float q-mt-lg">
      <div class="col-12 text-h6">
        {{ $t('result.costs') }}: {{ installationSum.toFixed(0) }}
      </div>
    </div>
    <q-list bordered separator>
      <q-item v-ripple v-for="(item, index) in costs" :key="index">
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section side><PriceRenderer :price="item.price" :baseCurrency="item.priceCurrency" rounded hide-currency/></q-item-section>
      </q-item>
    </q-list>

    <div class="row q-field--float q-mt-lg">
      <div class="col-12 text-h6">
        {{ $t('result.yearly') }}
      </div>
    </div>
    <q-list bordered separator>
      <q-item v-ripple v-for="(value, year) in yearlyIncome" :key="year">
        <q-item-section>{{ year + 1 }}</q-item-section>
        <q-item-section side :class="{ 'text-negative': value < 0, 'text-positive': value >= 0 }">{{ value }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import PriceRenderer from 'src/components/PriceRenderer'

export default {
  name: 'ResultIndex',
  data() {
    return {
      cost: 0,
      degradation: 0.005,
      priceIncrease: 2,
      years: Array.from(Array(25).keys(), x => x + 1)
    }
  },
  computed: {
    ...mapState('configuration', ['currency', 'position', 'rates', 'selectedInverter', 'selectedModule', 'solarAtlasData', 'yearlyCost']),
    ...mapGetters('configuration', ['consumption', 'efficiency', 'modulesCount']),
    costs() {
      const costs = [
        { 
          name: this.$t('Modules') + ' ' + this.selectedModule.name + ' x' + this.modulesCount,
          price: this.modulesPrice,
          priceCurrency: this.modulesCurrency,
        },
        { 
          name: this.$t('Inverter') + ' ' + this.selectedInverter.name,
          price: this.selectedInverter.price,
          priceCurrency: this.selectedInverter.priceCurrency,
        },
      ]

      if (this.cost) {
        costs.push({ 
          name: this.$t('Assembly'),
          price: this.cost,
          priceCurrency: this.currency,
        })
      }

      return costs
    },
    daysToReturn() {
      const now = new Date();
      const finalYear = new Date(now.getFullYear() + this.lastYear, now.getMonth(), now.getDate());
      const periodDays = Math.ceil((finalYear - now + 1) / 86400000);
      const dailyIncome = this.income / periodDays

      return Math.ceil(this.installationSum / dailyIncome)
    },
    factor() {
      return this.degradation - (this.priceIncrease / 100)
    },
    income() {
      return this.seriesData[this.lastYear - 1]
    },
    installationSum() {
      return (
        ( this.currencyPrice( this.modulesPrice, this.selectedModule.priceCurrency) ) +
        ( this.currencyPrice( this.selectedInverter.price, this.selectedInverter.priceCurrency) )
      ) + this.cost
    },
    lastYear() {
      return this.years.slice(-1)[0] 
    },
    modulesCurrency() {
      return this.selectedModule.priceCurrency
    },
    modulesPrice() {
      return this.selectedModule.price * this.modulesCount
    },
    options() {
      return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.years
        },
        yAxis: {
            name: this.currency,
            type: 'value'
        },
        series: [{
            data: Array.from(this.years, year => this.installationSum),
            type: 'line',
            areaStyle: {}
        },{
            data: this.seriesData,
            type: 'line'
        }]
      }
    },
    returnDate() {
      const date = new Date();
      date.setDate(date.getDate() + this.daysToReturn)
    
      return date.toLocaleString().substr(0, 10)
    },
    returnYear() {
      return this.yearlyIncome.findIndex(item => item > 0) + 1
    },
    seriesData() {
      return this.years.map(year => {
        const factor = Math.min((year - 1) * this.factor - (this.priceIncrease / 100), 1)
        return (year * this.yearlyCost) * (1 - factor)
      })
    },
    yearlyIncome() {
      let sum = parseInt(this.installationSum) * -1

      const incomes = []
      this.seriesData.forEach((value, i) => {
        const yearIncome = value - (this.seriesData[i-1] || 0)
        sum += parseInt(yearIncome)
        incomes.push(sum)
      })

      return incomes
    }
  },
  methods: {
    currencyPrice(price, baseCurrency) {
      const priceInUSD = price / (this.rates[baseCurrency] || 0)
      const result = (priceInUSD * this.rates[this.currency]).toFixed(0)
      return parseInt(result)
    }
  },
  components: {
    'v-chart': ECharts,
    PriceRenderer
  }
}
</script>