// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission' // permission control


import VueRouter from 'vue-router';
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(ElementUI)
Vue.config.productionTip = false

import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll)

import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
