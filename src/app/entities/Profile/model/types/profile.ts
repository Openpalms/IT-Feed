import { Currency } from 'app/entities/Currency'
import { Country } from 'app/entities/Country'
export interface IProfile {
  username?: string
  firstname?: string
  lastname?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  avatar?: string
}

export interface ProfileSchema {
  data?: IProfile
  form?: IProfile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  validationError?: ValidationErrors[]
}
export enum ValidationErrors {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
  INCORRECT_USER_COUNTRY = 'INCORRECT_USER_COUNTRY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}
