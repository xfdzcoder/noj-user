import request from '@/utils/request'
import type { LikeCommentReq, PostComment, PostCommentCondition, PostCommentReq } from '@/api/community/index'
import type { Page, Response } from '@/api/common'
import type { CommentApi } from 'undraw-ui'

const baseUri = '/community/post/comment'

export const getComment = (data: PostCommentCondition): Promise<Response<Page<CommentApi>>> => {
  return request.post(`${baseUri}/list`, data)
}

export const save = (data: PostCommentReq) => {
  return request.post(`${baseUri}`, data)
}

export const getLickCommentIdList = (postInfoId: string): Promise<Response<string[]>> => {
   return request.get(`/community/like/comment/${postInfoId}`)
}

export const like = (data: LikeCommentReq) => {
  return request.post(`/community/like/comment`, data)
}
