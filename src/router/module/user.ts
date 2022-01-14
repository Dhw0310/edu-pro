import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    requiresAuth: true,
    title: '用户管理'
  },
  children: [
    {
      path: '/user',
      name: 'user-list',
      component: () => import(/* webpackChunkName: 'advert' */ '@/views/user/index.vue'),
      meta: {
        menuId: 'Users'
      }
    }
  ]
}

export default routes
