import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from 'entities/User'
import { userActions } from 'entities/User/model/slice/UserSlice'
import { ThunkConfig, ThunkExtraArg } from 'app/providers/StoreProvider'
import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface IloginByUsername {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, IloginByUsername, ThunkConfig<string>>(
  'login/loginByUsername',
  async ({ username, password }, _thunkAPI) => {
    try {
      const response = await _thunkAPI.extra.api.post('/login', {
        username,
        password,
      })
      if (!response.data) {
        throw new Error('error')
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      _thunkAPI.dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (error) {
      console.log(error)
      return _thunkAPI.rejectWithValue('error')
    }
  },
)
