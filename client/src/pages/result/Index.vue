<template>
  <div>
    <h5>
      Median degradation rates for modules is {{ degradation * 100 }}% per year so it will generate <span>in {{ lastYear }} years</span> electricity totaling <span>{{ income }}({{ currency }})</span>.
      Your <span>investment will return</span> in <span>{{ returnDate }}</span>.
    </h5>
    <v-chart :options="options" class="full-width"/>
    <div>
      To cover your demands you need to buy <span class="primary--text">{{ modulesCount }}</span> {{ selectedModule.name }} modules for <PriceRenderer :price="modulesPrice" :baseCurrency="modulesCurrency" rounded/>.
      Inverter cost is <PriceRenderer :price="selectedInverter.price" :baseCurrency="selectedInverter.priceCurrency" rounded/>.
    </div>
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
      degradation: 0.005,
      years: Array.from(Array(25).keys(), x => x + 1)
    }
  },
  computed: {
    ...mapState('configuration', ['currency', 'position', 'rates', 'selectedInverter', 'selectedModule', 'solarAtlasData', 'yearlyCost']),
    ...mapGetters('configuration', ['consumption', 'efficiency', 'modulesCount']),
    income() {
      const degradation = Math.min(this.lastYear * this.degradation, 1)
      return (this.lastYear * this.yearlyCost) * (1 - degradation)
    },
    daysToReturn() {
      const now = new Date();
      const finalYear = new Date(now.getFullYear() + this.lastYear, now.getMonth(), now.getDate());
      const periodDays = Math.ceil((finalYear - now + 1) / 86400000);
      const dailyIncome = this.income / periodDays

      return Math.ceil(this.installationSum / dailyIncome)
    },
    installationSum() {
      return (
        ( this.modulesPrice * this.rates[this.selectedModule.priceCurrency] ) +
        ( this.selectedInverter.price * this.rates[this.selectedInverter.priceCurrency])
      ) * this.rates[this.currency]
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
            data: this.years.map(year => {
              const degradation = Math.min((year - 1) * this.degradation, 1)
              return (year * this.yearlyCost) * (1 - degradation)
            }),
            type: 'line'
        }]
      }
    },
    returnDate() {
      const date = new Date();
      date.setDate(date.getDate() + this.daysToReturn)
    
      return date.toLocaleString().substr(0, 10)
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  components: {
    'v-chart': ECharts,
    PriceRenderer
  }
}
</script>