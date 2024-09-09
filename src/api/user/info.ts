import request, { type Response } from '@/utils/request'
import { sha256 } from '@/utils/file'
import axios from 'axios'

const baseUri = '/user/info'

export const upload = async (file: File) => {
  const hash = await sha256(file)
  return request.get<any, Response<Object>>(`/user/file/avatar/upload/${ hash }`)
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

      // return axios.post(url, formData)
      return request.post(url, formData)
    })
}
