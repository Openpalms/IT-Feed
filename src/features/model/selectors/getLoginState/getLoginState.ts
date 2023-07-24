import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { loginSchema } from 'features/AuthByUsername'

const defaultState: loginSchema = {
  username: '',
  password: '',
  isLoading: true,
}
export const getLoginState = (state: StateSchema) => state?.login || defaultState
