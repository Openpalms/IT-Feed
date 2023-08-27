import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'

export const getArticlesPageisLoading = (state: StateSchema) => state.articlePage?.isLoading || false

export const getArticlesPageError = (state: StateSchema) => state.articlePage?.error

export const getArticlesPageView = (state: StateSchema) => state.articlePage?.view || ArticleView.LIST

export const getArticlesPageNumber = (state: StateSchema) => state.articlePage?.page || 1
export const getArticlesPageLimit = (state: StateSchema) => state.articlePage?.limit || 25
export const getArticlesPageHasMore = (state: StateSchema) => state.articlePage?.hasMore
