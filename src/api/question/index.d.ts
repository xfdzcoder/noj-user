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
  userId: string
}

export interface ExecuteResult {
  id: string;
  userId: number;
  questionInfoId: number;
  executeInfoId: number;
  succeed: boolean;
  avgTime: number;
  avgMemory: number;
  passedCaseCount: number;
  totalCaseCount: number;
  input: any;
  output: any;
  exceptOutput: any;
  throwableOutput: string;
  exitType: number;
}

export interface Heatmap {
  date: string
  count: number
}
