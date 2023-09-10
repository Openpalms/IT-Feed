import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPageFilters.module.scss'
import { useSelector } from 'react-redux'
import { ArticleView, ArticleViewSwitcher } from 'entities/Article'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors/ArticlesSelectors'
import { articlePageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input } from 'shared/ui/Input/Input'
import { Card } from 'shared/ui/Card/Card'
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector'
import { SortOrder } from 'pages/ArticlesPage/model/types/types'
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/types'
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'

interface ArticlesPageFiltersProps {
  className?: string
}

const tabs: TabItem[] = [
  {
    value: ArticleType.ALL,
    content: 'All',
  },
  {
    value: ArticleType.ECONOMICS,
    content: 'Economics',
  },
  {
    value: ArticleType.IT,
    content: 'IT',
  },
  {
    value: ArticleType.SCIENCE,
    content: 'Science',
  },
  {
    value: ArticleType.SPORTS,
    content: 'Sports',
  },
]

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const searchQuery = useSelector(getArticlesPageSearch)
  const tabType = useSelector(getArticlesPageType) as ArticleType

  const fetchFilteredData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])
  const fetchDebouncedData = useDebounce(fetchFilteredData, 500)

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlePageActions.setOrder(order))
      dispatch(articlePageActions.setPage(1))
      fetchDebouncedData()
    },
    [dispatch, fetchFilteredData],
  )
  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlePageActions.setSort(sort))
      dispatch(articlePageActions.setPage(1))
      fetchDebouncedData()
    },
    [dispatch, fetchFilteredData],
  )
  const onViewChange = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view))
      dispatch(articlePageActions.setPage(1))
      fetchDebouncedData()
    },
    [dispatch, fetchFilteredData],
  )

  const onSearchChange = useCallback(
    (query: string) => {
      dispatch(articlePageActions.setSearch(query))
      dispatch(articlePageActions.setPage(1))
      fetchDebouncedData()
    },
    [dispatch, fetchFilteredData],
  )
  const onSearchType = useCallback(
    (tab: TabItem) => {
      dispatch(articlePageActions.setType(tab.value as ArticleType))
      dispatch(articlePageActions.setPage(1))
      fetchDebouncedData()
    },
    [dispatch, fetchFilteredData],
  )
  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ArticleViewSwitcher view={view} onViewClick={onViewChange} />
      </div>
      <Card className={cls.SearchBar}>
        <Input placeholder='Search' onChange={onSearchChange} value={searchQuery} />
      </Card>
      <Tabs tabs={tabs} activeTab={tabType} onTabClick={onSearchType} />
    </div>
  )
}
