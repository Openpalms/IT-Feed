import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCode.module.scss'

interface ArticleCodeProps {
  className?: string
}

export const ArticleCode: React.FC<ArticleCodeProps> = ({ className }) => {
  return <div className={classNames(cls.ArticleCode, {}, [className])}>ArticleCode</div>
}
