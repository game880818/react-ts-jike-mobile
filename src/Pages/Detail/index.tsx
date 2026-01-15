import { NavBar, Space, Avatar, Button, Divider, TabBar } from 'antd-mobile';
import {
  MoreOutline,
  HeartOutline,
  StarOutline,
  MessageOutline,
  SendOutline,
  LeftOutline
} from 'antd-mobile-icons';
import './style.css'; // 建議將樣式放入單獨的文件

import { useNavigate } from "react-router-dom"
import { useArticleDetail } from './useArticleDetail'


const Detail = () => {
  const navigate = useNavigate()

  const { articleDetail } = useArticleDetail()

  const back = () => {
    navigate(-1)
  }

  if (!articleDetail) {
    return <div>this is loading</div>
  }
  return (
    <div className="article-container">
      {/* 1. 頂部導航 */}
      <NavBar
        backArrow={<LeftOutline />}
        onBack={back}
        right={<MoreOutline fontSize={24} />}
      >
        文章詳情
      </NavBar>

      <div className="article-content-wrapper">
        {/* 2. 文章標題 */}
        <h1 className="article-title">{articleDetail.title}</h1>

        {/* 3. 作者信息欄 */}
        <div className="author-bar">
          <div className="author-info">
            <Avatar src={articleDetail.aut_photo} style={{ '--size': '40px', '--border-radius': '20px' }} />
            <div className="author-text">
              <div className="name">{articleDetail.aut_name}</div>
              <div className="date">{articleDetail.pubdate} | 閱讀量 {articleDetail.read_count}</div>
            </div>
          </div>
          <Button
            color='primary'
            fill='outline'
            size='mini'
            shape='rounded'
          >
            {articleDetail.is_followed ? '已關注' : '+ 關注'}
          </Button>
        </div>

        <Divider />

        {/* 4. 文章正文 (渲染 HTML) */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: articleDetail.content }}
        />

        <div className="article-end-tag">—— 正文結束 ——</div>
      </div>

      {/* 5. 底部固定操作欄 */}
      <div className="bottom-action-bar">
        <div className="comment-input-placeholder">
          寫評論...
        </div>
        <div className="action-icons">
          <Space block style={{ '--gap': '20px' }}>
            <div className="icon-item">
              <MessageOutline />
              <span>{articleDetail.comm_count}</span>
            </div>
            <div className="icon-item">
              <HeartOutline color={articleDetail.attitude === 1 ? 'red' : ''} />
              <span>點讚</span>
            </div>
            <div className="icon-item">
              <StarOutline color={articleDetail.is_collected ? 'orange' : ''} />
              <span>收藏</span>
            </div>
            <div className="icon-item">
              <SendOutline />
            </div>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Detail
