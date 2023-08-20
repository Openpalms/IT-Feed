import { createAsyncThunk } from '@reduxjs/toolkit'
import { IComment } from 'app/entities/Comment'
import { getAuthDataState } from 'app/entities/User'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticleData } from 'app/entities/Article/model/selectors/ArticleDetalsSelectors'
import { useDispatch } from 'react-redux'
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<IComment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, _thunkAPI) => {
    const userData = getAuthDataState(_thunkAPI.getState())
    const article = getArticleData(_thunkAPI.getState())

    if (!userData || !text || !article) {
      return _thunkAPI.rejectWithValue('error')
    }
    try {
      const response = await _thunkAPI.extra.api.post<IComment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text,
      })
      if (!response.data) {
        throw new Error()
      }
      _thunkAPI.dispatch(fetchCommentsByArticleId(article.id))
      return response.data
    } catch (error) {
      return _thunkAPI.rejectWithValue('error')
    }
  },
)
