import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
interface NavbarProps {
  className?: string;
}
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={cls.links}>
        <AppLink theme={ApplinkTheme.SECONDARY} to={'/'}>
          Home
        </AppLink>
        <AppLink theme={ApplinkTheme.SECONDARY} to={'/about'}>
          about
        </AppLink>
      </div>
    </div>
  );
};
