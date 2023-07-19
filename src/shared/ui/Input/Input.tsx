import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autofocus?: boolean
}

export const Input: React.FC<InputProps> = memo(
  ({ className, value, onChange, type = 'text', placeholder, autofocus = false }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (autofocus) {
        setIsFocused(true)
        inputRef.current.focus()
      }
    }, [autofocus])

    const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
      setCaretPosition(e.target.value.length)
    }
    const onBlur = () => {
      setIsFocused(false)
    }
    const onFocus = () => {
      setIsFocused(true)
    }
    const onSelect = (e: any) => {
      setCaretPosition(e.target.selectionStart || 0)
    }
    return (
      <div className={classNames(cls.InputWrapper, {}, [className])}>
        {placeholder && <div className={cls.placeholder}>{placeholder + '>'}</div>}
        <div className={cls.caretWrapper}>
          <input
            type={type}
            value={value}
            onChange={OnChangeHandler}
            className={cls.Input}
            onBlur={onBlur}
            onFocus={onFocus}
            onSelect={onSelect}
            ref={inputRef}
          />
          {isFocused && <span className={cls.caret} style={{ left: `${caretPosition * 8}px` }} />}
        </div>
      </div>
    )
  },
)
