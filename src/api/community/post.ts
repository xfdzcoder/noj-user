import type { PostInfoCondition, PostInfoReq } from '@/api/community/index'
import request from '@/utils/request'

const baseUri = '/community/post/info'

export const deploy = (data: PostInfoReq) => {
  return request.post(`${baseUri}`, data)
}

export const listPostInfo = (data: PostInfoCondition) => {
  return request.post(`${baseUri}/list`, data)
}
