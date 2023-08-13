import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getArticleData = (state: StateSchema) => state?.articleDetails?.data
export const getArticleError = (state: StateSchema) => state?.articleDetails?.error
export const getArticleisLoading = (state: StateSchema) => state?.articleDetails?.isLoading
