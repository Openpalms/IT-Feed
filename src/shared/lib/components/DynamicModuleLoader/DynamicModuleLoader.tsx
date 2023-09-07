import React, { useEffect } from 'react'
import { useStore } from 'react-redux'
import { StateSchemaKey, StoreWithManager } from 'app/providers/StoreProvider'
import { Reducer } from '@reduxjs/toolkit'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

type ReducersListEntries = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  children: React.ReactNode
  reducers: ReducersList
  shouldDestroy?: boolean
}

export const DynamicModuleLoader: React.FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, shouldDestroy = true } = props
  const store = useStore() as StoreWithManager

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers()

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey]
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer)
      }
    })
    return () => {
      if (shouldDestroy) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey)
        })
      }
    }
  }, [])
  return <>{children}</>
}
