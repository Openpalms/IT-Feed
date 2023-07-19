import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { t } from 'i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthDataState } from 'app/entities/User'
import { userActions } from 'app/entities/User/model/slice/UserSlice'

interface NavbarProps {
  className?: string
}
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
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
        <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
          {t('выйти')}{' '}
        </Button>
        <LoginModal isOpen={isAuth} onClose={handleCloseModal} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={handleOpenModal}>
        {t('войти')}{' '}
      </Button>
      <LoginModal isOpen={isAuth} onClose={handleCloseModal} />
    </div>
  )
}
