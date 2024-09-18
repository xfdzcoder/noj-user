export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  email: string
  communityInfoIds: string
}

export interface LoginReq {
  email: string
  password: string
}
export interface LoginResp {
  token: string
  userInfo: UserInfo
}

export interface RegisterReq {
  nickname: string
  email: string
  captcha: string
  password: string
  confirmPassword: string
}
