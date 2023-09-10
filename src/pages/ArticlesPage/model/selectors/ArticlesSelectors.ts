import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleView } from 'entities/Article'
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/types'

export const getArticlesPageisLoading = (state: StateSchema) => state.articlePage?.isLoading || false

export const getArticlesPageError = (state: StateSchema) => state.articlePage?.error

export const getArticlesPageView = (state: StateSchema) => state.articlePage?.view || ArticleView.LIST

export const getArticlesPageNumber = (state: StateSchema) => state.articlePage?.page || 1

export const getArticlesPageLimit = (state: StateSchema) => state.articlePage?.limit || 25

export const getArticlesPageHasMore = (state: StateSchema) => state.articlePage?.hasMore

export const getArticlesPageIsInited = (state: StateSchema) => state.articlePage?._inited

export const getArticlesPageOrder = (state: StateSchema) => state.articlePage?.order || 'desc'

export const getArticlesPageSort = (state: StateSchema) => state.articlePage?.sort || ArticleSortField.CREATED

export const getArticlesPageSearch = (state: StateSchema) => state.articlePage?.search || ''

export const getArticlesPageType = (state: StateSchema) => state.articlePage?.type || ArticleType.ALL
