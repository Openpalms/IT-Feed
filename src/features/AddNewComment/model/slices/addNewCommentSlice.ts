import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddCommentSchema } from '../types/types'

const initialState: AddCommentSchema = {
  text: '',
}

export const addNewCommentSlice = createSlice({
  name: 'addNewComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { actions: newCommentActions } = addNewCommentSlice
export const { reducer: newCommentReducer } = addNewCommentSlice
