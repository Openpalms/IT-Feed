import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginState } from './getLoginState'

describe('', () => {
  test('should return obj', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        error: 'er',
        username: 'user',
        password: '123',
      },
    }
    expect(getLoginState(state as StateSchema)).toEqual({
      error: 'er',
      username: 'user',
      password: '123',
    })
  })
  test('should return empty keys', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginState(state as StateSchema)).toEqual({
      isLoading: true,
      password: '',
      username: '',
    })
  })
})
