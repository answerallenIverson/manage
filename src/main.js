// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import qs from 'qs';
import $ from 'jquery'
import ElementUI from 'element-ui'

import '../theme/index.css'
import https from './http/https';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }---->解决相同路径跳转报错

Vue.prototype.$https = https;
Vue.prototype.qs = qs;
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: {
    App
  },
  template: '<App/>'
})
