<template>
  <q-layout view="hHh LpR fff">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          {{ $t(stepTitle) }}
        </q-toolbar-title>
        <q-space />
        <LanguageSwitcher />
        <CurrencySwitcher />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-sm">
      <router-view />
    </q-page-container>

    <q-footer
      bordered
      class="bg-white text-primary lt-md"
    >
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

import routes from './../router/routes'
import LanguageSwitcher from '../components/LanguageSwitcher'
import CurrencySwitcher from '../components/CurrencySwitcher'

export default {
  data() {
    return {
      expanded: false,
      menu: routes[0].children.filter(element => !element.hideInMenu),
      subMenu: [],
      firstTab: -1,
      secondTab: 0,
      left: false,
      right: false,
      routeNames: [],
      tab: null
    }
  },
  computed: {
    ...mapState('configuration', ['stepTitle']),
  },
  mounted() {
    this.setRouteNames()
  },
  methods: {
    loadContent(firstLevelIndex, secondLevelIndex) {
      this.firstTab = firstLevelIndex
      const hasSecondLevelIndex = secondLevelIndex !== undefined
      if (!hasSecondLevelIndex) {
        this.expanded = false
        this.subMenu = []
      }

      const firstLevelMenuElement = this.menu[firstLevelIndex]
      const pathParts = ['', firstLevelMenuElement.path]

      const hasChildren = (firstLevelMenuElement.children || []).length > 0
      if (hasChildren) {
        const secondLevelMenuElement =
          firstLevelMenuElement.children[secondLevelIndex || 0] || {}

        pathParts.push(secondLevelMenuElement.path)
      }

      const path = pathParts.join('/')
      setTimeout(
        () => {
          if (hasChildren) {
            this.subMenu = firstLevelMenuElement.children.map(child => {
              return {
                ...child,
                parentIndex: firstLevelIndex
              }
            })
            this.expanded = true
          }
          // eslint-disable-next-line handle-callback-err
          this.$router.push({ path }).catch(err => {})
        },
        hasSecondLevelIndex ? 0 : 200
      )
    },
    setRouteNames() {
      // this.routeNames = this.$router.currentRoute.name.split('_')
      // this.loadContent(
      //   this.menu.findIndex(item => item.path === this.routeNames[0])
      // )
    }
  },
  watch: {
    $route(to, from) {
      this.setRouteNames()
    }
  },
  components: {
    LanguageSwitcher,
    CurrencySwitcher,
  }
}
</script>

<style lang="scss">
.q-drawer-container.inset-drawer .q-drawer {
  left: 80px;
}
.doc-card-title {
  margin-left: -27px;
  padding: 2px 10px 2px 24px;
  background: #e0e0e0;
  color: #616161;
  position: relative;
  border-radius: 3px 5px 5px 0;
  width: fit-content;
}

.doc-card-title:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-top-color: #bebebe;
  border-width: 9px 0 0 11px;
}
</style>
