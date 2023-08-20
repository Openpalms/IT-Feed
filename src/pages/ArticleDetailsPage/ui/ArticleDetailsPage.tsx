import { ArticleDetails } from 'app/entities/Article'
import { CommentList } from 'app/entities/Comment'
import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import cls from './ArticleDetailsPage.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleCommentsReducer, getComments } from '../model/slices/ArticleCommentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsIsLoading } from '../model/selectors/comments'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId'
const reducers: ReducersList = {
  ArticleComment: articleCommentsReducer,
}
const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getComments.selectAll)
  const isCommentsLoading = useSelector(getCommentsIsLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  }, [])

  if (!id) {
    return <div>There is no article</div>
  }
  return (
    <DynamicModuleLoader shouldDestroy={true} reducers={reducers}>
      <div className={cls.ArticleDetailsPage}>
        <ArticleDetails articleId={id} />
        <Text className={cls.commentTitle} title={'Comments'} size={TextSize.M} />
        <CommentList comments={comments} isLoading={isCommentsLoading} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
