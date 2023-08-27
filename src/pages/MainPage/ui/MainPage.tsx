import { useTranslation } from 'react-i18next'
import React from 'react'
import { Page } from 'shared/ui/Page/Page'

const MainPage = () => {
  const { t } = useTranslation('main')

  return <Page>{t('Главная страница')}</Page>
}

export default MainPage
