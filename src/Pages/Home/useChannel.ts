import { useEffect, useState } from 'react'
import { getChannelAPI, type channelItem } from '@/api/list'

export const useChannel = () => {
  const [channelList, setChannelList] = useState<channelItem[]>([])
  useEffect(() => {
    async function fetchChannelList() {
      const res = await getChannelAPI()
      setChannelList(res.data.data.channels)
    }
    fetchChannelList()
  }, [])

  return {
    channelList
  }
}