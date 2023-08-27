import { EntityState } from '@reduxjs/toolkit'
import { IComment } from 'entities/Comment'

export interface ArticleCommentSchema extends EntityState<IComment> {
  isLoading?: boolean
  error?: string
}
