import { Image, List } from 'antd-mobile'
// import { users } from './users.ts'
import { useEffect, useState } from 'react'
import { getArticleListAPI, type listItem } from '@/api/list.tsx'

type HomeListProps = {
  channel_id: string,
}

const HomeList = (props: HomeListProps) => {
  const { channel_id } = props
  const [list, setList] = useState<listItem[]>([])

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI({
        channel_id: channel_id,
        timestamp: '' + new Date().getTime()
      })
      console.log(res)
      setList(res.data.data.results)
    }

    getList()
  }, [])
  return (
    <>
      <List>
        {list.map((item) => (
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
          >
            {item.aut_name}
          </List.Item>
        ))}
      </List>
    </>
  )
}

export default HomeList