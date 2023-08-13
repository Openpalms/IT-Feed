import React, { memo, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/ArticleSlice'
import { useSelector } from 'react-redux'
import { getArticleData, getArticleError, getArticleisLoading } from '../../model/selectors/ArticleDetalsSelectors'
import { Loader } from 'shared/ui/Loader/Loader'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { t } from 'i18next'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface ArticleDetailsProps {
  className?: string
  articleId: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = memo(({ className, articleId }) => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleisLoading)
  const error = useSelector(getArticleError)
  const article = useSelector(getArticleData)

  useEffect(() => {
    dispatch(fetchArticleById(articleId))
  }, [dispatch, articleId])

  let content

  if (isLoading) {
    content = (
      <div className={cls.skeletons}>
        <Skeleton width={200} height={200} border={'50%'} className={cls.avatar} />
        <Skeleton width={300} height={32} className={cls.title} />
        <Skeleton width={200} height={24} className={cls.skeleton} />
        <Skeleton width={500} height={24} className={cls.skeleton} />
        <Skeleton width='100%' height={200} className={cls.skeleton} />
      </div>
    )
  } else if (error) {
    content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')} />
  }

  return (
    <DynamicModuleLoader shouldDestroy={true} reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>{content}</div>
    </DynamicModuleLoader>
  )
})
