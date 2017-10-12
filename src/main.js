import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import DatePicker from '@/components/shared/DatePicker.vue'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.component('date-picker', DatePicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
