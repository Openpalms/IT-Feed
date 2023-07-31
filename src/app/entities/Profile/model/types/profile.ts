import { Countries, Currency } from 'shared/const/common'

export interface IProfile {
  username: string
  firstname: string
  lastname: string
  age: number
  currency: Currency
  country: Countries
  city: string
  avatar: string
}

export interface ProfileSchema {
  data: IProfile
  isLoading: boolean
  error?: string
  readonly: boolean
}
