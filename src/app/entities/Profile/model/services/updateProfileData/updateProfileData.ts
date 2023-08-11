import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile, getProfileForm } from 'app/entities/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const updateProfileData = createAsyncThunk<IProfile, void, ThunkConfig<string>>(
  'login/updateProfileData',
  async (_, _thunkAPI) => {
    try {
      const formData = getProfileForm(_thunkAPI.getState())
      const response = await _thunkAPI.extra.api.put<IProfile>('/profile', formData)
      return response.data
    } catch (error) {
      console.log(error)
      return _thunkAPI.rejectWithValue('error')
    }
  },
)
