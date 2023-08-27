import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { validateProfileData } from './Validation'
import { ValidationError } from 'schema-utils'
import { ValidationErrors } from '../../types/profile'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Armenia,
  lastname: 'test',
  firstname: 'asda',
  city: 'asf',
  currency: Currency.USD,
}

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data)
    expect(result).toEqual([])
  })

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' })

    expect(result).toEqual([ValidationErrors.INCORRECT_USER_DATA])
  })

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined })

    expect(result).toEqual([ValidationErrors.INCORRECT_USER_AGE])
  })

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined })

    expect(result).toEqual([ValidationErrors.INCORRECT_USER_COUNTRY])
  })

  test('incorrect all', async () => {
    const result = validateProfileData({})

    expect(result).toEqual([
      ValidationErrors.INCORRECT_USER_DATA,
      ValidationErrors.INCORRECT_USER_AGE,
      ValidationErrors.INCORRECT_USER_COUNTRY,
    ])
  })
})
