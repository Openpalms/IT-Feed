import { useTranslation } from 'react-i18next'
import cls from './LangSwitcher.module.scss'
import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from '../Button/Button'

interface LangSwitcherProps {
  className?: string
  shorten?: boolean
}

export const LangSwitcher: React.FC<LangSwitcherProps> = memo(({ className, shorten }) => {
  const { t, i18n } = useTranslation()
  const toggle = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button className={classNames(cls.LangSwitcher, {}, [className])} theme={ThemeButton.CLEAR} onClick={toggle}>
      {t(shorten ? 'shorten' : 'Язык')}
    </Button>
  )
})
