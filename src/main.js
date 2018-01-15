import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/animate.css'
import axios from './js/config.js'
import "babel-polyfill"

Vue.use(ElementUI)

Vue.prototype.axios = axios

Vue.config.productionTip = false

if (module.hot) {
  module.hot.accept()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
