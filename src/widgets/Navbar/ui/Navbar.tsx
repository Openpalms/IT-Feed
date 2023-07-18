import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { t } from 'i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'

interface NavbarProps {
  className?: string
}
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuth, setIsAuth] = useState(false)
  const handleOpenModal = useCallback(() => {
    setIsAuth(true)
  }, [])
  const handleCloseModal = useCallback(() => {
    setIsAuth(false)
  }, [])
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={handleOpenModal}>
        {t('войти')}{' '}
      </Button>
      <LoginModal isOpen={isAuth} onClose={handleCloseModal} />
    </div>
  )
}
