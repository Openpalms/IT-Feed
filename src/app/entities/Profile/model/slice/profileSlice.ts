import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
  data: undefined as unknown as IProfile,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
