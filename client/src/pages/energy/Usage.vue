<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card"
      flat
      bordered
    >
      <q-card-section class="col-12 q-pt-xs">
        <div class="doc-card-title">Energy usage</div>
      </q-card-section>
      <q-card-section horizontal>
        <q-list>
          <transition name="fadeIn">
            <q-item v-if="!knowConsuption">
              <q-banner dense class="bg-primary text-white">
                Suggested usage base on "Factbook" data. It's energy consumption per capita for selected country.
              </q-banner>
            </q-item>
          </transition>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section>
              <q-item-label>I know yearly energy consuption </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                color="blue"
                v-model="knowConsuption"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-input
              v-model.number="yearlyUsage"
              type="number"
              label="Yearly usage"
              style="width: 100%"
              suffix="kWh"
              min="10"
              step="10"
            />
          </q-item>
          <q-item>
            <q-input
              v-model.number="yearlyCost"
              type="number"
              label="Yearly cost"
              style="width: 100%"
              suffix="kWh"
              min="10"
              step="10"
            />
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PowerUsage',
  computed: {
    ...mapState('configuration', ['energyUsage', 'consumption']),
    knowConsuption: {
      get() {
        return this.energyUsage.knowConsuption
      },
      set(value) {
        this.setProperty({
          module: 'energyUsage',
          path: 'knowConsuption',
          value
        })
      }
    },
    yearlyCost: {
      get() {
        return this.energyUsage.yearlyCost
      },
      set(value) {
        this.setProperty({
          module: 'energyUsage',
          path: 'yearlyCost',
          value
        })
      }
    },
    yearlyUsage: {
      get() {
        return this.energyUsage.knowConsuption 
          ? this.energyUsage.yearlyUsage || this.consumption
          : this.consumption
      },
      set(value) {
        this.setProperty({
          module: 'energyUsage',
          path: 'yearlyUsage',
          value
        })
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['setProperty']),
    mapClick(data) {}
  }
}
</script>
