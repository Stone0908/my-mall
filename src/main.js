// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import http from './common/axios'
import './assets/icon/iconfont.css'
import loading from './components/loading/loading'
import weixin from './common/wxsdk'

Vue.use(http);
Vue.use(loading);
Vue.use(weixin);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
