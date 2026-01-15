import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { getArticleListAPI, type DetailDataType } from "@/api/detail"

export const useArticleDetail = () => {
  const [articleDetail, setArticleDetail] = useState<DetailDataType | null>(null)

  const [params] = useSearchParams()
  // うURLパラメーターからidを取得
  const id = params.get('id')

  useEffect(() => {
    async function getArticleDetail() {
      try {
        const res = await getArticleListAPI(id!)
        setArticleDetail(res.data.data)
      } catch (error) {
        throw new Error('fetch detail error')
      }
    }
    getArticleDetail()
  }, [id])

  return {
    articleDetail
  }
}
