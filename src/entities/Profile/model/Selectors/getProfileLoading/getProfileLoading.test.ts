import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileLoading } from './getProfileLoading'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

describe('getProfileLoading', () => {
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
      isLoading: false,
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: false,
      },
    }
    expect(getProfileLoading(state as StateSchema)).toEqual(data.isLoading)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileLoading(state as StateSchema)).toEqual(undefined)
  })
})
