import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>/</div>
    </div>
  )
}
