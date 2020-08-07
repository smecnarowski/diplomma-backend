<template>
  <q-list style="width: 100%;">
    <transition name="fadeIn">
      <q-item class="q-px-none">
        <q-banner dense class="bg-primary text-white full-width">
          {{ $t('energy.info') }}
        </q-banner>
      </q-item>
    </transition>
    <q-item
      tag="label"
      v-ripple
    >
      <q-item-section>
        <q-item-label>{{ $t('energy.consumption') }}</q-item-label>
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
        :label="$t('energy.usage')"
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
        :label="$t('energy.cost')"
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
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'PowerUsage',
  computed: {
    ...mapState('configuration', ['yearlyCost', 'manualConsumption', 'manualYearlyCost']),
    ...mapGetters('configuration', ['consumption']),
    knowConsuption: {
      get() {
        return this.manualConsumption
      },
      set(value) {
        this.$store.commit('configuration/setManualConsumption', value)
        this.getPvWattData()
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
        return this.consumption
      },
      set(value) {
        this.$store.commit('configuration/setManualYearlyUsage', value)
        this.getPvWattData()
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['getPvWattData']),
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
