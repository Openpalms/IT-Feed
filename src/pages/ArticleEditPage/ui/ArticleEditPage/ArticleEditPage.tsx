import React from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'shared/ui/Page/Page'
// import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string
}
const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  return <Page className={classNames('cls.ArticleEditPage', {}, [className])}>{isEdit ? 'Editing' : 'Creating'}</Page>
}
export default ArticleEditPage
