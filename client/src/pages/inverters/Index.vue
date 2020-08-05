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

    <InverterInfo v-for="(model, idx) in loadedInverters" :key="idx" :inverter="model" />

    <q-inner-loading :showing="manufacturersDataLoading || invertersLoading">
      <q-spinner-ios size="50px" color="yellow" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import InverterInfo from './InverterInfo'

export default {
  name: 'InvertersIndex',
  data() {
    return {
      manufacturersOptions: []
    }
  },
  computed: {
    ...mapState('configuration', ['loadedInverters', 'manufacturersData', 'manufacturersDataLoading', 'invertersLoading', 'invertersManufacturer']),
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