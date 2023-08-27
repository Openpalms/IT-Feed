import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleText.module.scss'
import { ArticleTextBlock } from '../../model/types/types'
import { Text } from 'shared/ui/Text/Text'

interface ArticleTextProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleText: React.FC<ArticleTextProps> = memo(({ className, block }) => {
  return (
    <div className={classNames(cls.ArticleText, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title} />}
      {block.paragraphs.map((paragraph) => (
        <Text text={paragraph} className={cls.paragraph} key={paragraph} />
      ))}
    </div>
  )
})
