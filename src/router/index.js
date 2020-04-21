import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/castles',
    name: 'castles',
    component: () => import('../views/Castles.vue'),
    children: [
      {
        path: ':id',
        name: 'detail',
        props: true,
        component: () => import('../views/CastleDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
