<template>
  <div>
    <div class="row">
      <div class="col-12">
        Location in terms of compass points
      </div>
    </div>
    <div class="row items-center">
      <div class="col">
        <q-slider
          v-model="direction"
          @change="getPvWattData()"
          label
          :label-value="angleLabel"
          label-always
          :min="90"
          :step="5"
          :max="270"
        />
      </div>
      <div :class="directionsClass">
        <div class="row justify-center">
        <q-circular-progress
          :angle="direction - 4 + (isNorthernHemisphere ? 180 : 0)"
          show-value
          class="q-my-md"
          :value="value"
          size="70px"
          :thickness="0.2"
          color="orange"
          track-color="transparent"
        >
          <q-icon size="xl" name="img:statics/icons/directions.svg" />
        </q-circular-progress>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        The angle of inclination of the surface on which the panels will be placed
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col-12">
        <q-slider
          v-model="angle"
          @change="getPvWattData()"
          markers
          snap
          label
          :label-value="angle + String.fromCharCode(176) + 'C'"
          label-always
          :step="5"
          :min="0"
          :max="90"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        Efficiency related to the tilt and azimuth.
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col-12">
        <q-slider
          v-model="efficiency"
          :min="0"
          :max="180"
          :step=".1"
          readonly
          label
          :label-value="efficiency + '%'"
          label-always
        />
      </div>
    </div>
    <q-inner-loading :showing="pvWattDataLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'BuildingIndex',
  data() {
    return {
      timeout: null,
      value: 2
    }
  },
  mounted() {
    if (Object.keys(this.pvWattData).length === 0) {
      this.getPvWattData()
    }
  },
  computed: {
    ...mapState('configuration', ['modulesAngle', 'modulesDirection', 'position', 'pvWattData', 'pvWattDataLoading']),
    ...mapGetters('configuration', ['efficiency']),
    angle: {
      set(angle) {
        this.setModulesAngle(angle)
      },
      get() {
        return this.modulesAngle
      }
    },
    angleLabel() {
      switch (true) {
        case this.direction >= 90 && this.direction <= 105:
          return this.isNorthernHemisphere ? 'W' : 'E'
        case this.direction > 105 && this.direction <= 120:
          return this.isNorthernHemisphere ? 'WNW' : 'ESE'
        case this.direction > 120 && this.direction <= 150:
          return this.isNorthernHemisphere ? 'NW' : 'SE'
        case this.direction > 150 && this.direction <= 165:
          return this.isNorthernHemisphere ? 'NNW' : 'SSE'
        case this.direction > 165 && this.direction <= 195:
          return this.isNorthernHemisphere ? 'N' : 'S'
        case this.direction > 195 && this.direction <= 210:
          return this.isNorthernHemisphere ? 'NNE' : 'SSW'
        case this.direction > 210 && this.direction <= 240:
          return this.isNorthernHemisphere ? 'NE' : 'SW'
        case this.direction > 240 && this.direction <= 255:
          return this.isNorthernHemisphere ? 'ENE' : 'WSW'
        case this.direction > 255 && this.direction <= 270:
          return this.isNorthernHemisphere ? 'E' : 'W'
      }

      return ''
    },
    direction: {
      set(direction) {
        this.setModulesDirection(direction)
      },
      get() {
        return this.modulesDirection
      }
    },
    directionsClass() {
      switch(true) {
        case this.$q.screen.lt.md:
          return 'col-4'
        default:
          return 'col-2'
      }
    },
    isNorthernHemisphere() {
      return this.position.lat < 0
    }
  },
  methods: {
    ...mapActions('configuration', ['getPvWattData', 'setModulesAngle', 'setModulesDirection'])
  }
}
</script>