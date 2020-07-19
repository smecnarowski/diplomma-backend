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
    <q-card class="q-mt-sm" v-for="(model, idx) in models" :key="idx">
      <q-card-section>
        <div class="text-h6">{{ model.name }}</div>
        <div class="text-subtitle2">Power: {{ model.power }}W, Price: <PriceRenderer :price="model.price" :baseCurrency="model.priceCurrency"/></div>
      </q-card-section>

      <q-card-section>
        <q-splitter
          v-model="splitterModel"
          :horizontal="$q.screen.lt.lg"
          justify
          style="height: 250px"
        >

          <template v-slot:before>
            <q-tabs
              v-model="tab[idx]"
              dense
              :vertical="$q.screen.gt.lg || $q.screen.lg"
              class="text-teal"
            >
              <q-tab name="info" icon="info" label="Info" />
              <q-tab name="properties" icon="list" label="Properties" />
              <q-tab name="image" icon="photo" label="Image" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="info">
                <div class="text-h4 q-mb-md">Description</div>
                <p v-html="$sanitize(model.description)" />
              </q-tab-panel>

              <q-tab-panel name="properties">
                <div class="text-h4 q-mb-md">Alarms</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>

              <q-tab-panel name="image">
                <div class="text-h4 q-mb-md">Movies</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>
            </q-tab-panels>
          </template>

        </q-splitter>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>

    <q-inner-loading :showing="loading">
      <q-spinner-ios size="50px" color="yellow" />
    </q-inner-loading>
  </div>
</template>

<script>
import PriceRenderer from './../../components/PriceRenderer'

export default {
  name: 'MudulesIndex',
  data() {
    return {
      loading: false,
      manufacturer: '',
      manufacturers: [
        {
          id: 1,
          name: 'America Green Solar',
        },
        {
          id: 2,
          name: 'Bosch',
        },
        {
          id: 3,
          name: 'BP Solar',
        },
        {
          id: 4,
          name: 'Greenshine New Energy',
        },
        {
          id: 5,
          name: 'Canadian Solar Sunergy',
        },
        {
          id: 6,
          name: 'China Conergy',
        },
        {
          id: 7,
          name: 'DelSolar',
        },
        {
          id: 8,
          name: 'E-Ton Solar',
        },
        {
          id: 9,
          name: 'Evergreen Solar[Note 3]',
        },
        {
          id: 10,
          name: 'First Solar',
        },
        {
          id: 11,
          name: 'Morgan Solar Inc',
        },
        {
          id: 12,
          name: 'Gintech',
        },
        {
          id: 13,
          name: 'Contendre Solar',
        },
        {
          id: 14,
          name: 'Isofoton',
        },
        {
          id: 15,
          name: 'Lubi solar',
        },
        {
          id: 16,
          name: 'Itek Energy',
        },
        {
          id: 17,
          name: 'JA Solar Holdings',
        },
        {
          id: 18,
          name: 'JUST Solar Co.,Ltd.',
        },
        {
          id: 19,
          name: 'Kyocera',
        },
        {
          id: 20,
          name: 'Mitsubishi Electric',
        },
        {
          id: 21,
          name: 'Mitsubishi Heavy',
        },
        {
          id: 22,
          name: 'Motech',
        },
        {
          id: 23,
          name: 'MX Group',
        },
        {
          id: 24,
          name: 'Neo Solar Power',
        },
        {
          id: 25,
          name: 'Ningbo Solar Electric',
        },
        {
          id: 26,
          name: 'Photowatt',
        },
        {
          id: 27,
          name: 'Photovoltech NV',
        },
        {
          id: 28,
          name: 'Q-Cells',
        },
        {
          id: 29,
          name: 'RECOM',
        },
        {
          id: 30,
          name: 'Renewable Energy Corporation',
        },
        {
          id: 31,
          name: 'Panasonic',
        },
        {
          id: 32,
          name: 'Schott Solar',
        },
        {
          id: 33,
          name: 'Sharp',
        },
        {
          id: 34,
          name: 'Solarday',
        },
        {
          id: 35,
          name: 'SolarPark Korea',
        },
        {
          id: 36,
          name: 'SolarWorld',
        },
        {
          id: 37,
          name: 'Solland',
        },
        {
          id: 38,
          name: 'SunPower',
        },
        {
          id: 39,
          name: 'Suntech',
        },
        {
          id: 40,
          name: 'Sunways',
        },
        {
          id: 41,
          name: 'Trina Solar',
        },
        {
          id: 42,
          name: 'United Solar Ovonic',
        },
        {
          id: 43,
          name: 'Vikram Solar Pvt. Ltd',
        },
        {
          id: 44,
          name: 'Yingli',
        },
        {
          id: 45,
          name: 'Tamesol',
        },
        {
          id: 46,
          name: 'Sova Solar Limited',
        },
        {
          id: 47,
          name: 'Zytech Solar (Zyt Energy Group)',
        }
      ],
      manufacturersOptions: [],
      model: '',
      models: [],
      tab: [],
      splitterModel: 20
    }
  },
  methods: {
    filterManufacturersFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.manufacturersOptions = this.manufacturers.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    loadModels() {
      this.loading = true;
      setTimeout(() => {
        const models = [];
        for (var i = 1; i <= 10; i++) {
          models.push({
            name: '340',
            power: 340,
            price: 200,
            priceCurrency: 'USD',
            img: 'https://solar-distribution.baywa-re.de/out/pictures/generated/product/1/640_640_75/01-000479_01-000479_JASolar_JAM60S10-340MR_01.jpg?1589963770',
            description: '<b>abc</b><br /><u>def</u>',
            parameters: [
              { 
                name: 'Power',
                unit: 'kWp',
                value: 340,
              },
              { 
                name: 'Warranty',
                value: '10 years',
              }
            ]
          });
        }
        this.models = models;
        this.loading = false;
      }, 2000)
    }
  },
  watch: {
    manufacturer(newValue) {
      if (newValue) {
        this.loadModels();
      }
    }
  },
  components: {
    PriceRenderer
  }
}
</script>