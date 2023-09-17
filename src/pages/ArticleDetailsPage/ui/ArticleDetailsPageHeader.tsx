import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import cls from './ArticleDetailsPageHeader.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useSelector } from 'react-redux'
import { getAuthDataState } from 'entities/User'
import { getArticleData } from 'entities/Article/model/selectors/ArticleDetalsSelectors'
import { canEditArticle } from '../model/selectors/article'

const ArticleDetailsPage = () => {
  const navigate = useNavigate()
  const canEdit = useSelector(canEditArticle)
  const article = useSelector(getArticleData)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [])
  const onArticleEdit = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [article?.id, navigate])

  return (
    <div className={cls.ArticleDetailsPageHeader}>
      <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
        Back to all articles
      </Button>
      {canEdit && (
        <Button theme={ThemeButton.OUTLINE} onClick={onArticleEdit} className={cls.edit}>
          Edit
        </Button>
      )}
    </div>
  )
}

export default memo(ArticleDetailsPage)
