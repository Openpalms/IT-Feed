import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { ArticleView } from '../../../../entities/Article/model/types/types'
import { ArticlePageSchema } from '../types/types'
import { fetchArticlesList } from '../services/fetchArticlesList'

const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticles = articleAdapter.getSelectors<StateSchema>(
  (state) => state.articlePage || articleAdapter.getInitialState(),
)

const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState: articleAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.LIST,
    page: 1,
    hasMore: true,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BLOCK ? 4 : 9
      state._inited = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        articleAdapter.addMany(state, action.payload)
        state.hasMore = action.payload.length > 0
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articlePageReducer, actions: articlePageActions } = articlePageSlice
