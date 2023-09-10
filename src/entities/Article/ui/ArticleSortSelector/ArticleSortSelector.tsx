import React, { memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import { Select, selectOption } from 'shared/ui/Select/Select'
import { ArticleSortField } from 'entities/Article/model/types/types'
import { SortOrder } from 'pages/ArticlesPage/model/types/types'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (order: SortOrder) => void
  onChangeSort: (sort: ArticleSortField) => void
}

export const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = memo(
  ({ className, sort, order, onChangeOrder, onChangeSort }) => {
    const orderOptions = useMemo<selectOption<SortOrder>[]>(
      () => [
        {
          value: 'asc',
          content: 'ascending',
        },
        {
          value: 'desc',
          content: 'descending',
        },
      ],
      [],
    )

    const sortOptions = useMemo<selectOption<ArticleSortField>[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: 'date',
        },
        {
          value: ArticleSortField.TITLE,
          content: 'title',
        },
        {
          value: ArticleSortField.VIEWS,
          content: 'views',
        },
      ],
      [],
    )
    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select options={sortOptions} label='Sort by' value={sort} onChange={onChangeSort} />
        <Select options={orderOptions} label='by' value={order} onChange={onChangeOrder} />
      </div>
    )
  },
)
