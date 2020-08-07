<template>
  <div>
    <q-select 
      :options="manufacturersOptions" 
      option-value="id" 
      option-label="name" 
      :label="$t('manufacturer')" 
      v-model="manufacturer"
      @filter="filterManufacturersFn"
      use-input
    />

    <ModuleInfo v-for="(model, idx) in loadedModules" :key="idx" :module="model" />

    <q-inner-loading :showing="manufacturersDataLoading || modulesLoading">
      <q-spinner-ios size="50px" color="yellow" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModuleInfo from './ModuleInfo'

export default {
  name: 'ModulesIndex',
  data() {
    return {
      manufacturersOptions: []
    }
  },
  computed: {
    ...mapState('configuration', ['loadedModules', 'manufacturersData', 'manufacturersDataLoading', 'modulesLoading', 'modulesManufacturer']),
    manufacturer: {
      set(manufacturer) {
        this.setModulesManufacturer(manufacturer)
      },
      get() {
        return this.modulesManufacturer
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['getManufacturersData', 'getManufacturerData', 'setModulesManufacturer']),
    filterManufacturersFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.manufacturersOptions = this.manufacturersData.filter(v => {
          const modulesCount = (v.products || {}).modules || 0
          return modulesCount > 0 && v.name.toLowerCase().indexOf(needle) > -1
        })
      })
    },
    loadModules() {
      this.getManufacturerData({
        manufacturerId: this.manufacturer._id,
        type: 'module'
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
        this.loadModules();
      }
    }
  },
  components: {
    ModuleInfo
  }
}
</script>