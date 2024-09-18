import type { BaseCondition } from '@/api/common'

export interface CommunityInfo {
  id: string
  manageUserId: string
  userId: string
  name: string
  description: string
  starCount: number
  postCount: number
}

export interface PostInfo {
  id: string
  author: string
  communityInfoId: string
  title: string
  summary: string
  tags: string
  type: number
  goodCount: number
  commentCount: number
  topped: boolean
  status: number
  createDateTime: string

  good: boolean
  avatar: string
  authorName: string
}

export interface PostInfoDetail extends PostInfo {
  content: string
}

export interface PostInfoReq {
  id?: string
  communityInfoId: string
  title: string
  summary: string
  content: string
  tags: string
  type: number
  topped: boolean
  status: number
}

export interface PostInfoCondition extends BaseCondition {
  lastId: string | null
  communityInfoId: string
}

export interface PostCommentCondition extends BaseCondition {
  parentId?: string | null
  postInfoId: string
}

export interface PostComment {
  id: number
  postInfoId: string
  parentId: string
  rootId: string
  user: CommentUser
  content: string
  goodCount: number
  commentCount: number
  reply: CommentReply
}

export interface CommentReply {
  total: number;
  list: PostComment[]
}

export interface CommentUser {
  id: string;
  nickname: string;
  avatar: string;
}

export interface PostCommentReq {
  id?: string
  postInfoId: string
  parentId: string
  content: string
}
