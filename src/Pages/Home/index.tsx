import { Tabs } from 'antd-mobile'

import { useChannel } from './useChannel'
import './style.css'
import HomeList from './HomeList'


const Home = () => {
  // useChannelを使って、channelListを取得
  const { channelList } = useChannel()
  return (
    <div className="tabContainer">
      <Tabs defaultActiveKey="0">
        {channelList.map(item => (
          <Tabs.Tab title={item.name} key={item.id}>
            <div className="listContainer">
              {/* HomeList List */}
              <HomeList />
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default Home