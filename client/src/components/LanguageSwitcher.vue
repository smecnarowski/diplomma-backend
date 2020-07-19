<template>
  <q-btn 
    flat
    :label="lang"
    style="min-width: 120px"
  >
    <q-menu
      fit
      anchor="bottom right"
      self="top right"
      v-model="menuVisible"
    >
      <q-item 
        clickable 
        v-for="lang in langOptions" 
        :key="lang.value"
        @click="setLocale(lang.value)"
      >
        <q-item-section>{{lang.label}}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'pl', label: 'Polski' }
      ]
    }
  },
  computed: {
    lang: function() {
      return this.langOptions.filter(option => option.value === this.$i18n.locale)[0].label
    }
  },
  methods: {
    setLocale(lang) {
      this.$i18n.locale = lang
      this.menuVisible = false
    }
  }
}
</script>