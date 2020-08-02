<template>
  <div>
    <pre>isNorthernHemisphere: {{ isNorthernHemisphere }}</pre>
    <pre>{{ solarAtlasData | json }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ResultIndex',
  data() {
    return {}
  },
  computed: {
    ...mapState('configuration', ['position', 'solarAtlasData']),
    isNorthernHemisphere() {
      return this.position.lat < 0
    }
  },
  methods: {},
  mounted() {},
  watch: {},
  components: {}
}
</script>