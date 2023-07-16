import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { t } from 'i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'

interface NavbarProps {
  className?: string
}
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isAuth, setIsAuth] = useState(false)
  const toggleModal = useCallback(() => {
    setIsAuth((prev) => !prev)
  }, [])
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={toggleModal}>
        {t('войти')}{' '}
      </Button>
      <Modal isOpen={isAuth} onClose={toggleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae accusantium quod placeat! Dignissimos
        obcaecati cupiditate debitis voluptate fugiat vero et.
      </Modal>
    </div>
  )
}
