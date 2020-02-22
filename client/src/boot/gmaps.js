import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ app, Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAdG-lHuJTjodmC3OcPDDnJuqIa6BTSC-4',
      libraries: 'places',
      v: 3
    },
    installComponents: true
  })
}
