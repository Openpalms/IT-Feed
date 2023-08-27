import { IProfile, ValidationErrors } from '../../types/profile'

export const validateProfileData = (profile: IProfile) => {
  if (!profile) return [ValidationErrors.NO_DATA]
  const { firstname, lastname, age, country } = profile

  const errors: ValidationErrors[] = []
  if (!firstname || !lastname) {
    errors.push(ValidationErrors.INCORRECT_USER_DATA)
  }
  if (!age || !Number.isInteger(age)) {
    errors.push(ValidationErrors.INCORRECT_USER_AGE)
  }
  if (!country) {
    errors.push(ValidationErrors.INCORRECT_USER_COUNTRY)
  }
  return errors
}
