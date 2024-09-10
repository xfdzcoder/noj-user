import request, { type Response } from '@/utils/request'
import { sha256 } from '@/utils/file'
import type { UserInfo } from '@/api/user/index'
import axios from 'axios'

const baseUri = '/user/info'

export const upload = async (file: File): Promise<string | undefined> => {
  const hash = await sha256(file)
  return await request.get<any, Response<Object>>(`/user/file/avatar/upload/${ hash }`)
    .then(res => {
      const data = new Map<string, string>(Object.entries(res.data))
      const key = data.get('key')
      const url = data.get('url')
      if (! url) {
        console.log('url is null', res)
        return
      }

      const formData = new FormData()
      data.forEach((value, key, map) => {
        formData.append(key, value)
      })
      formData.append('file', file, key)
      formData.delete('url')

      // 直接使用 axios，避免走项目默认配置
      return axios.post(url, formData)
        // return request.post(url, formData)
        .then(res => {
          return request.get<any, Response<string>>(`/user/file/avatar/access`)
            .then(res => {
              return res.data
            })
        })
    })
}

export const updateById = (data: UserInfo) => {
  return request.put(`${ baseUri }`, data)
}
