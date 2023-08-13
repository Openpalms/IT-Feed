export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

interface ArticleBase {
  id: string
  type: ArticleBlockType
}
interface ArticleCodeBlock extends ArticleBase {
  type: ArticleBlockType.CODE
  code: string
}
interface ArticleImageBlock extends ArticleBase {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
}
interface ArticleTextBlock extends ArticleBase {
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

export interface Article {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: Array<ArticleType>
  block: Array<ArticleBlock>
}

export interface ArticleDetailsSchema {
  isLoading: boolean
  error?: string
  data?: Article
}
