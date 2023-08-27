import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile, getProfileForm } from 'entities/Profile'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { validateProfileData } from '../validation/Validation'
import { ValidationErrors } from '../../types/profile'

export const updateProfileData = createAsyncThunk<IProfile, void, ThunkConfig<ValidationErrors[]>>(
  'login/updateProfileData',
  async (_, _thunkAPI) => {
    try {
      const formData = getProfileForm(_thunkAPI.getState())
      const errors = validateProfileData(formData!)
      if (errors.length) {
        return _thunkAPI.rejectWithValue(errors)
      }
      const response = await _thunkAPI.extra.api.put<IProfile>(`/profile/${formData?.id}`, formData)
      return response.data
    } catch (error) {
      console.log(error)
      return _thunkAPI.rejectWithValue([ValidationErrors.SERVER_ERROR])
    }
  },
)
