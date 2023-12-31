import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

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
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.form = state.data
      state.validationError = []
    },
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
        state.form = action.payload
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateProfileData.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
        state.readonly = true
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.validationError = action.payload
      })
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
