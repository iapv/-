import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import Api from './axios';
import store from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'vue-echarts'
Vue.use(VCharts)
Vue.use(mavonEditor)
Vue.config.productionTip = false
import "./assets/icon/iconfont.css";
Vue.prototype.$api = Api;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.uxToken ? true : false;
  const isadmin = localStorage.porToken ? true : false;
  const needLogin = to.matched.some(match => match.meta.needLogin);
  const needAdminLogin = to.matched.some(match => match.meta.needAdminLogin);
  if (needLogin) {
    if (isLogin) {
      next()
    } else {
      next({path: '/login'})
    }
  }else if (needAdminLogin) {
    if (isadmin) next()
    else next({path: '/admin/login'})
  } else {
    console.log(isadmin);
    if (isLogin && to.name === 'Login') {
     
      next({path: '/alldata'})
    } else if (isadmin  &&  to.name == 'admin_login')  {
      
      next({path: '/admin/index/control'})
    }else {
      next()
    }
  }


})
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
