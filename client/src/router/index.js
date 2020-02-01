import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Library from '../views/Library.vue'
import Convert from '../views/Convert.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/library',
    name: 'library',
    component: Library
  },
  {
    path: '/convert',
    name: 'convert',
    component: Convert
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
