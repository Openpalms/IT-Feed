import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleText.module.scss'

interface ArticleTextProps {
  className?: string
}

export const ArticleText: React.FC<ArticleTextProps> = ({ className }) => {
  return <div className={classNames(cls.ArticleText, {}, [className])}>ArticleText</div>
}
