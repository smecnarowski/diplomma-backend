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
      manufacturer: '',
      // manufacturers: [
      //   {
      //     id: 1,
      //     name: 'America Green Solar',
      //   },
      //   {
      //     id: 2,
      //     name: 'Bosch',
      //   },
      //   {
      //     id: 3,
      //     name: 'BP Solar',
      //   },
      //   {
      //     id: 4,
      //     name: 'Greenshine New Energy',
      //   },
      //   {
      //     id: 5,
      //     name: 'Canadian Solar Sunergy',
      //   },
      //   {
      //     id: 6,
      //     name: 'China Conergy',
      //   },
      //   {
      //     id: 7,
      //     name: 'DelSolar',
      //   },
      //   {
      //     id: 8,
      //     name: 'E-Ton Solar',
      //   },
      //   {
      //     id: 9,
      //     name: 'Evergreen Solar[Note 3]',
      //   },
      //   {
      //     id: 10,
      //     name: 'First Solar',
      //   },
      //   {
      //     id: 11,
      //     name: 'Morgan Solar Inc',
      //   },
      //   {
      //     id: 12,
      //     name: 'Gintech',
      //   },
      //   {
      //     id: 13,
      //     name: 'Contendre Solar',
      //   },
      //   {
      //     id: 14,
      //     name: 'Isofoton',
      //   },
      //   {
      //     id: 15,
      //     name: 'Lubi solar',
      //   },
      //   {
      //     id: 16,
      //     name: 'Itek Energy',
      //   },
      //   {
      //     id: 17,
      //     name: 'JA Solar Holdings',
      //   },
      //   {
      //     id: 18,
      //     name: 'JUST Solar Co.,Ltd.',
      //   },
      //   {
      //     id: 19,
      //     name: 'Kyocera',
      //   },
      //   {
      //     id: 20,
      //     name: 'Mitsubishi Electric',
      //   },
      //   {
      //     id: 21,
      //     name: 'Mitsubishi Heavy',
      //   },
      //   {
      //     id: 22,
      //     name: 'Motech',
      //   },
      //   {
      //     id: 23,
      //     name: 'MX Group',
      //   },
      //   {
      //     id: 24,
      //     name: 'Neo Solar Power',
      //   },
      //   {
      //     id: 25,
      //     name: 'Ningbo Solar Electric',
      //   },
      //   {
      //     id: 26,
      //     name: 'Photowatt',
      //   },
      //   {
      //     id: 27,
      //     name: 'Photovoltech NV',
      //   },
      //   {
      //     id: 28,
      //     name: 'Q-Cells',
      //   },
      //   {
      //     id: 29,
      //     name: 'RECOM',
      //   },
      //   {
      //     id: 30,
      //     name: 'Renewable Energy Corporation',
      //   },
      //   {
      //     id: 31,
      //     name: 'Panasonic',
      //   },
      //   {
      //     id: 32,
      //     name: 'Schott Solar',
      //   },
      //   {
      //     id: 33,
      //     name: 'Sharp',
      //   },
      //   {
      //     id: 34,
      //     name: 'Solarday',
      //   },
      //   {
      //     id: 35,
      //     name: 'SolarPark Korea',
      //   },
      //   {
      //     id: 36,
      //     name: 'SolarWorld',
      //   },
      //   {
      //     id: 37,
      //     name: 'Solland',
      //   },
      //   {
      //     id: 38,
      //     name: 'SunPower',
      //   },
      //   {
      //     id: 39,
      //     name: 'Suntech',
      //   },
      //   {
      //     id: 40,
      //     name: 'Sunways',
      //   },
      //   {
      //     id: 41,
      //     name: 'Trina Solar',
      //   },
      //   {
      //     id: 42,
      //     name: 'United Solar Ovonic',
      //   },
      //   {
      //     id: 43,
      //     name: 'Vikram Solar Pvt. Ltd',
      //   },
      //   {
      //     id: 44,
      //     name: 'Yingli',
      //   },
      //   {
      //     id: 45,
      //     name: 'Tamesol',
      //   },
      //   {
      //     id: 46,
      //     name: 'Sova Solar Limited',
      //   },
      //   {
      //     id: 47,
      //     name: 'Zytech Solar (Zyt Energy Group)',
      //   }
      // ],
      manufacturersOptions: []
    }
  },
  computed: {
    ...mapState('configuration', ['loadedInverters', 'manufacturersData', 'manufacturersDataLoading', 'invertersLoading']),
  },
  methods: {
    ...mapActions('configuration', ['getManufacturersData', 'getManufacturerData']),
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