import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from 'features/model/slice/loginSlice'
import { getLoginState } from 'features/model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
  className?: string
}

export const LoginForm: React.FC<LoginFormProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { username, password, error, isLoading } = useSelector(getLoginState)
  const onUsernameChange = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch],
  )
  const onPasswordChange = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, password, username])
  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title='Login Form' theme={TextTheme.PRIMARY} />
      {error && <Text text='an error occured, try again' theme={TextTheme.ERROR} />}
      <Input
        placeholder='username'
        className={cls.input}
        onChange={onUsernameChange}
        autofocus
        autoFocus
        value={username}
      />
      <Input placeholder='password' className={cls.input} onChange={onPasswordChange} value={password} />
      <Button className={cls.loginBtn} theme={ThemeButton.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
        {t('Войти')}
      </Button>
    </div>
  )
})
