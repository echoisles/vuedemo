import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Room from '@/views/room'
import Test from '@/views/test'

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
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
