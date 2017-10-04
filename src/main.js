import Vue from 'vue'
import App from './App'
import router from './router'
import Buefly from 'buefy'

Vue.config.productionTip = false

Vue.use(Buefly)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
