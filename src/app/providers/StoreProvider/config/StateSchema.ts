import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { CounterSchema } from 'app/entities/Counter'
import { ProfileSchema } from 'app/entities/Profile'
import { UserSchema } from 'app/entities/User'
import { loginSchema } from 'features/AuthByUsername'

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
