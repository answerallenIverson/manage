import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: "/",
      component: () => import('@/view/home.vue')
    },
    {
      path: "/homeTemplate",
      component: () => import('@/view/pageSetup/homeTemplate.vue')
    },
    {
      path: "/test",
      component: () => import('@/view/pageSetup/test.vue')
    },
  ]
})
