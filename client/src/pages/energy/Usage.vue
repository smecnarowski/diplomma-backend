<template>
  <q-list style="width: 100%;">
    <transition name="fadeIn">
      <q-item>
        <q-banner dense class="bg-primary text-white full-width">
          Suggested usage base on "Factbook" data. It's energy consumption per capita for selected country.
        </q-banner>
      </q-item>
    </transition>
    <q-item
      tag="label"
      v-ripple
    >
      <q-item-section>
        <q-item-label>I know exact yearly energy consuption </q-item-label>
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
        :disable="!knowConsuption"
      />
    </q-item>
    <q-item>
      <q-input
        v-model.number="cost"
        type="number"
        label="Yearly cost"
        style="width: 100%"
        min="10"
        step="10"
      >
      <template v-slot:append>
          <q-icon name="toll" />
        </template>
      </q-input>
    </q-item>
  </q-list>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PowerUsage',
  computed: {
    ...mapState('configuration', ['consumption', 'yearlyCost', 'manualConsumption', 'manualYearlyUsage', 'manualYearlyCost']),
    knowConsuption: {
      get() {
        return this.manualConsumption
      },
      set(value) {
        this.$store.commit('configuration/setManualConsumption', value)
      },
    },
    cost: {
      get() {
        return this.yearlyCost
      },
      set(value) {
        this.$store.commit('configuration/setYearlyCost', value)
      }
    },
    yearlyUsage: {
      get() {
        return this.knowConsuption 
          ? this.manualYearlyUsage || this.consumption
          : this.consumption
      },
      set(value) {
        this.$store.commit('configuration/setManualYearlyUsage', value)
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['setProperty']),
    mapClick(data) {}
  },
  watch: {
    energyUsage: {
      deep: true,
      handler() {}
    }
  }
}
</script>
