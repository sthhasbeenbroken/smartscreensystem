import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as echarts from 'echarts';
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from 'vue-cookies'
import * as echarts from 'echarts'
import bus from './bus'
import Vant from 'vant';
import 'vant/lib/index.css'

const app=createApp(App);
for (let i in ElementPlusIconsVue) {
    app.component(i, ElementPlusIconsVue[i])
  }
  
app.config.globalProperties.$bus = bus;
app.config.globalProperties.$cookies= VueCookies;
app.config.globalProperties.$echarts = echarts;
app.use(store).use(router).use(VueAxios,axios).use(Vant).use(ElementUI).use(VueCookies).use(echarts).mount('#app')
