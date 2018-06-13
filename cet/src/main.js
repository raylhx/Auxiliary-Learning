// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// fade/zoom 等饿了么动画引入
import 'element-ui/lib/theme-chalk/base.css'
import Vuex from 'vuex'
import Axios from 'axios'
import {GetToken} from './lib/js/stroe.js'
// import Validator from 'vue-validator'
// 引入bootstrap
// import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
// import './assets/bootstrap-3.3.7-dist/js/bootstrap.min'
// 设置默认链接
Axios.defaults.baseURL = 'http://localhost:8888/sr'
Axios.interceptors.request.use(function (config) {
  if (GetToken()) {
    config.headers.Authorization = `${localStorage.token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (GetToken()) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// Vue.use(Validator)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
