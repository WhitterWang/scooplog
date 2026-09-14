import type { Locale } from './types'

export const messages = {
  en: {
    appName: 'ScoopLog',
    appNameZh: '冰淇淋护照',
    tagline: 'For Gelato People by Gelato People',
    logScoop: 'Log a scoop',
    editScoop: 'Edit scoop',
    searchPlaceholder: 'Search shop, flavor, or tag…',
    allShops: 'All shops',
    allFlavors: 'All flavors',
    allTags: 'All tags',
    shop: 'Shop',
    flavor: 'Flavor',
    rating: 'Rating',
    notes: 'Notes',
    date: 'Date',
    tags: 'Tags',
    tagsHint: 'Type a tag and press Enter',
    notesPlaceholder: 'Texture, weather, who you went with…',
    shopPlaceholder: 'Where did you eat it?',
    flavorPlaceholder: 'What flavor was the scoop?',
    save: 'Save scoop',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    filters: 'Filters',
    showing: 'Showing {shown} of {total}',
    totalScoops: 'Scoops logged',
    averageRating: 'Average rating',
    topShops: 'Favorite shops',
    topFlavors: 'Favorite flavors',
    noStats: 'Log a few scoops to see favorites.',
    emptyTitle: 'Your passport is blank',
    emptyBody:
      'The first stamp is the sweetest. Log a scoop you loved — or restore the sample journal to peek around.',
    emptyCta: 'Log your first scoop',
    noResultsTitle: 'No scoops match',
    noResultsBody: 'Try a different shop, flavor, or tag. Great gelato is still out there.',
    clearFilters: 'Clear filters',
    resetData: 'Reset sample journal',
    resetConfirmTitle: 'Restore sample scoops?',
    resetConfirmBody:
      'This replaces everything stored in this browser with the starter journal. Your own entries will be gone.',
    resetConfirm: 'Restore samples',
    deleteConfirmTitle: 'Delete this scoop?',
    deleteConfirmBody: 'This stamp comes out of your passport. You cannot undo it.',
    deleteConfirm: 'Delete scoop',
    required: 'Required',
    language: 'Language',
    english: 'English',
    chinese: '中文',
    localFirst: 'Stays on this device · no account',
    ratingLabel: '{n} out of 5',
    untitledShop: 'Unknown shop',
    untitledFlavor: 'Unknown flavor',
  },
  zh: {
    appName: 'ScoopLog',
    appNameZh: '冰淇淋护照',
    tagline: '为爱冰淇淋的人，由爱冰淇淋的人',
    logScoop: '记一勺',
    editScoop: '编辑记录',
    searchPlaceholder: '搜索店铺、口味或标签…',
    allShops: '全部店铺',
    allFlavors: '全部口味',
    allTags: '全部标签',
    shop: '店铺',
    flavor: '口味',
    rating: '评分',
    notes: '笔记',
    date: '日期',
    tags: '标签',
    tagsHint: '输入标签后按回车',
    notesPlaceholder: '口感、天气、和谁一起吃…',
    shopPlaceholder: '在哪家店吃的？',
    flavorPlaceholder: '什么口味？',
    save: '保存这一勺',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    close: '关闭',
    filters: '筛选',
    showing: '显示 {shown} / {total} 条',
    totalScoops: '累计勺数',
    averageRating: '平均评分',
    topShops: '最爱店铺',
    topFlavors: '最爱口味',
    noStats: '多记几勺，最爱榜就会出现。',
    emptyTitle: '护照还是空白的',
    emptyBody: '第一枚印章最甜。记下你爱的那一勺，或恢复示例日记先逛逛。',
    emptyCta: '记下第一勺',
    noResultsTitle: '没有匹配的记录',
    noResultsBody: '换个店铺、口味或标签试试。好冰淇淋还在路上。',
    clearFilters: '清除筛选',
    resetData: '重置示例日记',
    resetConfirmTitle: '恢复示例记录？',
    resetConfirmBody: '这将用入门日记替换此浏览器中保存的全部内容，你自己的记录会消失。',
    resetConfirm: '恢复示例',
    deleteConfirmTitle: '删除这一勺？',
    deleteConfirmBody: '这枚印章会从护照上取下，无法撤销。',
    deleteConfirm: '删除记录',
    required: '必填',
    language: '语言',
    english: 'English',
    chinese: '中文',
    localFirst: '只存在这台设备 · 无需账号',
    ratingLabel: '{n} / 5 分',
    untitledShop: '未知店铺',
    untitledFlavor: '未知口味',
  },
} as const

export type MessageKey = keyof typeof messages.en

export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let value: string = messages[locale][key]
  if (!vars) return value
  for (const [name, replacement] of Object.entries(vars)) {
    value = value.replaceAll(`{${name}}`, String(replacement))
  }
  return value
}

export function formatDate(locale: Locale, isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) return isoDate
  if (locale === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function todayIso(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}
