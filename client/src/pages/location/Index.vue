<template>
  <div>
    <q-card-section class="q-pt-xs">
      <gmap-autocomplete
        class="introInput"
        style="width: 100%"
        :value="searchValue"
        @place_changed="setPlace"
      >
      </gmap-autocomplete>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs full-width items-center">
        <div>
          <GmapMap
            :center="position"
            :zoom="9"
            map-type-id="terrain"
            :style="gmapStyle"
            @click="mapClick"
          >
            <GmapMarker :position="position" />
          </GmapMap>
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-list>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ $t('dni_text') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{ solarAtlasData.DNI | rounded }}kWh/m²
          </q-item-section>
        </q-item>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ $t('Terrain elevation') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{ solarAtlasData.ELE | rounded }}m
          </q-item-section>
        </q-item>
        <q-item
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ $t('optimum-tilt') }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{ solarAtlasData.OPTA | rounded }}°
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data() {
    return {
      searchValue: null
    }
  },
  computed: {
    ...mapState('configuration', ['position', 'solarAtlasData', 'solarAtlasDataLoading']),
    hasSolarData() {
      return Object.keys(this.solarAtlasData).length > 0
    },
    gmapStyle() {
      return {
        height: '280px',
        maxWidth: '100%',
        width: 'calc(100vw - 70px)'
      }
    }
  },
  methods: {
    ...mapActions('configuration', ['getSolarAtlasData']),
    mapClick(data) {
      this.getSolarAtlasData(data)
    },
    setPlace(place) {
      this.mapClick({
        latLng: place.geometry.location
      })
    }
  },
  mounted() {
    this.getSolarAtlasData({
      latLng: {
        lat: () => this.position.lat,
        lng: () => this.position.lng
      }
    })
  }
}
</script>

<style lang="scss">
.pac-container:after {
  background-image: none !important;
  height: 0px;
}
</style>
