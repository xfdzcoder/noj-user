import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

export interface Response<T> {
  code: '20000' | '50000'
  data: T
  message: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})

const whiteList = [
  '/user/auth/login',
  '/user/auth/register'
]
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    if (whiteList.includes(config.url as string)) {
      return config
    }

    return config
  },
  (error: any) => {
    console.error(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {

    return res.data
  }
)

export default instance
