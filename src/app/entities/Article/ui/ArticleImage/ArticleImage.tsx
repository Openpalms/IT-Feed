import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleImage.module.scss'

interface ArticleImageProps {
  className?: string
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ className }) => {
  return <div className={classNames(cls.ArticleImage, {}, [className])}>ArticleImage</div>
}
