import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import VueRouter from 'vue-router';
import router from '../router';
import store from './store';
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 引入echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.prototype.$axios=axios;
Vue.prototype.$httpUrl='http://localhost:8090'
Vue.config.productionTip = false
//Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(ElementUI,{size:'small'});

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = checkUserLoginStatus(); // 根据你的登录状态验证逻辑判断用户是否已登录
//   if (to.path === '/login' && isLoggedIn) {
//     next('/main'); // 如果已登录且访问登录页，则重定向到主页面
//   } else if (to.path !== '/login' && !isLoggedIn) {
//     next('/login'); // 如果未登录且访问非登录页，则重定向到登录页面
//   } else {
//     next(); // 其他情况直接放行
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
