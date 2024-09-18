import type { PostInfoCondition, PostInfoReq } from '@/api/community/index'
import request from '@/utils/request'
import type { Response } from '@/api/common'

const baseUri = '/community/post/info'

export const deploy = (data: PostInfoReq) => {
  return request.post(`${baseUri}`, data)
}

export const listPostInfo = (data: PostInfoCondition) => {
  return request.post(`${baseUri}/list`, data)
}

export const getContentByInfoId = (infoId: string): Promise<Response<string>> => {
  return request.get(`${baseUri}/content/${infoId}`)
}
