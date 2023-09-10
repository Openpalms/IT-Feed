import React, { HTMLAttributes, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
  DEFAULT = 'default',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}

export const Card: React.FC<CardProps> = ({ className, children, theme = CardTheme.DEFAULT, ...otherProps }) => {
  return (
    <div className={classNames(cls.Card, {}, [className, cls[theme]])} {...otherProps}>
      {children}
    </div>
  )
}
