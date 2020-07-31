<template>
  <q-card class="q-mt-sm">
    <q-card-section>
      <div class="text-h6">{{ inverter.name }}</div>
      <div class="text-subtitle2">Power: {{ inverter.power }}W, Price: <PriceRenderer :price="inverter.price" :baseCurrency="inverter.priceCurrency"/>, Tab: {{ tab }}</div>
    </q-card-section>

    <q-card-section>
      <q-splitter
        v-model="splitterModel"
        :horizontal="$q.screen.lt.lg"
        justify
        style="min-height: 280px"
      >

        <template v-slot:before>
          <q-tabs
            v-model="tab"
            dense
            :vertical="$q.screen.gt.lg || $q.screen.lg"
            class="text-teal"
          >
            <q-tab name="info" icon="info" label="Info" />
            <q-tab name="properties" icon="list" label="Properties" v-if="hasProperties"/>
            <q-tab name="image" icon="photo" label="Image"  v-if="hasImage" />
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
              <div class="text-h6 q-mb-md">Description</div>
              <p v-html="$sanitize(inverter.description)" />
            </q-tab-panel>

            <q-tab-panel name="properties">
              <div class="text-h6 q-mb-md">Properties</div>
              <q-table
                :data="properties"
                :columns="columns"
                row-key="name"
                hide-bottom
                flat
                bordered
                separator="vertical"
              />
            </q-tab-panel>

            <q-tab-panel name="image">
              <div class="text-h6 q-mb-md">Image</div>
              <div class="text-center">
                <q-img
                  :src="inverter.img"
                  style="max-width: 400px; height: 300px;"
                  contain
                >
                  <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-negative text-white">
                      Cannot load image
                    </div>
                  </template>
                </q-img>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-space />
      <q-btn color="primary" :label="buttonLabel" @click="select" :disable="isSelected" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PriceRenderer from './../../components/PriceRenderer'

export default {
  name: 'InverterInfo',
  props: {
    inverter: Object
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: false,
        },
        { name: 'value', align: 'right', label: 'Value', field: 'value', sortable: false },
      ],
      splitterModel: 20,
      tab: 'info'
    }
  },
  computed: {
    ...mapState('configuration', ['selectedInverter']),
    properties() {
      const properties = this.inverter.parameters || []
      
      return properties.map(property => {
        return {
          name: property.name,
          value: property.value + (property.unit || '')
        }
      })
    },
    hasImage() {
      return (this.inverter.img || '').length > 0
    },
    hasProperties() {
      return this.properties.length > 0
    },
    isSelected() {
      const selectedInverterID = this.selectedInverter._id
      
      return selectedInverterID === this.inverter._id
    },
    buttonLabel() {
      return 'Select' + (this.isSelected ? 'ed' : '')
    }
  },
  methods: {
    ...mapActions('configuration', ['setInverter']),
    select() {
      this.setInverter(this.inverter)
    }
  },
  components: {
    PriceRenderer
  }
  
}

</script>