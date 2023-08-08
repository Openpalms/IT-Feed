import React, { useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, fetchProfileData, profileReducer } from 'app/entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ProfilePageProps {
  className?: string
}
const reducers: ReducersList = {
  profile: profileReducer,
}
const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} shouldDestroy={true}>
      <div className={classNames('', {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
