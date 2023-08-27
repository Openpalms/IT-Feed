import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCode.module.scss'
import { ArticleCodeBlock } from '../../model/types/types'
import { Code } from 'shared/ui/Code/Code'

interface ArticleCodeProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCode: React.FC<ArticleCodeProps> = memo(({ className, block }) => {
  return (
    <div className={classNames(cls.ArticleCode, {}, [className])}>
      <Code text={block.code} />
    </div>
  )
})
