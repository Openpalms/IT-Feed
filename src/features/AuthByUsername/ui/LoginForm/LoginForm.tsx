import React, { memo, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { loginActions, loginReducer } from 'features/model/slice/loginSlice'
import { getLoginState } from 'features/model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { StoreWithManager } from 'app/providers/StoreProvider'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

interface LoginFormProps {
  className?: string
}

const InitialReducers: ReducersList = {
  login: loginReducer,
}

const LoginForm: React.FC<LoginFormProps> = memo(({ className }) => {
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
