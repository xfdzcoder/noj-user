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

  good: boolean
  avatar: string
  authorName: string
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
