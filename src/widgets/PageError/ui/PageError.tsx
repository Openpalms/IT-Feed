import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import cls from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError: React.FC<PageErrorProps> = ({ className }) => {
  const { t } = useTranslation()
  const handleHomeBtnClick = () => {
    window.location.href = '/'
  }
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      {t('Произошла ошибка!')}
      <Button onClick={handleHomeBtnClick}>{t('На главную страницу')}</Button>
    </div>
  )
}
