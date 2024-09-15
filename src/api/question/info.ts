import request from '@/utils/request'
import type { Page, Response } from '@/api/common'
import type { QuestionInfo, QuestionInfoCondition } from '@/api/question/index'

const baseUri = '/question/info'

export const getById = (id: string): Promise<Response<QuestionInfo>> => {
  return request.get(`${baseUri}/${id}`)
}

export const listByBankId = (condition: QuestionInfoCondition): Promise<Response<Page<QuestionInfo>>> => {
  return request.post(`${baseUri}/list`, condition)
}
