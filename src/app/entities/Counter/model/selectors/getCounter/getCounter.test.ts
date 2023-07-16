import { DeepPartial } from '@reduxjs/toolkit'
import { getCounter } from './getCounter'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

describe('getCounter', () => {
  test('return counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 9,
      },
    }
    expect(getCounter(state as StateSchema)).toEqual({ value: 9 })
  })
})
