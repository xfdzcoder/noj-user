import request from '@/utils/request'
import type { QuestionBank, QuestionBankCondition } from '@/api/question/index'
import type { Page, Response } from '@/api/common'

const baseUri = '/question/bank'

export const pageQuestion = (condition: QuestionBankCondition): Promise<Response<Page<QuestionBank>>> => {
  return request.post(`${baseUri}/list`, condition)
}

export const getById = (id: string): Promise<Response<QuestionBank>> => {
  return request.get(`${baseUri}/${id}`)
}
