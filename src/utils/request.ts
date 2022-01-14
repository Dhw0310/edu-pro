import router from '@/router'
import store from '@/store'
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
const request = axios.create({
  // 配置选项
  baseURL: '/'
})

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
let isRfreshing = false // 控制 token 刷新的状态
let requests: (() => void)[] = [] // 存储刷新 token 期间过来的 401 请求
// 请求拦截器
request.interceptors.request.use(function(config: AxiosRequestConfig<any>) {
  const { user } = store.state
  if (user && user.access_token) {
    (config.headers as AxiosRequestHeaders).Authorization = user.access_token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function(response) {
  return response
}, async function(error) {
  if (error.response) {
    const { status } = error.response
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    // console.log(error.response.data)
    // console.log(error.response.status)
    // console.log(error.response.headers)
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有提供 token、token 是无效的、token 过期了）
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRfreshing) {
        isRfreshing = true
        // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
        return refreshToken().then(res => {
          console.log(res)
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          store.commit('setUser', res.data.content)
          console.log('requests', requests)

          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(err => {
          Message.warning('登录已过期，请重新登录')
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRfreshing = false // 重置刷新状态
        })
      }
      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    Message.error('请求超时，请刷新重试')
  } else {
    // 发送请求时出了点问题
    Message.error(`请求失败，${error.Message}`)
  }
  return Promise.reject(error)
})
export default request
