import request from '@/utils/request'
import type { Response } from '@/api/common'
import type { QuestionInfo } from '@/api/question/index'

const baseUri = '/question/info'

export const getById = (id: string): Promise<Response<QuestionInfo>> => {
  return request.get(`${baseUri}/${id}`)
}
