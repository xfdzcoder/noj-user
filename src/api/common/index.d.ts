export interface BaseCondition {
  current: number
  size: number
}

export interface Response<T> {
  code: '20000' | '50000'
  data: T
  message: string
}

export interface Page<T> {
  current: number
  size: number
  records: T[]
  pages: number
  total: number
}
