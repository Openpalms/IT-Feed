import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile } from 'entities/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const fetchProfileData = createAsyncThunk<IProfile, string, ThunkConfig<string>>(
  'login/loginByUsername',
  async (userId, _thunkAPI) => {
    try {
      const response = await _thunkAPI.extra.api.get<IProfile>(`/profile/${userId}`)
      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (error) {
      console.log(error)
      return _thunkAPI.rejectWithValue('error')
    }
  },
)
