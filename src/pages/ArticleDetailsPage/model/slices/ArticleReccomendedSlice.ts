import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { IComment } from 'entities/Comment'
import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleReccomendedSchema } from '../types/ArticleReccomendedSchema'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId'
import { Article } from 'entities/Article'
import { fetchRecomendations } from '../services/fetchRecomendations'

const recomendationsAdapter = createEntityAdapter<Article>({
  selectId: (comment) => comment.id,
})

export const getRecomendations = recomendationsAdapter.getSelectors<StateSchema>(
  (state) => state.ArticleRecomendations || recomendationsAdapter.getInitialState(),
)

const ArticleReccomendedSlice = createSlice({
  name: 'ArticleReccomendedSlice',
  initialState: recomendationsAdapter.getInitialState<ArticleReccomendedSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecomendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchRecomendations.fulfilled, (state, action) => {
        state.isLoading = false
        recomendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchRecomendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: ArticleReccomendedReducer } = ArticleReccomendedSlice
