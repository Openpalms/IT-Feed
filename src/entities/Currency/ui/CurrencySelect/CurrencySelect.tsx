import { Currency } from 'entities/Currency'
import React, { memo, useCallback } from 'react'
import { Select } from 'shared/ui/Select/Select'

interface CurrencySelectProps {
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}
const opts = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
]
export const CurrencySelect: React.FC<CurrencySelectProps> = memo(({ value, onChange, readonly }) => {
  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Currency)
    },
    [onChange],
  )
  return <Select label='select currency' options={opts} value={value} onChange={handleChange} readonly={readonly} />
})
