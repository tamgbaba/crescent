import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import './app.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app  = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(VueAxios,axios)
app.mount('#app')