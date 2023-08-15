import React, { CSSProperties, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  source?: string
  size?: number
}

export const Avatar: React.FC<AvatarProps> = ({ className, source, size }) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    }
  }, [size])
  return <img src={source} alt='avatar' style={styles} className={classNames(cls.Avatar, {}, [className])} />
}
