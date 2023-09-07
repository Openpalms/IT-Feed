import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { articlePageActions } from '../slices/articlePageSlice'
import { fetchArticlesList } from './fetchArticlesList'
import { getArticlesPageIsInited } from '../selectors/ArticlesSelectors'

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const inited = getArticlesPageIsInited(getState())
    if (!inited) {
      dispatch(articlePageActions.initState())
      dispatch(
        fetchArticlesList({
          page: 1,
        }),
      )
    }
  },
)
