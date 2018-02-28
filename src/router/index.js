import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Room from '@/views/room'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
})
