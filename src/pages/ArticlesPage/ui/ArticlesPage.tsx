import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const ArticlesPage = () => {
  const { t } = useTranslation('main')

  return <div>{t('Articles Page')}</div>
}

export default memo(ArticlesPage)
