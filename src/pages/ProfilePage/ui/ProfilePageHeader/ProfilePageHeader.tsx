import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileReadonly, profileActions, updateProfileData } from 'app/entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({ className }) => {
  const { t } = useTranslation()
  const readOnly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  const onToggleEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(!readOnly))
    if (!readOnly) {
      dispatch(profileActions.cancelEdit())
    }
  }, [readOnly])
  const onSave = useCallback(() => {
    dispatch(updateProfileData())
    // dispatch(profileActions.setReadonly(true))
  }, [readOnly])
  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      <div className={cls.buttons}>
        {!readOnly && (
          <Button theme={ThemeButton.OUTLINE_RED} className={cls.saveBtn} onClick={onSave}>
            {t('Save')}
          </Button>
        )}
        <Button theme={ThemeButton.OUTLINE} className={cls.edit} onClick={onToggleEdit}>
          {readOnly ? t('edit') : t('cancel')}
        </Button>
      </div>
    </div>
  )
}
