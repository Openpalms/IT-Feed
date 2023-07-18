import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
  className?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const [userName, setUserName] = useState('')
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input placeholder='username' className={cls.input} onChange={setUserName} autoFocus autofocus />
      <Input placeholder='password' className={cls.input} />
      <Button className={cls.loginBtn}>{t('Войти')}</Button>
    </div>
  )
}
