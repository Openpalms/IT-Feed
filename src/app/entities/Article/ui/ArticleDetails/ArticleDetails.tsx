import React, { memo, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/ArticleSlice'
import { useSelector } from 'react-redux'
import { getArticleData, getArticleError, getArticleisLoading } from '../../model/selectors/ArticleDetalsSelectors'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import { t } from 'i18next'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { ArticleBlock, ArticleBlockType } from '../../model/types/types'
import { ArticleCode } from '../ArticleCode /ArticleCode'
import { ArticleImage } from '../ArticleImage/ArticleImage'
import { ArticleText } from '../ArticleText/ArticleText'
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

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCode key={block.id} block={block} className={cls.block} />
      case ArticleBlockType.IMAGE:
        return <ArticleImage key={block.id} block={block} className={cls.block} />
      case ArticleBlockType.TEXT:
        return <ArticleText key={block.id} className={cls.block} block={block} />
      default:
        return null
    }
  }, [])

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
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} source={article?.img} className={cls.avatar} />
        </div>
        <Text className={cls.title} title={article?.title} text={article?.subtitle} size={TextSize.L} />
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks?.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader shouldDestroy={true} reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>{content}</div>
    </DynamicModuleLoader>
  )
})
