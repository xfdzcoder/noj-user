import request from '@/utils/request'
import type { QuestionCondition, QuestionInfo } from '@/api/question/index'
import type { Page, Response } from '@/api/common'

const baseUri = '/question/bank'

export const pageQuestion = (condition: QuestionCondition): Promise<Response<Page<QuestionInfo>>> => {
  return request.post(`${baseUri}/list`, condition)
}
