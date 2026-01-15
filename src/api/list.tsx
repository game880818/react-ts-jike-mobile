import { http } from '@/utils'
import type { resType } from './resType'

// channelItem interface
export interface channelItem {
  id: number,
  name: string
}

interface channelResType {
  channels: channelItem[]
}

// channelListを取得する関数
export function getChannelAPI() {
  return http.request<resType<channelResType>>(
    { url: '/channels' }
  )
}

// listItem interface

export interface listItem {
  art_id: string,
  title: string,
  aut_id: string,
  comm_count: number,
  pubdate: string,
  aut_name: string,
  is_top: number,
  cover: {
    type: number,
    images: string[]
  },
}

interface listResType {
  results: listItem[],
  pre_timestamp: string
}

// articleListを取得する関数
export function getArticleListAPI(params: {
  channel_id: string,
  timestamp: string
}) {
  return http.request<resType<listResType>>(
    {
      url: '/articles',
      params
    }
  )
}

