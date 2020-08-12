<template>
  <q-card class="q-mt-sm">
    <q-card-section>
      <div class="text-h6">{{ module.name }}</div>
      <div class="text-subtitle2">
        {{ $t('Power') }}: {{ module.power }}W, 
        {{ $t('Price') }}: <PriceRenderer :price="module.price" :baseCurrency="module.priceCurrency"/>
      </div>
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
            <q-tab name="info" icon="info" :label="$t('info')" />
            <q-tab name="properties" icon="list" :label="$t('properties')" v-if="hasProperties"/>
            <q-tab name="image" icon="photo" :label="$t('image')" v-if="hasImage" />
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
              <p v-html="$sanitize(module.description)" />
            </q-tab-panel>

            <q-tab-panel name="properties">
              <q-table
                :data="properties"
                :columns="columns"
                row-key="name"
                flat
                bordered
                separator="vertical"
              />
            </q-tab-panel>

            <q-tab-panel name="image">
              <div class="text-center">
                <q-img
                  :src="module.img"
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
  name: 'ModuleInfo',
  props: {
    module: Object
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: this.$t('Name'),
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: false,
        },
        { name: 'value', align: 'right', label: this.$t('Value'), field: 'value', sortable: false },
      ],
      splitterModel: 20,
      tab: 'info'
    }
  },
  computed: {
    ...mapState('configuration', ['selectedModule']),
    properties() {
      const properties = this.module.parameters || []
      
      return properties.map(property => {
        return {
          name: property.name,
          value: property.value + (property.unit || '')
        }
      })
    },
    hasImage() {
      return (this.module.img || '').length > 0
    },
    hasProperties() {
      return this.properties.length > 0
    },
    isSelected() {
      const selectedModuleID = this.selectedModule._id
      
      return selectedModuleID === this.module._id
    },
    buttonLabel() {
      const label = this.isSelected ? 'selected' : 'select'
      return this.$t(label)
    }
  },
  methods: {
    ...mapActions('configuration', ['setModule']),
    select() {
      this.setModule(this.module)
    }
  },
  components: {
    PriceRenderer
  }
  
}

</script>