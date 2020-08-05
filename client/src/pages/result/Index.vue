<template>
  <div>
    <pre>To cover your needs you have to buy <span class="primary--text">{{ modulesCount }}</span> modules.</pre>
    <pre>isNorthernHemisphere: {{ isNorthernHemisphere }}</pre>
    <pre>{{ solarAtlasData }}</pre>
    <v-chart :options="options" class="full-width"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
  name: 'ResultIndex',
  data() {
    return {
      yearlyIncome : 120,
      years: Array.from(Array(5).keys())
    }
  },
  computed: {
    ...mapState('configuration', ['position', 'solarAtlasData']),
    isNorthernHemisphere() {
      return this.position.lat < 0
    },
    modulesCount() {
      return 0
    },
    options() {
      return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.years
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 820, 820, 820, 820, 820, 820],
            type: 'line',
            areaStyle: {}
        },{
            data: this.years.map(year => year * this.yearlyIncome),
            type: 'line'
        }]
      }
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  components: {
    'v-chart': ECharts
  }
}
</script>