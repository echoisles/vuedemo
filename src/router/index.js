import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Room from '@/views/room'
import WapRoom from '@/views/wap/room'
import Test from '@/views/test'
import OS from '../assets/js/agent-type'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/room',
      name: 'Room',
      component: Room,
    },
    {
      path: '/waproom',
      name: 'WapRoom',
      component: WapRoom,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
});


export default router
