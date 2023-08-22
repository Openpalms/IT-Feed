import { createSelector } from '@reduxjs/toolkit'
import { getAuthDataState } from 'app/entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticleIcon from 'shared/assets/icons/article-20-20.svg'

export interface ISidebarItem {
  path: string
  text: string
  Icon?: React.ReactNode
  authOnly?: boolean
}

export const getSidebarItems = createSelector(getAuthDataState, (userData) => {
  const sidebarItemsList: Array<ISidebarItem> = [
    {
      path: RoutePath.main,
      Icon: <MainIcon />,
      text: 'Главная',
    },
    {
      path: RoutePath.about,
      Icon: <AboutIcon />,
      text: 'О сайте',
    },
  ]
  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData?.id,
        Icon: <ProfileIcon />,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: <ArticleIcon />,
        text: 'Статьи',
        authOnly: true,
      },
    )
  }
  return sidebarItemsList
})
