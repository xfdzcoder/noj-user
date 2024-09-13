import type { BaseCondition } from '@/api/common'

export interface QuestionCondition extends BaseCondition {

}

export interface QuestionInfo {
  id: string
  communityId: number
  identifier: string
  name: string
  description: string
  questionCount: number
  goodCount: number
  commentCount: number
  studyCount: number
}

export interface ExecuteResultCondition extends BaseCondition {
  questionInfoId?: string
}

export interface ExecuteResult {
  id: string
  userId: number
  questionInfoId: number
  executeInfoId: number
  succeed: boolean
  avgTime: number
  avgMemory: number
  passedCaseCount: number
  totalCaseCount: number
  input: any
  output: any
  exceptOutput: any
  throwableOutput: string
  exitType: string
}

export interface Heatmap {
  date: string
  count: number
}

export interface ExecuteInfo {
  id: string
  questionInfoId: number
  testCaseId: number
  codeText: string
  size: number
  languageType: string
  runType: number
  timeout: number
  memory: number
}

export interface ExecuteDetail {
  result: ExecuteResult
  info: ExecuteInfo
}

interface CodeExecuteReq {
  code: string
  questionInfoId: string
  languageType: string
}
