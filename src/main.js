// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import echarts from 'echarts'
import api from './api' // 导入api接口
import has from './utils/direct.js';
import '../theme/index.css'
import animate from 'animate.css'
import "babel-polyfill";
import axios from 'axios'
import './assets/iconfont/iconfont.css';


Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(animate)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    axios
})
