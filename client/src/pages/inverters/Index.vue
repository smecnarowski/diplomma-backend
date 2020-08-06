<template>
  <div>
    <q-select 
      :options="manufacturersOptions" 
      option-value="id" 
      option-label="name" 
      label="Manufacturer" 
      v-model="manufacturer"
      @filter="filterManufacturersFn"
      use-input
    />

    <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders">
      <q-toggle
        v-model="allowOversized"
        label="Allow oversized"
      />

      <q-space />

      
      <q-toggle
        v-model="showAll"
        label="Show all"
        left-label
      />
    </div>
    <InverterInfo v-for="(model, idx) in filteredInverters" :key="idx" :inverter="model" />

    <q-inner-loading :showing="manufacturersDataLoading || invertersLoading">
      <q-spinner-ios size="50px" color="yellow" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import InverterInfo from './InverterInfo'

export default {
  name: 'InvertersIndex',
  data() {
    return {
      allowOversized: true,
      manufacturersOptions: [],
      showAll: false,
    }
  },
  computed: {
    ...mapState('configuration', ['invertersLoading', 'invertersManufacturer', 'loadedInverters', 'manufacturersData', 'manufacturersDataLoading', 'selectedModule']),
    ...mapGetters('configuration', ['modulesCount']),
    filteredInverters() {
      if (this.showAll) {
        return this.loadedInverters
      }

      const expectedPower = this.modulesCount * this.selectedModule.power
      const maxPower = this.allowOversized ? Number.MAX_SAFE_INTEGER : expectedPower * 1.2
      return this.loadedInverters.filter(inverter => {
        return inverter.power >= expectedPower && inverter.power <= maxPower
      })
    },
    manufacturer: {
      set(manufacturer) {
        this.setInvertersManufacturer(manufacturer)
      },
      get() {
        return this.invertersManufacturer
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['getManufacturersData', 'getManufacturerData', 'setInvertersManufacturer']),
    filterManufacturersFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.manufacturersOptions = this.manufacturersData.filter(v => {
          const invertersCount = (v.products || {}).inverters || 0
          return invertersCount > 0 && v.name.toLowerCase().indexOf(needle) > -1
        })
      })
    },
    loadInverters() {
      this.getManufacturerData({
        manufacturerId: this.manufacturer._id,
        type: 'inverter'
      })
    }
  },
  mounted() {
    if (this.manufacturersData.length === 0) {
      this.getManufacturersData()
    }
  },
  watch: {
    manufacturer(newValue) {
      if (newValue) {
        this.loadInverters();
      }
    }
  },
  components: {
    InverterInfo
  }
}
</script>