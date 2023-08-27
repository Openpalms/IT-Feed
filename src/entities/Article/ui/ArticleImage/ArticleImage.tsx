import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleImage.module.scss'
import { ArticleImageBlock } from '../../model/types/types'
import { Text } from 'shared/ui/Text/Text'

interface ArticleImageProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImage: React.FC<ArticleImageProps> = memo(({ className, block }) => {
  return (
    <div className={classNames(cls.ArticleImage, {}, [className])}>
      <img src={block.src} alt={block.type} className={cls.img} />
      {block.title && <Text text={block.title} className={cls.title} />}
    </div>
  )
})
