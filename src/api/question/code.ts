import type { CodeExecuteReq, ExecuteInfo, ExecuteResult } from '@/api/question/index'
import request from '@/utils/request'
import type { Response } from '@/api/common'

const baseUri = '/question/code'

export const execute = (data: CodeExecuteReq): Promise<Response<ExecuteInfo>> => {
  return request.post(`${baseUri}/execute`, data)
}

export const check = (infoId: string): Promise<Response<ExecuteResult>> => {
  return request.get(`${baseUri}/check/${infoId}`)
}
