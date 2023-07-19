import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from 'app/entities/User'
import { userActions } from 'app/entities/User/model/slice/UserSlice'
import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface IloginByUsername {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, IloginByUsername>(
  'login/loginByUsername',
  async ({ username, password }, _thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
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
