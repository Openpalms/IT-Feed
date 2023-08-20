import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import { IComment } from '../..'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface CommentCardProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentCard: React.FC<CommentCardProps> = ({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={45} height={45} border='50%' />
          <Skeleton width={105} height={16} />
        </div>
        <Skeleton width={'100%'} height={56} className={cls.text} />
      </div>
    )
  }
  if (!comment) return null
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink className={cls.header} to={`${RoutePath.profile}${comment?.user.id}`}>
        {comment?.user?.avatar && <Avatar size={45} source={comment?.user?.avatar} />}
        <Text title={comment?.user?.username} />
      </AppLink>
      <Text text={comment?.text} className={cls.text} />
    </div>
  )
}
