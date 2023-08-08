import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileData } from '../../model/Selectors/getProfileData/getProfileData'
import { getProfileError } from '../../model/Selectors/getProfileError/getProfileError'
import { getProfileLoading } from '../../model/Selectors/getProfileLoading/getProfileLoading'
import { Text } from 'shared/ui/Text/Text'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const { t } = useTranslation()
  const data = useSelector(getProfileData)
  const error = useSelector(getProfileError)
  const loading = useSelector(getProfileLoading)
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Profile')} />
        <Button theme={ThemeButton.OUTLINE} className={cls.edit}>
          {t('edit')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.firstname} placeholder='Your name' className={cls.input} />
        <Input value={data?.lastname} placeholder='Your last name' className={cls.input} />
      </div>
    </div>
  )
}
