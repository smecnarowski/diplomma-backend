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
          label
          :label-value="angleLabel"
          label-always
          :min="0"
          :step="5"
          :max="360"
        />
      </div>
      <div :class="directionsClass">
        <div class="row justify-center">
        <q-circular-progress
          :angle="direction - 2"
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
          markers
          snap
          label
          :label-value="angle + String.fromCharCode(176) + 'C'"
          label-always
          :step="5"
          :min="30"
          :max="60"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingIndex',
  data() {
    return {
      angle: 30,
      direction: 0,
      value: 2
    }
  },
  computed: {
    angleLabel() {
      switch (true) {
        case this.direction > 345 || this.direction <= 15:
          return 'N'
        case this.direction > 15 && this.direction <= 30:
          return 'NNE'
        case this.direction > 30 && this.direction <= 60:
          return 'NE'
        case this.direction > 60 && this.direction <= 75:
          return 'ENE'
        case this.direction > 75 && this.direction <= 105:
          return 'E'
        case this.direction > 105 && this.direction <= 120:
          return 'ESE'
        case this.direction > 120 && this.direction <= 150:
          return 'SE'
        case this.direction > 150 && this.direction <= 165:
          return 'SSE'
        case this.direction > 165 && this.direction <= 195:
          return 'S'
        case this.direction > 195 && this.direction <= 210:
          return 'SSW'
        case this.direction > 210 && this.direction <= 240:
          return 'SW'
        case this.direction > 240 && this.direction <= 255:
          return 'WSW'
        case this.direction > 255 && this.direction <= 285:
          return 'W'
        case this.direction > 285 && this.direction <= 300:
          return 'WNW'
        case this.direction > 300 && this.direction <= 330:
          return 'NW'
        case this.direction > 330 && this.direction <= 345:
          return 'NNW'
      }

      return ''
    },
    directionsClass() {
      switch(true) {
        case this.$q.screen.lt.md:
          return 'col-4'
        default:
          return 'col-2'
      }
    }
  }
}
</script>