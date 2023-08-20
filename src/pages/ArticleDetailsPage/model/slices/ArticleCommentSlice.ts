import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { IComment } from 'app/entities/Comment'
import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleCommentSchema } from '../types/ArticleCommentSchema'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId'

const commentAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
})

export const getComments = commentAdapter.getSelectors<StateSchema>(
  (state) => state.ArticleComment || commentAdapter.getInitialState(),
)

const ArticleCommentSlice = createSlice({
  name: 'ArticleCommentSlice',
  initialState: commentAdapter.getInitialState<ArticleCommentSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isLoading = false
        commentAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articleCommentsReducer } = ArticleCommentSlice
