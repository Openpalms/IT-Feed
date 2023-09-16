import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import cls from './ArticleListItem.module.scss'
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from 'entities/Article/model/types/types'
import { ArticleText } from '../ArticleText/ArticleText'
import { AppLink } from 'shared/ui/AppLink/AppLink'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id)
  }, [article.id, navigate])

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleView.BLOCK) {
    const textBlock = article.blocks.find((block: any) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

    return (
      <AppLink
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        to={RoutePath.article_details + article.id}
        target={target}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} source={article?.user?.avatar} />
            <Text text={article?.user?.username} className={cls.username} />
            <Text text={article?.createdAt} className={cls.date} />
          </div>
          <Text title={article?.title} className={cls.title} />
          {types}
          <img src={article?.img} className={cls.img} alt={article?.title} />
          {textBlock && <ArticleText block={textBlock} className={cls.textBlock} />}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle} theme={ThemeButton.OUTLINE}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>
      </AppLink>
    )
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  )
})
