import Vue from 'vue'
import VueRouter from 'vue-router'


const Home=()=>import('views/home.vue')

const Login=()=>import('views/login/Login.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
