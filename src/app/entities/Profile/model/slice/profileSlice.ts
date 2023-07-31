import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, ProfileSchema } from '../types/profile'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const initialState: ProfileSchema = {
  data: undefined,
  readonly: true,
  isLoading: false,
  error: undefined,
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IProfile>) => {
      state.data = action.payload
    },
    initAuthData: (state) => {},
    logout: (state) => {},
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
