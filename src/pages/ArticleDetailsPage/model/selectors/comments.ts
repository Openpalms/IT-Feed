import { StateSchema } from 'app/providers/StoreProvider'

export const getCommentsIsLoading = (state: StateSchema) => state.ArticleComment?.isLoading
export const getCommentsError = (state: StateSchema) => state.ArticleComment?.error
