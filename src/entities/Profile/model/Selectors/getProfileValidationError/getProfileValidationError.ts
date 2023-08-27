import { StateSchema } from 'app/providers/StoreProvider'

export const getProfileValidationError = (state: StateSchema) => state?.profile?.validationError
