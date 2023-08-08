import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { AppLink, ApplinkTheme } from 'shared/ui/AppLink/AppLink'
import { ISidebarItem } from 'widgets/Sidebar/model/types'
interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = memo(({ item, collapsed }) => {
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
