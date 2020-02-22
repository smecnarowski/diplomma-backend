<template>
  <div id="q-app">
    <q-img
      :src="
        `statics/backgrounds/polygon-background-landscape-natural-tones-1-${filledId}.svg`
      "
      class="app-background"
    >
    </q-img>
    <router-view />
  </div>
</template>

<script>
const randomInt = (min, max) => {
  return min + Math.floor((max - min) * Math.random())
}

export default {
  name: 'App',
  data() {
    return {
      backgroundId: randomInt(1, 25)
    }
  },
  computed: {
    filledId() {
      return ('00' + this.backgroundId).slice(-2)
    },
    style() {
      return {
        backgroundImage: `url(statics/backgrounds/polygon-background-landscape-natural-tones-1-${this.filledId}.svg)`
      }
    }
  },
  watch: {
    $route(to, from) {
      this.backgroundId = randomInt(1, 25)
    }
  }
}
</script>
<style lang="scss">
.app-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
}
</style>
