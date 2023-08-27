import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import { useSelector } from 'react-redux'
import { getAuthDataState } from 'entities/User'
import { ISidebarItem } from 'widgets/Sidebar/model/selectors'
interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(({ item, collapsed }) => {
  const isAuth = useSelector(getAuthDataState)
  if (item.authOnly && !isAuth) return null
  return (
    <div className={classNames(cls.items, {}, [])}>
      <AppLink
        theme={ApplinkTheme.SECONDARY}
        to={item.path}
        className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      >
        <span className={`${cls.icon}`}>{item.Icon}</span>
        <span className={cls.link}>{item.text}</span>
      </AppLink>
    </div>
  )
})
