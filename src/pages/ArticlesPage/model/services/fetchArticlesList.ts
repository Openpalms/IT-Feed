import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import {
  getArticlesPageLimit,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../selectors/ArticlesSelectors'
import { addQueryParams } from 'shared/lib/addQueryParams/addQueryParams'
import { ArticleType } from 'entities/Article/model/types/types'

interface FetchArticlesListProps {
  page?: number
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    const { page = 1 } = props
    const sort = getArticlesPageSort(getState())
    const order = getArticlesPageOrder(getState())
    const searchQuery = getArticlesPageSearch(getState())
    const limit = getArticlesPageLimit(getState())
    const type = getArticlesPageType(getState())
    try {
      addQueryParams({
        sort,
        order,
        searchQuery,
        type,
      })
      const response = await extra.api.get<Article[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: searchQuery,
          type: type === ArticleType.ALL ? undefined : type,
        },
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue('error')
    }
  },
)
