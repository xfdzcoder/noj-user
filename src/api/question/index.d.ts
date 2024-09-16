import type { BaseCondition } from '@/api/common'
import type { exitCode } from 'process'

export interface QuestionBank {
  id: string
  communityId: string
  identifier: string
  name: string
  description: string
  questionCount: number
  goodCount: number
  commentCount: number
  studyCount: number
}


export interface QuestionBankCondition extends BaseCondition {

}

export interface QuestionInfoCondition extends BaseCondition {
  bankId?: string
}
export interface QuestionInfo {
  id: string
  questionBankId: string
  groupName: string
  title: string
  description: string
  questionType: number
  tags: string
  difficulty: number
  passCount: number
  submitCount: number
  commentCount: number
  sort: number
  timeout: number
  memory: number
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
  assistant: string
  newCode: string
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
