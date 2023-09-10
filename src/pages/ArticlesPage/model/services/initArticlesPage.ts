import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { articlePageActions } from '../slices/articlePageSlice'
import { fetchArticlesList } from './fetchArticlesList'
import { getArticlesPageIsInited } from '../selectors/ArticlesSelectors'
import { SortOrder } from '../types/types'
import { ArticleSortField } from 'entities/Article/model/types/types'

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const inited = getArticlesPageIsInited(getState())
    if (!inited) {
      const order = searchParams.get('order') as SortOrder
      const sort = searchParams.get('sort') as ArticleSortField
      const query = searchParams.get('searchQuery')

      if (order) {
        dispatch(articlePageActions.setOrder(order))
      }
      if (sort) {
        dispatch(articlePageActions.setSort(sort))
      }
      if (query) {
        dispatch(articlePageActions.setSearch(query))
      }

      dispatch(articlePageActions.initState())
      dispatch(
        fetchArticlesList({
          page: 1,
        }),
      )
    }
  },
)
