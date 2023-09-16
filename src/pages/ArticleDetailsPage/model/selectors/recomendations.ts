import { StateSchema } from 'app/providers/StoreProvider'

export const getRecomendationsIsLoading = (state: StateSchema) => state.ArticleRecomendations?.isLoading
export const getRecomendationsError = (state: StateSchema) => state.ArticleRecomendations?.error
