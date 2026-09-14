export type Locale = 'en' | 'zh'

export type Scoop = {
  id: string
  shop: string
  flavor: string
  rating: number
  notes: string
  date: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ScoopDraft = {
  shop: string
  flavor: string
  rating: number
  notes: string
  date: string
  tags: string[]
}

export type Filters = {
  query: string
  shop: string
  flavor: string
  tag: string
}
