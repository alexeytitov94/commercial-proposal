import Vue from 'vue'
import App from './App.vue'
import store from './store'

import TextareaAutosize from 'vue-textarea-autosize'
Vue.use(TextareaAutosize)

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/sass/main.sass'

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import VueModalTor from 'vue-modaltor'
Vue.use(VueModalTor)

//import router from './router'


Vue.config.productionTip = false

new Vue({
  store,
  //router,
  render: h => h(App)
}).$mount('#app')
