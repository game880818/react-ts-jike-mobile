import { Image, List, InfiniteScroll } from 'antd-mobile'
// import { users } from './users.ts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// api
import { getArticleListAPI, type listResType } from '@/api/list.tsx'

type HomeListProps = {
  channel_id: string,
}

const HomeList = (props: HomeListProps) => {
  const navigate = useNavigate()

  const { channel_id } = props
  const [listRes, setListRes] = useState<listResType>({
    results: [],
    pre_timestamp: '' + new Date().getTime()
  })

  useEffect(() => {
    async function getList() {
      try {
        const res = await getArticleListAPI({
          channel_id: channel_id,
          timestamp: '' + new Date().getTime(),
        })
        setListRes(res.data.data)
      } catch (error) {
        throw new Error('fetch list error')
      }
    }
    getList()
  }, [])

  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    try {
      const res = await getArticleListAPI({
        channel_id: channel_id,
        timestamp: listRes.pre_timestamp,
      })
      // 新しいデータがない場合、hasMoreをfalseにする
      if (res.data.data.results.length === 0) {
        setHasMore(false)
      }

      setListRes({
        // 新しいデータを追加で、組み合わせる
        results: [...listRes.results, ...res.data.data.results],
        // 前回のpre_timestampを使って、次の請求をする
        pre_timestamp: res.data.data.pre_timestamp
      })

    } catch (error) {
      throw new Error('fetch infiniteScroll list error')
    }
  }

  const toDetail = (articleId: string) => {
    navigate(`/detail?id=${articleId}`)
  }
  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            onClick={() => toDetail(item.art_id)}
          >
            {item.aut_name}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </>
  )
}

export default HomeList