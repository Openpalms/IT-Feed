import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile } from 'app/entities/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const fetchProfileData = createAsyncThunk<IProfile, void, ThunkConfig<string>>(
  'login/loginByUsername',
  //   @ts-ignore
  async (_, _thunkAPI) => {
    try {
      const response = await _thunkAPI.extra.api.get<IProfile>('/profile')
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      return _thunkAPI.rejectWithValue('error')
    }
  },
)
