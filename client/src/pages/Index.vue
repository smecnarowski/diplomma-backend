<template>
  <q-page class="flex flex-center q-py-sm">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      class="no-shadow q-pt-none"
      header-nav
      :vertical="$q.screen.lt.md"
      animated
      :style="stepper"
    >
      <q-step
        :name="1"
        :title="$t(stepsTitles[0])"
        icon="location_on"
        :done="step > 1"
      >
        <LocationPage />
      </q-step>

      <q-step
        :name="2"
        :title="$t(stepsTitles[1])"
        icon="create_new_folder"
        :done="step > 2"
      >
        <EnergyUsagePage />
      </q-step>

      <q-step
        :name="3"
        :title="$t(stepsTitles[2])"
        icon="assignment"
        :done="step > 3"
        :disable="step < 2"
      >
        <BuildingPage />
      </q-step>

      <q-step
        :name="4"
        :title="$t(stepsTitles[3])"
        icon="view_module"
        :done="step > 4"
        :disable="step < 3"
      >
        <ModulesPage />
      </q-step>

      <q-step
        :name="5"
        :title="$t(stepsTitles[4])"
        icon="view_module"
        :done="step > 5"
        :disable="step < 4 || noModule"
      >
        <InvertersPage />
      </q-step>

      <q-step
        :name="6"
        :title="$t(stepsTitles[5])"
        icon="attach_money"
        :done="step > 6"
        :disable="step < 5 || noInverter"
      >
        <ResultPage />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

import LocationPage from './location/Index'
import EnergyUsagePage from './energy/Usage'
import BuildingPage from './building/Index'
import ModulesPage from './modules/Index'
import InvertersPage from './inverters/Index'
import ResultPage from './result/Index'

export default {
  name: 'PageIndex',
  data() {
    return {
      step: 1,
      stepsTitles: [
        'Location', 'Energy', 'Building', 'Modules', 'Inverters', 'Result'
      ]
    }
  },
  computed: {
    ...mapState('configuration', ['selectedInverter', 'selectedModule']),
    noInverter() {
      return Object.keys(this.selectedInverter).length === 0
    },
    noModule() {
      return Object.keys(this.selectedModule).length === 0
    },
    stepper() {
      return {
        width: this.$q.screen.lt.md ? '100%': '900px'
      }
    }
  },
  methods: {
    setTitle() {
      this.$store.commit('configuration/setStepTitle', this.stepsTitles[this.step - 1])
    }
  },
  mounted() {
    this.setTitle()
  },
  watch: {
    step(step) {
      this.setTitle()
    }
  },
  components: {
    LocationPage,
    EnergyUsagePage,
    BuildingPage,
    ModulesPage,
    InvertersPage,
    ResultPage,
  }
}
</script>
