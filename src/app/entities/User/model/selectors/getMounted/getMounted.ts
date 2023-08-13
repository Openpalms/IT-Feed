import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getMounted = (state: StateSchema) => state?.user._mounted
