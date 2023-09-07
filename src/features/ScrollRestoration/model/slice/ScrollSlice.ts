import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IScrollRestoration } from '../types'

const initialState: IScrollRestoration = {
  scroll: {},
}

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPos: (state, action: PayloadAction<{ path: string; pos: number }>) => {
      state.scroll[action.payload.path] = action.payload.pos
    },
  },
})

export const { actions: scrollActions } = scrollSlice
export const { reducer: scrollReducer } = scrollSlice
