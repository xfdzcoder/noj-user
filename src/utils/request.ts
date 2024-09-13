import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import router from '@/router'
import type { Response } from '@/api/common'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true
})

const whiteList = [
  '/user/auth/login',
  '/user/auth/register',
]
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const userStore = useUserStore()
    const { isLogin } = userStore
    const { token } = storeToRefs(userStore)

    if (whiteList.includes(config.url as string)) {
      return config
    }
    if (! isLogin()) {
      router.push({
        path: '/portal/login'
      })
      return Promise.reject('未登录')
    }
    console.log('request interceptor token: ', token)
    config.headers.set('satoken', token.value)

    return config
  },
  (error: any) => {
    console.error(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const resp = res.data as Response<any>
    if (resp.code === '20000') {
      return res.data
    } else {
      return Promise.reject(resp)
    }
  }
)

export default instance
