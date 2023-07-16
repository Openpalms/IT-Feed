import { classNames } from 'shared/lib/classNames/classNames'
import { useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import cls from './Sidebar.module.scss'
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <Button
        className={cls.collapsedBtn}
        onClick={onToggle}
        theme={ThemeButton.BACKGROUND_INVERTED}
        isSquare={true}
        size={SizeButton.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>
        <AppLink theme={ApplinkTheme.SECONDARY} to={RoutePath.main} className={cls.item}>
          <MainIcon className={cls.icon} />
          <span className={cls.link}>Home</span>
        </AppLink>
        <AppLink theme={ApplinkTheme.SECONDARY} to={RoutePath.about} className={cls.item}>
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>About</span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} shorten={collapsed} />
      </div>
    </div>
  )
}
