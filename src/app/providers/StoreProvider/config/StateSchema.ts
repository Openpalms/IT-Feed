import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from 'entities/Article'
import { ProfileSchema } from 'entities/Profile'
import { UserSchema } from 'entities/User'
import { AxiosInstance } from 'axios'
import { AddCommentSchema } from 'features/AddNewComment'
import { loginSchema } from 'features/AuthByUsername'
import { ArticleCommentSchema } from 'pages/ArticleDetailsPage'
import { ArticlePageSchema } from 'pages/ArticlesPage'
import { IScrollRestoration } from 'features/ScrollRestoration'

export interface StateSchema {
  user: UserSchema
  scroll: IScrollRestoration
  //async reducers

  login?: loginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  ArticleComment?: ArticleCommentSchema
  AddCommentForm?: AddCommentSchema
  articlePage?: ArticlePageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface reducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  getMountedReducers: () => MountedReducers
}
export interface StoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: reducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}
export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
