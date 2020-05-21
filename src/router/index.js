import Vue from 'vue'
import Router from 'vue-router'
import x from '@/x'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/x',
      name: 'x',
      component: x
    }
  ]
})