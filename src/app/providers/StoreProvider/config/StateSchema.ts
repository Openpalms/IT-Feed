import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { CounterSchema } from 'app/entities/Counter'
import { ProfileSchema } from 'app/entities/Profile'
import { UserSchema } from 'app/entities/User'
import { AxiosInstance } from 'axios'
import { loginSchema } from 'features/AuthByUsername'
import { NavigateOptions, To } from 'react-router-dom'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  //async reducers

  login?: loginSchema
  profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema

export interface reducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}
export interface StoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: reducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}
export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
}
