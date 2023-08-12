import React, { useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard,
  ValidationErrors,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadonly,
  getProfileValidationError,
  profileActions,
  profileReducer,
} from 'app/entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { Currency } from 'app/entities/Currency'
import { Country } from 'app/entities/Country'
import { TextTheme } from 'shared/ui/Text/Text'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageProps {
  className?: string
}
const reducers: ReducersList = {
  profile: profileReducer,
}
const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const validationErrors = useSelector(getProfileValidationError)
  const loading = useSelector(getProfileLoading)
  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

  const validationErrorTranslations = {
    [ValidationErrors.SERVER_ERROR]: 'Some server error occured =( please try again later',
    [ValidationErrors.INCORRECT_USER_AGE]: 'Please fill in the right age',
    [ValidationErrors.INCORRECT_USER_COUNTRY]: 'Please fill in the right country',
    [ValidationErrors.INCORRECT_USER_DATA]: 'Please fill in the right first/lastname',
    [ValidationErrors.NO_DATA]: 'Impossible error occured. We are already trying to fix it...',
  }

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ firstname: value || '' }))
    },
    [dispatch],
  )

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }))
    },
    [dispatch],
  )

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }))
    },
    [dispatch],
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
    },
    [dispatch],
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }))
    },
    [dispatch],
  )

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }))
    },
    [dispatch],
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch],
  )

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch],
  )

  return (
    <DynamicModuleLoader reducers={reducers} shouldDestroy={true}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {Boolean(validationErrors?.length) &&
          validationErrors?.map((er) => (
            <Text theme={TextTheme.ERROR} text={validationErrorTranslations[er]} key={er} />
          ))}
        <ProfileCard
          data={formData}
          error={error}
          isLoading={loading}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
