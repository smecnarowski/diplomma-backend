<template>
  <q-layout view="hHh lpr fff">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="expanded = !expanded"
        />

        <q-toolbar-title>
          Title
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="expanded"
      v-if="subMenu.length"
      side="left"
      elevated
      class="inset-drawer gt-sm"
      :width="100"
    >
      <q-scroll-area class="fit">
        <q-tabs
          vertical
          dense
          active-color="positive"
          indicator-color="transparent"
          class="text-grey"
          v-model="secondTab"
        >
          <q-tab
            v-for="(menuItem, index) in subMenu"
            :key="index"
            :label="menuItem.title || menuItem.name"
          />
        </q-tabs>
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      show-if-above
      side="left"
      :mini="true"
      :mini-width="80"
      :content-style="{ background: 'transparent' }"
      style="width: 80px"
      bordered
      class="gt-sm text-grey"
    >
      <div class="row full-height">
        <div class="col self-center">
          <q-list padding>
            <q-item
              clickable
              v-ripple
              v-for="(item, index) in menu"
              :key="index"
              @click="loadContent(index)"
              :active="item.path === routeNames[0]"
            >
              <q-item-section
                avatar
                class="self-right items-center"
              >
                <q-icon :name="item.icon" />
                {{ item.title || item.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container :style="{ 'padding-left': $q.screen.lt.md ? '0px' : '80px' }">
      <router-view />
    </q-page-container>

    <q-footer
      bordered
      class="bg-white text-primary lt-md"
    >
      <q-tabs
        dense
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="secondTab"
      >
        <q-tab
          v-for="(item, index) in subMenu"
          :key="index"
          :name="index"
          :label="item.title"
          @click="loadContent(item.parentIndex, index)"
        ></q-tab>
      </q-tabs>
      <q-separator v-if="subMenu.length"></q-separator>
      <q-tabs
        dense
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="firstTab"
      >
        <q-tab
          v-for="(item, index) in menu"
          :key="index"
          :name="index"
          :label="item.title"
          @click="loadContent(index)"
        ></q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import routes from './../router/routes'

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
      this.routeNames = this.$router.currentRoute.name.split('_')
      this.loadContent(
        this.menu.findIndex(item => item.path === this.routeNames[0])
      )
    }
  },
  watch: {
    $route(to, from) {
      this.setRouteNames()
    }
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
