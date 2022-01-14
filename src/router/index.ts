import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './module/index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (to.matched.some(recode => recode.meta.requiresAuth)) {
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 如果登录了，校验访问权限
  }
  // const data = await store.dispatch('getUserPermissons')
  // console.log(data)
  const { menuList } = await store.dispatch('getUserPermissons')
  console.log(menuList)

  next()
})

router.afterEach(() => {
  nprogress.done()
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.state.user) {
//       next({
//         name: 'login',
//         query: { // 通过 url 传递查询字符串参数
//           redirect: to.fullPath
//         }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
export default router
