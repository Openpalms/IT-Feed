import React, { useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard,
  fetchProfileData,
  getProfileData,
  getProfileError,
  getProfileForm,
  getProfileLoading,
  getProfileReadonly,
  profileActions,
  profileReducer,
} from 'app/entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { Currency } from 'app/entities/Currency'
import { Country } from 'app/entities/Country'

interface ProfilePageProps {
  className?: string
}
const reducers: ReducersList = {
  profile: profileReducer,
}
const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const data = useSelector(getProfileData)
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const loading = useSelector(getProfileLoading)
  const readonly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstname = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ firstname: value || '' }))
    },
    [dispatch],
  )
  const onChangeLastname = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }))
    },
    [dispatch],
  )
  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }))
    },
    [dispatch],
  )
  const onChangeAvatar = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }))
    },
    [dispatch],
  )
  const onChangeAge = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value) }))
    },
    [dispatch],
  )
  const onChangeCity = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ city: value }))
    },
    [dispatch],
  )
  const onChangeCurrency = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ currency: (value as Currency) || Currency.RUB }))
    },
    [dispatch],
  )
  const onChangeCountry = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ country: (value as Country) || Country.Russia }))
    },
    [dispatch],
  )
  return (
    <DynamicModuleLoader reducers={reducers} shouldDestroy={true}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
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
