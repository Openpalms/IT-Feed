import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { api } from 'shared/api/api'
import { CombinedState, Reducer } from 'redux'
import { StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { userReducer } from 'entities/User'
import { scrollReducer } from 'features/ScrollRestoration'

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scroll: scrollReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: api,
          },
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
