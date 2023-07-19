import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getAuthDataState = (state: StateSchema) => state?.user.authData
