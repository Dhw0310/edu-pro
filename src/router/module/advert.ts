import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    requiresAuth: true,
    title: '广告管理',
    menuId: 'Adverts'
  },
  children: [
    {
      path: '/advert',
      name: 'advert',
      component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      meta: {
        title: '广告列表',
        menuId: 'Advertise'
      }
    },
    {
      path: '/advert-space',
      name: 'advert-space',
      component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
      meta: {
        title: '广告位列表',
        menuId: 'AdvertiseSpace'
      }
    }
  ]
}

export default routes
