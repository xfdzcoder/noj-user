import request from '@/utils/request'

import type { LoginReq, LoginResp, RegisterReq, UserInfo } from '@/api/user/index'
import type { Response } from '@/api/common'

const baseUri = '/user/auth'

export const doLogin = (data: LoginReq): Promise<Response<LoginResp>> => {
  return request.post(`${baseUri}/login`, data)
}

export const doRegister = (data: RegisterReq): Promise<Response<UserInfo>> => {
  return request.post(`${baseUri}/register`, data)
}

export const fetchCaptcha = (email: string): Promise<Response<string>> => {
  return request.get(`${baseUri}/captcha/${email}`)
}
