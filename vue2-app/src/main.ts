import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import VeeValidate from 'vee-validate'
import vSelect from 'vue-select'
import Snotify from 'vue-snotify'
import Loading from 'vue-loading-overlay'
import VueScrollTo from 'vue-scrollto'
import VueSanitize from 'vue-sanitize'
import VueLogger from 'vuejs-logger'
import VueGtm from 'vue-gtm'
import { sync } from 'vuex-router-sync'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-select/dist/vue-select.css'
import 'vue-snotify/styles/material.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(PortalVue)
Vue.use(VeeValidate)
Vue.use(Snotify, { toast: { timeout: 3000 } })
Vue.use(Loading)
Vue.use(VueScrollTo)
Vue.use(VueSanitize)
Vue.use(VueLogger, { logLevel: 'debug', showConsoleColors: true })
Vue.use(VueGtm, { id: 'GTM-XXXXXXX', enabled: false, vueRouter: router })
Vue.component('v-select', vSelect)

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
