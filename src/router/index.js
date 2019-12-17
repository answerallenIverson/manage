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
      path: "/user",
      component: () => import('@/view/user/userlist.vue')
    },
    {
      path: "/template",
      component: () => import('@/view/pageSetup/homeTemplate.vue')
    },
    {
      path: "/template1",
      component: () => import('@/view/pageSetup/homeTemplate copy.vue')
    },
    {
      path: "/prc",
      component: () => import('@/view/pageSetup/selectPractice.vue')
    },
    {
      path: "/aa",
      component: () => import('@/view/pageSetup/guyver.vue')
    }
  ]
})
