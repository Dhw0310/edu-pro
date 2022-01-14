import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import advertRoutes from './advert'
import courseRoutes from './course'
import rightsRoutes from './rights'
import userRoutes from './user'

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }
    ]
  },
  advertRoutes,
  rightsRoutes,
  courseRoutes,
  userRoutes,
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/errorPage/404.vue')
  },
  {
    path: '/not-permission',
    name: 'not-permission',
    component: () => import(/* webpackChunkName: not-permission */ '@/views/errorPage/403.vue')
  }
]

export default routes
