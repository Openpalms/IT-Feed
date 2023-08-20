import { EntityState } from '@reduxjs/toolkit'
import { IComment } from 'app/entities/Comment'

export interface ArticleCommentSchema extends EntityState<IComment> {
  isLoading?: boolean
  error?: string
}
