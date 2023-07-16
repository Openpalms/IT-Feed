import { DeepPartial } from '@reduxjs/toolkit'
import { getCounterValue } from './getCounterValue'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

describe('getCounterValue', () => {
  test('return counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 9,
      },
    }
    expect(getCounterValue(state as StateSchema)).toEqual(9)
  })
})
