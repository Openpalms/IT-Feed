import { User } from 'entities/User'

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

interface ArticleBase {
  id: string
  type: ArticleBlockType
}
export interface ArticleCodeBlock extends ArticleBase {
  type: ArticleBlockType.CODE
  code: string
}
export interface ArticleImageBlock extends ArticleBase {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
}
export interface ArticleTextBlock extends ArticleBase {
  type: ArticleBlockType.TEXT
  title?: string
  paragraphs: string[]
}
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock
export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  SPORTS = 'SPORTS',
  ECONOMICS = 'ECONOMICS',
}
export enum ArticleView {
  BLOCK = 'BLOCK',
  LIST = 'LIST',
}

export interface Article {
  user: User
  id: string
  title: string
  subtitle: string
  img: string
  views: number | string
  createdAt: string
  type: Array<ArticleType>
  blocks: Array<ArticleBlock>
}

export interface ArticleDetailsSchema {
  isLoading: boolean
  error?: string
  data?: Article
}
