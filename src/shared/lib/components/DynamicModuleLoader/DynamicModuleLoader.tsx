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
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntries) => {
      store.reducerManager.add(name, reducer)
    })
    return () => {
      if (shouldDestroy) {
        Object.entries(reducers).forEach(([name]: ReducersListEntries) => {
          store.reducerManager.remove(name)
        })
      }
    }
  }, [])
  return <>{children}</>
}