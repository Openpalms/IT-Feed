import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileValidationError } from './getProfileValidationError'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ValidationErrors } from '../../types/profile'

describe('getProfileValidationError', () => {
  test('should return error', () => {
    const validationError = [ValidationErrors.INCORRECT_USER_AGE, ValidationErrors.INCORRECT_USER_COUNTRY]
    const state: DeepPartial<StateSchema> = {
      profile: {
        validationError,
      },
    }
    expect(getProfileValidationError(state as StateSchema)).toEqual(validationError)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidationError(state as StateSchema)).toEqual(undefined)
  })
})
