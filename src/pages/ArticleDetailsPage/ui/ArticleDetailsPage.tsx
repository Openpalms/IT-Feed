import { ArticleDetails } from 'app/entities/Article'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    return <div>There is no article</div>
  }
  return (
    <div>
      <ArticleDetails articleId={id} />
    </div>
  )
}

export default memo(ArticleDetailsPage)
