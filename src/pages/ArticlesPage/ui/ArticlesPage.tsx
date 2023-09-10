import { memo, useCallback, useEffect } from 'react'
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleViewSwitcher } from 'entities/Article'
import { ArticleView } from 'entities/Article/model/types/types'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlePageActions, articlePageReducer, getArticles } from '../model/slices/articlePageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getArticlesPageView, getArticlesPageisLoading } from '../model/selectors/ArticlesSelectors'
import { Page } from 'shared/ui/Page/Page'
import { fetchNextPage } from '../model/services/fetchNextPage'
import { initArticlesPage } from '../model/services/initArticlesPage'
import { ArticlesPageFilters } from './ArticlesPageFilters/ArticlesPageFilters'
import { useSearchParams } from 'react-router-dom'

const reducers: ReducersList = {
  articlePage: articlePageReducer,
}

const ArticlesPage = () => {
  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)

  const isLoading = useSelector(getArticlesPageisLoading)
  const view = useSelector(getArticlesPageView)
  const [params] = useSearchParams()
  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextPage())
  }, [dispatch])

  useEffect(() => {
    dispatch(initArticlesPage(params))
  }, [dispatch])

  return (
    <DynamicModuleLoader shouldDestroy={false} reducers={reducers}>
      <Page onScrollEnd={onLoadNextPage} className={cls.ArticlesPage}>
        <ArticlesPageFilters />
        <ArticleList articles={articles} view={view} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
