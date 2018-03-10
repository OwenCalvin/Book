import Vue from 'vue'
import App from './App'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
