import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleViewSwitcher.module.scss'
import { ArticleView } from 'entities/Article/model/types/types'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import BlockIcon from 'shared/assets/icons/tiled-24-24.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'

interface ArticleViewSwitcherProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.BLOCK,
    icon: BlockIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
]

export const ArticleViewSwitcher: React.FC<ArticleViewSwitcherProps> = ({ className, view, onViewClick }) => {
  const onClick = (newView: ArticleView) => {
    return () => {
      onViewClick?.(newView)
    }
  }
  return (
    <div className={classNames('text', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
          <Icon Svg={viewType.icon} className={classNames('', { [cls.notSelected]: viewType.view !== view })} />
        </Button>
      ))}
    </div>
  )
}
