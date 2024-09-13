import type { ExecuteDetail, ExecuteResult, ExecuteResultCondition, Heatmap } from '@/api/question/index'
import request from '@/utils/request'
import type { Page, Response } from '@/api/common'

const baseUri = '/question/execute/result'

export const list = (condition: ExecuteResultCondition): Promise<Response<Page<ExecuteResult>>> => {
  return request.post(`${baseUri}/list`, condition)
}

export const recently = (): Promise<Response<ExecuteResult[]>> => {
  return request.get(`${baseUri}/recently`)
}

export const getHeatmap = (): Promise<Response<Heatmap[]>> => {
  return request.get(`${baseUri}/heatmap`)
}

export const getById = (id: string): Promise<Response<ExecuteResult>> => {
  return request.get(`${baseUri}/${id}`)
}
