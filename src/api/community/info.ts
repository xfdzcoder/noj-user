import request from '@/utils/request'
import type { Response } from '@/api/common'
import type { CommunityInfo } from '@/api/community/index'

const baseUri = '/community/info'

export const hotCommunity = (): Promise<Response<CommunityInfo[]>> => {
  return request.get(`${baseUri}/hot`)
}
