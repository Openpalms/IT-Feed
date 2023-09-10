import React, { ReactNode, memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'
import { Card, CardTheme } from '../Card/Card'
import { ArticleType } from 'entities/Article/model/types/types'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  activeTab: ArticleType
  onTabClick: (tab: TabItem) => void
}

export const Tabs: React.FC<TabsProps> = memo(({ className, tabs, activeTab, onTabClick }) => {
  const OnClickAction = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab)
    }
  }, [])

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={cls.tab}
          key={tab.value}
          theme={tab.value === activeTab ? CardTheme.DEFAULT : CardTheme.OUTLINED}
          onClick={OnClickAction(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
})
