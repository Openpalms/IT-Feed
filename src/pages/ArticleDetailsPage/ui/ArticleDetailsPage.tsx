import { ArticleDetails } from 'app/entities/Article'
import { CommentList } from 'app/entities/Comment'
import { memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
const reducers: ReducersList = {
  ArticleComment: articleCommentsReducer,
}
const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getComments.selectAll)
  const isCommentsLoading = useSelector(getCommentsIsLoading)
  const dispatch = useDispatch()

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  }, [])

  if (!id) {
    return <div>There is no article</div>
  }
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={cls.ArticleDetailsPage}>
        <ArticleDetails articleId={id} />
        <Text className={cls.commentTitle} title={'Comments'} size={TextSize.M} />
        <CommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isCommentsLoading} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
