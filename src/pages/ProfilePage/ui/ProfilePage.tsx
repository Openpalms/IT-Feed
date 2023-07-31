import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'app/entities/Profile'

interface ProfilePageProps {
  className?: string
}
const reducers: ReducersList = {
  profile: profileReducer,
}
const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={reducers} shouldDestroy={true}>
      <div className={classNames('', {}, [className])}>{t('Профиль')}</div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
