import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { loginActions, loginReducer } from 'features/model/slice/loginSlice'
import { getLoginState } from 'features/model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface LoginFormProps {
  className?: string
  onSuccess?: () => void
}

const InitialReducers: ReducersList = {
  login: loginReducer,
}

const LoginForm: React.FC<LoginFormProps> = memo(({ className, onSuccess }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
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

  const onLoginClick = useCallback(async () => {
    const res = await dispatch(loginByUsername({ username, password }))
    if (res.meta.requestStatus === 'fulfilled') {
      onSuccess && onSuccess()
    }
  }, [dispatch, password, username, onSuccess])
  return (
    <DynamicModuleLoader reducers={InitialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title='Login Form' />
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
    </DynamicModuleLoader>
  )
})
export default LoginForm
