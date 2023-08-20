import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ArticlesPage.module.scss'
const ArticlesPage = () => {
  const { t } = useTranslation('main')

  return <div className={cls.ArticlesPage}>{t('Articles Page')}</div>
}

export default memo(ArticlesPage)
