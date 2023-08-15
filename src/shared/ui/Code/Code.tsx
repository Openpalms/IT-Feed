import React, { useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Code.module.scss'
import { Button, ThemeButton } from '../Button/Button'
import CopyIcon from 'shared/assets/icons/copy-20-20.svg'
interface CodeProps {
  className?: string
  text: string
}

export const Code: React.FC<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])
  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copy} theme={ThemeButton.CLEAR} onClick={onCopy}>
        <CopyIcon className={cls.CopyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
}
