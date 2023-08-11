import React, { ChangeEvent, memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface selectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: selectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select: React.FC<SelectProps> = memo(({ className, label, options, value, onChange, readonly }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }
  const list = useMemo(() => {
    return options?.map((item) => (
      <option className={cls.option} value={item.value} key={item.value}>
        {item.content}
      </option>
    ))
  }, [options])
  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select className={cls.select} value={value} onChange={handleChange} aria-readonly={readonly} disabled={readonly}>
        {list}
      </select>
    </div>
  )
})
