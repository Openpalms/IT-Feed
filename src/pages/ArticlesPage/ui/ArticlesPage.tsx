import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleViewSwitcher } from 'entities/Article'
import { ArticleView } from 'entities/Article/model/types/types'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlePageActions, articlePageReducer, getArticles } from '../model/slices/articlePageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticlesList } from '../model/services/fetchArticlesList'
import { useSelector } from 'react-redux'
import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageNumber,
  getArticlesPageView,
  getArticlesPageisLoading,
} from '../model/selectors/ArticlesSelectors'
import { Page } from 'shared/ui/Page/Page'
import { fetchNextPage } from '../model/services/fetchNextPage'

const reducers: ReducersList = {
  articlePage: articlePageReducer,
}

const ArticlesPage = () => {
  const { t } = useTranslation('main')
  const dispatch = useAppDispatch()

  const articles = useSelector(getArticles.selectAll)

  const isLoading = useSelector(getArticlesPageisLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)
  const page = useSelector(getArticlesPageNumber)
  const hasMore = useSelector(getArticlesPageHasMore)

  const onViewChange = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view))
    },
    [dispatch],
  )

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextPage())
  }, [dispatch])

  useEffect(() => {
    dispatch(articlePageActions.initState())
    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    )
  }, [dispatch])

  return (
    <DynamicModuleLoader shouldDestroy={true} reducers={reducers}>
      <Page onScrollEnd={onLoadNextPage} className={cls.ArticlesPage}>
        <ArticleViewSwitcher view={view} onViewClick={onViewChange} />
        <ArticleList articles={articles} view={view} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
