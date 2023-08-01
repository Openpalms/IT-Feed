import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { api } from 'shared/api/api'
import { NavigateOptions } from 'react-router'
import { CombinedState, Reducer } from 'redux'
import { StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { counterReducer } from 'app/entities/Counter'
import { userReducer } from 'app/entities/User'
import { To } from 'react-router-dom'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
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
            navigate,
          },
        },
      }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
