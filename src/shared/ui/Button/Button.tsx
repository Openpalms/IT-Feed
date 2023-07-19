import React, { ButtonHTMLAttributes } from 'react'
import cls from './Button.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}
export enum SizeButton {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  isSquare?: boolean
  size?: SizeButton
  disabled?: boolean
}
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, isSquare, size = SizeButton.M, disabled, ...otherProps } = props
  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: isSquare,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  }
  return (
    <button className={classNames(cls.Button, mods, [className, size])} {...otherProps} disabled={disabled}>
      {children}
    </button>
  )
}
