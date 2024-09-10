import type { BaseCondition } from '@/api/common'

export interface QuestionCondition extends BaseCondition {

}

export interface QuestionInfo {
  id: number
  communityId: number
  identifier: string
  name: string
  description: string
  questionCount: number
  goodCount: number
  commentCount: number
  studyCount: number
}
