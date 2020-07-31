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
      >
        <BuildingPage />
      </q-step>

      <q-step
        :name="4"
        :title="$t(stepsTitles[3])"
        icon="view_module"
        :done="step > 4"
      >
        <ModulesPage />
      </q-step>

      <q-step
        :name="5"
        :title="$t(stepsTitles[4])"
        icon="view_module"
        :done="step > 5"
      >
        <InvertersPage />
      </q-step>

      <q-step
        :name="6"
        :title="$t(stepsTitles[5])"
        icon="attach_money"
        :done="step > 6"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import LocationPage from './location/Index'
import EnergyUsagePage from './energy/Usage'
import BuildingPage from './building/Index'
import ModulesPage from './modules/Index'
import InvertersPage from './inverters/Index'

export default {
  name: 'PageIndex',
  data() {
    return {
      step: 4,
      stepsTitles: [
        'Location', 'Energy', 'Building', 'Modules', 'Inverters', 'Result'
      ]
    }
  },
  computed: {
    stepper() {
      return {
        width: this.$q.screen.lt.md ? '100%': '900px'
      }
    }
  },
  components: {
    LocationPage,
    EnergyUsagePage,
    BuildingPage,
    ModulesPage,
    InvertersPage,
  }
}
</script>
