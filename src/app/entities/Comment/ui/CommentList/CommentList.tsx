import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import { IComment } from '../..'

interface CommentListProps {
  className?: string
  comments?: IComment[]
  isLoading?: boolean
}

export const CommentList: React.FC<CommentListProps> = ({ className, comments, isLoading }) => {
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard isLoading={isLoading} className={cls.comment} comment={comment} key={comment.id} />
        ))
      ) : (
        <Text text='No comments' />
      )}
    </div>
  )
}
