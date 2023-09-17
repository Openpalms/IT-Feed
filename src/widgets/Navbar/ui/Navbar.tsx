import React, { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { t } from 'i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthDataState } from 'entities/User'
import { userActions } from 'entities/User/model/slice/UserSlice'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface NavbarProps {
  className?: string
}
export const Navbar: React.FC<NavbarProps> = memo(({ className }) => {
  const [isAuth, setIsAuth] = useState(false)
  const authData = useSelector(getAuthDataState)
  const dispatch = useDispatch()
  const handleOpenModal = useCallback(() => {
    setIsAuth(true)
  }, [])
  const handleCloseModal = useCallback(() => {
    setIsAuth(false)
  }, [])
  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [])

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appname} title={'ITFeed'} theme={TextTheme.PRIMARY} />
        <AppLink theme={ApplinkTheme.SECONDARY} to={RoutePath.article_create} className={cls.createBtn}>
          Create new article
        </AppLink>
        <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
          {t('выйти')}{' '}
        </Button>
        <LoginModal isOpen={isAuth} onClose={handleCloseModal} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Text className={cls.appname} title={'ITFeed'} theme={TextTheme.PRIMARY} />
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={handleOpenModal}>
        {t('войти')}{' '}
      </Button>
      {isAuth && <LoginModal isOpen={isAuth} onClose={handleCloseModal} />}
    </div>
  )
})
