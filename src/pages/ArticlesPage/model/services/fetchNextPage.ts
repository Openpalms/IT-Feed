import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPageHasMore, getArticlesPageLimit, getArticlesPageNumber } from '../selectors/ArticlesSelectors'
import { getArticleisLoading } from 'entities/Article/model/selectors/ArticleDetalsSelectors'
import { articlePageActions } from '../slices/articlePageSlice'
import { fetchArticlesList } from './fetchArticlesList'

export const fetchNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextPage',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageNumber(getState())
    const limit = getArticlesPageLimit(getState())
    const isLoading = getArticleisLoading(getState())

    if (hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1))
      dispatch(
        fetchArticlesList({
          page: page + 1,
        }),
      )
    }
  },
)
