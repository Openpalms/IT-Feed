import { createSelector } from '@reduxjs/toolkit'
import { getArticleData } from 'entities/Article/model/selectors/ArticleDetalsSelectors'
import { getAuthDataState } from 'entities/User'

export const canEditArticle = createSelector(getArticleData, getAuthDataState, (article, user) => {
  console.log(article?.user.id)
  console.log(user?.id)
  if (!article || !user) return false
  return Number(article?.user.id) === Number(user?.id)
})
