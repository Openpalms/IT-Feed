import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { memo, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import cls from './ArticleDetailsPage.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleCommentsReducer, getComments } from '../model/slices/ArticleCommentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsIsLoading } from '../model/selectors/comments'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId'
import { CommentForm } from 'features/AddNewComment'
import { addCommentForArticle } from 'features/AddNewComment/model/services/addCommentForArticle/addCommentForArticle'
import { newCommentActions } from 'features/AddNewComment/model/slices/addNewCommentSlice'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
const reducers: ReducersList = {
  ArticleComment: articleCommentsReducer,
}
const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getComments.selectAll)
  const isCommentsLoading = useSelector(getCommentsIsLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch],
  )

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [])

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  }, [])

  if (!id) {
    return <div>There is no article</div>
  }
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={cls.ArticleDetailsPage}>
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          Back to all articles
        </Button>
        <ArticleDetails articleId={id} />
        <Text className={cls.commentTitle} title={'Comments'} size={TextSize.M} />
        <CommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isCommentsLoading} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
