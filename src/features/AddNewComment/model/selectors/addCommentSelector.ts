import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getNewCommentText = (state: StateSchema) => state?.AddCommentForm?.text
export const getNewCommentError = (state: StateSchema) => state?.AddCommentForm?.error
