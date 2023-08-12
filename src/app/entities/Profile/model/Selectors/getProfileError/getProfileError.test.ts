import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileError } from './getProfileError'
import { Currency } from 'app/entities/Currency'
import { Country } from 'app/entities/Country'

describe('getProfileError', () => {
  test('should return error', () => {
    const data = {
      currency: Currency.EUR,
      country: Country.Armenia,
      city: 'Moscow',
      username: 'Openpalms',
      age: 21,
      avatar:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      firstname: 'Daniel',
      lastname: 'Galochkin',
      error: '123',
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: '123',
      },
    }
    expect(getProfileError(state as StateSchema)).toEqual(data.error)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})
