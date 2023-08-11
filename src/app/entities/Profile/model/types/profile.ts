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
  data: IProfile
  form?: IProfile
  isLoading: boolean
  error?: string
  readonly: boolean
}
