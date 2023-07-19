import { CounterSchema } from 'app/entities/Counter'
import { UserSchema } from 'app/entities/User'
import { loginSchema } from 'features/AuthByUsername'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  login?: loginSchema
}
